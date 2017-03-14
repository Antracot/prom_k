 /* 
  * Simple tabs plugin for jQuery
  *
  * @author Karelin Yuriy aka Guro
  * @modified 31.05.2012
  * @since 1.0
  */  
 
(function($) {

  $.fn.gtabs = function(params){
    var params = jQuery.extend({
        tabBut: "ul li a",
        targetAttr: "href",
        tabEl:  "div.tab",
        activeClass: "active"
        }, params);
    var el = this;
    var have_aClass;
    $(params.tabBut).not(':first').removeClass(params.activeClass);
    $(params.tabBut).first().addClass(params.activeClass);
    $(params.tabEl).not(':first').hide();
    $(params.tabEl).first().show();
    $(params.tabBut).bind({
      click: function(){
        $(params.tabBut).not(this).removeClass(params.activeClass);
        $(this).addClass(params.activeClass);
        have_aClass = true;
        $(params.tabEl).not($(this).attr(params.targetAttr)).hide();
        $($(this).attr(params.targetAttr)).show();
        return false;
      },
      mouseover: function(){
        have_aClass = $(this).hasClass(params.activeClass);
        $(this).addClass(params.activeClass);
      },
      mouseout: function(){
        if ( !have_aClass ){
          $(this).removeClass(params.activeClass);
        }
      }
    }); 
  }

})(jQuery);