// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: 'main.js', // Entry point of your application
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean the output directory before emit
    },
    mode: 'development', // Change to 'production' for optimized builds
    devServer: {
        static: './dist',
        hot: true, // Enable hot module replacement
        port: 8080, // Port number for the dev server
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'home.html', // Template HTML file
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i, // Handle CSS files
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3|wav)$/i, // Handle image and sound files
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};
