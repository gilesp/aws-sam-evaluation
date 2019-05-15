<script>
 export let name;
 export let date;
 export let url;

 const recordingDate = new Date(date);
</script>

<style>
 .recording {
   width: 300px;
   border: 1px solid #aaa;
   border-radius: 2px;
   box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
   padding: 1em;
 }

 h2 {
   padding: 0 0 0.2em 0;
   margin: 0 0 1em 0;
   border-bottom: 1px solid #ff3e00
 }

 audio, .date {
   margin: 0 0 0.5em 0;
   line-height: 1.2;
 }
</style>

<article class="recording" >
  <h2>{name.substring(11)}</h2>
  <audio controls src={url}>
    Your browser does not support the <code>audio</code> element.
  </audio>
  <div class="date">
    {recordingDate.toLocaleString()}
  </div>
</article>
