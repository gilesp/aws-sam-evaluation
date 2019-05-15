<script>
 export let title = 'Alert!';
 export let message = 'Your message goes here';
 export let label = 'Click Me';

 function guidGenerator() {
   var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
   };
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
 }

 const popupId = guidGenerator();
</script>

<style>
 .overlay {
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(0, 0, 0, 0.7);
   transition: opacity 500ms;
   visibility: hidden;
   opacity: 0;
 }

 .overlay:target {
   visibility: visible;
   opacity: 1;
 }

 .popup {
   margin: 70px auto;
   padding: 20px;
   background: #fff;
   border-radius: 5px;
   width: 50%;
   position: relative;
   transition: all 5s ease-in-out;
 }

 .popup h2 {
   margin-top: 0;
   color: #333;
   font-family: Tahoma, Arial, sans-serif;
 }

 .popup .close {
   position: absolute;
   top: 20px;
   right: 30px;
   transition: all 200ms;
   font-size: 30px;
   font-weight: bold;
   text-decoration: none;
   color: #333;
 }
 .popup .close:hover {
   color: #06D85F;
 }
 .popup .content {
   max-height: 30%;
   overflow: auto;
 }
</style>

<a class="button" href="#{popupId}">{label}</a>

<div id={popupId} class="overlay">
  <div class="popup" >
    <h2>{title}</h2>
    <a class="close" href="#">&times;</a>
    <div class="content" >
      {message}
    </div>
  </div>
</div>
