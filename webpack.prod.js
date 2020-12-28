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