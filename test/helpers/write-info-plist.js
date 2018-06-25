import fs from 'fs';

import pify from 'pify';
import plist from 'plist';

const fsP = pify(fs);

const contents = {
	objects: [{
		config: {
			subtext: ''
		}
	}]
};

export default directory => {
	return fsP.writeFile(`${directory}/info.plist`, plist.build(contents));
};
