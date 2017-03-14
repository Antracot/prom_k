
<table border="0" style="border-collapse: collapse;"> 
  <tbody> 
    <tr><td width="159" height="" class="header"><a href="/about/" title="О компании" target="_self" >О компании</a></td><td rowspan="2"><img src="/bitrix/templates/promkotel/images/miscellaneous/bottom-menu-sep.png" border="0" width="11" height="154"  /> </td><td width="346" height="" class="header"><a href="/services/" title="Водогрейные котельные" target="_self" >Водогрейные котельные</a></td><td rowspan="2"><img src="/bitrix/templates/promkotel/images/miscellaneous/bottom-menu-sep.png" border="0" width="11" height="154"  /> </td><td class="header"><a href="/equipment/" title="Продажа оборудования" target="_self" >Котельное оборудование</a></td></tr>
   
    <tr><td valign="top"> <?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"bottom-menu",
	Array(
		"ROOT_MENU_TYPE" => "bottom",
		"MAX_LEVEL" => "1",
		"CHILD_MENU_TYPE" => "left",
		"USE_EXT" => "N",
		"DELAY" => "N",
		"ALLOW_MULTI_SELECT" => "N",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"MENU_CACHE_GET_VARS" => ""
	)
);?> </td><td valign="top"><?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"bottom-menu",
	Array(
		"ROOT_MENU_TYPE" => "bottom1",
		"MAX_LEVEL" => "1",
		"CHILD_MENU_TYPE" => "left",
		"USE_EXT" => "N",
		"DELAY" => "N",
		"ALLOW_MULTI_SELECT" => "N",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"MENU_CACHE_GET_VARS" => array()
	)
);?></td><td valign="top"><?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"bottom-menu",
	Array(
		"ROOT_MENU_TYPE" => "bottom2",
		"MAX_LEVEL" => "1",
		"CHILD_MENU_TYPE" => "left",
		"USE_EXT" => "N",
		"DELAY" => "N",
		"ALLOW_MULTI_SELECT" => "N",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"MENU_CACHE_GET_VARS" => array()
	)
);?></td></tr>
   </tbody>
 </table>
 
<div class="copyright"> &copy;1996 - <script type="text/javascript">
                                    document.write(new Date().getFullYear());
                                  </script> ООО &quot;Пром-Котел&quot; - Строительство котельных, котельное оборудование</div>
