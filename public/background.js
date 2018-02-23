
$(document).ready(function() {
    console.log("setevents")
    console.log($('.header-image'))
   $('.header-image').mouseenter(function() {
       console.log('mouseentered')
       $(this).animate({
           height:'+=150px'
       });
   });
   $('.header-image').mouseleave(function() {
       console.log('mouseleft')
       $(this).animate({
          height:"-=150px"
       });
   });
})





$( document ).ready(function() {
     //custom button for homepage
     $( ".share-btn" ).click(function(e) {
          $('.networks-5').not($(this).next( ".networks-5" )).each(function(){
             $(this).removeClass("active");
         });
         $(this).next( ".networks-5" ).toggleClass( "active" );
    });
});
