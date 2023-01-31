<script lang="ts">
	import { fly } from 'svelte/transition'
</script>

<div class="page" in:fly={{ x: 50, duration: 150, delay: 300 }} out:fly={{ x: 50, duration: 150 }}>
	<slot />
</div>
