import dotenv from 'dotenv';
import program from './commander.js';

let path = '.env.dev';

if (program.opts().mode === 'prod') {
	path = '.env.prod';
}

dotenv.config({ path });

export default {
	port: process.env.PORT,
	mongoUrl: process.env.MONGO_URL,
	adminName: process.env.ADMIN_EMAIL,
	adminPassword: process.env.ADMIN_PASSWORD,
};
