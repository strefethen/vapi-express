# vapi-express
Basic nodejs Express app to access the VMware vAPI REST endpoint using JavaScript.

**NOTE:** This app is for demonstration purposes only and should NOT be used against your production vSphere environment until/unless you have thoroughly reviewed the code and understand what its doing.

## Screenshot

![Sample /host API call](/sample.png?raw=true "Optional Title")

## Requirements
NodeJS

Here are the npm packages used in this example:

    "dependencies": {
        "express": "^4.13.4",
        "clarity-icons": "^0.10.0",
        "clarity-ui": "^0.10.0",
        "pug": "^2.0.0-rc.3",
        "request": "^2.72.0",
        "body-parser": "^1.15.1",
        "dotenv": "^2.0.0"
    },

## Install

    $ git clone https://github.com/strefethen/vapi-express.git
    $ cd vapi-express
    $ npm install

## Setup
Edit .env and set your HOST, USERID and PASS vars to point to your vSphere **staging** host.

    $ npm start

## Using Clarity CSS
The app includes a base template that renders the site using the CSS from [VMware's Clarity Design System](https://clarity.design). Note, it does not use/require Angular rather it just uses the styling from Clarity. To use this alternative base template simply change "extends base" to "extends claritybase" in home.pug and api.pug.