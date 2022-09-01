<script>
	import Document from '$components/Document.svelte';
	import SplitView from '$components/SplitView.svelte';
	import LeftPanel from './LeftPanel.svelte';
</script>

<SplitView>
	<div slot="left">
		<LeftPanel />
	</div>
	<div slot="right" let:rightRef>
		<h1>Preview</h1>
		<Document path="/legal-templates/llcs/op-llc-series.md" sectionRef={rightRef} />
	</div>
</SplitView>

<style>
	div[slot='left'] {
		padding: 0rem 2rem;
	}

	div[slot='right'] h1 {
		padding: 0rem 2rem;
	}

	h1 {
		color: var(--text-header);
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 14px;
	}
</style>
