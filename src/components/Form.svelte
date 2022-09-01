<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Button from './Button.svelte';
	import Input from './Input.svelte';

	export let path;
	export let name;
	let variables;

	async function loadData(path: string) {
		// NOTE: The dynamic import *must* have an extension, otherwise it won't load.
		// Keep this in mind for svx files, i.e. mixed svelte and markdown.
		const pathWithoutExtension = path.replace(/\.[^/.]+$/, '');
		const globs = import.meta.glob('../docs/**/*.json');
		// NOTE: this worked locally await import('..docs/' + pathWithoutExtension + '.md');
		// not below i.e. the string literal, but above, the import.meta.glob - works in production.
		// Looks insane.
		let importedVariables: any;
		try {
			console.log(pathWithoutExtension);
			console.log(globs);
			importedVariables = await globs?.[`../docs/${pathWithoutExtension}.json`]();
			// TODO: add a value key to the importedVariables object.
			variables = writable(importedVariables.default);
		} catch (e) {
			console.info('No variables found for this page.');
		}
	}

	onMount(() => {
		loadData(path);
	});
</script>

{#if variables}
	<div class="variables">
		{#each Object.keys($variables) as key}
			<Input
				{...$variables[key]}
				label={$variables[key].label}
				type={$variables[key].type}
				name={$variables[key].name}
				placeholder={$variables[key].placeholder}
				bind:value={$variables[key].default}
			/>
		{/each}
		<!-- <Button on:click={updateVariables}>Update document</Button> -->
	</div>
{/if}

<style>
	.variables {
		display: flex;
		flex-direction: column;
		margin: 2rem;
	}
</style>
