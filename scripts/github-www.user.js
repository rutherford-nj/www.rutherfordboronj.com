// ==UserScript==
// @name         GitHub www checker script
// @version      1.0.0
// @description  GitHub script to check if you are editing the www branch.
// @match        *://github.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==

(function($) {
    $(document).ready(function() {
        var loc = window.location.href;
        if (loc.search('/(blob|tree)\/www/') > -1) {
            var content = $('body');
            content.prepend('<div style="color:red;font-size:5em;text-align:center;">You are editing the WWW branch</div>');
        }
    });
})(jQuery);
