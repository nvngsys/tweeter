// console.log(`testing composer-char-counter.js`);

$(document).ready(function () {
    console.log(`testing composer-char-counter.js`);


    $("textarea[name=text]").on('keydown', function () {
        //console.log($(this).val()); //The this keyword is a reference to the button
        let count = $(this).val().length;
        console.log(count);
        if (count <= 5) {
            $(".counter").html(140 - count);
        } else {
            // make the value red
            $('.counter').css('color', 'red');
        }
    });

})
