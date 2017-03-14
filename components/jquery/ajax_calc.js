function sl() {
    $(".loader").fadeIn(100);
    $(".loader").css("z-index", "999");
}

function hl() {
    $(".loader").fadeOut(500);
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