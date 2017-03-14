
		var Main = Main || {};
		Main.cachedWidth  = jQuery(window).width();

		jQuery(window).load(function() {
			Main.gallery = new Gallery();
		}).resize(function() {
			Main.gallery.update();
		});

		function Gallery(){
			var container = jQuery('.flexslider'),
				clone = container.clone( false ),
				width = jQuery(window).width();

			this.init = function ( width ){
				console.log(width)
				if( width >= 1024 ){
					container.find('.slides').kwicks({
						max : 500,
						spacing : 0
					});
				} else {
					container.flexslider();
				}
			}
			this.update = function () {
				var width = jQuery(window).width();
				if((Main.cachedWidth >= 1024 && width <=1023) || (Main.cachedWidth <= 1023 && width >= 1024) ) {
					Main.cachedWidth = width;
					container.replaceWith( clone );
					container = clone;
					clone = container.clone(false);
					this.init( width );	
				}
			}
			this.init( width );
		}
