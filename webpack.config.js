const path = require('path');

module.exports = {
    entry: {
        index: './public/js/main.js',
        redirect: '/public/js/redirect.js',
    },
    output: {
        //filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    }
};