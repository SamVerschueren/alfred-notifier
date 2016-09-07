'use strict';
const execa = require('execa');

module.exports = () => {
	execa('./check.js', [process.cwd()], {cwd: __dirname});
};
