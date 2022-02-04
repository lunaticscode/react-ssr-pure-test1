const testFormat1 = (helmet, webExtractor, html) => {
    return `
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
    `
}

module.exports = {
    testFormat1,
}