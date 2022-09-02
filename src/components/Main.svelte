<script>
	import { page } from '$app/stores';
	import Document from '$components/Document.svelte';
	import SplitView from '$components/SplitView.svelte';
	import LeftPanel from './LeftPanel.svelte';

	let path;

	$: {
		path = $page.params.catchall;
	}
</script>

<SplitView>
	<div slot="left">
		<LeftPanel {path} />
	</div>
	<div slot="right" let:rightRef>
		<h1>Preview</h1>
		{#if path}
			<Document {path} sectionRef={rightRef} />
		{/if}
	</div>
</SplitView>

<style>
	div[slot='left'] {
		padding: 0rem 2rem;
	}

	div[slot='right'] h1 {
		padding: 0rem 2rem;
	}
</style>
