// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}

export type Leaf = {
	leaf: string;
	position: number;
	label: string;
};

export type RouteItem = {
	label: string;
	position: number;
	items?: RouteItem[];
	hasRootDoc?: boolean;
	path?: string;
	leaves?: Leaf[];
};
