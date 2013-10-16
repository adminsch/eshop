var List = {
	1: ['饼干/糕点','糖果/巧克力','方便速食','坚果/蜜饯','肉/豆制品'],
	2: ['水','碳酸饮料','功能饮料','茶/咖啡饮料','牛奶乳品','果汁'],
	3: ['插线板','雨伞','纸制品','美容洗护','清洁/收纳'],
	4: ['明信片','书签','挂件/饰品','包包包包',''],
};

function initPage()
{
	//10.15 站点logo跳转链接
	hrefLogo();
	// 2013.10.10 百度统计图表Bug
	refuseBaiDu();

	//index.html
	var aLi = jQuery('#list li');
	if(aLi[0]){
		// console.log('当前页面的一级列表数为：' + aLi.length);
		addItem(aLi);
		getNavValue(jQuery('#list'));
	};
	//productList.html
	var aLiSide = jQuery('#sideBar li');
	if(aLiSide[0]){
		addItem(aLiSide);
		getNavValue(jQuery('#sideBar'));
	};


	//checkSearch
	var oSearchText = jQuery('#nav input:first');
	var oSearch = jQuery('#nav input:last');
	var oSpan = jQuery('#nav span')
	if(oSearch){
		oSearchText.bind('focus', function (){
			oSearch.attr('disabled', true);
		});
		if(null == oSearchText.val() || "" == oSearchText.val()){
			oSearch.attr('disabled', true);
		}else{
			oSearch.attr('disabled', false);
		}
		oSearchText.bind('blur', function (){
			if(oSearchText.val() == ''){
					oSearchText.val('请注意,不能搜索空值^_^');
					oSearch.attr('disabled', true);
			}else{
				oSearch.attr('disabled', false);
			}
		});
	};
};

function hrefLogo(){
	var hrefLogo = jQuery('#nav div h1');
	if(hrefLogo){
		hrefLogo.click(function() {
			window.location.href = '/workSpace/eShopping/index.html';
		});
	}
};

//屏蔽百度图标
function refuseBaiDu(){
	var a = document.getElementsByTagName('a')[0];
	if(a.target == '_blank'){
		a.style.display = 'none';
	};
};

//生成目录
function addItem(aLi)
{
	for(var i=0;i<aLi.length;i++){
		var oDiv = document.createElement('div');
		for(var j=0;j<List[i+1].length;j++){
			// console.log(List[i+1].length)
			var oA = '<a href="javascript:void(0);">'+
				List[i+1][j] + 
					'</a>';
			oDiv.innerHTML += oA;
		};
		aLi[i].appendChild(oDiv);
	};
};

//导航栏取值
function getNavValue(obj){
	var aA = obj[0].getElementsByTagName('a');
	for(var i=0;i<aA.length;i++){
		aA[i].onclick = function (){
			var value = this.innerHTML;
			if(value != ''){
				//console.log(value);
				window.location.href = "/eshop/shopping/showProduct.action?keyword="+encodeURI(encodeURI(value))+"&isShowProduct=1";
				return true;
			}else{
				//console.log('空值');
				return false;
			}
		};
	};
};

addEvent(window, 'load', initPage);