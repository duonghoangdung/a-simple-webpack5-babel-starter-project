# A Simple Webpack Starter Project
A simple webpack5, babel, node sass starter project for your basic modern web development needs.
## install webpack packaged
```
npm install webpack-cli webpack webpack-dev-server webpack-merge --save-dev
```
## install webpack plugins
```
npm install clean-webpack-plugin html-webpack-plugin copy-webpack-plugin --save-dev
```
## install webpack loader
```
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

webpack.common.js
```
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'A simple webpack starter project for your basic modern web development needs.',
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
```

webpack.dev.js
```javascript
const path = require('path');
const  webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        compress: true,
        open: true,
        hot: true,
        port: 8080,
    },
});
```

webpack.prod.js
```javascript
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                path.resolve(__dirname, "public", "favicon.ico"),
                path.resolve(__dirname, "public", "logo192.png"),
                path.resolve(__dirname, "public", "logo512.png"),
                path.resolve(__dirname, "public", "robots.txt"),
                path.resolve(__dirname, "public", "manifest.json"),
                {
                    from: path.resolve(__dirname, "public", "assets"),
                    to: "assets"
                }
                
            ],
        })
    ]
});
```
