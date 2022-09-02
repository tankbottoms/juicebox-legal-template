<script lang="ts">
	import Header from '$components/Header.svelte';
	import LeftSidebar from '$components/Sidebar.svelte';
</script>

<Header />
<div class="row">
	<LeftSidebar />
	<slot />
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
	}
</style>
