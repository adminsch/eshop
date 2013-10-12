// 2013.10.11


/* 操作购物车列表 */

function addProduct(id) {
	jQuery.ajax({
		url : 'shopping/addProduct.action',
		type : 'post',
		dataType : 'json',
		data : {
			id : id
		},
		timeout : 2000,
		success : function(data) {
			if (data.isSuccess == 0) {
				alert("抱歉！物理不给力，库存不足");
			} else {
			//	var num = 0;
				//num = document.getElementsByName(id)[0].value;
				//num++;
				//document.getElementsByName(id)[0].value = num;
				var items = data.cartList.items;
				for ( var i = 0; i < items.length; i++) {
					if (id == items[i].productId) {
						document.getElementsByName(id)[0].value = items[i].count;
						document.getElementById(id).innerHTML = "￥ <span >"
								+ items[i].itempris + "</span>";
						break;
					}
				}
				jQuery(".submit span:first").html(data.cartList.totalPrice);
			}
		}
	});
}
function decProduct(id) {
	jQuery.ajax({
		url : 'shopping/decProduct.action',
		type : 'post',
		dataType : 'json',
		data : {
			id : id
		},
		timeout : 2000,
		success : function(data) {
			if (data.isSuccess == 0) {
				alert("已经是0了");
			} else {
				var num = 0;
				num = document.getElementsByName(id)[0].value;
				if (num > 0) {
					num--;
				}
				document.getElementsByName(id)[0].value = num;
				var items = data.cartList.items;
				for ( var i = 0; i < items.length; i++) {
					if (id == items[i].productId) {
						document.getElementById(id).innerHTML = "￥ <span >"
								+ items[i].itempris + "</span>";
					}
				}
				jQuery(".submit span:first").html(data.cartList.totalPrice);
			}
		}
	});
}
function setProduct(id) {
	var num = 0;
	num = document.getElementsByName(id)[0].value;
	if(isNaN(num)){
		alert("亲！请输入数字，我们将按照之前的购买数量算账。。。");
		return false;
	}
	jQuery.ajax({
		url : 'shopping/setProduct.action',
		type : 'post',
		dataType : 'json',
		data : {
			id : id,
			buyNum : num
		},
		timeout : 2000,
		success : function(data) {
			if (data.isSuccess == 0) {
				alert("亲，物流不给力，库存不足...");
			} else {
				var items = data.cartList.items;
				for ( var i = 0; i < items.length; i++) {
					if (id == items[i].productId) {
						document.getElementById(id).innerHTML = "￥ <span >"
								+ items[i].itempris + "</span>";
					}
				}
				jQuery(".submit span:first").html(data.cartList.totalPrice);
			}
		}
	});
}