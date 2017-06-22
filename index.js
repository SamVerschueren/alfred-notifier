'use strict';
const path = require('path');
const execa = require('execa');

module.exports = () => {
	const cp = execa(path.join(__dirname, 'check.js'));
	cp.unref();
};
