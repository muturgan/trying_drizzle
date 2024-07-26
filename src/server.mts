import { createServer as createHttpServer } from 'node:http';

import { appConfig } from './config.mjs';
import { dal } from './dal/index.mjs';
import { TNewUser } from './dal/schema.mjs';

const GET = 'GET';
const POST = 'POST';
const DUMMY_FAVICON = '/favicon.ico';

const API_ZONE = 'api';
const USERS_ENDPOINT = 'users';



dal.checkReadiness().then(() => {
   const server = createHttpServer(async (req, res) => {

      switch (req.method) {

         case GET:

            if (req.url === undefined) {
               return res.socket?.destroy();
            }

            if (req.url === DUMMY_FAVICON) {
               res.writeHead(204);
               return res.end();
            }

            const [, zone, endpoint, param] = req.url.split('/');

				if (zone !== API_ZONE || endpoint !== USERS_ENDPOINT) {
					res.writeHead(404);
               return res.end('Not Found');
				}

            try {
					if (param) {
						const user = await dal.readUser(Number(param));
						if (!user) {
							res.writeHead(404);
							return res.end('Not Found');
						}
						res.writeHead(200);
                  return res.end(JSON.stringify({ user }));
					}

					const users = await dal.readUsers();
					res.writeHead(200);
               return res.end(JSON.stringify({ users }));
            }
            catch (err) {
               console.log('getLinkByHash error!');
               console.log(err);
               res.writeHead(500);
               return res.end('Internal Server Error');
            }

         case POST:
				if (req.url === undefined) {
               return res.socket?.destroy();
            }

            const [, pzone, pendpoint] = req.url.split('/');

				if (pzone !== API_ZONE || pendpoint !== USERS_ENDPOINT) {
					res.writeHead(404);
					return res.end('Not Found');
				}

				const chunks: Buffer[] = [];
				try {
					for await (const chunk of req) {
						chunks.push(chunk);
					}
				} catch (err) {
					console.log('Connection error!');
					console.log(err);
					res.writeHead(500);
					return res.end('Connection error');
				}

				const body = Buffer.concat(chunks).toString();
				let parsedBody: TNewUser;
				try {
					parsedBody = JSON.parse(body);
				} catch {
					res.writeHead(400);
					return res.end('Incorrect request body. It should be a valid json-serialized object');
				}

				try {
					const newUserId = await dal.addUser(parsedBody);
					res.writeHead(200);
					return res.end(JSON.stringify({ newUserId }));
				} catch (err) {
					console.log('createNewLink error!');
					console.log(err);
					res.writeHead(500);
					return res.end('Internal Server Error');
				}

         default:
            console.log('default!');
            return res.socket?.destroy();
      }

   });

   server.listen(appConfig.server.port, () => console.info(`Server running at http://127.0.0.1:${appConfig.server.port}/`));
});
