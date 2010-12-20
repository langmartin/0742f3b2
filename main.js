/*
 * Depends on jquery, for now.
 */

(function () {
   /*
    * Install myself, and execute anything that was already there.
    */
   var windowOnload = window.onload;
   function onload () {
     if (windowOnload) windowOnload();
     main();
   }
   window.onload = onload;

   //## parser.js ##//

   function mui (source) {
     var tick = 1;
     while (tick) {
       
       
     }
     eval(source);
   }

   /*
    * It would be better to avoid the same domain restriction.
    */
   function main () {
     $("script[type=text/mui]").each(
       function () {
         var src;
         if ((src = $(this).attr("src"))) {
           $.get(src, "", mui, "text/plain");
         }
         mui($(this).text());
       });
   }
 })();
