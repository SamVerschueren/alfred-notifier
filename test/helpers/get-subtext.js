import fs from 'fs';
import pify from 'pify';
import plist from 'plist';

const fsP = pify(fs);

export default async directory => {
	const infoPlist = plist.parse(await fsP.readFile(`${directory}/info.plist`, 'utf8'));
	return infoPlist.objects[0].config.subtext;
};
