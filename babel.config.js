const isWebTarget = (caller) => {
    return Boolean(caller && caller.target === "web");
}

const isWebpack = (caller) => {
    return Boolean(caller && caller.name === "babel-loader");
}

module.exports = (api) => {
    const web = api.caller(isWebTarget);
    const webpack = api.caller(isWebpack);

    return {
        presets: [
            '@babel/preset-react',
            [
                '@babel/preset-env',
                {
                    useBuiltIns: web ? 'entry' : undefined,
                    targets: !web ? {node: 'current'} : undefined,
                    modules: webpack ? false : 'commonjs',
                },
            ],
        ],
        plugins: [
            '@loadable/babel-plugin',
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: ['.js', '.jsx'],
                    alias: {
                        '@src': './src',
                        '@components': './src/components',
                        '@pages': './src/pages',
                        '@util': './src/util',
                    }
                }
            ]
        ],
    }
}