const path = require('path');
const webpackCommon = require('./webpack.common');

module.exports = {
    ...webpackCommon,
    mode: 'production',
    output: {
        filename: 'bundle.[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
};
