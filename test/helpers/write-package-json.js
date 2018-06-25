import writePkg from 'write-pkg';

export default (directory, name, version) => {
	return writePkg(directory, {name, version});
};
