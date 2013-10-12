function initPage()
{
	//index.html
	if(jQuery('#content')[0]){
		bannerRoll();
	};
	//productList.html
	if(jQuery('#sideBar')[0]){
		hoverStyle();
		observerScroll();
	};
	if(jQuery('#products')[0]){
		validateStock();
		popupLayer();
	};

	//aboutUs.html
	if(jQuery('.about')[0]){
		setInterval(function (){
			var img = jQuery('.about img');
			var borderLine = 1000-parseInt(img.css('width'))
			if( parseInt(img.css('left'))== 0){
				img.animate({
					left: borderLine,
				},'slow');
			}else if(parseInt(img.css('left')) == borderLine){
				console.log(borderLine);
				img.animate({
					left: 0,
				},'slow');
			};
		},1000);
	};
};

function bannerRoll()
{
	var count=0;
	var bLR=true;
	var oBan=jQuery('#content')[0];
	var oUl=oBan.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var left = oBan.getElementsByTagName('span')[0];
	var right = oBan.getElementsByTagName('span')[1];
	setInterval(function ()
	{
		oUl.style.width=1000*aLi.length+'px';
		bLR? count++ : count--;
		if(count >=aLi.length-1){
			count=aLi.length-1;
			bLR=false;
		}if(count <= 0){
			count=0;
			bLR=true;
		};
		checkCount(count);
		startMove(oUl, {left: -1000*count});
	},5000);
	addEvent(left, 'click', function (){
		count--;
		if(count <= 0){
			count = 0;
		};
		startMove(oUl, {left: -1000*count});
		checkCount(count);
	});
	addEvent(right, 'click', function (){
		count++;
		if(count >= aLi.length-1){
			count = aLi.length-1;
		};
		checkCount(count);
		startMove(oUl, {left: -1000*count});
	});
	function checkCount(count){
		var oDiv = oBan.getElementsByTagName('div')[0];
		var aLi = oDiv.getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++){
			aLi[i].index = i;
			aLi[i].className = '';
		};
		aLi[count].className = 'active';
	};
};

function hoverStyle()
{
	var btnLi = jQuery('#sideBar li');
	var aDiv = jQuery('#sideBar li div');
	for(var i=0;i<btnLi.length;i++){
		btnLi[i].index = i;
		btnLi[i].boolean = true;
		btnLi[i].onmouseover = function (){
			var _this = this;
			setTimeout(function (){
				if(_this.boolean){
					for(var j=0;j<aDiv.length;j++){
						aDiv[j].style.display = 'none';
					};
					aDiv[_this.index].style.display = 'block';
				}else{
					return false;
				};
			},200)
		};
		btnLi[i].onmouseout = function (){
			this.boolean = false;
		};
		btnLi[i].onmousemove = function (){
			this.boolean = true;
		};
	};
};

function validateStock()
{
	var aStock = jQuery('.details  span  strong');
	var oUp = jQuery('.details #up');
	var oDown = jQuery('.details #down');
	var aInput = jQuery('.details  div  input');
	for(var i=0;i<aStock.length;i++){
		aStock[i].index = i;
		oUp[i].index = i;
		oDown[i].index = i;
		aInput[i].index = i;
		//用于模拟最大库存，正式上线需删除随机数代码以免覆盖真实数据
		// aStock[i].innerHTML = parseInt(Math.random()*10);
		oUp[i].onmousedown = function (){
			changeCount(this, '+');
		};
		oDown[i].onmousedown = function (){
			changeCount(this, '-');
		};
		aInput[i].onblur = function ()
		{	
			var value = this.value;
			var max = parseInt(aStock[this.index].innerHTML);
			if(isNaN(value) || value > max){
				this.value = 1;
				alert('请注意您输入的格式！');
			};
		};
	};
	function changeCount(obj, op){
		var nInput = parseInt(aInput[obj.index].value);
		var nStock = parseInt(aStock[obj.index].innerHTML);
		switch(op) {
			case '+':
				if(nInput >= nStock){
					return false;
				}else{
					aInput[obj.index].value++;
				};
				break;
			case '-':
				if(nInput <= 1){
					return false;
				}else{
					aInput[obj.index].value--;
				};
				break;
		};
	};
};

function observerScroll(){
	jQuery(window).scroll(function() {
		var nScroll = jQuery(document).scrollTop();
		var sWidth = jQuery(window).width()-100;
		var oSide = jQuery('#sideBar');
		var mask = jQuery('#mask');
		var popupLayer = jQuery('#details');
		mask.fadeOut('fast');
		popupLayer.fadeOut('fast');
		oSide = oSide[0];
		if(nScroll > 160){
			startMove(oSide, {top: nScroll});
		}else{
			startMove(oSide, {top: 160});
		};
	});
};

function popupLayer(){
	var mask = jQuery('#mask');
	var popupLayer = jQuery('#details');
	var IdH1 = jQuery('#details h1')[0];
	var IdImg = jQuery('#details img')[0];
	var aDetalis = jQuery('.details');
	var aH1 = jQuery('.details h1');
	var aImg = jQuery('.details img');
	var sWidth = jQuery(window).width();
	var sHeight = jQuery(window).height();

	for(var i=1;i<aDetalis.length;i++){
		aImg[i].index = i;
		aImg[i] = jQuery(aImg[i]);
		aImg[i].bind('click', function (){
			var ScrollTop = jQuery(document).scrollTop();
			//弹出层值传递
			IdImg.src =  this.src;
			IdH1.innerHTML = aH1[this.index].innerHTML;
			mask.text('');
			mask.css({
				'width': sWidth,
				'height': sHeight,
				'top': ScrollTop
			});

			popupLayer.css({
				'top': ScrollTop+100,
				'left': sWidth/2-186
			});
			mask.fadeIn('slow');
			popupLayer.fadeIn('slow');
		});
	};
	mask.bind('click', function (){
		popupLayer.fadeOut('slow');
		mask.fadeOut('slow');
	});
	popupLayer.bind('click', function (e){
		popupLayer.fadeOut('slow');
		mask.fadeOut('slow');
		stopPropagation(e);
	});
};

addEvent(window, 'load', initPage);
