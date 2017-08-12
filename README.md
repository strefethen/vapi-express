# vapi-express
Basic nodejs Express app to access the VMware vAPI REST endpoint using JavaScript.

**NOTE:** This app is for demonstration purposes only and should NOT be used against your production vSphere environment until/unless you have thoroughly reviewed the code and understand what its doing.

## Requirements
These are the following npm packages used in this example:

    "dependencies": {
        "express": "^4.13.4",
        "pug": "^2.0.0-rc.3",
        "request": "^2.72.0",
        "body-parser": "^1.15.1",
        "dotenv": "^2.0.0"
    },

## Install

    $ git clone https://github.com/strefethen/vapi-express.git
    $ cd vapi-express
    $ yarn install

## Setup
Edit .env and set your HOST, USERID and PASS vars to point to your vSphere **staging** host.

    $ npm start
