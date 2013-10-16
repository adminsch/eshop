jQuery(document).ready(function (){
	//加载完成后有剔除数量为0的商品
	checkZeroProducts();
	//客户端 加减功能
	if(jQuery('#cart')){
		changeCount();
	};
});

function changeCount(){
	var cutNum = jQuery('#cart .count a:even');
	var addNum = jQuery('#cart .count a:odd');
	var aValue = jQuery('#cart .count input');
	var aProductId = jQuery('#cart .name input');
	
	for(var i=0;i<cutNum.length;i++){
		cutNum[i].index = i;
		addNum[i].index = i;
		cutNum[i].onclick = function (){
			op(this, '-');
		};
		addNum[i].onclick =function (){
			op(this, '+');
		};
	};
	function op(obj, op){
		for(var i=0; i<aValue.length;i++){
			aValue[i].index = i;
			aProductId[i].index = i;
			console.log(aProductId[i]);
		};
		//商品id
		var productId = aProductId[obj.index].value; 
		switch (op) {
			case '+':
			aValue[obj.index].value++;
			//向后台发送请求
			console.log(productId+"   "+aValue[obj.index].value);
			buyNumFn(productId, aValue[obj.index].value);
				break;
			case '-':
			if(aValue[obj.index].value == 1){
				var bConfirm = confirm('是否删除该商品？');
				if(bConfirm){
					aValue[obj.index].value = 0;
					//向后台发送请求
					buyNumFn(productId, 0);
					checkZeroProducts();
				}else{
					return false;
				}
				return false;
			};
			aValue[obj.index].value--;
			buyNumFn(productId, aValue[obj.index].value);
				break;
		};
	};
};

function checkZeroProducts(){
	var singleLi = jQuery('#cart div li');
	var numZero = jQuery('.count input');
	if(!numZero || !singleLi){
		return false;
	};
	for(var i=0;i<numZero.length;i++){
		if(numZero[i].value == 0){
			numZero[i] = jQuery(numZero[i]);
			singleLi[i] = jQuery(singleLi[i]);
			singleLi[i].remove();
			console.log('有元素被移除');
		};
	};
};

//向后台发送请求
var buyNumFn = function(productId, buyNum) {
	jQuery.ajax({
		url : 'shopping/setProduct.action',
		type : 'post',
		dataType : 'json',
		data : {
			id : productId,
			buyNum : buyNum
		},
		timeout : 1000,
		async:false,
		success : function(data) {
			if (data.isSuccess == 0) {
				alert("亲，物流不给力，库存不足...");
			} else {
				var items = data.cartList.items;
				for ( var i = 0; i < items.length; i++) {
					if (productId == items[i].productId) {
						document.getElementById(productId).innerHTML = "￥ <span >"
								+ items[i].itempris + "</span>";
					}
				}
				jQuery(".submit span:first").html(data.cartList.totalPrice);
			}
		}
	});
};