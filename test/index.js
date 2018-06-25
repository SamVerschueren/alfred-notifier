import test from 'ava';
import CacheConf from 'cache-conf';
import tempy from 'tempy';
import uniqueString from 'unique-string';

import createServer from './helpers/create-server';
import exec from './helpers/exec';
import getSubtext from './helpers/get-subtext';
import setRegistry from './helpers/set-registry';
import writeInfoPlist from './helpers/write-info-plist';
import writePackageJson from './helpers/write-package-json';

test.beforeEach(async t => {
	const directory = tempy.directory();
	const packageName = uniqueString();
	const registryUrl = await createServer();

	await setRegistry(directory, registryUrl);
	await writeInfoPlist(directory);

	t.context = {directory, packageName};
});

test.afterEach.always(t => {
	const config = new CacheConf({projectName: 'alfred-notifier'});
	config.delete(t.context.packageName);
});

test('notifies if an update is available', async t => {
	const {directory, packageName} = t.context;

	await writePackageJson(directory, packageName, '1.0.0');
	await exec(directory);

	t.is(await getSubtext(directory), `Update available: 1.0.0 → 2.0.0. Run \`npm install -g ${packageName}\``);
});

test('does nothing if up to date', async t => {
	const {directory, packageName} = t.context;

	await writePackageJson(directory, packageName, '2.0.0');
	await exec(directory);

	t.is(await getSubtext(directory), '');
});
