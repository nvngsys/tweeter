
$(document).ready(function () {

    function renderTweets(tweets) {        
        let $tweet = {};
        tweets.forEach(item => {
            $tweet = createTweetElement(item);
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
        let article = $('<article>').addClass("existing-tweet");
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
        hdr.appendTo(article);
        $('<p>').text(content).appendTo(article);

        $('<span>').addClass("handle").text(daysAgo).appendTo(footer);
        
        divFoot.attr('id', 'footerLikes');
        $('<i>').addClass("fas fa-flag").appendTo(divFoot);
        $('<i>').addClass("fas fa-retweet").appendTo(divFoot);
        $('<i>').addClass("fas fa-heart").appendTo(divFoot);
        divFoot.appendTo(footer);
        
        footer.appendTo(article);

        return article;
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
