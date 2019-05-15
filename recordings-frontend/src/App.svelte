<script>
 import { onMount } from "svelte";
 import Recording from "./Recording.svelte";
 import { API_URL } from "./constants.js";
 
 let recordings = [];

 onMount(async () => {
   const response = await fetch(API_URL + 'recordings');
   recordings = await response.json();
 });
</script>

<style>
 h1 {
   color: purple;
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
