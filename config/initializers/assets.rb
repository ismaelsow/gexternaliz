# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
#
custom_fonts = ["museo-sans-100.woff2","museo-sans-300.woff2", "museo-sans-700.woff2"]
custom_css = ["core.css.scss", "static_pages.css"]

Rails.application.config.assets.precompile += custom_fonts
Rails.application.config.assets.precompile += custom_css
