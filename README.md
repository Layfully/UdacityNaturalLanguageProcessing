# News Sentiment Analysis 

![version](https://img.shields.io/badge/version-1.0.0-blue)

This application is designed to analyze the sentiment of news articles using the MeaningCloud Sentiment Analysis API. The app is built with Webpack, Sass styles, and uses Service Workers, along with Webpack Loaders and Plugins. The project makes API requests to external URLs to fetch data and perform sentiment analysis.

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Contribution](#contribution)
- [License](#license)

## Installation

1. Clone this repository to your local machine.
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2. Move to the project directory.
    ```sh
    cd your-repo-name
    ```
3. Install all necessary packages.
    ```sh
    npm install
    ```

## Usage

To run this project, you need to follow these steps:

1. Start the server if you haven't done it already (see Installation)
2. Open the app in your browser (`http://localhost:8080`)
3. Paste a link to a news article in the input field
4. Click on the "Analyze" button
5. You'll see the sentiment analysis of the article on the screen

## Scripts

You can use the following npm scripts to perform different actions:

- `npm start` - Start the server
- `npm run build-prod` - Build the project for production
- `npm run build-dev` - Build the project for development and open the app in your default web browser

## Dependencies

The project has the following dependencies:

- "dotenv": "^8.2.0"
- "express": "^4.17.1"
- "jest-fetch-mock": "^3.0.3"
- "webpack": "^4.35.3"
- "webpack-cli": "^3.3.5"

## Development Dependencies

For development, the following packages are used:

- "@babel/core": "^7.13.15"
- "@babel/plugin-transform-modules-commonjs": "^7.13.8"
- "@babel/preset-env": "^7.13.15"
- "babel-loader": "^8.2.2"
- "body-parser": "^1.19.0"
- "clean-webpack-plugin": "^3.0.0"
- "cors": "^2.8.5"
- "css-loader": "^5.2.1"
- "html-webpack-plugin": "^3.2.0"
- "jest": "^26.6.3"
- "mini-css-extract-plugin": "^0.12.0"
- "node-fetch": "^2.6.1"
- "node-sass": "^5.0.0"
- "optimize-css-assets-webpack-plugin": "^5.0.4"
- "sass": "^1.32.8"
- "sass-loader": "^10.1.1"
- "style-loader": "^2.0.0"
- "terser-webpack-plugin": "^4.2.3"
- "webpack-dev-server": "^3.11.2"
- "workbox-webpack-plugin": "^6.6.0"

## Contribution

Contributions, issues, and feature requests are welcome!

Feel free to check [issues page](https://github.com/your-username/your-repo-name/issues). You can also take a look at the [contributing guide](https://github.com/your-username/your-repo-name/contributing).

## License

This project is [ISC](https://choosealicense.com/licenses/isc/) licensed.

## Show your support

Give a ⭐️ if this project helped you!