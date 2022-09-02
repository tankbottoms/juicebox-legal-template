<script>
	import { page } from '$app/stores';
	import Document from '$components/Document.svelte';
	import SplitView from '$components/SplitView.svelte';
	import LeftPanel from './LeftPanel.svelte';

	let path;
	let isReadme = false;

	$: {
		path = $page.params.catchall;
		isReadme = path.endsWith('README.md');
	}
</script>

<SplitView rightFullWidth={isReadme} showActions={!isReadme}>
	<div slot="left">
		<LeftPanel {path} />
	</div>
	<div slot="right" let:rightRef>
		{#if path}
			<Document {path} sectionRef={rightRef} showTitle={isReadme} />
		{/if}
	</div>
</SplitView>

<style>
	div[slot='left'] {
		padding: 0rem 2rem;
	}
</style>
