let fs   = require('fs');
let path = require('path');

function loadView(view) {
  let filepath = path.resolve(__dirname, '../views/', view + '.html');
  return fs.readFileSync(filepath).toString();
}

// Content
module.exports.index    = loadView('index');      // default page
module.exports.login    = loadView('login');      // login form page
