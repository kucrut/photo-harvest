import { z } from 'zod';

export const user_schema = z.object( {
	avatar_url: z.string().url(),
	email: z.string().email().optional(),
	name: z.string(),
	wp_url: z.string().url(),
} );

/** @typedef {z.infer<user_schema>} User */

export const session_schema = user_schema.extend( {
	api_url: z.string().url(),
	token: z.string(),
} );

/** @typedef {z.infer<session_schema>} Session */

export const valid_token_response_schema = z.object( {
	code: z.string().refine( val => val === 'jwt_auth_valid_token' ),
	data: z.object( {
		status: z.number().refine( val => val === 200 ),
	} ),
} );

/** @typedef {z.infer<valid_token_response_schema>} ValidToken */

const wp_item_string = z.object( {
	raw: z.string(),
	rendered: z.string(),
} );

export const wp_media_item_schema = z.object( {
	id: z.number(),
	date: z.string(),
	date_gmt: z.string(),
	caption: wp_item_string,
	description: wp_item_string,
	guid: z.object( {
		raw: z.string().url(),
		rendered: z.string().url(),
	} ),
	link: z.string().url(),
	slug: z.string(),
	source_url: z.string().url(),
	title: wp_item_string,
	// TODO: Add more?
} );

/** @typedef {z.infer<wp_media_item_schema>} WP_Media_Item */

export const wp_login_data_schema = z.object( {
	user_email: z.string().email(),
	user_display_name: z.string(),
	user_nicename: z.string(),
	token: z.string(),
} );

/** @typedef {z.infer<wp_login_data_schema>} WP_Login_Data */

export const wp_rest_error_schema = z.object( {
	code: z.string(),
	message: z.string(),
	data: z.object( {
		status: z.number(),
	} ),
} );

/** @typedef {z.infer<wp_rest_error_schema>} WP_Rest_Error */

const wp_link_item_schema = z.array( z.object( { href: z.string().url() } ) );

const wp_links_schema = z.object( {
	self: wp_link_item_schema,
	collection: wp_link_item_schema,
} );

export const wp_taxonomy_schema = z.object( {
	hierarchical: z.boolean(),
	description: z.string(),
	name: z.string(),
	rest_base: z.string(),
	rest_namespace: z.string(),
	slug: z.string(),
	types: z.string().array(),
	_links: z.object( {
		'collection': wp_link_item_schema,
		'wp:items': wp_link_item_schema,
	} ),
} );

/** @typedef {z.infer<wp_taxonomy_schema>} WP_Taxonomy */

export const wp_taxonomies_schema = z.record( wp_taxonomy_schema );

/** @typedef {z.infer<wp_taxonomies_schema>} WP_Taxonomies */

export const wp_term_schema = z.object( {
	id: z.number().min( 1 ),
	count: z.number(),
	description: z.string(),
	link: z.string(),
	name: z.string(),
	slug: z.string(),
	taxonomy: z.string(),
	parent: z.number(),
	_links: wp_links_schema.extend( {
		about: wp_link_item_schema,
	} ),
} );

/** @typedef {z.infer<wp_term_schema>} WP_Term */

export const wp_taxonomy_terms_schema = wp_term_schema.array();

/** @typedef {z.infer<wp_taxonomy_terms_schema>} WP_Taxonomy_Terms */

export const wp_user_schema = z.object( {
	avatar_urls: z.record( z.string().url() ),
	description: z.string(),
	id: z.number().min( 1 ),
	link: z.string().url(),
	meta: z.record( z.any() ).optional(),
	name: z.string().min( 1 ),
	slug: z.string(),
	url: z.string().url(),
	_links: wp_links_schema,
} );

/** @typedef {z.infer<wp_user_schema>} WP_User */
