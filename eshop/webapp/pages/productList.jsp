<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/pages/common/taglibs.jsp"%>
<html>
<head>
<base href="<%=basePath%>">
<title>商品列表</title>
	<!-- begin cssStyle -->
	<link rel="stylesheet" href="<%=basePath %>css/reset.css" />
	<link rel="stylesheet" href="<%=basePath %>css/common.css" />
	<link rel="stylesheet" href="<%=basePath %>css/index.css" />
	<!-- end cssStyle -->
	<link rel="shortcut icon" href="favicon.ico" />
	<script type="text/javascript" src="<%=basePath %>js/jQuery.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/buffalo/prototype.js"></script> 
	<script type="text/javascript" src="<%=basePath %>js/buffalo/buffalo.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/list.js"></script>
		
	<script type="text/javascript" src="<%=basePath %>js/index.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/pagelist.js"></script>

	<meta name="baidu-site-verification" content="5h4Yx0RLb5" />
	<meta name="Keywords" content="上理生活，usstlife，零食，校园购物，校园淘宝，学生超市，礼品" />
	<meta name="Description" content="
上理生活 USSTlife是上海理工大学勤工助学中心网络事业部搭建的校园电子商务平台，竭诚服务上理师生。" />
	<script type="text/javascript">
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F901a05d7f349b8a0909a0a43560f9168' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<script type="text/javascript">
	var i=0;
	jQuery(document).ready(function (){
		jQuery(".details a").click(function(){
			var form = jQuery(this).parent().parent();
			var oForm = form[0];
			var aInput = oForm.getElementsByTagName('input');
			var id = aInput[0].value;
			var num = aInput[1].value;
			//mask style
			var sWidth = jQuery(window).width();
			var sHeight = jQuery(window).height();
			var mask = jQuery('#mask');
				jQuery(this).ajaxStart(function (){
					var ScrollTop = jQuery(document).scrollTop();
					mask.css({
						'width': sWidth,
						'height': sHeight,
						'top': ScrollTop
					});
					mask.fadeIn('slow');
				});
				jQuery.ajax({
					url : '<%=basePath %>shopping/saveOrderItem.action',
					type : 'post',
					dataType : 'json',
					data : {id: id, buyNum:num},
					timeout:2000,
					success : 
						function (data) {
						if(data.buyNum == 0){
							alert("亲！物流暂时不给力，欢迎以后来选购！")
						}else
							console.log("成功加入购物车!");
					}
				});
				jQuery(this).ajaxStop(function (){
					console.log('请求结束!');
					mask.fadeOut('slow');
					mask.text('正在添加商品……请稍后');
				});
			});
		});

	var endPoint = "<%=request.getContextPath()%>/bfapp";
	var buffalo = new Buffalo(endPoint);
	// 加入购物车
	function saveOrderItem(id, num) {
		// 第一个参数是调用业务的方法，第二个是参数列表，用[]括起来，第三个是回调接口，
		// 需要调用的都可以写在这个函数中
		var serviceMethod = "productViewServiceAjax.saveOrderItem";
		var params = [id, num];
		buffalo.remoteCall(
				serviceMethod,
				params,
				function(reply) {
					if (reply.getResult()) 
					{
						alert(reply.getResult());
					};

				});
	};

	</script>
</head>
<body>
	<div id="header">
		<div>
			<h1><s:text name="com.eshop.header" /></h1>
			<h5><a href="javascript:void(0);" id = "cartList">&nbsp;我的购物车</a></h5>
			<h5>|</h5>
				<s:if test="#session.loginUser != null">
					<h5><a href="javascript:void(0);"  id = "">&nbsp;您好！&nbsp;<s:property value="#session.loginUser.name" />&nbsp;&nbsp;</a></h5>
				</s:if>
				<s:else>
			<h5><a href="pages/login.jsp" id="login">登&nbsp;&nbsp;录&nbsp;</a></h5>
			<h5>|</h5>
			<h5><a href="pages/register.jsp" id="login">注&nbsp;&nbsp;册&nbsp;</a></h5>
			</s:else>
		</div>
	</div>
	<div id="nav">
		<div>
			<h1><s:text name="com.eshop.name" /></h1>
			<ul>
				<li>
					<a href="main.jsp">首&nbsp;&nbsp;页</a>
				</li>
				<li>
					<a href="pages/activity.jsp">活&nbsp;&nbsp;动</a>
				</li>
				<li>
					<a href="shopping/allProduct.action">全部商品</a>
					<ul id="list">
						<li>
							<a href="javascript:void(0);">美味的食品</a>
						</li>
						<li>
							<a href="javascript:void(0);">好喝的饮品</a>
						</li>
						<li>
							<a href="javascript:void(0);">必备日用品</a>
						</li>
						<li>
							<a href="javascript:void(0);">土豪送的礼品</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="pages/aboutUs.jsp">关于我们</a>
				</li>
				<li>
				<form action="<%=basePath %>shopping/searchProduct.action" method="post" name="search">
				&nbsp;
				<input type="text" name="keyword" size="20" value="" onfocus="this.value=''"/>
				<span><input type="button"  onclick="document.search.submit();" value="搜索" class="search" id="btn"/></span>
				</form>
				</li>
			</ul>
		</div>
	</div>

	<div id="sideBar">
		<div>
			<ul>
				<li>
					<a href="javascript:void(0);" class="active">美味的食品</a>
				</li>
				<li>
					<a href="javascript:void(0);">好喝的饮品</a>
				</li>
				<li>
					<a href="javascript:void(0);">必备日用品</a>
				</li>
				<li>
					<a href="javascript:void(0);">土豪送的礼品</a>
				</li>
			</ul>
		</div>
	</div>
	
	<!--begin mask  -->
	<div id="mask" >
	</div>
	<div id="details" class="details">
		<form action="">
			<input type="hidden" value="dsfasdfasdfsdaf"/>
			<h1></h1>
			<img src="../images/t4.jpg" alt="" />
			<div class="info">
				<!-- ￥ <strong>10.10</strong> -->
				<h5 id="up">+</h5>
				<input type="text" size="1" value="1" max="10"/>
				<h5 id="down">-</h5>
			</div>
			<span>库存量:<strong>10</strong></span>
			<div class="add">
				<a href="javascript:void(0);">添加</a>
			</div>
		</form>
	</div>
	<!--end mask-->
	<div id="products">
	<div id="productList">
		<s:iterator value="#request.productList.list" status="i">
		<div class="details">
			<form action="<%=basePath %>shopping/saveOrderItem.action" id="productForm" method="post">
			<input type="hidden" name="id" value="<s:property value='id' />">
			<h1><s:property value='name' /></h1>
			<img src="<s:property value='imageBig' />" alt="" />
			<div class="info">
				￥ <strong><s:property value='price' /></strong>
				<h5 id="up">+</h5>
				<input type="text" value="1" name="buyNum" max="<s:property value='remainNumber' />" size="1"/>
				<h5 id="down">-</h5>
			</div>
			<span>库存量:<strong><s:property value='remainNumber' /></strong></span>
			<div class="add">
				<a href="javascript:void(0);">添加</a>
			</div>
			</form>
		</div>
		</s:iterator>
	</div><!-- end of productList div -->
		<div id="panelPage">
			<s:if test="keyword == null">
			<form action="<%=basePath %>shopping/allProduct.action" id="pageFrm"  method="post" >
			</s:if>
			<s:elseif test="isShowProduct == 1">
			<form action="<%=basePath %>shopping/showProduct.action"  id="pageFrm"  method="post">
			<input type="hidden" name="isShowProduct" value="<s:property value="isShowProduct"/>"  > 
			</s:elseif>
			<s:else>
			<form action="<%=basePath %>shopping/searchProduct.action" id="pageFrm"   method="post">
			</s:else>
			<ul>
				<li>
					<!-- 搜索关键词 -->
					<s:if test="keyword != null">
					<input type="hidden" name="keyword" value="<s:property value="keyword"/>" >
					</s:if>
					<input type="hidden" name="pageNum" id="pageNo" value="<s:property value="#request.productList.pageNumber"/>" >
					<a id="pre" href="javascript:void(0);">上一页&lt;&lt;</a><!-- 上一页 -->
				</li>
				<li>
					<!-- 当前页 -->
					<a id="showPageNo" href="javascript:void(0);"><s:property value="#request.productList.pageNumber"/></a>
				</li>
				<li>
					<a id="next" href="javascript:void(0);">&gt;&gt;下一页 </a><!-- 下一页 -->
				</li>
				<li>
					<a id="totalPage">共&nbsp;<s:property value="#request.productList.totalPage" />&nbsp;页</a>
				</li>
				<li>
				</li>
				<li>
				</li>
			</ul>
			</form>
			<s:if test="keyword == null">
			<form action="<%=basePath %>shopping/allProduct.action" method="post" name="pageFrm2">
			</s:if>
			<s:elseif test="isShowProduct == 1">
			<form action="<%=basePath %>shopping/showProduct.action" method="post" name="pageFrm2">
			<input type="hidden" name="isShowProduct" value="<s:property value="isShowProduct"/>"  > 
			</s:elseif>
			<s:else>
			<form action="<%=basePath %>shopping/searchProduct.action" method="post" name="pageFrm2">
			</s:else>
			<ul>
				<li>
					<!-- 搜索关键词 -->
					<s:if test="keyword != null">
					<input type="hidden" name="keyword" value="<s:property value="keyword"/>" >
					</s:if>
				</li>
				<li>
					<a href="javascript:void(0);"><input id="tempageNo" name="pageNum" type="text" size="1"/>页</a>
				</li>
				<li>
					<a id="forward" href="javascript:void(0);">转到</a>
				</li>
			</ul>
			</form>
		</div><!-- end of panelPage div -->
	</div><!-- end of products div -->
</body>
</html>