import { redirect } from '@sveltejs/kit';
import { logout } from '$lib/utils.server.js';

export const load = async () => {
	throw redirect( 302, '/' );
};

/** @type {import('./$types').Actions} */
export const actions = {
	default( { cookies } ) {
		logout( cookies );
	},
};
