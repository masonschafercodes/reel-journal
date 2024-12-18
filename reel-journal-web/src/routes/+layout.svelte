<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import '../app.css';
	let { children } = $props();
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</nav>
	</svelte:fragment>
	{@render children()}
</AppShell>
