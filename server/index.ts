import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static assets and game files from root directory
app.use(express.static(path.join(process.cwd())));
app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));

// Create a mock SDK file for development
app.get('/sdk.js', (req, res) => {
  res.type('application/javascript');
  res.send(`
// Mock Yandex Games SDK for development
window.YaGames = {
  init: function() {
    return Promise.resolve({
      features: {
        LoadingAPI: {
          ready: function() { return Promise.resolve(); }
        },
        GameplayAPI: {
          start: function() { console.log('Gameplay started'); },
          stop: function() { console.log('Gameplay stopped'); }
        }
      },
      getPlayer: function() {
        return Promise.resolve({
          getName: function() { return 'Test Player'; },
          getPhoto: function() { return null; }
        });
      },
      getData: function() {
        return Promise.resolve({});
      },
      setData: function(data) {
        return Promise.resolve();
      },
      adv: {
        showFullscreenAdv: function(options) {
          console.log('Mock interstitial ad');
          setTimeout(() => options.callbacks.onClose(true), 1000);
        },
        showRewardedVideo: function(options) {
          console.log('Mock rewarded video ad');
          setTimeout(() => options.callbacks.onRewarded(), 1000);
        }
      }
    });
  }
};
console.log('Mock Yandex Games SDK loaded');
  `);
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
