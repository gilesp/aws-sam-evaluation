<script>
 import { onMount } from "svelte";
 import Recording from "./Recording.svelte";
 
 let recordings = [];

 onMount(async () => {
   const response = await fetch(`http://localhost:3000/listRecordings`);
   recordings = await response.json();
 });
</script>

<style>
	h1 {
		color: purple;
	}

 Recording {
   margin-bottom: 5px;
 }
</style>

<h1>Recordings</h1>

<div class="recordings">
  {#each recordings as recording}
  <Recording name={recording.name} date={recording.modified} url={recording.url} />
  {:else}
  <p>loading...</p>
  {/each}
</div>
