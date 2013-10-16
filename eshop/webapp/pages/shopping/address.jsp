<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/pages/common/taglibs.jsp"%>
<html>
<head>
<base href="<%=basePath%>">
<title>输入收货信息</title>
	<!-- begin cssStyle -->
	<link rel="stylesheet" href="<%=basePath %>css/reset.css" />
	<link rel="stylesheet" href="<%=basePath %>css/common.css" />
	<link rel="stylesheet" href="<%=basePath %>css/shopping.css" />
	<!-- end cssStyle -->
	<link rel="shortcut icon" href="favicon.ico" />
	<script type="text/javascript" src="<%=basePath %>js/jQuery.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/buffalo/prototype.js"></script> 
	<script type="text/javascript" src="<%=basePath %>js/buffalo/buffalo.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/list.js"></script>
		
	<script type="text/javascript" src="<%=basePath %>js/index.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/shopping.js"></script>

	<s:text name="com.eshop.head.meta" />
	<s:text name="com.eshop.head.javascript" />
</head>
<body>
	<div id="header">
		<div>
			<h1><s:text name="com.eshop.header" /></h1>
			<h5><a href="shopping/cartList.action" id = "">&nbsp;我的购物车</a></h5>
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


	<div class="crumbs">
		<ul>
			<li>
				<span  ></span>
				查看购物车
			</li>
			<li>
				<span class="active"></span>
				确认订单地址
			</li>
			<li>
				<span></span>
				完成
			</li>
		</ul>		
	</div>
	
	
	<form action="<%=basePath %>shopping/sumitOrder.action" name="orderFrm" method="post">
	<div id="addInfo">
			<ul>
				<li>
					<label>
						<span>选择校区</span>
						<label for="a1">南校区<input type="radio" name="schoolArea"  value="南校区" id="a1" /></label>
						<label for="a2">北校区<input type="radio" name="schoolArea"  value="北校区"  id="a2"/></label>
					</label>
				</li>
				<li>
					<label for="address">
						<span>选择地址</span>
						<input type="text" name="building" id="address" value="<s:property value='building' />" />
					</label>
				</li>
				<li>
					<label for="name">
						<span>收货人姓名</span>
						<input type="text" name="consignee" id="name" value="<s:property value='consignee' />"/>
					</label>
				</li>
				<li>
					<label for="number">
						<span>联系电话</span>
						<input type="text" name="phone" id="number" value="<s:property value='phone' />"/>
					</label>
				</li>
				<li>
					<label for="remark">
						<span>备注</span>
						<textarea name="address" id="remark" cols="30" rows="3" >	<s:property value='address' />
						</textarea>
					</label>
				</li>
			</ul>
		<div id="errorMessage">
			<h1><s:fielderror fieldName="schoolArea"/></h1>
			<h1><s:fielderror fieldName="building"/></h1>
			<h1><s:fielderror fieldName="consignee"/></h1>
			<h1><s:fielderror fieldName="phone"/></h1>
			<!-- <h1>*其他信息</h1> -->
		</div>
	</div>
	
	<div id="cart">
		<ol>
			<li>商品</li>
			<li>单价</li>
			<li>数量</li>
			<li>优惠</li>
			<li>合计</li>
		</ol>
		<div class="cart">
			<ul>
				<s:if test="#session.cartList == null || #session.cartList.items == null || #session.cartList.items.size()<1">
					<li>
						<div align="center">亲，购物车还是空的喔...</div>
					</li>
				</s:if>
				<s:iterator value="#session.cartList.items" status="i" >
				<li>
						<div class="name">
							<img src="<s:property value='imageurl' />" alt="" />
							<strong><s:property value='productName' /></strong>
						</div>
						<div class="price">
							￥<s:property value='price' />
						</div>
						<div class="count">
							<a href="javascript:void(0);"  >-</a>
							<input type="text" size="1" value="<s:property value='count' />" name="<s:property value='productId' />"  />
							<a href="javascript:void(0);"   >+</a>
						</div>
						<div class="discount">
							￥0
						</div>
						<div class="sum">
							<div id="<s:property value='productId' />">￥ <span ><s:property value='itempris' /></span></div>
						</div>
				</li>
				</s:iterator>
			</ul>
			<div class="submit">
					商品总价:&nbsp;￥<span><s:property value="#session.cartList.totalPrice" /></span>
				<s:if test="#session.cartList != null && #session.cartList.items != null && #session.cartList.items.size()>0">
					<input type="button"  onclick="document.orderFrm.submit();" value="下单"/>
				</s:if>
				<s:else>
					<input type="button"  disabled="disabled" style="color: gray" value="下单"/>
				</s:else>
			</div>
		</div>
	</div>
</form>
</body>
</html>