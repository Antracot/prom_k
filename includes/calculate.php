 
<div class="calculate"> 	<form accept-charset="utf-8" id="calculate_form" action="" method="post"> 		<label class="description" for="model">������ ���������:</label> 		<select onchange="AjaxFormRequest('result', 'calculate_form', '/ajax/calculate.php'); AjaxFormRequest('result_price', 'calculate_form', '/ajax/price.php')" tabindex="7" style="width: 350px;" data-placeholder="�������� ������ ���������" name="model" id="model" class="chosen-select"> 			<option selected="" value="0">&laquo;�������&raquo; (������) - 0,3 ���;</option> 			<option value="1">��������� (������) - 0,5 ���;</option> 			<option value="2">������� (������) - 0,75 ���;</option> 			<option value="3">�������� (������) - 1,0 ���;</option> 			<option value="4">������� (������) - 1,0 ���;</option> 			<option value="6">�������� (������) - 1,5 ���;</option> 			<option value="7">�������� (������) - 2,0 ���;</option> 			 			 			<option value="10">����� ��� - 10000�.�</option> 			<option onclick="AjaxFormRequest('result', 'calculate_form', '/ajax/calculate.php')" value="11">����� ��� - 15000�.�</option> 		</select> 		 
    <br />
   		 
    <p class="description_label"><label class="description" for="qty">����������:</label> 			</p>
   
    <div class="value_descr"> ��.</div>
   <input type="text" name="qty" id="qty" /> 			 
    <div class="left_cap"></div>
   
    <div id="slider-range-min"></div>
   
    <div class="right_cap"></div>
   			 
    <div class="stripe_steps_value"></div>
   		 
    <p></p>
   		 
    <div class="clear"></div>
   		 
    <p class="description_label"> 			<label class="description" for="period">������ ������:</label> 			</p>
   
    <div class="value_descr"> ���.</div>
   <input type="text" name="period" id="period" /> 			 
    <div class="left_cap"></div>
   
    <div id="slider-range-min2"></div>
   
    <div class="right_cap"></div>
   			 
    <div class="stripe_steps_km"></div>
   		 
    <p></p>
   	</form> 	 
  <div class="totals"> 		 
    <div class="clear"></div>
   		 
    <div class="item_price">����:</div>
   
    <div id="result_price">270000 ���.</div>
   		 
    <div class="clear"></div>
   		 
    <div class="total_price">�����:</div>
   
    <div id="result">540000 ���.</div>
   		 
    <div class="clear"></div>
   		 
    <p>��� ��������� ������������ ������� ��� �� ��������� ��������� �� �������� <a href="/about/contacts/" >��������</a>.</p>
   	</div>
 </div>
 