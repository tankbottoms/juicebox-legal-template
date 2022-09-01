<script>
	import { onMount } from 'svelte';

	import Document from '$components/Document.svelte';
	import SplitView from '$components/SplitView.svelte';
	import LeftPanel from './LeftPanel.svelte';

	import workflows from '../config.json';
	import docs from '../docs.json';

	let documents = [];

	function getWorkflowData(workflow) {
		const paths = workflows[workflow];
		let pathData = [];
		for (const path of paths) {
			const parts = path.split('/');
			// Get first part
			const category = parts[0];
			let current = docs.find((cat) => cat.path === category);

			for (const part of parts.slice(1)) {
				const itemCurrent = current.items.find((doc) => doc.path === part);
				if (!itemCurrent) {
					const leaf = current.leaves.find((doc) => doc.leaf === part);
					if (leaf) {
						pathData = [...pathData, { ...leaf, path }];
						continue;
					}
				}
				current = itemCurrent;
			}
		}
		documents = pathData;
	}

	onMount(() => {
		getWorkflowData('exampleWorkflow');
	});
</script>

<SplitView>
	<div slot="left">
		<LeftPanel tabs={documents} />
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
