<script lang="ts">
	import IconCaret from '$components/Icons/IconCaret.svelte';

	export let showActions = true;
	export let rightFullWidth = false;
	let rightRef: HTMLElement;

	function toggleRightFullWidth() {
		rightFullWidth = !rightFullWidth;
	}
</script>

<main>
	<section class:collapse={rightFullWidth}>
		<slot name="left" />
	</section>
	{#if showActions}
		<div class="border" on:click={toggleRightFullWidth}>
			<div class="icon">
				<IconCaret transform={rightFullWidth ? 'rotate(270)' : 'rotate(90)'} circle />
			</div>
		</div>
	{/if}
	<section bind:this={rightRef} class:full={rightFullWidth}>
		<slot name="right" {rightRef} />
	</section>
</main>

<style>
	main {
		box-sizing: border-box;
		display: flex;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	section {
		overflow: auto;
		max-height: calc(100vh - 25px);
	}

	section:first-of-type {
		flex: 0 0 45%;
		max-width: 45%;
	}

	section:last-of-type {
		flex: 0 0 calc(55% - 18px);
		max-width: calc(55% - 18px);
		border-left: 1px solid rgba(0, 0, 0, 0.094);
	}

	section.full {
		flex: 0 0 100%;
		max-width: 100%;
	}

	.border {
		display: flex;
		flex: 0 0 18px;
		max-width: 18px;
		align-items: center;
		background-color: var(--background-l1);
	}

	.collapse {
		display: none;
	}

	@media (max-width: 850px) {
		main {
			padding: 40px 20px 80px;
			flex-direction: column;
		}

		section:first-of-type,
		section:last-of-type {
			flex: 0 0 100%;
			max-width: 100%;
			margin-right: 0;
		}

		section:last-of-type {
			border-left: none;
			padding-left: 0;
		}
	}
</style>
