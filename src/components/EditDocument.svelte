<script>
	import Document from './Document.svelte';
	import SplitView from '$components/SplitView.svelte';
</script>

<SplitView>
	<div slot="left">
		<h1>Legal documents</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</div>
	<div slot="right" let:rightRef let:dog>
		<h1>Preview</h1>
		<Document path="/legal-templates/llcs/op-llc-series.md" sectionRef={rightRef} {dog} />
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
