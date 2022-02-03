import express from 'express';
import React from 'react';
import path from 'path';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {ChunkExtractor} from '@loadable/server';

const app = express(); 
const PORT = 6066;

if(process.env.NODE_ENV !== 'production'){
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.client.js').map((config) => {
        config.output.path = config.output.path.replace( path.join(__dirname, 'dist/dist/'), path.join(__dirname, 'dist/'));
        return config;
    });

    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    
    const compiler = webpack(webpackConfig);
    
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: webpackConfig[0].output.publicPath,
            writeToDisk: true,
        })
    );

    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname)));

app.get('*', (req, res) => {
    const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
    const webStats = path.resolve(__dirname, './web/loadable-stats.json');
    const nodeExtractor = new ChunkExtractor({statsFile: nodeStats});
    const {default: App} = nodeExtractor.requireEntrypoint();
    const webExtractor = new ChunkExtractor({statsFile: webStats});
    
    const context = {};
    const jsx = webExtractor.collectChunks(
        <StaticRouter location={req.url} context={context} >
            <App/>
        </StaticRouter>
    );
    
    const html = renderToString(jsx);
    const helmet = Helmet.renderStatic();
    
    res.set('content-type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, user-scalable=no">
            <meta name="google" content="notranslate">
            ${helmet.title.toString()}
            ${webExtractor.getLinkTags()}
            ${webExtractor.getStyleTags()}
        </head>
        <body>
            <div id="root">${html}</div>
            ${webExtractor.getScriptTags()}
        </body>
        </html>
    `)
})

app.listen( PORT, () => {
    console.log(`[server.js] React-Server listening on ${PORT}`);
})