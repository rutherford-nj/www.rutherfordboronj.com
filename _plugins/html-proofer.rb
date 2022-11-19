require "html-proofer"

Jekyll::Hooks.register :site, :post_write do |site|
  HTMLProofer.check_directory(site.config["destination"], opts = {
    :check_favicon => true,
    :check_html => true,
    :disable_external => true,
    :enforce_https => false,
    :only_4xx => true,
    :file_ignore => [/.*tmpl.*/],
  }).run
end
