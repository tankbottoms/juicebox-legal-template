<script>
	import { Tab, Tabs } from './Tabs';
	import TabList from './Tabs/TabList.svelte';
	import TabPanel from './Tabs/TabPanel.svelte';

	import workflows from '../config.json';
	import docs from '../docs.json';
	import { onMount } from 'svelte';
	import Form from './Form.svelte';

	let tabs = [];

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
		tabs = pathData;
	}

	onMount(() => {
		getWorkflowData('exampleWorkflow');
	});
</script>

<main>
	<h1>Legal documents</h1>
	<Tabs>
		<TabList>
			{#each tabs as tab}
				<Tab id={tab.path}>{tab.label}</Tab>
			{/each}
		</TabList>
		{#each tabs as tab}
			<TabPanel id={tab.path}>
				<Form path={tab.path} name={tab.leaf} />
			</TabPanel>
		{/each}
	</Tabs>
</main>

<style>
	main {
		max-width: 950px;
		margin: 0 auto;
	}
</style>
