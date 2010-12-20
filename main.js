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
   //## evaluator.js ##//

   var primitive = makePrimitiveEnvironment();

   function main2 (source) {
     source = parser(source);
     evaluate(source, primitive);
   }

   /*
    * It would be better to avoid the same domain restriction.
    */
   function main () {
     $("script[type=text/cadence]").each(
       function () {
         var src;
         if ((src = $(this).attr("src"))) {
           $.get(src, "", cadence, "text/plain");
         }
         cadence($(this).text());
       });
   }
 })();
