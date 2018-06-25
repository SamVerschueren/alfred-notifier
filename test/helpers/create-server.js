import {parse as parseUrl} from 'url';
import polka from 'polka';
import send from '@polka/send-type';
import getPort from 'get-port';

export default async () => {
	const port = await getPort();

	await polka()
		.get('*', (req, res) => {
			const url = parseUrl(req.url);
			const packageName = url.pathname;

			return send(res, 200, {
				packageName,
				'dist-tags': {
					latest: '2.0.0'
				},
				versions: {
					'2.0.0': {
						packageName,
						version: '2.0.0'
					}
				}
			});
		})
		.listen(port);

	return `http://localhost:${port}`;
};
