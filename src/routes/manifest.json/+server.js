export function GET() {
	return new Response(
		JSON.stringify( {
			background_color: '#faf8fc',
			display: 'fullscreen',
			id: '/',
			name: 'Photo Harvest',
			short_name: 'Photo Harvest',
			start_url: '/',
			theme_color: '#f2eef7',
			icons: [
				{
					src: 'images/svelte-android-chrome-192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: 'images/svelte-android-chrome-512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
			screenshots: [
				{
					src: 'images/screenshot-mobile.webp',
					sizes: '350x738',
					type: 'image/webp',
					form_factor: 'narrow',
					label: 'Upload screen of Photo Harvest',
				},
				{
					src: 'images/screenshot-desktop.webp',
					sizes: '1280x807',
					type: 'image/webp',
					form_factor: 'wide',
					label: 'Upload screen of Photo Harvest',
				},
			],
			share_target: {
				action: '/?share-target',
				method: 'POST',
				enctype: 'multipart/form-data',
				params: {
					files: [
						{
							name: 'file',
							accept: [ 'image/*', 'video/*' ],
						},
					],
				},
			},
		} ),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
}
