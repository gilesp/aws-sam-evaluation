<script>
 import { onMount } from "svelte";
 import Popup from "./Popup.svelte";
 import { API_URL } from "./constants.js";
 
 export let name;
 export let date;
 export let url;

 const recordingDate = new Date(date);

 const strippedName = name.substring(11);
 let transcription = {};
 
 onMount(async () => {
   const response = await fetch(API_URL + `recordings/` + strippedName + `/transcription`);
   transcription = await response.json();
 });
 
</script>

<style>
 .recording {
   width: 300px;
   border: 1px solid #aaa;
   border-radius: 2px;
   box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
   padding: 1em;
   margin-bottom: 1em;
 }

 h2 {
   padding: 0 0 0.2em 0;
   margin: 0 0 1em 0;
   border-bottom: 1px solid #ff3e00
 }

 audio, .date, .transcription {
   margin: 0 0 0.5em 0;
   line-height: 1.2;
   width: 100%;
 }

 .date, .transcription {
   padding: 0 0 0 1.5em;
   background:  0 0 no-repeat;
   background-size: 20px 20px;
 }

 .date {
   background-image: url(images/calendar.svg);
 }

 .transcription {
   background-image: url(images/file-text.svg);
 }
 
</style>

<article class="recording" >
  <h2>{strippedName}</h2>
  <audio controls src={url}>
    Your browser does not support the <code>audio</code> element.
  </audio>
  <div class="transcription" >
    {#if transcription.statusCode === 200}
    <Popup title="Transcription" message={transcription.transcription} label="Transcription" />
    {/if}
  </div>
  <div class="date">
    {recordingDate.toLocaleString()}
  </div>
</article>
