const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`;

const getEntryPoint = (target) => {
    if(target === 'node') return ['./src/App.js'];
    return devMode ? [hotMiddlewareScript, './src/index.js'] : ['./src/index.js']
}

const getConfig = (target) => ({
    mode: devMode ? 'development' : 'production',
    name: target,
    target,
    entry: getEntryPoint(target),
    output: {
        path: path.resolve(__dirname, `dist/${target}`),
        filename: '[name].js',
        publicPath: '/web/',
        libraryTarget: target === 'node' ? 'commonjs2' : undefined, //commonjs2 --> module.exports
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    'babel-loader',
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            pages: path.resolve('src/pages/'),
            components: path.resolve('src/components/'),
            util: path.resolve('src/util/')
        }
    },

    plugin: 
        target === "web"
            ? [new LoadablePlugin(), new webpack.HotModuleReplacementPlugin()]
            : [new LoadablePlugin()],
    
    externals: target === "node" ? ['@loadable/component', nodeExternals()] : undefined
})

module.exports = [getConfig("web"), getConfig("node")]