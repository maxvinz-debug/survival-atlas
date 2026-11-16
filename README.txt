SURVIVAL ATLAS — OFFLINE EDITION

HOW TO OPEN
1. Extract the ZIP file.
2. Open the Survival-Atlas folder.
3. Double-click index.html to use the website locally. The main content, styles, animations, checklist and six tap-to-open Outdoor Field Manual visual guides work without internet.

HOW TO ENABLE AUTOMATIC OFFLINE CACHING IN A BROWSER
For a website served through a local development server:
1. Open the folder in Visual Studio Code.
2. Start Live Server and open the local address it provides (usually http://127.0.0.1:5500).
3. Keep the page open until it has loaded once. The service worker will cache the website files.
4. You can then disconnect from the internet and reload the same local address.

OUTDOOR FIELD MANUAL
- Tap OPEN VISUAL GUIDE on any of the six field-note cards.
- Each guide opens a visual reference gallery and a numbered safety checklist.
- Food examples show familiar cultivated foods and warn against unknown wild berries and mushrooms. They are not a wild-plant identification guide.
- The visual reference cards use locally embedded emoji-style illustrations rather than downloaded photographs, so they remain available offline.

IMPORTANT
- Service workers require localhost or HTTPS; they do not run when index.html is opened using a file:// address.
- External reference links still need an internet connection.
- The checklist saves progress in this browser on this device when browser storage is available.
- The website is an educational student project, not a replacement for official emergency instructions.

FILES
index.html           Main website
style.css            Layout, design and animations
script.js            Interactive features, visual guides and checklist
sw.js                Offline cache service worker
manifest.webmanifest App metadata
