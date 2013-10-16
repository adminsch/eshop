jQuery.noConflict();

/*
	2013.10.14 CreateHTML()
	type: 创建的html标签元素
	attr: 需要的html标签属性
	text: 标签的内容
	Todd Mark
*/
function CreateHTML(type){
	var oHTML = {
		type: document.createElement(type),
		attr: function (json){
			for(var css in json){
				this.type.setAttribute(css, json[css]);
			};
		},
		text: function (text){
			this.type.innerHTML = text;
		}
	};
	return oHTML;
};

function getStyle(obj, attr)
{
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	};
};

function startMove(obj, json, fn)
{
	var timer = null;
	clearInterval(obj.timer);
	obj.timer=setInterval(function ()
	{
		var bstop = true;
		for(var attr in json)
		{
			var cur = 0;
			if(attr=='opacity'){
				cur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}else{
				cur=parseInt(parseFloat(getStyle(obj, attr)));
			}
			var speed=(json[attr]-cur)/8;
			speed=speed>0? Math.ceil(speed) : Math.floor(speed);
			if(attr=='opacity'){
				obj.style.filter='alpha('+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[attr]=(cur+speed)+'px';
			}
			if(cur!=json[attr]){
				bstop=false;
			}
		}
		if(bstop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			};
		};
	},30);
};

function addEvent(obj, type, fn){
	if(obj.attachEvent){
		obj.attachEvent('on' + type, fn);
	}else{
		obj.addEventListener(type, fn, false);
	};
};

function removeEvent(obj, type, fn){
	if(obj.detachEvent){
		obj.detachEvent('on' + type, fn);
	}else{
		obj.removeEventListener(type, fn, false);
	};
};

function stopPropagation(e) {  
    var e = e || window.event;  
    if(e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();  
    } else {  
        e.cancelBubble = true; //IE阻止冒泡方法  
    };
};

// TabSwitch
function Tab(id)
{
	this.tab = document.getElementById(id);
	this.aBtn = this.tab.getElementsByTagName('input');
	this.aDiv = this.tab.getElementsByTagName('div');
	var _this = this;

	for(var i=0;i<this.aBtn.length;i++){
		this.aBtn[i].index = i;
		this.aBtn[i].onclick = function ()
		{
			_this.tabSwitch(this);
		};
	};
};
Tab.prototype.tabSwitch = function (oBtn)
{
	for(var i=0;i<this.aDiv.length;i++){
		this.aDiv[i].style.display = 'none';
	};
	this.aDiv[oBtn.index].style.display = 'block';
};


