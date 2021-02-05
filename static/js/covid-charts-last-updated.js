(function ($) {

  var possibleElements = $('.covid-charts-last-updated');
  $.each(possibleElements, function (i, elt) {
    elt = $(elt);
    $.get("https://rutherford-nj.github.io/data-committee.covid-data/last_updated")
      .done(function (data) {
        data = $.trim(data);
        elt.text(`The charts were last updated on ${data}.`);
      });
  });

})(jQuery);
