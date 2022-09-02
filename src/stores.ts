import { writable } from 'svelte/store';
import { page } from '$app/stores';

export const variables = writable([]);
export const documentRef = writable(null);
export const component = writable(null);
export const metadata = writable({});

export async function setCurrentDocumentFromPath(page: any) {
	const path = page.params?.catchall;
	if (path) {
		const pathWithoutExtension = path.replace(/\.[^/.]+$/, '');
		const globs = import.meta.glob('./docs/**/*.{md,svx}');

		let imported: any;
        component.set(null);
		try {
			imported = await globs?.[`./docs/${pathWithoutExtension}.md`]();
			metadata.set(imported.metadata || {});
			component.set(imported.default);
		} catch (e) {
			console.info('No markdown file found for ' + pathWithoutExtension);
		}
	}
}

page.subscribe(async page => {
	await setCurrentDocumentFromPath(page);
});
