// ==UserScript==
// @name         GitHub www checker script
// @version      1.0.0
// @description  GitHub script to check if you are editing the www branch.
// @match        *://github.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function($) {
    var checkLoc = function() {
        var loc = window.location.href;
        if (loc.search('(blob|tree)\/www') > -1) {
            var content = $('#www-github-warning');
            content.empty();
            content.prepend('<div>You are editing the WWW branch</div>');
        }
    };
    $(document).ready(function() {
        var content = $('body');
        content.prepend('<div style="color:red;font-size:5em;text-align:center;" id="www-github-warning"></div>');
        checkLoc();
        window.setInterval(checkLoc, 1000);
    });
})(jQuery);
