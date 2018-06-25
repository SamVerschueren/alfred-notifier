import writeIniFile from 'write-ini-file';

export default (directory, registry) => {
	return writeIniFile(`${directory}/.npmrc`, {registry});
};
