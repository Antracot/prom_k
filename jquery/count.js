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
			value: 1,
			min: 1,
			max: 10,
			step: 1,
			slide: function( event, ui ) {$( "#qty" ).val( ui.value );},
			stop: function( event, ui ) {
				AjaxFormRequest('result', 'calculate_form', '/ajax/calculate.php');
				AjaxFormRequest('result_price', 'calculate_form', '/ajax/price.php');}
		});
		$( "#qty" ).val( $( "#slider-range-min" ).slider( "value" ) );
	});
	
	$(function() {
		$( "#slider-range-min2" ).slider({
			range: "min",
			value: 2,
			min: 2,
			max: 12,
			slide: function( event, ui ) {$( "#period" ).val( ui.value );},
			stop: function( event, ui ) {
				AjaxFormRequest('result', 'calculate_form', '/ajax/calculate.php');
				AjaxFormRequest('result_price', 'calculate_form', '/ajax/price.php');}
		});
		$( "#period" ).val( $( "#slider-range-min2" ).slider( "value" ) );
	});
	
	$(function() {
		$( "#period" ).spinner({
			min: 2,
			max: 12,
			step: 1,
			start: 2,
			numberFormat: "n",
			stop: function( event, ui ) {
				AjaxFormRequest('result', 'calculate_form', '/ajax/calculate.php');
				AjaxFormRequest('result_price', 'calculate_form', '/ajax/price.php');
				$( "#slider-range-min2" ).slider( "value", $( "#period" ).val());}
		});
	});
		
	$(function() {
		$( "#qty" ).spinner({
			min: 1,
			max: 10,
			step: 1,
			start: 1,
			numberFormat: "n",
			stop: function( event, ui ) {
				AjaxFormRequest('result', 'calculate_form', '/ajax/calculate.php');
				AjaxFormRequest('result_price', 'calculate_form', '/ajax/price.php');
				$( "#slider-range-min" ).slider( "value", $( "#qty" ).val());}
		});
	});
	
jQuery(document).ready(function(){
// фильтрация ввода в поля
	jQuery('input').keypress(function(event){
		return false;
	});

	jQuery("input#period").change(function(){
		var value = jQuery("input#period").val();
		jQuery("#slider-range-min2").slider("value", value);	
	});
	jQuery("input#qty").change(function(){
		var value = jQuery("input#qty").val();
		jQuery("#slider-range-min").slider("value", value);	
	});

});