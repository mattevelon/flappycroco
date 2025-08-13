{\rtf1\ansi\ansicpg1251\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 CourierNewPSMT;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww21620\viewh13800\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs40 \cf0 # Technical requirements\
\
  * The Yandex Games SDK is built into the game. For more details, see the section Installation and use of the SDK.\
  * No registration or authorization on third-party services is required to launch and use the game.\
  * Authorization with Yandex ID is permitted.\
  * Authorization occurs only after a conscious action by the user \'97 clicking on a special button within the game.\
  * The authorization prompt contains clear and understandable text explaining the reason for the authorization requirement.\
  * Guest login or the ability to use the game without authorization is implemented.\
  * Internal progress must be saved in this case.\
  * When the game page is minimized on desktop and mobile devices, the sound stops playing.\
  * Payments are made only through the Yandex Games SDK.\
  * Advertisements are displayed only through the Yandex Games SDK.\
  * The game must meet the requirements for the types of devices specified in the publication application.\
\
### For mobile devices:\
\
  * The game is in full-screen mode during gameplay or launch.\
  * If it is possible to enter data (for example, a player's nickname or document name) into fields, the keyboard is automatically displayed when the input field is clicked.\
  * Visual elements are not distorted or stretched disproportionately when the screen orientation changes and/or the available area changes size.\
  * If the game has only one orientation, you must select the appropriate value when filling out the draft.\
  * A special placeholder about rotating the device will be displayed in the opposite orientation.\
  * The game is fully controlled by gestures. Control mechanics can be supplemented by using the mobile device's accelerometer.\
  * The system player called by the game is not displayed in any browsers.\
  * There is no WebGL notification when opening the game.\
  * A long tap on the inner field of the game does not select the field or open the context menu.\
\
### For desktop devices:\
\
  * The active field stretches vertically or horizontally to the edge of the available area (excluding sticky banners).\
  * The ratio of the long and short sides of the active field does not exceed 1:2.\
  * Visual elements are not deformed or stretched disproportionately when the size of the available area changes.\
  * Control is performed using the keyboard or mouse by default.\
  * The system player called by the game is not displayed in any browsers.\
  * The game should not implement hotkey controls, which are combinations of keys used to perform certain functions or commands in the operating system or applications.\
  * Interaction with the internal game field does not result in the field being highlighted or a context menu being opened.\
  * For correct operation from anywhere in the world, the program code does not use absolute URLs that refer to Yandex S3 servers.\
  * The sizes of internal elements, buttons, and graphics are adapted for display and interaction in order to eliminate accidental clicks and difficulties when clicking on elements.\
  * In games with internal progress (new levels unlocked, records, achievements, improvements), changes are saved immediately after the player performs an action or clicks a special save button.\
  * Refreshing the page should not affect the saved data. More details.\
  * The game displays correctly, even when the window size is changed: The active field does not extend beyond the screen, and elements are not cropped. More details.\
  * There is no browser page scrolling (system scrollbar of the browser window) or swipe to refresh.\
  * However, it is permissible to implement your own content scrolling using the game's tools.\
  * Internal elements and texts do not overlap each other or cover other elements.\
  * It is possible to control the game with one hand and stay on the main stage without additional scrolling or swiping.\
  * Moving the internal game field is allowed in strategy games, role-playing games, and other genres with a large game field.\
  * If you use cloud saves, you must indicate this when filling out the draft in a special field.\
  * Yandex Advertising Network (YAN) monetization is enabled.\
\
### For internal purchases:\
\
  * The consumption method is enabled.\
  * The use of portal currency complies with the provisions of the In-Game Purchases section. More details.\
  * Game progress is saved on the server and is available to a single user from different devices.\
  * All in-game purchases have a price indicated by numbers and a reference to the portal currency.\
  * The image, name, composition, and characteristics of the purchase made by the user must correspond to the parameters specified in the purchase offer.\
  * There are no technical messages, errors, crashes, or freezes after a certain period of time after starting use or during certain user actions.\
  * For example: rotating the screen, long pressing on the game field, gestures and swipes, minimizing the browser, opening ads, navigating through the browser history, and other methods of interaction.\
  * The game has a finished look and is not in the process of development or preliminary testing.\
  * There are no modifications to the content and appearance of embedded ad units.\
  * It is prohibited to imitate the service's ad units, for example, by creating custom full-screen units or RVs with your own buttons.\
  * The game does not have any technical means of restricting the game's operation based on the URL at which the game is opened.\
  * The Yandex Games SDK is initialized and its methods are used in strict accordance with the documentation and game requirements:\
      * The SDK is initialized strictly as specified on the SDK Installation and Use page.\
      * When the user is ready to start playing, the `LoadingAPI.ready()` method must be called from Game Ready.\
      * The use of gameplay markup is optional, but if the `GameplayAPI.start()` and `GameplayAPI.stop()` methods are used in the game, the timing of event dispatch strictly corresponds to that described in the Gameplay section.\
      * Tracking of `game_api_pause` and `game_api_resume` events is optional, but if the `ysdk.on()` and `ysdk.off()` methods are used in the game, the event handling logic strictly corresponds to that described in the Pause and Resume section.\
  * The game launches correctly in browsers and on platforms that match the environment selected in the draft.\
\
### List of browsers and platforms:\
\
  * In browsers: Yandex Browser, Google Chrome, Mozilla Firefox, Opera, Safari, Yandex mobile app.\
  * Operating systems: Windows Vista, Windows 7, Windows 8, Windows 10, Mac OS X 10.6 and above (Snow Leopard, Lion, Mountain Lion, Mavericks, Yosemite, El Capitan, Sierra, High Sierra, and Mojave).\
  * Mobile operating systems: Android 5.0 and above, iOS 9.0 and above.\
  * The size of all game files does not exceed 100 MB when unzipped.\
  * An `index.html` file has been added to the root of the archive.\
  * File and folder names do not contain spaces or Russian characters.\
  * Game updates must preserve its basic concept.\
  * It is prohibited to upload a completely different game as an update.\
\
# User experience requirements\
\
  * The game has been developed in terms of content, convenience, and quality of gameplay.\
  * The service performs internal quality control and has the right to refuse to publish games that do not pass the general quality assessment.\
  * A complete description of the controls is provided in the game or in the accompanying description fields.\
  * The game corresponds to the declared genre.\
  * The game meets at least one of the criteria for the presence of game mechanics.\
  * The game has an option to save progress if the game mechanics involve moving through the storyline or gradually completing levels.\
  * If it is an endless game or a game for the best result, there is a record saving option.\
  * The game has increasing difficulty and a clear storyline or setting.\
  * Completing the main content of the game takes more than 10 minutes.\
  * For example: a casual game with 10\'9620 levels, a game with several themes with 15\'9620 questions each, a puzzle game with several tasks.\
  * To ensure 10 minutes of gameplay, quizzes must contain at least 100 questions.\
  * Questions should not be duplicated or minimally altered (different answer options, different wording of the same question). More details.\
  * The game is localized into at least one language selected when filling out the draft.\
  * The recommended minimum localization for publication is Russian for ru, be, kk, uk, uz, and English for all other languages.\
  * The game has built-in automatic language detection via SDK.\
  * There are no microtransactions or any external purchases.\
  * Only internal purchases via the Yandex Games SDK are allowed.\
  * The portal currency is determined automatically using SDK methods. For more details, see the section on Designating the portal currency.\
  * Video integration into the game is only permitted in ways that do not allow users to navigate to external resources via the video player interface.\
  * Video integration via YouTube does not meet this condition, and games with such integration cannot be accepted.\
  * If video integration is necessary, we recommend using your own hosting or embedding the video in an archive.\
\
# Advertising requirements\
\
  * No third-party advertising, including static advertising images and text.\
  * The internal process is preserved after clicking on an ad and returning back.\
  * All ad units have an orientation that matches the orientation of the game.\
  * Advertisements do not interfere with gameplay and are only displayed during logical pauses.\
  * If there is a reward-based advertising mechanism, the user can choose to watch a rewarded video (for example, by clicking on a special button) and then receive a reward within the game.\
  * The button for calling up advertising for a reward is linked to text or a button that clearly indicates that:\
      * the user will now watch an advertisement for a reward;\
      * the user understands what exactly they will receive as a reward.\
  * The reward for watching an RV is an additional bonus (for example, but not limited to: boosters, additional actions, level skips, bonus levels, and other similar mechanics) to the main game and should not affect the ability to continue the game.\
  * Rules for placing additional advertising blocks:\
      * Only sticky banners are considered additional advertising blocks.\
      * The use of custom RTB banners is prohibited.\
  * When displaying full-screen ads (interstitial or rewarded video), the sound in the game and the gameplay must be paused.\
  * Added the ability to mute the sound.\
  * Added the ability to pause the gameplay.\
  * There are no errors when opening the developer console in the game.\
  * There are no buttons or controls that are not useful for interaction within the game on the specified platforms. For example, the exit button in the main menu.\
  * In games with complex mechanics, it is recommended to implement training at the start.\
  * If the language in the game is selected manually, it is possible to switch to another language without knowing the preset language:\
      * All menus and settings leading to language selection are represented by universal icons (for example, a gear for settings, a globe for localization).\
      * Languages are indicated by emojis with flags of the corresponding countries or the names of the languages written on them (Russian, Belarusian, English, Espa\'f1ol).\
  * Texts:\
      * Written in accordance with the spelling and punctuation rules of the selected language.\
      * Reflect the actual mechanics of the game and its main gameplay.\
      * The name of the game and related materials (description, promotions, etc.) do not mislead the player.\
      * Those that vary depending on the language and are relevant to the gameplay are translated into the appropriate language.\
      * Do not contain profanity or offensive language in any language.\
      * Do not contain prohibited content.\
  * Media materials:\
      * Are of good technical quality, without visual artifacts (pixel compression artifacts, excessive darkening, completely monochrome frames, cropped text inside icons/covers).\
      * Reflect the essence of the object (icon, cover, commercial, purchase) they illustrate, rather than being arbitrary images or videos.\
      * Do not have frames or rounded corners.\
\
# Installing and using the SDK\
\
The Yandex Games SDK is a library that allows you to quickly integrate games created by third-party developers into the Yandex Games platform.\
Connecting the SDK is a prerequisite for successful moderation.\
\
The SDK provides the following capabilities:\
\
  * integrate ad display;\
  * manage the enabling and disabling of functionality without updating the build;\
  * configure automatic transition to full-screen mode;\
  * set the screen orientation during gameplay and add a hint on which way to turn the device.\
\
## Installation\
\
**Attention**\
\
The path `https://yandex.ru/games/sdk/v2` is outdated. To ensure that your game passes moderation, specify the current path for connecting the Yandex Games SDK depending on the placement method:\
\
  * If you are uploading the game archive to the developer console, specify the relative path. This is the recommended option.\
  * If you are using integration via iframe, specify the absolute path.\
\
You can connect the Yandex Games SDK either synchronously or asynchronously. Both options are equally valid. However, asynchronous connection allows you to control the installation process using callback functions. Choose the method that you consider more suitable.\
\
### Yandex server\
\
**Note**\
\
Use a local server for proxying `/sdk.js` during development.\
\
Add the following code to the HTML page:\
\
```html\
<script>\
(function(d) \{\
var s = d.createElement(\'91script\'92);\
s.src = \'91/sdk.js\'92;\
s.async = true;\
s.onload = initSDK;\
d.body.append(s);\
\})(document);\
</script>\
```\
\
### Your domain\
\
Add the following code to the HTML page:\
\
```html\
<script>\
(function(d) \{\
var s = d.createElement(\'91script\'92);\
s.src = \'93https://sdk.games.s3.yandex.net/sdk.js\'94;\
s.async = true;\
s.onload = initSDK;\
d.body.append(s);\
\})(document);\
</script>\
```\
\
## Usage\
\
To get started, initialize the SDK using the `init()` method of the `YaGames` object.\
\
```javascript\
YaGames\
.init()\
.then(ysdk => \{\
console.log(\'91Yandex SDK initialized\'92);\
window.ysdk = ysdk;\
\});\
```\
\
## Possible problems\
\
### Uncaught ReferenceError: YaGames is not defined\
\
Please note the order in which the SDK script is connected: it must be connected before `YaGames.init()` is executed.\
\
### Uncaught ReferenceError: ysdk is not defined\
\
You tried to use SDK methods (advertising, purchases, etc.) before the SDK was initialized (`Yandex SDK initialized` message in the console). If you don't know how to guarantee the order of calls, rewrite the places where the SDK is used.\
\
To do this, replace the line:\
\
`ysdk.adv.showFullscreenAdv()`\
\
with:\
\
`YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv())`\
\
### Example of SDK connection\
\
```html\
<script src="/sdk.js"></script>\
<script>\
YaGames.init().then(ysdk => \{\
// ...\
\});\
</script>\
```}