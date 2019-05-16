$(document).ready(function () {
    //console.log(`testing composer-char-counter.js`);

    $("textarea[name=text]").on('input', function () {
        //console.log($(this).val()); //The this keyword is a reference to the button
        let count = $(this).val().length;
        const tweetMax = 140;
        const errorClass = 'error';
        //console.log(count);
        const $counter = $(this).siblings('.counter');
        if (count <= tweetMax) {
            $counter.removeClass(errorClass);
        } else {
            // change value to red when reaches 140 characters
            $counter.addClass(errorClass);
        }
        $counter.html(tweetMax - count);
    });
    
})
