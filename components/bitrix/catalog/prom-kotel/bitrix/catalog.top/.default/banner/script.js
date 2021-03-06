(function (window) {

	if (!!window.JCCatalogTopBanner)
		return;

	window.JCCatalogTopBanner = function (arParams)
	{
		this.productType = 0;
		this.showQuantity = true;
		this.showAbsent = true;
		this.secondPict = false;
		this.showOldPrice = false;
		this.showPercent = false;
		this.showSkuProps = false;
		this.visual = {
			ID: '',
			PICT_ID: '',
			SECOND_PICT_ID: '',
			QUANTITY_ID: '',
			QUANTITY_UP_ID: '',
			QUANTITY_DOWN_ID: '',
			PRICE_ID: '',
			DSC_PERC: '',
			SECOND_DSC_PERC: '',
			DISPLAY_PROP_DIV: ''
		};
		this.product = {
			checkQuantity: false,
			maxQuantity: 0,
			stepQuantity: 1,
			isDblQuantity: false,
			canBuy: true,
			canSubscription: true,
			name: '',
			pict: {},
			id: 0,
			addUrl: '',
			buyUrl: ''
		};
		this.basketData = {
			quantity: 'quantity',
			props: 'prop'
		};

		this.defaultPict = {
			pict: null,
			secondPict: null
		};

		this.ajaxPath = '';

		this.checkQuantity = false;
		this.maxQuantity = 0;
		this.stepQuantity = 1;
		this.isDblQuantity = false;
		this.canBuy = true;
		this.canSubscription = true;
		this.precision = 6;
		this.precisionFactor = Math.pow(10,this.precision);

		this.offers = [];
		this.offerNum = 0;
		this.treeProps = [];
		this.obTreeRows = [];
		this.showCount = [];
		this.showStart = [];
		this.selectedValues = {};

		this.obProduct = null;
		this.obQuantity = null;
		this.obQuantityUp = null;
		this.obQuantityDown = null;
		this.obPict = null;
		this.obSecondPict = null;
		this.obPrice = null;
		this.obTree = null;
		this.obBuyBtn = null;
		this.obDscPerc = null;
		this.obSecondDscPerc = null;
		this.obSkuProps = null;
		this.obMeasure = null;

		this.errorCode = 0;

		if ('object' == typeof(arParams))
		{
			this.productType = parseInt(arParams.PRODUCT_TYPE);
			this.showQuantity = arParams.SHOW_QUANTITY;
			this.showAbsent = arParams.SHOW_ABSENT;
			if (!!arParams.SECOND_PICT)
				this.secondPict = true;
			if (!!arParams.SHOW_OLD_PRICE)
				this.showOldPrice = true;
			if (!!arParams.SHOW_DISCOUNT_PERCENT)
				this.showPercent = true;
			if (!!arParams.SHOW_SKU_PROPS)
				this.showSkuProps = true;
			this.visual = arParams.VISUAL;
			this.ajaxPath = arParams.AJAX_PATH;
			switch (this.productType)
			{
				case 1://product
				case 2://set
					if (!!arParams.PRODUCT && 'object' == typeof(arParams.PRODUCT))
					{
						if (this.showQuantity)
						{
							this.product.checkQuantity = arParams.PRODUCT.CHECK_QUANTITY;
							this.product.isDblQuantity = arParams.PRODUCT.QUANTITY_FLOAT;
							if (this.product.checkQuantity)
								this.product.maxQuantity = (this.product.isDblQuantity
										? parseFloat(arParams.PRODUCT.MAX_QUANTITY)
										: parseInt(arParams.PRODUCT.MAX_QUANTITY)
								);
							this.product.stepQuantity = (this.product.isDblQuantity
								? parseFloat(arParams.PRODUCT.STEP_QUANTITY)
								: parseInt(arParams.PRODUCT.STEP_QUANTITY)
							);

							this.checkQuantity = this.product.checkQuantity;
							this.isDblQuantity = this.product.isDblQuantity;
							this.maxQuantity = this.product.maxQuantity;
							this.stepQuantity = this.product.stepQuantity;
							if (this.isDblQuantity)
							{
								this.stepQuantity = Math.round(this.stepQuantity*this.precisionFactor)/this.precisionFactor;
							}
						}
						this.product.canBuy = arParams.PRODUCT.CAN_BUY;
						this.product.canSubscription = arParams.PRODUCT.SUBSCRIPTION;

						this.canBuy = this.product.canBuy;
						this.canSubscription = this.product.canSubscription;

						this.product.name = arParams.PRODUCT.NAME;
						this.product.pict = arParams.PRODUCT.PICT;
						this.product.id = arParams.PRODUCT.ID;
						if (!!arParams.PRODUCT.ADD_URL)
							this.product.addUrl = arParams.PRODUCT.ADD_URL;
						if (!!arParams.PRODUCT.BUY_URL)
							this.product.buyUrl = arParams.PRODUCT.BUY_URL;
					}
					else
					{
						this.errorCode = -1;
					}
					break;
				case 3://sku
					if (!!arParams.OFFERS && BX.type.isArray(arParams.OFFERS))
					{
						this.offers = arParams.OFFERS;
						this.offerNum = 0;
						if (!!arParams.OFFER_SELECTED)
							this.offerNum = parseInt(arParams.OFFER_SELECTED);
						if (isNaN(this.offerNum))
							this.offerNum = 0;
						if (!!arParams.TREE_PROPS)
							this.treeProps = arParams.TREE_PROPS;
						if (!!arParams.DEFAULT_PICTURE)
						{
							this.defaultPict.pict = arParams.DEFAULT_PICTURE.PICTURE;
							this.defaultPict.secondPict = arParams.DEFAULT_PICTURE.PICTURE_SECOND;
						}
					}
					else
					{
						this.errorCode = -1;
					}
					break;
				default:
					this.errorCode = -1;
			}
			if (!!arParams.BASKET && 'object' == typeof(arParams.BASKET))
			{
				if (!!arParams.BASKET.QUANTITY)
					this.basketData.quantity = arParams.BASKET.QUANTITY;
				if (!!arParams.BASKET.PROPS)
					this.basketData.props = arParams.BASKET.PROPS;
			}
		}

		if (0 === this.errorCode)
		{
			BX.ready(BX.delegate(this.Init,this));
		}
	};

	window.JCCatalogTopBanner.prototype.Init = function()
	{
		var i = 0;
		this.obProduct = BX(this.visual.ID);
		if (!this.obProduct)
			this.errorCode = -1;
		this.obPict = BX(this.visual.PICT_ID);
		if (!this.obPict)
			this.errorCode = -2;
		if (this.secondPict && !!this.visual.SECOND_PICT_ID)
		{
			this.obSecondPict = BX(this.visual.SECOND_PICT_ID);
		}
		this.obPrice = BX(this.visual.PRICE_ID);
		if (!this.obPrice)
			this.errorCode = -16;
		if (this.showQuantity && !!this.visual.QUANTITY_ID)
		{
			this.obQuantity = BX(this.visual.QUANTITY_ID);
			if (!this.obQuantity)
				this.errorCode = -32;
			if (!!this.visual.QUANTITY_UP_ID)
			{
				this.obQuantityUp = BX(this.visual.QUANTITY_UP_ID);
				if (!this.obQuantityUp)
					this.errorCode = -64;
			}
			if (!!this.visual.QUANTITY_DOWN_ID)
			{
				this.obQuantityDown = BX(this.visual.QUANTITY_DOWN_ID);
				if (!this.obQuantityDown)
					this.errorCode = -128;
			}
		}
		if (3 == this.productType)
		{
			if (!!this.visual.TREE_ID)
			{
				this.obTree = BX(this.visual.TREE_ID);
				if (!this.obTree)
					this.errorCode = -256;
				var strPrefix = this.visual.TREE_ITEM_ID;
				for (i = 0; i < this.treeProps.length; i++)
				{
					this.obTreeRows[i] = {
						LEFT: BX(strPrefix+this.treeProps[i].ID+'_left'),
						RIGHT: BX(strPrefix+this.treeProps[i].ID+'_right'),
						LIST: BX(strPrefix+this.treeProps[i].ID+'_list'),
						CONT: BX(strPrefix+this.treeProps[i].ID+'_cont')
					};
					if (!this.obTreeRows[i].LEFT || !this.obTreeRows[i].RIGHT || !this.obTreeRows[i].LIST || !this.obTreeRows[i].CONT)
					{
						this.errorCode = -512;
						break;
					}
				}
			}
			if (!!this.visual.QUANTITY_MEASURE)
			{
				this.obMeasure = BX(this.visual.QUANTITY_MEASURE);
			}
		}
		if (!!this.visual.BUY_ID)
		{
			this.obBuyBtn = BX(this.visual.BUY_ID);
			if (!this.obBuyBtn)
			{

			}
		}

		if (this.showPercent)
		{
			if (!!this.visual.DSC_PERC)
			{
				this.obDscPerc = BX(this.visual.DSC_PERC);
			}
			if (this.secondPict && !!this.visual.SECOND_DSC_PERC)
			{
				this.obSecondDscPerc = BX(this.visual.SECOND_DSC_PERC);
			}
		}

		if (this.showSkuProps)
		{
			if (!!this.visual.DISPLAY_PROP_DIV)
			{
				this.obSkuProps = BX(this.visual.DISPLAY_PROP_DIV);
			}
		}

		if (0 === this.errorCode)
		{
			if (this.showQuantity)
			{
				BX.bind(this.obQuantityUp, 'click', BX.delegate(this.QuantityUp, this));
				BX.bind(this.obQuantityDown, 'click', BX.delegate(this.QuantityDown, this));
				BX.bind(this.obQuantity, 'change', BX.delegate(this.QuantityChange, this));
			}
			switch (this.productType)
			{
				case 1://product
					break;
				case 3://sku
					var TreeItems = BX.findChildren(this.obTree, {tagName: 'li'}, true);
					if (!!TreeItems && 0 < TreeItems.length)
					{
						for (i = 0; i < TreeItems.length; i++)
						{
							BX.bind(TreeItems[i], 'click', BX.delegate(this.SelectOfferProp, this));
						}
					}
					for (i = 0; i < this.obTreeRows.length; i++)
					{
						BX.bind(this.obTreeRows[i].LEFT, 'click', BX.delegate(this.RowLeft, this));
						BX.bind(this.obTreeRows[i].RIGHT, 'click', BX.delegate(this.RowRight, this));
					}
					this.SetCurrent();
					break;
			}
			if (!!this.obBuyBtn)
			{
				BX.bind(this.obBuyBtn, 'click', BX.delegate(this.Basket, this));
			}
		}
	};

	window.JCCatalogTopBanner.prototype.QuantityUp = function()
	{
		var curValue = 0;
		var boolSet = true;
		if (0 === this.errorCode && this.showQuantity)
		{
			curValue = (
				this.isDblQuantity
				? parseFloat(this.obQuantity.value)
				: parseInt(this.obQuantity.value)
			);
			if (!isNaN(curValue))
			{
				curValue += this.stepQuantity;
				if (this.checkQuantity)
				{
					if (curValue > this.maxQuantity)
						boolSet = false;
				}
				if (boolSet)
				{
					if (this.isDblQuantity)
					{
						curValue = Math.round(curValue*this.precisionFactor)/this.precisionFactor;
					}
					this.obQuantity.value = curValue;
				}
			}
		}
	};

	window.JCCatalogTopBanner.prototype.QuantityDown = function()
	{
		var curValue = 0;
		var boolSet = true;
		if (0 === this.errorCode && this.showQuantity)
		{
			curValue = (
				this.isDblQuantity
				? parseFloat(this.obQuantity.value)
				: parseInt(this.obQuantity.value)
			);
			if (!isNaN(curValue))
			{
				curValue -= this.stepQuantity;
				if (curValue < this.stepQuantity)
					boolSet = false;
				if (boolSet)
				{
					if (this.isDblQuantity)
					{
						curValue = Math.round(curValue*this.precisionFactor)/this.precisionFactor;
					}
					this.obQuantity.value = curValue;
				}
			}
		}
	};

	window.JCCatalogTopBanner.prototype.QuantityChange = function()
	{
		var curValue = 0;
		var boolSet = true;
		if (0 === this.errorCode && this.showQuantity)
		{
			curValue = (
				this.isDblQuantity
				? parseFloat(this.obQuantity.value)
				: parseInt(this.obQuantity.value)
			);
			if (!isNaN(curValue))
			{
				if (this.checkQuantity)
				{
					if (curValue > this.maxQuantity)
					{
						boolSet = false;
						curValue = this.maxQuantity;
					}
					else if (curValue < this.stepQuantity)
					{
						boolSet = false;
						curValue = this.stepQuantity;
					}
				}
				if (!boolSet)
				{
					this.obQuantity.value = curValue;
				}
			}
			else
			{
				this.obQuantity.value = this.stepQuantity;
			}
		}
	};

	window.JCCatalogTopBanner.prototype.QuantitySet = function(index)
	{
		if (0 === this.errorCode)
		{
			this.canBuy = this.offers[index].CAN_BUY;
			if (this.showQuantity)
			{
				this.isDblQuantity = this.offers[index].QUANTITY_FLOAT;
				this.checkQuantity = this.offers[index].CHECK_QUANTITY;
				this.maxQuantity = (this.isDblQuantity
					? parseFloat(this.offers[index].MAX_QUANTITY)
					: parseInt(this.offers[index].MAX_QUANTITY)
				);
				this.stepQuantity = (this.isDblQuantity
					? parseFloat(this.offers[index].STEP_QUANTITY)
					: parseInt(this.offers[index].STEP_QUANTITY)
				);
				if (this.isDblQuantity)
				{
					this.stepQuantity = Math.round(this.stepQuantity*this.precisionFactor)/this.precisionFactor;
				}
				this.obQuantity.value = this.stepQuantity;
				if (!!this.obMeasure)
				{
					if (!!this.offers[index].MEASURE)
					{
						BX.adjust(this.obMeasure, { html : this.offers[index].MEASURE});
					}
					else
					{
						BX.adjust(this.obMeasure, { html : ''});
					}
				}
			}
		}
	};

	window.JCCatalogTopBanner.prototype.SelectOfferProp = function()
	{
		var i = 0;
		var value = '';
		var target = BX.proxy_context;
		if (!!target && target.hasAttribute('data-treevalue'))
		{
			var strTreeValue = target.getAttribute('data-treevalue');
			var arTreeItem = strTreeValue.split('_');
			if (this.SearchOfferPropIndex(arTreeItem[0], arTreeItem[1]))
			{
				var RowItems = BX.findChildren(target.parentNode, {tagName: 'li'}, false);
				if (!!RowItems && 0 < RowItems.length)
				{
					for (i = 0; i < RowItems.length; i++)
					{
						value = RowItems[i].getAttribute('data-onevalue');
						if (value == arTreeItem[1])
							BX.addClass(RowItems[i], 'bx_active');
						else
							BX.removeClass(RowItems[i], 'bx_active');
					}
				}
			}
		}
	};

	window.JCCatalogTopBanner.prototype.SearchOfferPropIndex = function(strPropID, strPropValue)
	{
		var strName = '';
		var arShowValues = null;
		var arCanBuyValues = [];
		var index = -1;
		for (var i = 0; i < this.treeProps.length; i++)
		{
			if (this.treeProps[i].ID == strPropID)
			{
				index = i;
				break;
			}
		}

		if (-1 < index)
		{
			var arFilter = {};
			for (i = 0; i < index; i++)
			{
				strName = 'PROP_'+this.treeProps[i].ID;
				arFilter[strName] = this.selectedValues[strName];
			}
			strName = 'PROP_'+this.treeProps[index].ID;
			arShowValues = this.GetRowValues(arFilter, strName);
			if (!arShowValues)
				return false;
			if (!BX.util.in_array(strPropValue, arShowValues))
				return false;
			arFilter[strName] = strPropValue;
			for (i = index+1; i < this.treeProps.length; i++)
			{
				strName = 'PROP_'+this.treeProps[i].ID;
				arShowValues = this.GetRowValues(arFilter, strName);
				if (!arShowValues)
					return false;
				if (this.showAbsent)
				{
					arCanBuyValues = [];
					var tmpFilter = [];
					tmpFilter = BX.clone(arFilter, true);
					for (var j = 0; j < arShowValues.length; j++)
					{
						tmpFilter[strName] = arShowValues[j];
						if (this.GetCanBuy(tmpFilter))
							arCanBuyValues[arCanBuyValues.length] = arShowValues[j];
					}
				}
				else
				{
					arCanBuyValues = arShowValues;
				}
				if (!!this.selectedValues[strName] && BX.util.in_array(this.selectedValues[strName], arCanBuyValues))
					arFilter[strName] = this.selectedValues[strName];
				else
					arFilter[strName] = arCanBuyValues[0];
				this.UpdateRow(i, arFilter[strName], arShowValues, arCanBuyValues);
			}
			this.selectedValues = arFilter;
			this.ChangeInfo();
		}
		return true;
	};

	window.JCCatalogTopBanner.prototype.RowLeft = function()
	{
		var target = BX.proxy_context;
		if (!!target && target.hasAttribute('data-treevalue'))
		{
			var strTreeValue = target.getAttribute('data-treevalue');
			var index = -1;
			for (var i = 0; i < this.treeProps.length; i++)
			{
				if (this.treeProps[i].ID == strTreeValue)
				{
					index = i;
					break;
				}
			}
			if (-1 < index && 5 < this.showCount[index])
			{
				if (0 > this.showStart[index])
				{
					this.showStart[index]++;
					BX.adjust(this.obTreeRows[index].LIST, { style: { marginLeft: this.showStart[index]*20+'%' }});
				}
			}
		}
	};

	window.JCCatalogTopBanner.prototype.RowRight = function()
	{
		var target = BX.proxy_context;
		if (!!target && target.hasAttribute('data-treevalue'))
		{
			var strTreeValue = target.getAttribute('data-treevalue');
			var index = -1;
			for (var i = 0; i < this.treeProps.length; i++)
			{
				if (this.treeProps[i].ID == strTreeValue)
				{
					index = i;
					break;
				}
			}
			if (-1 < index && 5 < this.showCount[index])
			{
				if ((5 - this.showStart[index]) < this.showCount[index])
				{
					this.showStart[index]--;
					BX.adjust(this.obTreeRows[index].LIST, { style: { marginLeft: this.showStart[index]*20+'%' }});
				}
			}
		}
	};

	window.JCCatalogTopBanner.prototype.UpdateRow = function(intNumber, activeID, showID, canBuyID)
	{
		var i = 0;
		var value;
		var countShow = 0;
		var strNewLen = '';
		if (-1 < intNumber && intNumber < this.obTreeRows.length)
		{
			var RowItems = BX.findChildren(this.obTreeRows[intNumber].LIST, {tagName: 'li'}, false);
			if (!!RowItems && 0 < RowItems.length)
			{
				countShow = showID.length;
				strNewLen = (5 < countShow ? (100/countShow)+'%' : '20%');
				var obData = {
					props: { className: '' },
					style: {
						width: strNewLen
					}
				};
				if ('PICT' == this.treeProps[intNumber].SHOW_MODE)
					obData.style.paddingTop = strNewLen;
				for (i = 0; i < RowItems.length; i++)
				{
					value = RowItems[i].getAttribute('data-onevalue');
					if (BX.util.in_array(value, canBuyID))
					{
						if (value == activeID)
							obData.props.className = 'bx_active';
						else
							obData.props.className = '';
					}
					else
					{
						if (value == activeID)
							obData.props.className = 'bx_active bx_missing';
						else
							obData.props.className = 'bx_missing';
					}
					if (BX.util.in_array(value, showID))
						obData.style.display = '';
					else
						obData.style.display = 'none';
					BX.adjust(RowItems[i], obData);
				}
				obData = {
					style: {
						width: (5 < countShow ? 20*countShow : 100)+'%',
						marginLeft: '0%'
					}
				};
				BX.adjust(this.obTreeRows[intNumber].LIST, obData);
				if ('PICT' == this.treeProps[intNumber].SHOW_MODE)
					BX.adjust(this.obTreeRows[intNumber].CONT, {props: {className: (5 < countShow ? 'bx_item_detail_scu full' : 'bx_item_detail_scu')}});
				else
					BX.adjust(this.obTreeRows[intNumber].CONT, {props: {className: (5 < countShow ? 'bx_item_detail_size full' : 'bx_item_detail_size')}});
				if (5 < countShow)
				{
					BX.adjust(this.obTreeRows[intNumber].LEFT, {style: {display: ''}});
					BX.adjust(this.obTreeRows[intNumber].RIGHT, {style: {display: ''}});
				}
				else
				{
					BX.adjust(this.obTreeRows[intNumber].LEFT, {style: {display: 'none'}});
					BX.adjust(this.obTreeRows[intNumber].RIGHT, {style: {display: 'none'}});
				}
				this.showCount[intNumber] = countShow;
				this.showStart[intNumber] = 0;
			}
		}
	};

	window.JCCatalogTopBanner.prototype.GetRowValues = function(arFilter, index)
	{
		var arValues = [];
		var boolSearch = false;
		var i = 0;
		if (0 === arFilter.length)
		{
			for (i = 0; i < this.offers.length; i++)
			{
				if (!BX.util.in_array(this.offers[i].TREE[index], arValues))
					arValues[arValues.length] = this.offers[i].TREE[index];
			}
			boolSearch = true;
		}
		else
		{
			for (i = 0; i < this.offers.length; i++)
			{
				var boolOneSearch = true;
				for (var j in arFilter)
				{
					if (arFilter[j] != this.offers[i].TREE[j])
					{
						boolOneSearch = false;
						break;
					}
				}
				if (boolOneSearch)
				{
					if (!BX.util.in_array(this.offers[i].TREE[index], arValues))
						arValues[arValues.length] = this.offers[i].TREE[index];
					boolSearch = true;
				}
			}
		}
		return (boolSearch ? arValues : false);
	};

	window.JCCatalogTopBanner.prototype.GetCanBuy = function(arFilter)
	{
		var boolSearch = false;
		for (var i = 0; i < this.offers.length; i++)
		{
			var boolOneSearch = true;
			for (var j in arFilter)
			{
				if (arFilter[j] != this.offers[i].TREE[j])
				{
					boolOneSearch = false;
					break;
				}
			}
			if (boolOneSearch)
			{
				if (this.offers[i].CAN_BUY)
				{
					boolSearch = true;
					break;
				}
			}
		}
		return boolSearch;
	};

	window.JCCatalogTopBanner.prototype.SetCurrent = function()
	{
		var arFilter = {};
		var arCanBuyValues = [];
		var current = this.offers[this.offerNum].TREE;
		for (var i = 0; i < this.treeProps.length; i++)
		{
			var strName = 'PROP_'+this.treeProps[i].ID;
			var arShowValues = this.GetRowValues(arFilter, strName);
			if (!arShowValues)
				break;
			if (BX.util.in_array(current[strName], arShowValues))
			{
				arFilter[strName] = current[strName];
			}
			else
			{
				arFilter[strName] = arShowValues[0];
				this.offerNum = 0;
			}
			if (this.showAbsent)
			{
				arCanBuyValues = [];
				var tmpFilter = [];
				tmpFilter = BX.clone(arFilter, true);
				for (var j = 0; j < arShowValues.length; j++)
				{
					tmpFilter[strName] = arShowValues[j];
					if (this.GetCanBuy(tmpFilter))
						arCanBuyValues[arCanBuyValues.length] = arShowValues[j];
				}
			}
			else
			{
				arCanBuyValues = arShowValues;
			}
			this.UpdateRow(i, arFilter[strName], arShowValues, arCanBuyValues);
		}
		this.selectedValues = arFilter;
		this.ChangeInfo();
	};

	window.JCCatalogTopBanner.prototype.ChangeInfo = function()
	{
		var index = -1;
		for (var i = 0; i < this.offers.length; i++)
		{
			var boolOneSearch = true;
			for (var j in this.selectedValues)
			{
				if (this.selectedValues[j] != this.offers[i].TREE[j])
				{
					boolOneSearch = false;
					break;
				}
			}
			if (boolOneSearch)
			{
				index = i;
				break;
			}
		}
		if (-1 < index)
		{
			if (!!this.obPict)
			{
				if (!!this.offers[index].PREVIEW_PICTURE)
					BX.adjust(this.obPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE.SRC+')'}});
				else
					BX.adjust(this.obPict, {style: {backgroundImage: 'url('+this.defaultPict.pict.SRC+')'}});
			}
			if (this.secondPict && !!this.obSecondPict)
			{
				if (!!this.offers[index].PREVIEW_PICTURE_SECOND)
					BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE_SECOND.SRC+')'}});
				else if (!!this.offers[index].PREVIEW_PICTURE.SRC)
					BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE.SRC+')'}});
				else if (!!this.defaultPict.secondPict)
					BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.defaultPict.secondPict.SRC+')'}});
				else
					BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.defaultPict.pict.SRC+')'}});
			}
			if (this.showSkuProps && !!this.obSkuProps)
			{
				if (0 === this.offers[index].DISPLAY_PROPERTIES.length)
				{
					BX.adjust(this.obSkuProps, {style: {display: 'none'}, html: ''});
				}
				else
				{
					BX.adjust(this.obSkuProps, {style: {display: ''}, html: this.offers[index].DISPLAY_PROPERTIES});
				}
			}
			if (!!this.obPrice)
			{
				var strPrice = this.offers[index].PRICE.PRINT_DISCOUNT_VALUE;
				if (this.showOldPrice && (this.offers[index].PRICE.DISCOUNT_VALUE != this.offers[index].PRICE.VALUE))
					strPrice += ' <span>'+this.offers[index].PRICE.PRINT_VALUE+'</span>';
				BX.adjust(this.obPrice, {html: strPrice});
				if (this.showPercent)
				{
					var obData = {};
					if (this.offers[index].PRICE.DISCOUNT_VALUE != this.offers[index].PRICE.VALUE)
					{
						obData = {
							style: {
								display: ''
							},
							html: this.offers[index].PRICE.DISCOUNT_DIFF_PERCENT
						};
					}
					else
					{
						obData = {
							style: {
								display: 'none'
							},
							html: ''
						};
					}
					if (!!this.obDscPerc)
						BX.adjust(this.obDscPerc, obData);
					if (!!this.obSecondDscPerc)
						BX.adjust(this.obSecondDscPerc, obData);
				}
			}
			this.offerNum = index;
			if (this.showQuantity)
			{
				this.QuantitySet(this.offerNum);
			}
		}
	};

	window.JCCatalogTopBanner.prototype.Basket = function()
	{
		if (!this.canBuy)
			return;

		var ajaxUrl = '';
		var ajaxParams = {
			ajax_basket: 'Y'
		};
		switch (this.productType)
		{
		case 1://product
		case 2://set
			ajaxUrl = this.product.addUrl;
			if (this.showQuantity)
				ajaxParams[this.basketData.quantity] = this.obQuantity.value;
			break;
		case 3://sku
			ajaxUrl = this.offers[this.offerNum].ADD_URL;
			if (this.showQuantity)
				ajaxParams[this.basketData.quantity] = this.obQuantity.value;
			break;
		default:
			return;
		}
		if ('' === ajaxUrl)
			ajaxUrl = this.ajaxPath;
		ajaxParams.sessid = BX.bitrix_sessid();
		BX.ajax.loadJSON(
			ajaxUrl,
			ajaxParams,
			BX.delegate(this.ShowBasketPopup, this)
		);
	};

	window.JCCatalogTopBanner.prototype.ShowBasketPopup = function(arResult)
	{
		var strContent = '';
		var strName = '';
		var strPict = '';
		if ('object' == typeof(arResult))
		{
			if ('OK' == arResult.STATUS)
			{
				switch(this.productType)
				{
				case 1://
				case 2://
					strName = this.product.name;
					strPict = this.product.pict.SRC;
					break;
				case 3:
					strName = this.offers[this.offerNum].NAME;
					strPict = this.offers[this.offerNum].PREVIEW_PICTURE.SRC;
					break;
				}
				strContent = '<p>'+BX.message('ADD_TO_BASKET_OK')+'</p>';
				strContent += '<img src="'+strPict+'" height="130"><p>'+strName+'</p>';
			}
			else
			{

			}
		}
		else
		{

		}

		var popup = BX.PopupWindowManager.create('CatalogTopBannerBasket'+this.visual.ID, null, {
			autoHide: false,
			offsetLeft: 0,
			offsetTop: 0,
			overlay : true,
			draggable: {restrict:true},
			closeByEsc: true,
			closeIcon: { right : "12px", top : "10px"},
			content: '' +
				'<div style="width:300px;text-align: center;padding-top:5px; margin-bottom: 10px;">' +
				strContent+
				'<a class="bx_bt_blue bx_medium" href="'+BX.message("setButtonBuyUrl")+'"><span class="bx_icon_cart"></span><span>'+BX.message("setButtonBuyName")+'</span></a>'+
				'</div>'
			});

		popup.show();
	};


if (!!window.JCCatalogTopBannerList)
	return;

window.JCCatalogTopBannerList = function (arParams)
{
	this.params = null;
	this.prevIndex = -1;
	this.currentIndex = 0;
	this.size = 0;
	this.rotate = false;
	this.timerRotate = 30000;
	this.rotatePause = false;
	this.showPages = false;
	this.errorCode = 0;

	this.slider = {
		cont: null,
		row: null,
		items: null,
		arrows: null,
		left: null,
		right: null,
		pagination: null,
		pages: null
	};

	if (!arParams || 'object' != typeof(arParams))
	{
		this.errorCode = -1;
	}
	if (0 === this.errorCode)
	{
		this.params = arParams;
	}
	if (!!this.params.rotate)
		this.rotate = this.params.rotate;
	if (!!this.params.timerRotate)
	{
		this.params.timerRotate = parseInt(this.params.timerRotate);
		if (!isNaN(this.params.timerRotate) && 0 <= this.params.timerRotate)
			this.timerRotate = this.params.timerRotate;
	}

	if (0 === this.errorCode)
	{
		BX.ready(BX.delegate(this.Init,this));
	}
};

window.JCCatalogTopBannerList.prototype.Init = function()
{
	if (0 > this.errorCode)
		return;

	var i = 0;
	if (!!this.params.cont)
	{
		this.slider.cont = BX(this.params.cont);
	}
	if (!!this.params.items && BX.type.isArray(this.params.items))
	{
		this.slider.items = [];
		for (i = 0; i < this.params.items.length; i++)
		{
			this.slider.items[this.slider.items.length] = BX(this.params.items[i]);
			this.slider.items[this.slider.items.length-1].style.opacity = 0;
			if (!this.slider.row)
				this.slider.row = this.slider.items[this.slider.items.length-1].parentNode;
		}
		this.slider.items[0].style.opacity = 1;
		this.size = this.slider.items.length;
	}

	if (!!this.params.arrows)
	{
		if (BX.type.isDomNode(this.params.arrows))
			this.slider.arrows = this.params.arrows;
		else if ('object' == typeof(this.params.arrows))
			this.slider.arrows = this.slider.cont.appendChild(BX.create(
				'DIV',
				{
					props: {
						id: this.params.arrows.id,
						className: this.params.arrows.class
					}
				}
			));
		else if (BX.type.isNotEmptyString(this.params.arrows))
			this.slider.arrows = BX(this.params.arrows);
	}
	if (!this.slider.arrows)
	{
		this.slider.arrows = this.slider.cont;
	}
	if (!!this.params.left)
	{
		if (BX.type.isDomNode(this.params.left))
			this.slider.left = this.params.left;
		else if ('object' == typeof(this.params.left))
			this.slider.left = this.slider.arrows.appendChild(BX.create(
				'DIV',
				{
					props: {
						id: this.params.left.id,
						className: this.params.left.class
					}
				}
			));
		else if (BX.type.isNotEmptyString(this.params.left))
			this.slider.left = BX(this.params.left);
	}
	if (!!this.params.right)
	{
		if (BX.type.isDomNode(this.params.right))
			this.slider.right = this.params.right;
		else if ('object' == typeof(this.params.right))
			this.slider.right = this.slider.arrows.appendChild(BX.create(
				'DIV',
				{
					props: {
						id: this.params.right.id,
						className: this.params.right.class
					}
				}
			));
		else if (BX.type.isNotEmptyString(this.params.right))
			this.slider.right = BX(this.params.right);
	}
	if (!!this.params.pagination)
	{
		if (BX.type.isDomNode(this.params.pagination))
			this.slider.pagination = this.params.pagination;
		else if ('object' == typeof(this.params.pagination))
			this.slider.pagination = this.slider.cont.appendChild(BX.create(
				'UL',
				{
					props: {
						id: this.params.pagination.id,
						className: this.params.pagination.class
					}
				}
			));
		else if (BX.type.isNotEmptyString(this.params.pagination))
			this.slider.pagination = BX(this.params.pagination);
	}
	if (!!this.slider.pagination)
	{
		this.showPages = true;
		this.slider.pages = [];
		for (i = 0; i < this.slider.items.length; i++)
		{
			this.slider.pages[this.slider.pages.length] = this.slider.pagination.appendChild(BX.create(
				'LI',
				{
					props: {
						className: (0 === i ? 'active' : '')
					},
					attrs: {
						'data-pagevalue': i.toString()
					},
					events: {
						'click': BX.delegate(this.RowMove, this)
					},
					html: '<span></span>'
				}
			));
		}
	}

	if (0 === this.errorCode)
	{
		if (this.rotate && !!this.slider.cont && 0 < this.timerRotate)
		{
			BX.bind(this.slider.cont, 'mouseover', BX.delegate(this.RotateStop, this));
			BX.bind(this.slider.cont, 'mouseout', BX.delegate(this.RotateStart, this));
			setTimeout(BX.delegate(this.RowRotate, this), this.timerRotate);
		}
		if (!!this.slider.left)
		{
			BX.bind(this.slider.left, 'click', BX.delegate(this.RowLeft, this));
		}
		if (!!this.slider.right)
		{
			BX.bind(this.slider.right, 'click', BX.delegate(this.RowRight, this));
		}
	}
};

window.JCCatalogTopBannerList.prototype.RowStart = function()
{
	if (0 > this.errorCode)
		return;
	BX.removeClass(this.slider.items[this.prevIndex], 'active');
	if (this.showPages)
	{
		BX.removeClass(this.slider.pages[this.prevIndex], 'active');
	}
};

window.JCCatalogTopBannerList.prototype.RowAnimate = function(state)
{
	if (0 > this.errorCode)
		return;
	this.slider.items[this.prevIndex].style.opacity = (100 - state.opacity)/100;
	this.slider.items[this.currentIndex].style.opacity = state.opacity/100;
};

window.JCCatalogTopBannerList.prototype.RowComplete = function()
{
	if (0 > this.errorCode)
		return;
	BX.addClass(this.slider.items[this.currentIndex], 'active');
	if (this.showPages)
	{
		BX.addClass(this.slider.pages[this.currentIndex], 'active');
	}
};

window.JCCatalogTopBannerList.prototype.RowLeft = function()
{
	if (0 > this.errorCode)
		return;
	this.prevIndex = this.currentIndex;
	this.currentIndex = (0 === this.currentIndex ? this.size : this.currentIndex)-1;
	new BX.easing({
		duration : 800,
		start : { left : -this.prevIndex*100 },
		finish : { left : -this.currentIndex*100 },
		transition : BX.easing.transitions.quart,
		step : BX.delegate(function(state){
			this.slider.row.style.left = state.left+'%';
		}, this)
	}).animate();
	this.RowStart();
	new BX.easing({
		duration : 1200,
		start : { opacity : 0 },
		finish : { opacity : 100 },
		transition : BX.easing.transitions.quart,
		step : BX.delegate(function(state) {this.RowAnimate(state); }, this),
		complete: BX.delegate(this.RowComplete, this)
	}).animate();
};

window.JCCatalogTopBannerList.prototype.RowRight = function()
{
	if (0 > this.errorCode)
		return;
	this.prevIndex = this.currentIndex;
	this.currentIndex++;
	if (this.currentIndex == this.size)
		this.currentIndex = 0;
	new BX.easing({
		duration : 800,
		start : { left : -this.prevIndex*100 },
		finish : { left : -this.currentIndex*100 },
		transition : BX.easing.transitions.quart,
		step : BX.delegate(function(state){
			this.slider.row.style.left = state.left+'%';
		}, this)
	}).animate();
	this.RowStart();
	new BX.easing({
		duration : 1200,
		start : { opacity : 0 },
		finish : { opacity : 100 },
		transition : BX.easing.transitions.quart,
		step : BX.delegate(function(state) {this.RowAnimate(state); }, this),
		complete: BX.delegate(this.RowComplete, this)
	}).animate();
};

window.JCCatalogTopBannerList.prototype.RowMove = function()
{
	if (0 > this.errorCode)
		return;
	var target = BX.proxy_context;
	if (!!target && target.hasAttribute('data-pagevalue'))
	{
		var pageValue = parseInt(target.getAttribute('data-pagevalue'));
		if (!isNaN(pageValue) && pageValue < this.size)
		{
			this.prevIndex = this.currentIndex;
			this.currentIndex = pageValue;
			this.slider.row.style.left = -this.currentIndex*100+'%';
			this.slider.items[this.prevIndex].style.opacity = 0;
			this.RowStart();
			new BX.easing({
				duration : 800,
				start : { opacity : 0 },
				finish : { opacity : 100 },
				transition : BX.easing.transitions.quart,
				step : BX.delegate(function(state) { this.RowAnimate(state); }, this),
				complete: BX.delegate(this.RowComplete, this)
			}).animate();
		}
	}
};

window.JCCatalogTopBannerList.prototype.RowRotate = function()
{
	if (0 > this.errorCode)
		return;
	if (!this.rotatePause)
	{
		this.RowRight();
	}
	setTimeout(BX.delegate(this.RowRotate, this), this.timerRotate);
};

window.JCCatalogTopBannerList.prototype.RotateStart = function()
{
	if (0 > this.errorCode)
		return;
	this.rotatePause = false;
};

window.JCCatalogTopBannerList.prototype.RotateStop = function()
{
	if (0 > this.errorCode)
		return;
	this.rotatePause = true;
};
})(window);