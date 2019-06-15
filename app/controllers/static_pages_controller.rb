 class StaticPagesController < ApplicationController
   include ApplicationHelper

   def coming_soon
     @title = "Searchness: usability testing software"
     render layout: "static_pages"
   end
 end
