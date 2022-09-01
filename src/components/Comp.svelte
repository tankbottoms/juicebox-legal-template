<script>
	export let render;

    export let unique = 0;

    $: console.log(unique)
</script>

{#key unique}
	<svelte:component this={render} />
{/key}
