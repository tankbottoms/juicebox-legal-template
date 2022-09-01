<script>
	export let circle = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class="icon icon-tabler icon-tabler-chevrons-up"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	stroke-width="2"
	stroke="white"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...$$props}
>
	{#if circle}
		<ellipse stroke="none" opacity="0.32" cx="12" cy="12" rx="12" ry="12" fill="#808285" />
	{/if}
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<polyline points="7 11 12 6 17 11" />
	<polyline points="7 17 12 12 17 17" />
</svg>
