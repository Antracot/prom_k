
					</div>
				</div>
			</div>
		</div>

		<div class="after-text">
			<?$APPLICATION->IncludeComponent("bitrix:main.include", ".default", array(
	"AREA_FILE_SHOW" => "page",
	"AREA_FILE_SUFFIX" => "right",
	"EDIT_TEMPLATE" => "right_sect.php"
	),
	false,
	array(
	"ACTIVE_COMPONENT" => "Y"
	)
);?> 
		</div>
		<div class="bottom-holder"></div>
	</div>
	<div class="clear"></div>
	<div class="bottom">
		<div class="bottom-border-top"></div>
		<div class="bottom-menu-container">
			<?	$APPLICATION->IncludeFile(
					$APPLICATION->GetTemplatePath(
						"includes/footer-menu.php"),
						array(),
						array("MODE"=>"html")
				);
			?>
		</div>
		<div class="business-card"></div>
		<div class="bottom-sub-string">
			<?	$APPLICATION->IncludeFile(
					$APPLICATION->GetTemplatePath(
						"includes/footer.php"),
						array(),
						array("MODE"=>"html")
				);
			?>
		</div>
	</div>
	<?if($RentPage):?>
		<!-- CHOSEN PLUGIN INIT -->
		<script type="text/javascript">
			$(".chosen-select").chosen({
				disable_search: true
			});
		</script>

		<script type="text/javascript">
			$("#periodMM").ionRangeSlider({
    				min: 2,
				max: 12,
				to: 2,
 				type: 'double',
				step: 1,
				hideFrom: true,
				postfix: " мес.",
				prettify: false,
				hasGrid: true
			});
			$("#qty").ionRangeSlider({
    				min: 1,
				max: 10,
				to: 1,
 				type: 'double',
				step: 1,
				postfix: " ед.",
				prettify: false,
				hasGrid: true
			});
		</script>

	<?endif;?>





<?if($bDesignMode):?>
		<!-- MAIN BANNER SLIDER -->
<?endif;?>
<?if($IndexPage):?>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/banner-rotator_init.min.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/jquery/jquery.banner-rotator.min.js"></script>
<?endif;?>

<!-- GOOGLE ANALYTICS } -->

<!-- LiveTex {literal} -->
<script type='text/javascript'>
    var liveTex = true,
    liveTexID = 80571,
    liveTex_object = true;
    (function() {
    var lt = document.createElement('script');
    lt.type ='text/javascript';
    lt.async = true;
    lt.src = '//cs15.livetex.ru/js/client.js';
    var sc = document.getElementsByTagName('script')[0];
    if ( sc ) sc.parentNode.insertBefore(lt, sc);
    else document.documentElement.firstChild.appendChild(lt);
    })();
</script>
<!-- LiveTex {/literal} -->



 </body> 
</html>