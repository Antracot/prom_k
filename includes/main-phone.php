<div class="main-phone" id="main-phone" style="float: right; height: 43px; margin: 3px 35px 0px 0px; position: relative; width: 400px;">
	<div class="head_mail" id="head_mail01">
 <span style="font-family: Georgia; font-size: 21px;"><b>+7&nbsp;(495)&nbsp;223-92-42</b></span>&nbsp;
	</div>
	<div class="head_mail">
 <br>
	</div>
	<div class="head_mail" id="head_mail02">
 <a title="Написать письмо" href="mailto:mail@prom-kotel.ru"><span style="font-size: 21px;">mail<span class="grey">@</span>prom-kotel.ru</span></a>
	</div>
	<div style="float: right; height: 43px; margin: 3px 5px 0px 0px; position: relative; width:310px;" class="main-phone" id="head_mail03">
		<div class="working-hours">
			 c 9<span class="minutes"><sup>00</sup></span> до 18<span class="minutes"><sup>00</sup></span>
		</div>
 <span class="workday"></span><span class="workday"></span><span class="workday"></span><span class="workday"></span><span class="workday"></span><span class="weekend"></span><span class="weekend"></span>
	</div>
</div>
 <br>

 <script>
 	$(document).ready(function() {
	var viewportWidth = $(window).width();

	if(viewportWidth<600){

		// PHONE NUMBER
		$('.container').css('width', viewportWidth);
		$('#fisrt_main-phone').css('margin', '0').css('width', viewportWidth+5);
		$('#main-phone').css('float', 'none').css('width', viewportWidth).css('margin', '0px auto');
		console.log('Mobile device, screen - '+viewportWidth);

		// CENTERING LOGO
		var logoWidth = $('#top_logo').outerWidth(); console.log(logoWidth);
		var logoContWidth = $('.logo').outerWidth(); console.log(logoContWidth);
		$('#top_logo').css('margin-left', (logoContWidth-logoWidth)/2); 

		$('.main-header').css('width', viewportWidth);

		$('.banner-rotator').css('width', viewportWidth).css('height', viewportWidth*33/100);

		$('.work-area-border').css('width', viewportWidth-10);
		$('.work_area').find('.indexdata').children('p').children('span').css('font-size', '14px');
		$('.work_area').find('.indexdata').children('p').children('b').children('span').css('font-size', '14px');

		$('.work_area').find('.indexdata').children('p').children('img').css('width', viewportWidth-50).css('height', 'auto');
		$('.work_area').find('.indexdata').children('img').css('width', viewportWidth-50).css('height', 'auto');



		$('.copyright').css('width', viewportWidth);

		$('#lightbox-image').css('width', viewportWidth*6.25/100);
		console.log('afdasdfsdfdsf'+viewportWidth*6.25/100);

		$('.menu_item_list').each(function(index, element){
    		$(element).find('div').first().hide();
    		$(element).find('div').last().children().children().children().css('background-color', 'blue').css('display', 'inline-block').css('width', '35%').css('margin-left','15%').children().css('float', 'left');
    		// $(element).find('div').last().css('display', 'none').css('background-color', 'green').children().children();

			var elemWidthSubMobMenu = $(element).find('div').last().outerWidth();
			// console.log(elemWidthSubMobMenu);
			$(element).find('div').last().css('margin-left', (viewportWidth-elemWidthSubMobMenu)/2);
    	});
    	
    	//FUNC detect url and 
		$('.menu_item').on("click", function(){
  			$('.nav_button').trigger("click");
  		});

  		var urlMain = window.location.href;
  		var arr = urlMain.split("/");
  		var urlNow = arr[0] + "//" + arr[2] + '/'
  		if(urlMain != urlNow){
  			$('.banner').css('display', 'none');
  			$('.work_area .info, .after-text .info').css('float', 'left').css('width', viewportWidth*70/100).css('margin-left', 0);
  		}

  		// SET ALL TABLES
  		var urlPageBoiler = arr[4];
  		var urlPageBoilerName = 'spare_boilers';
  		// console.log(urlPage);
  			console.log('fuck, I AM DEAD!!!');
			$('#kotelTableAll').css('margin-left', (viewportWidth-200)/2-5);
			$('#kotelTableAll').children().children().css('display', 'block').children().css('display', 'block').children('p').css('width', '160px');
			// $('#kotelTableAll').children().children().children().children('span').css('background-color', 'yellowgreen').css('width', '160px').css('margin-left', '10%');

			$('#teploobmennikiAllItems').css('margin-left', 0);
			$('#teploobmennikiAllItems').children().children().css('display', 'block').css('text-align', 'center').children().css('display', 'block');

		//TABLE ZAYAVKA NA PODBOR KOTELNOGO KOTLA
		$('.work_area').find('.indexdata').children('.calc_container').find('.calc3').children('table').children().children().children('td').css('display', 'block');	
  	
  		//set img in block links to esko
  		$('.left-block').children('a').children('img').css('width', viewportWidth);
  		$('.left-block').children('img').css('width', viewportWidth);
  		$('.rent_banner').css('margin-left', (viewportWidth-340)/2);
  		$('.rent_banner1').css('margin-left', (viewportWidth-340)/2);

  		$('#lightbox-image').css('display', 'none');

  		//KOTLY TITLES
  		// $('#kotelTableAll').children().children().children().children('a').first().css('margin-left', '7%');
  		// $('#kotelTableAll').children().children().children().children('p').children('a').children('span').css('margin-left', '15%');

  		$('#gallery ul img').on('click', function(){
		    setTimeout(function() {
		        $('#lightbox-image').css('width', viewportWidth).css('float', 'left').css('margin-left', '-10px');
		        $('#lightbox-container-image-box').css('background-color', 'transparent').css('height', $('#lightbox-image').outerHeight());
		        $('#lightbox-nav-btnPrev').css('display', 'none');
		        $('#lightbox-nav-btnNext').css('display', 'none');

		    }, 500);

  		});

		$('#gallery .item a img').css('width', viewportWidth-50);

  		$('#gallery .item a img').on('click', function(){
		    setTimeout(function() {
		        $('#lightbox-image').css('width', viewportWidth).css('float', 'left').css('margin-left', '-10px');
		        $('#lightbox-container-image-box').css('background-color', 'transparent').css('height', $('#lightbox-image').outerHeight());
		        $('#lightbox-nav-btnPrev').css('display', 'none');
		        $('#lightbox-nav-btnNext').css('display', 'none');

		    }, 500);

  		});

  		$('.slider .item a img').on('click', function(){
		    setTimeout(function() {
		        $('#lightbox-image').css('width', viewportWidth).css('float', 'left').css('margin-left', '-10px');
		        $('#lightbox-container-image-box').css('background-color', 'transparent').css('height', $('#lightbox-image').outerHeight());
		        $('#lightbox-nav-btnPrev').css('display', 'none');
		        $('#lightbox-nav-btnNext').css('display', 'none');

		    }, 500);

  		});
  		

  		$('.container1 .iosSlider').on('click', function(){
  			console.log('please, click me');
		    // setTimeout(function() {
		    //     $('#lightbox-image').css('width', viewportWidth).css('float', 'left').css('margin-left', '-10px');
		    //     $('#lightbox-container-image-box').css('background-color', 'transparent').css('height', $('#lightbox-image').outerHeight());
		    //     $('#lightbox-nav-btnPrev').css('display', 'none');
		    //     $('#lightbox-nav-btnNext').css('display', 'none');

		    // }, 500);

  		});

  		$(".iosSlider").each( function( index, element) {
			$(element).children().children().children().children('img').css('width', viewportWidth-50);		
		});

		// MAP SETTING
  		$('.ymap').children().children().children().css('width', viewportWidth-40);
	 

	    $('.calc_row').children('input').css('width', viewportWidth-65);
	    $('.calc3').children('.calc_row').children('em').css('display', 'block');


  		// $('#jquery-lightbox').on('click', function(){
	   //  	console.log('click nav');
  		// });

  	// 	$('#lightbox-nav-btnNext').on('click', function(){
			// console.log('click right');  		
  	// 	});

	 //   	setTimeout(function() {
  // 			console.log('I fuck you');	
		// 	$('.container1').css('display', 'none');	  		
		// }, 1000);


	}


	 window.onresize = function(event) {

	 	var viewportWidth = $(window).width();
		if(viewportWidth<600){

			// PHONE NUMBER
			$('.container').css('width', viewportWidth);
			$('#fisrt_main-phone').css('margin', '0').css('width', viewportWidth+5);
			$('#main-phone').css('float', 'none').css('width', viewportWidth).css('margin', '0px auto');
			console.log('Mobile device, screen - '+viewportWidth);

			// CENTERING LOGO
			var logoWidth = $('#top_logo').outerWidth(); console.log(logoWidth);
			var logoContWidth = $('.logo').outerWidth(); console.log(logoContWidth);
			$('#top_logo').css('margin-left', (logoContWidth-logoWidth)/2); 

			$('.main-header').css('width', viewportWidth);

			$('.banner-rotator').css('width', viewportWidth).css('height', viewportWidth*33/100);

			$('.work-area-border').css('width', viewportWidth-10);
			$('.work_area').find('.indexdata').children('p').children('span').css('font-size', '14px');
			$('.work_area').find('.indexdata').children('p').children('b').children('span').css('font-size', '14px');
			// $('.work_area').find('.indexdata').children('h3').children('p').children('span').trim();

			$('.copyright').css('width', viewportWidth);

			$('#lightbox-image').css('width', viewportWidth*6.25/100);
			console.log('afdasdfsdfdsf'+viewportWidth*6.25/100);

			$('.menu_item_list').each(function(index, element){
	    		$(element).find('div').first().hide();
	    		$(element).find('div').last().children().children().children().css('background-color', 'blue').css('display', 'inline-block').css('width', '35%').css('margin-left','15%').children().css('float', 'left');
	    		// $(element).find('div').last().css('display', 'none').css('background-color', 'green').children().children();

				var elemWidthSubMobMenu = $(element).find('div').last().outerWidth();
				// console.log(elemWidthSubMobMenu);
				$(element).find('div').last().css('margin-left', (viewportWidth-elemWidthSubMobMenu)/2);
	    	});
	    	
	    	//FUNC detect url and 
			$('.menu_item').on("click", function(){
	  			$('.nav_button').trigger("click");
	  		});

	  		var urlMain = window.location.href;
	  		var arr = urlMain.split("/");
	  		var urlNow = arr[0] + "//" + arr[2] + '/' 
	  		if(urlMain != urlNow){
	  			$('.banner').css('display', 'none');
	  			$('.work_area .info, .after-text .info').css('float', 'left').css('width', viewportWidth*70/100).css('margin-left', 0);
	  		}

	  		//set img in block links to esko
	  		$('.left-block').children('a').children('img').css('width', viewportWidth);
	  		$('.left-block').children('img').css('width', viewportWidth);
	  		$('.rent_banner').css('margin-left', (viewportWidth-340)/2);
  			$('.rent_banner1').css('margin-left', (viewportWidth-340)/2);



		}

	 }



	//OPEN MOBILE MENU
	$('.nav_button').click(function(){
		$('#burger').toggleClass('active-sandwich');
		$('.popup_menu_mobile').slideToggle(500);
	});
});
 </script>