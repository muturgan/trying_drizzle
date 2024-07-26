class ServerConfig {
	public readonly port: number;

	constructor() {
		/** @todo need to check the variables existence and validate it */
		this.port = Number(process.env.APP_PORT) || 0;
	}
}

class DbConfig {
	public readonly host: string;
	public readonly port: number;
	public readonly user: string;
	public readonly password: string;
	public readonly database: string;
	public readonly ssl: boolean;

	constructor() {
		/** @todo need to check the variables existence and validate it */
		this.host = process.env.DB_HOST || '';
		this.port = Number(process.env.DB_PORT) || 0;
		this.user = process.env.DB_USER || '';
		this.password = process.env.DB_PASS || '';
		this.database = process.env.DB_NAME || '';
		this.ssl = process.env.DB_SSL === '1';
	}
}

class AppConfig {
	public readonly server = new ServerConfig();
	public readonly db = new DbConfig();
}

export const appConfig = new AppConfig();
