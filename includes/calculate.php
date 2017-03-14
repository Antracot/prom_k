 
<div class="calculate"> 	<form accept-charset="utf-8" id="calculate_form" action="" method="post"> 		<label class="description" for="model">Модель котельной:</label> 		<select onchange="AjaxFormRequest('result', 'calculate_form', '/ajax/calculate.php'); AjaxFormRequest('result_price', 'calculate_form', '/ajax/price.php')" tabindex="7" style="width: 350px;" data-placeholder="Выберите модель котельной" name="model" id="model" class="chosen-select"> 			<option selected="" value="0">&laquo;Аннушка&raquo; (дизель) - 0,3 МВт;</option> 			<option value="1">«Каролина» (дизель) - 0,5 МВт;</option> 			<option value="2">«Драгун» (дизель) - 0,75 МВт;</option> 			<option value="3">«Витязь» (дизель) - 1,0 МВт;</option> 			<option value="4">«Герцог» (дизель) - 1,0 МВт;</option> 			<option value="6">«Сенатор» (дизель) - 1,5 МВт;</option> 			<option value="7">«Цезарь» (дизель) - 2,0 МВт;</option> 			 			 			<option value="10">«Блок ГСМ - 10000л.»</option> 			<option onclick="AjaxFormRequest('result', 'calculate_form', '/ajax/calculate.php')" value="11">«Блок ГСМ - 15000л.»</option> 		</select> 		 
    <br />
   		 
    <p class="description_label"><label class="description" for="qty">Количество:</label> 			</p>
   
    <div class="value_descr"> ед.</div>
   <input type="text" name="qty" id="qty" /> 			 
    <div class="left_cap"></div>
   
    <div id="slider-range-min"></div>
   
    <div class="right_cap"></div>
   			 
    <div class="stripe_steps_value"></div>
   		 
    <p></p>
   		 
    <div class="clear"></div>
   		 
    <p class="description_label"> 			<label class="description" for="period">Период аренды:</label> 			</p>
   
    <div class="value_descr"> мес.</div>
   <input type="text" name="period" id="period" /> 			 
    <div class="left_cap"></div>
   
    <div id="slider-range-min2"></div>
   
    <div class="right_cap"></div>
   			 
    <div class="stripe_steps_km"></div>
   		 
    <p></p>
   	</form> 	 
  <div class="totals"> 		 
    <div class="clear"></div>
   		 
    <div class="item_price">Цена:</div>
   
    <div id="result_price">270000 руб.</div>
   		 
    <div class="clear"></div>
   		 
    <div class="total_price">Итого:</div>
   
    <div id="result">540000 руб.</div>
   		 
    <div class="clear"></div>
   		 
    <p>Для получения консультации звоните нам по телефонам указанным на странице <a href="/about/contacts/" >контакты</a>.</p>
   	</div>
 </div>
 