As this project was developed without any prior knowledge of prebuilt libraries and industry standard practices, It contains many limitations too:

## BACKEND ARCHITECTURE & LIMITATIONS

The backend is the most flawed part of the project. To save the user's `project_state` in the cloud, Fluence relies on a custom Node.js and Express backend.
* **Authentication:** Due to a lack of knowledge regarding industry-standard security practices during development, the authentication mechanism is highly insecure. Upon registration/login, the backend generates a random string token, stores it in MongoDB, and sends it to the frontend in plain text. The frontend stores this token in `localStorage` (making it vulnerable to XSS). Every HTTP request includes this token, which resets on session initialization.
* Passwords are stored as plain strings in MongoDB without encryption.
* It utilizes the Mongoose ODM to store data directly, adding an extra validation layer.
* **Routing handles incoming requests:**
  * `POST /register`: Receives username, password, and email. Ensures the username is unique, creates the MongoDB document, generates the auth token, and returns it.
  * `POST /login`: Verifies user credentials in the database and returns a fresh auth token.
  * `POST /project`: The origin endpoint for all state changes. Handled by a router-level middleware that checks for a valid auth token. Includes sub-routes like `/project/save` (updates the `project_state` in MongoDB) and `/project/initialize` (creates a new project object with a unique ID).

## LIMITATIONS OF THE BUILDER

* Users cannot currently create Single Page Applications (SPAs), as the builder lacks frontend routing (like React Router).
* A major portion of the logic relies on synchronous JavaScript, which can bloat and lock the main thread.
* Lacks a JS manipulation mechanism, meaning users cannot currently script custom UI interactions.
* Code lacks modularity; excessive use of global variables severely impacts maintainability.
* No current mechanism to write custom CSS or arbitrary HTML attributes outside the visual editor UI.
* The custom clipboard bypasses the OS default clipboard, preventing cross-tab copy/pasting.
* Suffers from "reinventing the wheel"—too many native browser mechanics were rebuilt from scratch.
* No mechanism to write `@media` queries.
* No support for CSS `display: grid` interfaces.
