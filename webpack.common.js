const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index'),
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: { extensions: ['.ts', '.js'] },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src/index.html') }),
        new MiniCssExtractPlugin({ filename: 'styles.[fullhash].css' }),
    ],
};
