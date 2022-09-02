<script lang="ts" context="module">
	import { component, documentRef, metadata } from '$stores';

	export async function setCurrentDocumentFromPath(path: string) {
		if (path) {
			const pathWithoutExtension = path.replace(/\.[^/.]+$/, '');
			const globs = import.meta.glob('../docs/**/*.{md,svx}');

			let imported: any;
			component.set(null);
			try {
				imported = await globs?.[`../docs/${pathWithoutExtension}.md`]();
				metadata.set(imported.metadata || {});
				component.set(imported.default);
			} catch (e) {
				console.info('No markdown file found for ' + pathWithoutExtension);
			}
		}
	}
</script>

<script lang="ts">
	import IconCaret from './Icons/IconCaret.svelte';
	import IconDoubleCaret from './Icons/IconDoubleCaret.svelte';
	import './document.css';

	export let path: string;
	export let showTitle = false;
	export let sectionRef: HTMLElement;
	let innerHeight: number;

	function scrollDown() {
		sectionRef.scrollTop += innerHeight - 100;
	}

	function scrollUp() {
		sectionRef.scrollTop -= innerHeight - 100;
	}

	function scrollToBottom() {
		sectionRef.scrollTop = sectionRef.scrollHeight;
	}

	function scrollToTop() {
		sectionRef.scrollTop = 0;
	}

	$: {
		setCurrentDocumentFromPath(path);
	}
</script>

<svelte:window bind:innerHeight />

{#if showTitle}
	{#if $metadata?.title}
		<h1 class="title">{$metadata?.title}</h1>
	{/if}
{:else}
	<h1>Preview</h1>
{/if}
<article bind:this={$documentRef}>
	<div id="content">
		{#if $component}
			<svelte:component this={$component} />
		{/if}
	</div>
</article>
{#if $component && sectionRef?.scrollHeight > innerHeight}
	<footer>
		{#if sectionRef?.scrollTop > 100}
			<span on:click={scrollToTop}>
				<IconDoubleCaret circle width="17" height="17" />
			</span>
			<span on:click={scrollUp}>
				<IconCaret circle transform="rotate(180)" />
			</span>
		{/if}
		<span on:click={scrollDown}>
			<IconCaret circle />
		</span>
		<span on:click={scrollToBottom}>
			<IconDoubleCaret circle width="17" height="17" transform="rotate(180)" />
		</span>
	</footer>
{/if}

<style>
	article {
		position: relative;
	}

	h1 {
		padding: 0rem 2rem;
	}
	footer {
		position: sticky;
		bottom: 0;
		display: flex;
		justify-content: center;
		padding: 0.7rem;
		background-color: var(--background-l1);
	}

	footer span {
		margin: 0 0.5rem;
	}

	#content {
		max-width: 850px;
		padding: 0rem 2rem;
		word-break: break-word;
		margin: 0 auto;
	}
</style>
