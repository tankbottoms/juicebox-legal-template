import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: path.resolve('./src/components'),
			$constants: path.resolve('./src/constants'),
			$deployments: path.resolve('./src/deployments'),
			$stores: path.resolve('./src/stores'),
			$utils: path.resolve('./src/utils'),
			$docs: path.resolve('./src/docs')
		}
	}
};

export default config;
