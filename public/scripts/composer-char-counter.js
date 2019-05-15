$(document).ready(function () {
    //console.log(`testing composer-char-counter.js`);

    // $("textarea").on("keydown keyup keypress input change", function (event) {
    //   console.log(event.type, "textarea value:", $(this).val());
    // });
    $("textarea[name=text]").on('input', function () {
        //console.log($(this).val()); //The this keyword is a reference to the button
        let count = $(this).val().length;
        const tweetMax = 140;
        const errorClass = 'error';
        console.log(count);
        const $counter = $(this).siblings('.counter');
        if (count <= tweetMax) {
            $counter.removeClass(errorClass);
        } else {
            // change value to red when reaches 140 characters
            $counter.addClass(errorClass);
        }
        $counter.html(tweetMax - count);
    });
    // $("article").hover(function () {
    //     //console.log("test hover");
    //     const onHoverClass = 'onHover';
    //     //$(this).css("background-color", "yellow");  //this does work
    //     //$(this).addClass("onHover"); // this is not working
    //     $(this).find("h2").stop().fadeTo('slow',1);
    // }, function () {
    //     //$(this).css("background-color", "lightgray");
    //     $(this).find("h2").stop().fadeTo('slow',1);
    // });

    // $("article").mouseover(function(){
    //     $("article").css("background-color", "yellow");
    //   });
    //   $("article").mouseout(function(){
    //     $("article").css("background-color", "lightgray");
    //   });

    $( "article" ).hover(function() {
        $( this ).fadeOut( 100 );
        $( this ).fadeIn( 500 );
      });

})
