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
		url: url, //����� ������������ ��������
		type: "POST", //��� �������
		dataType: "html", //��� ������
		data: jQuery("#"+form_id).serialize(), 
		success: function(response) { //���� ��� ���������
			document.getElementById(result_id).innerHTML = response;
			hl();
		},
		error: function(response) { //���� ������
			document.getElementById(result_id).innerHTML = "������ ��� �������� �����";
			hl();
		}
	});
}