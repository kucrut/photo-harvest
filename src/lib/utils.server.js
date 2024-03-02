import { Encryption } from '@adonisjs/encryption';
import { env } from '$env/dynamic/private';
import { session_schema } from './schema';

export const APP_ID_COOKIE_NAME = 'app_id';
const SESSION_COOKIE_NAME = 'session';

/**
 * Delete session cookies
 *
 * @param {import('@sveltejs/kit').Cookies} cookies Coooooookiiiiieeees.
 */
export function delete_session_cookies( cookies ) {
	cookies.delete( SESSION_COOKIE_NAME, get_session_cookie_options() );
}

/**
 * Get session cookie options
 *
 * @return {import('cookie').CookieSerializeOptions & {path: string}} Cookie options.
 */
export function get_session_cookie_options() {
	return {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7,
		path: '/',
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
	};
}

/**
 * Clear all cookies ;(
 *
 * @param {import('@sveltejs/kit').Cookies} cookies Coooooookiiiiieeees.
 */
export function clear_cookies( cookies ) {
	delete_session_cookies( cookies );
}

/**
 * Get session
 *
 * @param {import('@sveltejs/kit').Cookies} cookies Coooooookiiiiieeees.
 * @throws {typeof import('zod').ZodError} Zod error.
 * @return {import('./schema').Session|undefined} Session object.
 */
export function get_session( cookies ) {
	const raw = cookies.get( SESSION_COOKIE_NAME );

	if ( ! raw ) {
		return undefined;
	}

	const json = JSON.parse( raw );
	const session = session_schema.parse( {
		...json,
		auth: new Encryption( { secret: env.APP_SECRET } ).decrypt( json.auth ),
	} );

	return session;
}

/**
 * Set session cookies
 *
 * @param {import('@sveltejs/kit').Cookies} cookies Cookies.
 * @param {import('./schema').Session} data Session data.
 */
export function set_session_cookies( cookies, data ) {
	const session = JSON.stringify( {
		...data,
		auth: new Encryption( { secret: env.APP_SECRET } ).encrypt( data.auth ),
	} );

	cookies.set( SESSION_COOKIE_NAME, session, get_session_cookie_options() );
}
