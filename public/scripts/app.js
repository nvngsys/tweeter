/* -------------------------------
 * Develeper: Jack Brennan
 * Created: May 15, 2019
 * Purpose: 
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    function renderTweets(tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        let $tweet = {};
        tweets.forEach(item => {
            //console.log(item); // for each element/object in array pass to createTweetElement()
            $tweet = createTweetElement(item);
            $('.tweet-container').append($tweet);
        });
    }

    function createTweetElement(tweet) {

        let hdrTxt = tweet['user']['name'];
        let content = tweet['content']['text'];
        let daysAgo = tweet['created_at'];
        let handle = tweet['user']['handle'];
        let imageSource = tweet['user']['avatars']['small'];
        // ADD THE OTHER IMAGES AT FONTAWESOME - UPDATE APPEND TO ADD TO FOOTER
        // YOU MAY NEED TO ADD TWO ELEMENTS TO FOOTER TO DISPLAY TIME ON LEFT
        // AND FLAGS ETC ON RIGHT
        //let imageFlag = '<i class="fas fa-flag"></i>;

        //console.log(imageSource);
        // let tweets = $('<article>').addClass('tweet');
        // let test = $('<header>');

        let a = $('<article>').addClass("existing-tweet");
        let hdr = $('<header>');
        let div = $('<div>');
        div.attr('id', 'headerNames');
        let img = $('<img>');
        let src = $('<src>');
        // let footer = $('<footer>');
        //build header

        //$('<img src="/images/bird.png">').appendTo(hdr);  //worked
        //$('`<img src=${imageSource}>`').appendTo(hdr);   // trying to add source from data
        //$('.existing-tweet img').attr('src', imageSource);
        img.attr('src', imageSource);
        img.appendTo(hdr);
        div.appendTo(hdr);
        $('<h2>').text(hdrTxt).appendTo(div);
        // <span> class="handle">user address</span>  adding May 16
        $('<span>').addClass("handle").text(handle).appendTo(div);
        //
        hdr.appendTo(a);
        $('<p>').text(content).appendTo(a);
        $('<footer>').text(daysAgo).appendTo(a);


        console.log(a);
        return a;
    }
    function loadTweets() {
        $.get("/tweets/", function (data) {
            //alert( "Load was performed." );
            renderTweets(data);
        });
    }

    loadTweets();

    //DevNote - using form as it higher up than the input and then catches all other elements that might be submittted
    // originally used .click but .submit is more encompassing
    $("form").submit(function (event) {
        event.preventDefault();
        $('.tweet-container').empty();
        //alert("Testing - Handler click for .click() called...");
        /** send data to server below - these three values are required */
        let maxLen = 140;
        let submitTrue = true;
        let $form = $(this);
        let term = $form.find("textarea[name=text]").val();
        let url = $form.attr("action");

        /** perform text validation before sending */
        if (term === null || term === "") {
            //alert(`Tweet cannot be empty`);
            // move this to the element and call .unhide
            submitTrue = false;
            $('#tweetErr').text("Your tweet is empty!");
            $('#tweetErr').removeClass('hide');
        }

        if (term.length > maxLen) {
            //alert(`Tweet cannot be more than 140 characters`);
            submitTrue = false;
            console.log(`length error`)
            $('#tweetErr').text(`Tweet exceeds ${maxLen} characters!`);
            $('#tweetErr').removeClass('hide');
        }

        // console.log(term);
        // console.log(url);
        if (submitTrue) {
            var posting = $.post(url, { text: term });
            loadTweets();
            $form.find("textarea[name=text]").val('');
        } else {
            //clear the input field
            $form.find("textarea[name=text]").val('');
        }

    });

    $("#nav-bar [type=button]").click(function () {
        //alert("nav bar button click.");
        $(".new-tweet").slideDown().find("#txt1").focus();
    });

});
