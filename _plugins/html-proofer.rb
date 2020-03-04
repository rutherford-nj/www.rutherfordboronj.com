require "html-proofer"

Jekyll::Hooks.register :site, :post_write do |site|
  HTMLProofer.check_directory(site.config["destination"], opts = {
    :check_favicon => true,
    :check_html => true,
    :disable_external => true,
    :only_4xx => true,
    :alt_ignore => [
      "/static/images/megaphone.png",
      "borough-hall-govt.jpg",
      "mayor-and-council-2020.jpg",
      "photo-gallery.png",
      "resident-information.jpg",
    ],
  }).run
end
