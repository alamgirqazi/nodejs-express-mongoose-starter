module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: 'eslint:recommended',
    rules: {
        'no-console': 'off'
    },
    "parserOptions": {
        "ecmaVersion": 8,
    }, // "rules": {
    //     "indent": [
    //         "error",
    //         "tab"
    //     ],
    //     "linebreak-style": [
    //         "error",
    //         "windows"
    //     ],
    //     "quotes": [
    //         "error",
    //         "single"
    //     ],
    //     "semi": [
    //         "error",
    //         "always"
    //     ]
    // }
};