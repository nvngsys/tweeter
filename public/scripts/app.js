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
        let $tweet = {};
        tweets.forEach(item => {
            $tweet = createTweetElement(item);
            //$('.tweet-container').append($tweet);
            $('.tweet-container').prepend($tweet);
        });
    }

    function createTweetElement(tweet) {
        /** get content */
        let hdrTxt = tweet['user']['name'];
        let content = tweet['content']['text'];
        let handle = tweet['user']['handle'];
        let imageSource = tweet['user']['avatars']['small'];
        let unixTime = tweet['created_at'];
        let daysAgo = moment(unixTime).fromNow();

        /** Build HTML for existing tweet dynamically */
        let a = $('<article>').addClass("existing-tweet");
        let hdr = $('<header>');
        let div = $('<div>');
        let footer = $('<footer>');
        let divFoot = $('<div>');
        let img = $('<img>');
        let src = $('<src>');
        img.attr('src', imageSource);
        div.attr('id', 'headerNames');
        img.appendTo(hdr);
        div.appendTo(hdr);
        $('<h2>').text(hdrTxt).appendTo(div);
        $('<span>').addClass("handle").text(handle).appendTo(div);
        hdr.appendTo(a);
        $('<p>').text(content).appendTo(a);

        //orig
        //$('<footer>').text(daysAgo).appendTo(a);
        divFoot.attr('id', 'footerLikes');
        divFoot.appendTo(footer);
        $('<span>').addClass("handle").text(daysAgo).appendTo(footer);
        $('<i>').addClass("fas fa-flag").appendTo(footer);
        $('<i>').addClass("fas fa-retweet").appendTo(footer);
        $('<i>').addClass("fas fa-heart").appendTo(footer);
        footer.appendTo(a);

        return a;
    }
    function loadTweets() {
        $.get("/tweets/", function (data) {
            renderTweets(data);
        });
    }

    loadTweets();

    $("form").submit(function (event) {
        event.preventDefault();
        $('.tweet-container').empty();
        let maxLen = 140;
        let submitTrue = true;
        let $form = $(this);
        let term = $form.find("textarea[name=text]").val();
        let url = $form.attr("action");

        /** perform text validation before sending */
        if (term === null || term === "") {
            submitTrue = false;
            $('#tweetErr').text("Your tweet is empty!");
            $('#tweetErr').removeClass('hide');
        }

        if (term.length > maxLen) {
            submitTrue = false;
            $('#tweetErr').text(`Tweet exceeds ${maxLen} characters!`);
            $('#tweetErr').removeClass('hide');
        }

        if (submitTrue) {
            var posting = $.post(url, { text: term });
            //loadTweets();
            $form.find("textarea[name=text]").val('');
        } else {
            //clear the input field
            $form.find("textarea[name=text]").val('');
        }
        loadTweets();
    });

    $("#nav-bar [type=button]").click(function () {
        $(".new-tweet").slideDown().find("#txt1").focus();
    });

});
