<script>
	import Form from './Form.svelte';

	export let path = '';
</script>

<main>
	<h1>Edit document</h1>
	<Form {path} />
</main>

<style>
	main {
		max-width: 950px;
		margin: 0 auto;
	}
</style>
