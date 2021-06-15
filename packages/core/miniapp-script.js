const { join } = require('path');
const { exit } = require('process');
const fs = require('fs');
const JS_PATH = join(__dirname, './dist/index.js');
const CSS_PATH = join(__dirname, './dist/index.css');

function copy(from, to) {
    fs.writeFileSync(to, fs.readFileSync(from));
}

copy(JS_PATH, join(__dirname, '../miniapp/lib/core.js'));
copy(CSS_PATH, join(__dirname, '../miniapp/lib/index.wxss'));
console.log('小程序组件构建完毕');
exit(0);