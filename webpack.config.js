const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        index: '/public/js/main.js',
        redirect: '/public/js/redirect.js',
        create: '/public/js/create.js'
    },
    output: { // filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    /*
    plugins: [
      new BundleAnalyzerPlugin()
    ],*/
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    }
};
