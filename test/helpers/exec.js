import execa from 'execa';

export default directory => {
	return execa(`${__dirname}/../../check.js`, {cwd: directory});
};
