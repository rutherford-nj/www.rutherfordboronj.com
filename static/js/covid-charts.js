(function ($) {

  $.each($('.covid-charts-last-updated'), function (i, elt) {
    elt = $(elt);
    $.get("https://rutherford-nj.github.io/data-committee.covid-data/last_updated")
      .done(function (data) {
        data = $.trim(data);
        elt.text(`The charts were last updated on ${data}.`);
      });
  });

  $.each($('#rutherford-covid-data-table'), function (i, elt) {
    elt = $(elt)
    $.get("https://rutherford-nj.github.io/data-committee.covid-data/cases_Rutherford_14d_SMA.html")
      .done(function (data) {
        elt.append($(data));
      });
  });

})(jQuery);
