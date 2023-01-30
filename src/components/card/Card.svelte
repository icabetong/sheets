<script lang="ts">
	export let title: string
	export let value: string
</script>

<div class="rounded border px-6 py-4 shadow dark:border-gray-700 dark:bg-gray-700">
	<h6 class="text-sm font-medium text-gray-500">{title}</h6>
	<p class="text-3xl font-semibold">{value}</p>
</div>
