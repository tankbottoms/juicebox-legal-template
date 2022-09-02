<script lang="ts">
	import type { Leaf, RouteItem } from 'src/app';
	import { page } from '$app/stores';

	export let item: RouteItem | Leaf;
	export let path: string;

	function getPresentable(str: string) {
		return str
			.replace(/\.[^.]+$/, '')
			.replaceAll('-', ' ')
			.replace(/^\w/, (c) => c.toUpperCase());
	}

	const isCurrent = () => `${$page.params.catchall}` === `${path}/${item.leaf}`;

	const children = [...(item.items || []), ...(item.leaves || [])].sort(
		(a, b) => Number(a.position) - Number(b.position)
	);
</script>

{#if item.leaf === 'README.md' || item.leaf?.endsWith('.info.md')}
	<!-- do nothing -->
{:else if item.leaf}
	<a class="leaf" href="/{path}/{item.leaf}" class:active={isCurrent()} on:click|stopPropagation
		>{item.label ? item.label : getPresentable(item.leaf)}</a
	>
{:else}
	<details open={$page.params.catchall?.includes(item.path)}>
		<summary class:active={$page.params.catchall?.includes(item.path)}>
			{#if item.hasRootDoc}
				<a href="/{path}/{item.path}/README.md" on:click|stopPropagation>{item.label}</a>
			{:else}
				<div on:click|stopPropagation>{item.label}</div>
			{/if}
			<span class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					transform="rotate(270)"
				>
					<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" fill="#979798" />
					<path d="M0-.75h24v24H0z" fill="none" />
				</svg>
			</span>
		</summary>
		{#each children as child}
			<svelte:self item={child} path="{path}/{item.path}" />
		{/each}
	</details>
{/if}

<style>
	details {
		user-select: none;
		display: flex;
		margin-bottom: 1rem;
	}

	details > summary span.icon {
		width: 24px;
		height: 24px;
		transition: all 0.3s;
		margin-left: auto;
		color: white;
	}

	details[open] > summary span.icon {
		transform: rotate(90deg);
	}

	:global(details details) {
		margin-left: 1rem;
		margin-bottom: 0 !important;
	}

	summary {
		display: flex;
		cursor: pointer;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary > a {
		width: 100%;
		padding: 5px;
	}

	a {
		text-decoration: none;
	}

	a.leaf {
		margin-left: 1rem;
		padding: 5px;
	}

	.active {
		font-weight: 700;
		color: var(--text-header);
	}
	a.active,
	a:hover {
		background-color: var(--background-l1);
		border-radius: 5px;
	}
</style>
