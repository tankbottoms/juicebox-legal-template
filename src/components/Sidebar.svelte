<script lang="ts">
	import type { RouteItem } from 'src/app';
	import DockItem from './SidebarItems.svelte';
	import routes from '../docs.json';

	let current = routes.find((item) => item.position === 1);

	$: {
		// NOTE: Given we only have the top-level legal-templates, this is fine for now
		const slug = 'legal-templates';
		if (slug) {
			const item = routes.find((item) => item.path === slug);
			if (item) {
				current = item;
			}
		}
	}
	$: items = (current?.items?.sort((a, b) => a.position - b.position) as RouteItem[]) || [];
</script>

<nav class="side">
	<ul>
		<li>
			{#each items as item}
				<DockItem {item} path={current?.path || ''} />
			{/each}
		</li>
	</ul>
</nav>

<style>
	nav.side {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 0.5rem 1rem;
		width: 300px;
		border-right: 1px solid #eaeaea;
		position: sticky;
		top: 60px;
		align-self: start;
		height: calc(100vh - 5rem);
	}

	nav.side ul {
		list-style-type: none;
		padding-inline-start: 0px;
	}

	nav.side li {
		margin: 1rem 0;
	}

	nav.side.hidden {
		display: none;
	}
</style>
