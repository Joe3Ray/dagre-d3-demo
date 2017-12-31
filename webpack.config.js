const path = require('path')

module.exports = {
    entry: {
        index: './index.js',
        graph: './graph.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '.'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname
    }
}