<script lang="ts">
	let rightRef: HTMLElement;
</script>

<main>
	<section>
		<slot name="left" />
	</section>
	<section bind:this={rightRef}>
		<slot name="right" {rightRef} />
	</section>
</main>

<style>
	main {
		box-sizing: border-box;
		margin-bottom: 40px;
		display: flex;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	section {
		margin-top: 2rem;
		overflow: auto;
	}

	section:first-of-type {
		flex: 0 0 50%;
		max-width: 50%;
	}

	section:last-of-type {
		flex: 0 0 50%;
		max-width: 50%;
		border-left: 1px solid rgba(0, 0, 0, 0.094);
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
