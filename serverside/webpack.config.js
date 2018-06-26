const serverlessWebpack = require('serverless-webpack'),
      nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    entry: serverlessWebpack.lib.entries,
    mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: __dirname,
                exclude: /node_modules/
            }
        ]
    }
};