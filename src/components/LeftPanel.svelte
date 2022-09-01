<script>
	import { Tab, Tabs } from './Tabs';
	import TabList from './Tabs/TabList.svelte';
	import TabPanel from './Tabs/TabPanel.svelte';
	import Form from './Form.svelte';

	export let tabs = [];
	export let setCurrent;
</script>

<main>
	<h1>Legal documents</h1>
	<Tabs>
		<TabList>
			{#each tabs as tab}
				<Tab id={tab.path} onClick={() => setCurrent(tab)}>{tab.label}</Tab>
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
