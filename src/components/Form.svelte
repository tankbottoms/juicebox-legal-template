<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import { variables, documentRef } from '$stores';

	export let path;
	export let name;
	let localVariables;

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
			importedVariables = await globs?.[`../docs/${pathWithoutExtension}.json`]();
			// TODO: add a value key to the importedVariables object.
			localVariables = writable(importedVariables.default);
		} catch (e) {
			console.info('No variables found for this page.');
		}
	}

	async function updateVariables() {
		$localVariables.forEach((variable: any) => {
			if (variable.default) {
				$documentRef.innerHTML = $documentRef.innerHTML.replace(
					new RegExp(`\\[${variable.name}\\]`, 'g'),
					variable.default
				);
			}
		});
	}

	function save() {
		const divContents = $documentRef.innerHTML;
		const prnt = window.open('', '', 'height=500, width=500');
		const styles = `<head><link rel="stylesheet" href="/global.css" /><link rel="stylesheet" href="/print.css" /><head>`;
		prnt.document.write(`${styles}${divContents}`);
		prnt.document.close();
		prnt.print();
	}

	onMount(() => {
		loadData(path);
	});
</script>

{#if $localVariables}
	<div class="variables">
		{#each Object.keys($localVariables) as key}
			<Input
				{...$localVariables[key]}
				label={$localVariables[key].label}
				type={$localVariables[key].type}
				name={$localVariables[key].name}
				placeholder={$localVariables[key].placeholder}
				bind:value={$localVariables[key].default}
			/>
		{/each}
		<div class="buttons">
			<Button type="secondary" on:click={updateVariables}>Preview</Button>
			<Button type="primary" on:click={save}>Save as PDF</Button>
		</div>
	</div>
{/if}

<style>
	.variables {
		display: flex;
		flex-direction: column;
		margin: 2rem;
	}
</style>
