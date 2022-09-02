<script lang="ts">
	export let rightFullWidth = false;
	let rightRef: HTMLElement;
</script>

<main>
	<section class:collapse={rightFullWidth}>
		<slot name="left" />
	</section>
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
		flex: 0 0 55%;
		max-width: 55%;
		border-left: 1px solid rgba(0, 0, 0, 0.094);
	}

	section.full {
		flex: 0 0 100%;
		max-width: 100%;
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
