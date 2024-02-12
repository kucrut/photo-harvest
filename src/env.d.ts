/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly ACCESS_KEYS: string;
	readonly APP_NAME: string;
	readonly APP_SECRET: string;
	readonly PUBLIC_MAX_FILE_SIZE: string;
	readonly WP_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
