<?php
define ("COMPANY", "Пром-Котел");
define ("CORP_ADDRESS", "г. Москва, ул. Привольная, д.2, стр.4, офис 13");
define ("COMPANY_EN", "Prom-Kotel");
define ("AREA_CODE", "495");
define ("CORP_PHONE", "644-33-62");
define ("CORP_FAX", "(495)644-33-62");
define ("CORP_MAIL", "corp@prom-kotel.ru");
define ("SALE_MAIL", "sale@prom-kotel.ru");
define ("SUPPORT_MAIL", "help@prom-kotel.ru");

$IndexPage = ($_SERVER['SCRIPT_NAME'] == "/index.php")?TRUE:FALSE;
$RentPage = ($_SERVER['SCRIPT_NAME'] == "/services/boiler_rent/index.php")?TRUE:FALSE;
$AboutPage = ($_SERVER['SCRIPT_NAME'] == "/about/index.php")?TRUE:FALSE;
$LeadPage = ($_SERVER['SCRIPT_NAME'] == "/lead/index.php")?TRUE:FALSE;
$ServicePage  = ($_SERVER['SCRIPT_NAME'] == "/services/index.php")?TRUE:FALSE;
$EquipmentPage  = ($_SERVER['SCRIPT_NAME'] == "/equipment/index.php")?TRUE:FALSE;
$SpareBoilersPage  = ($_SERVER['SCRIPT_NAME'] == "/equipment/spare_boilers/index.php")?TRUE:FALSE;
$FuelPage = ($_SERVER['SCRIPT_NAME'] == "/services/diesel_fuel_delivery/index.php")?TRUE:FALSE;
$ContactsPage = ($_SERVER['SCRIPT_NAME'] == "/about/contacts/index.php")?TRUE:FALSE;
$NewsPage = ($_SERVER['REAL_FILE_PATH'] == "/news/index.php"  or $_SERVER['SCRIPT_NAME'] == "/news/index.php" )?TRUE:FALSE;

$bDesignMode = is_object($GLOBALS["USER"]) && $GLOBALS["USER"]->IsAdmin();
if ((($_SERVER['REQUEST_URI'] == "/index.php"))&&(substr_count($_SERVER['REQUEST_METHOD'], 'POST') == 0)) {
        header('HTTP/1.1 301 Moved Permanently');
        header("Location: http://{$_SERVER['HTTP_HOST']}/"); 
        die('redirect from index.php');
};

$uri = $_SERVER['REQUEST_URI'];
if (preg_match("/index\.php/i", $uri)) {
	$new_url = str_replace("index.php", "", $uri);
        header('HTTP/1.1 301 Moved Permanently');
        header("Location: http://prom-kotel.ru".$new_url);
        die('redirect from index.php');
}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?=LANGUAGE_ID?>" lang="<?=LANGUAGE_ID?>">
<head>
	<title><?$APPLICATION->ShowTitle()?></title>

	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="ROBOTS" content="ALL"/>
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
	<meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
	<?$APPLICATION->ShowMeta("description");?>
	<?$APPLICATION->ShowMeta("keywords");?>
	<?$APPLICATION->ShowCSS();?>
	<?$APPLICATION->ShowHeadStrings();?>

	<!-- INCLUDING JQUERY SCRIPT -->
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/jquery-1.10.2.min.js"></script>
	<!-- INCLUDING JQUERY EASING PLUGIN SCRIPT -->
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/jquery.easing.1.3.min.js"></script>
	<link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/jquery/jquery.lightbox-0.5/css/jquery.lightbox-0.5.css" type="text/css" />
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/jquery.lightbox-0.5/jquery.lightbox-0.5.js"></script>

	<script type="text/javascript">
		$(function() {
			$('#gallery a').lightBox();
		});
	</script>

	<?if($RentPage):?>
	<!-- INCLUDING AJAX FUNCTION DESCRIPTION SCRIPT -->
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/count.js"></script>
	<?endif;?>

	<?if($FuelPage):?>
	<!-- INCLUDING AJAX FUNCTION DESCRIPTION SCRIPT -->
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/count_diesel.js"></script>
	<?elseif($ServicePage or $EquipmentPage or $SpareBoilersPage):?>
	<link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/jquery/flex/flex4.css" type="text/css" />
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/flex/jquery.flexslider-min.js"></script>
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/flex/kwiks.js"></script>
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/flex/flex_init.js"></script>
	<?endif;?>

	<?if($RentPage or $FuelPage):?>
	<!-- INCLUDING JQUERY CHOSEN PLUGIN SCRIPT -->
	<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/chosen_v1.0.0/chosen.jquery.min.js"></script>
	<!-- INCLUDING JQUERY CHOSEN PLUGIN STYLES -->
	<link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/jquery/chosen_v1.0.0/chosen.css" type="text/css" />

	<!-- INCLUDING JQUERY SLIDER PLUGIN SCRIPT -->
	<script src="<?=SITE_TEMPLATE_PATH?>/jquery/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>
	<!-- INCLUDING JQUERY SLIDER PLUGIN STYLES -->
	<link href="<?=SITE_TEMPLATE_PATH?>/jquery/jquery-ui-1.10.3.custom/css/redmond/jquery-ui-1.10.3.custom.css" rel="stylesheet">
	<?endif;?>

<?if($bDesignMode):?>
    <!-- MAIN BANNER CSS -->
<?endif;?>
<?if($IndexPage):?>
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/css/banner-rotator.css" type="text/css" />
<?endif;?>

	<?if($ContactsPage):?>
		<link href="<?=SITE_TEMPLATE_PATH?>/css/contacts/style.css" rel="stylesheet">
	<?elseif($NewsPage):?>
		<link href="<?=SITE_TEMPLATE_PATH?>/css/news/style.css" rel="stylesheet">
	<?else:?>
		<link href="<?=SITE_TEMPLATE_PATH?>/css/default/style.css" rel="stylesheet">
	<?endif;?>

	<link href="<?=SITE_TEMPLATE_PATH?>/css/media_style.css" rel="stylesheet">



	<script type="text/javascript">
		function show_menu(eid){
			if(document.getElementById(eid).style.display=="none"){
				document.getElementById(eid).style.display="block";
			}
			else{
				document.getElementById(eid).style.display="none";
			}
		}
		function hide_menu(eid){
			document.getElementById(eid).style.display="none";
		}

	</script>

	<?$APPLICATION->ShowHeadScripts();?>
	<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38654743-1']);
_gaq.push(['_addOrganic', 'blogsearch.google.ru', 'q', true]);
_gaq.push(['_addOrganic', 'go.mail.ru', 'q', true]);
_gaq.push(['_addOrganic', 'nova.rambler.ru', 'query', true]);
_gaq.push(['_addOrganic', 'nigma.ru', 's', true]);
_gaq.push(['_addOrganic', 'webalta.ru', 'q', true]);
_gaq.push(['_addOrganic', 'aport.ru', 'r', true]);
_gaq.push(['_addOrganic', 'poisk.ru', 'text', true]);
_gaq.push(['_addOrganic', 'poisk.ru', 'text', true]);
_gaq.push(['_addOrganic', 'km.ru', 'q', true]);
_gaq.push(['_addOrganic', 'liveinternet.ru', 'q', true]);
_gaq.push(['_addOrganic', 'quintura.ru', 'request', true]);
_gaq.push(['_addOrganic', 'search.qip.ru', 'query', true]);
_gaq.push(['_addOrganic', 'gogo.ru', 'q', true]);
_gaq.push(['_addOrganic', 'ru.yahoo.com', 'p', true]);
_gaq.push(['_addOrganic', 'tut.by', 'query', true]);
_gaq.push(['_addOrganic', 'all.by', 'query', true]);
_gaq.push(['_addOrganic', 'meta.ua', 'q', true]);
_gaq.push(['_addOrganic', 'bigmir.net', 'z', true]);
_gaq.push(['_addOrganic', 'i.ua', 'q', true]);
_gaq.push(['_addOrganic', 'online.ua', 'q', true]);
_gaq.push(['_addOrganic', 'ukr.net', 'search_query', true]);
_gaq.push(['_addOrganic', 'search.ua', 'q', true]);
_gaq.push(['_addOrganic', 'search.com.ua', 'Domain', true]);
_gaq.push(['_addOrganic', 'images.yandex.ru', 'text', true]);
_gaq.push(['_addOrganic', 'market.yandex.ru', 'text', true]);
_gaq.push(['_addOrganic', 'ya.ru', 'text', true]); 
_gaq.push(['_addOrganic', 'yandex.ua', 'text', true]);
_gaq.push(['_addOrganic', 'auto.yandex.ru', 'text', true]);
_gaq.push(['_addOrganic', 'music.yandex.ru', 'text', true]);
_gaq.push(['_addOrganic', 'yaca.yandex.ru', 'text', true]); 
_gaq.push(['_addOrganic', 'blogs.yandex.ru', 'text', true]);
_gaq.push(['_addOrganic', 'news.yandex.ru', 'text', true]);
_gaq.push(['_addOrganic', 'slovari.yandex.ru', 'text', true]);
_gaq.push(['_addOrganic', 'video.yandex.ru', 'text', true]);
_gaq.push(['_addOrganic', 'afisha.yandex.ru', 'text', true]); 
_gaq.push(['_addOrganic', 'fotki.yandex.ru', 'text', true]); 
_gaq.push(['_addOrganic', 'realty.yandex.ru', 'text', true]); 
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>

	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="js/jquery.cookie.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	<!--script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/gtabs.jquery.js"></script>
	
  <script type="text/javascript">
    $(document).ready(function(){
      $("#tabs").gtabs({
        tabBut: ".tab_but",
        tabEl: "#tabs div.tab",
        targetAttr: "name"
      });
    })
  </script-->
<meta name="google-site-verification" content="-g2CD0YLDLabst2QjIsezIf2J0Xtr-Cbeuf1JCJ6h4M" />
</head>

<body <?if($IndexPage) echo ('id="main_page"');?>>

	<?if($ContactsPage):?>
		<img class="sitebg" src="<?=SITE_TEMPLATE_PATH?>/images/backgrounds/site_background_contacts.jpg"/>
	<?elseif($FuelPage):?>
		<img class="sitebg" src="<?=SITE_TEMPLATE_PATH?>/images/backgrounds/site_background_fuel.jpg"/>
	<?elseif($ServicePage):?>
		<img class="sitebg" src="<?=SITE_TEMPLATE_PATH?>/images/backgrounds/site_background_services.jpg"/>
	<?else:?>
		<img class="sitebg" src="<?=SITE_TEMPLATE_PATH?>/images/backgrounds/site_background.jpg"alt=""/>
	<?endif;?>

	<?$APPLICATION->ShowPanel();?>
	<div class="container">
		<div class="top"> 
			<div class="logo">
				<?	$APPLICATION->IncludeFile(
						$APPLICATION->GetTemplatePath(
							"includes/logo.php"),
							array(),
							array("MODE"=>"html")
					);
				?>
			</div> <!-- logo closed -->

			<!-- MOBILE MENU -->
			<div class="nav_button">
				<div id="burger">
					<span class="my_burger"></span>
					<span class="my_burger"></span>
					<span class="my_burger"></span>
					<span class="my_burger"></span>
				</div>
			</div>


			<div class="main-phone" id="fisrt_main-phone">
				<?	$APPLICATION->IncludeFile(
						$APPLICATION->GetTemplatePath(
							"includes/main-phone.php"),
							array(),
							array("MODE"=>"html")
					);
				?>
			</div> <!-- main-phone closed -->
			<div class="main-header">Производство и монтаж котельного оборудования</div>
			<div class="main-menu">
				<?$APPLICATION->IncludeFile(
					$APPLICATION->GetTemplatePath(
						"includes/menu.php"),
						array(),
						array("MODE"=>"html")
				);?>
			</div>
		</div>
		<div class="banner"> 
			<div class="top_battlements"></div>
			<?if($bDesignMode):?>
			<?endif;?>
			        <?if ($IndexPage){?>
			        	<?$APPLICATION->IncludeFile($APPLICATION->GetTemplatePath("main_banner/main_banner.php"), array(), array("MODE"=>"html"));?>
					<div class="clear"></div>
				<?}?>
			<div class="bottom_battlements"></div>
		</div>

		
			<div class="popup_menu_mobile">
				<div>
					<?$APPLICATION->IncludeFile(
						$APPLICATION->GetTemplatePath(
							"includes/menu_mobile.php"),
							array(),
							array("MODE"=>"html")
					);?>
				</div>
			</div>


		<div class="top_menu">

		</div> <!-- top_menu closed -->

		<div class="clear"></div>
		<div class="left-block">
			<?$APPLICATION->IncludeComponent("bitrix:main.include", ".default", array(
				"AREA_FILE_SHOW" => "sect",
				"AREA_FILE_SUFFIX" => "left",
				"AREA_FILE_RECURSIVE" => "Y",
				"EDIT_TEMPLATE" => "left_sect.php"),
				false,
				array(
				"ACTIVE_COMPONENT" => "Y"	)
			);?> 
		</div>
		<div class="work-area-container" id="my_work_area">
			<div class="sticker">
				<?$APPLICATION->IncludeComponent("bitrix:main.include", ".default", array(
					"AREA_FILE_SHOW" => "sect",
					"AREA_FILE_SUFFIX" => "sticker",
					"AREA_FILE_RECURSIVE" => "Y",
					"EDIT_TEMPLATE" => "sticker_sect.php"
					),
					false,
					array(
					"ACTIVE_COMPONENT" => "Y"	)
				);?> 
			</div>

			<div class="work-area-border" >
				<div class="work_area">
					<h1 class="h1-work"><?$APPLICATION->ShowTitle(false);?></h1>
					<div class='loader'></div>
					<div class="clear"></div>
					<div class="indexdata">
					<?if(!$IndexPage and !$ServicePage and !$EquipmentPage and !$AboutPage and !$LeadPage):?>
						<?$APPLICATION->IncludeComponent(
							"bitrix:breadcrumb",
							"promkotel_nav",
							Array(
								"START_FROM" => "1",
								"PATH" => "",
								"SITE_ID" => "-"
							)
						);?>
					<?endif;?>
					

