(function ($) {
  let openTab = function (e) {
    // Get all elements with class="tabcontent" and hide them
    $(".homepage-tabs .tabcontent").hide();

    // Get all elements with class="tablinks" and remove the class "active"
    $(".homepage-tabs .tablinks").removeClass("active");

    let selectedTab = $(e.currentTarget).text();
    $(e.currentTarget).addClass("active");
    $(".homepage-tabs .tab-"+selectedTab).show()
  };

  $(".homepage-tabs .tablinks").click(openTab);
})(jQuery);

