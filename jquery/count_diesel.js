function sl() {
	if ($(".loader").css("display") == "none") {
		$(".loader").fadeIn(100);
		$(".loader").css("z-index", "999");
	}
}

function hl() {
	if ($(".loader").css("display") == "block") {
		$(".loader").fadeOut(1000);
	}
}

function AjaxFormRequest(result_id,form_id,url) {
	sl();
	jQuery.ajax({
		url: url, //Адрес подгружаемой страницы
		type: "POST", //Тип запроса
		dataType: "html", //Тип данных
		data: jQuery("#"+form_id).serialize(), 
		success: function(response) { //Если все нормально
			document.getElementById(result_id).innerHTML = response;
			hl();
		},
		error: function(response) { //Если ошибка
			document.getElementById(result_id).innerHTML = "Ошибка при отправке формы";
			hl();
		}
	});
}

	$(function() {
		$( "#slider-range-min" ).slider({
			range: "min",
			value: 10000,
			min: 500,
			max: 25000,
			step: 50,
			slide: function( event, ui ) {$( "#qty" ).val( ui.value );},
			stop: function( event, ui ) {
				AjaxFormRequest('result', 'calculate_form', '/ajax/calculate_diesel.php');
				AjaxFormRequest('result_price', 'calculate_form', '/ajax/price_diesel.php');}
		});
		$( "#qty" ).val( $( "#slider-range-min" ).slider( "value" ) );
	});
	
	$(function() {
		$( "#slider-range-min2" ).slider({
			range: "min",
			value: 20,
			min: 0,
			max: 100,
			slide: function( event, ui ) {$( "#distance" ).val( ui.value );},
			stop: function( event, ui ) {
				AjaxFormRequest('result', 'calculate_form', '/ajax/calculate_diesel.php');
				AjaxFormRequest('result_price', 'calculate_form', '/ajax/price_diesel.php');}
		});
		$( "#distance" ).val( $( "#slider-range-min2" ).slider( "value" ) );
	});
	
	$(function() {
		$( "#distance" ).spinner({
			min: 0,
			max: 100,
			step: 1,
			start: 20,
			numberFormat: "n",
			stop: function( event, ui ) {
				AjaxFormRequest('result', 'calculate_form', '/ajax/calculate_diesel.php');
				AjaxFormRequest('result_price', 'calculate_form', '/ajax/price_diesel.php');
				$( "#slider-range-min2" ).slider( "value", $( "#distance" ).val());}
		});
	});
		
	$(function() {
		$( "#qty" ).spinner({
			min: 500,
			max: 25000,
			step: 50,
			start: 10000,
			numberFormat: "n",
			stop: function( event, ui ) {
				AjaxFormRequest('result', 'calculate_form', '/ajax/calculate_diesel.php');
				AjaxFormRequest('result_price', 'calculate_form', '/ajax/price_diesel.php');
				$( "#slider-range-min" ).slider( "value", $( "#qty" ).val());}
		});
	});
	
jQuery(document).ready(function(){
// фильтрация ввода в поля
	jQuery('input').keypress(function(event){
		return false;
	});

	jQuery("input#distance").change(function(){
		var value = jQuery("input#distance").val();
		jQuery("#slider-range-min2").slider("value", value);	
	});
	jQuery("input#qty").change(function(){
		var value = jQuery("input#qty").val();
		jQuery("#slider-range-min").slider("value", value);	
	});

});