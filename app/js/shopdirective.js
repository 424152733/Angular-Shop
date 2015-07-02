var appDirective=angular.module('appDirective',['appController']);

appDirective.directive('imgbox',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			elem.addClass("imgbox");
			elem.on('mouseenter',function(){
				var html="<a class='btn btn-info btn-sm hide-btn'>关注</a>"
					html+="<a class='btn btn-info btn-sm hide-btn'>收藏</a>";
				$(this).append(html)
			});
			elem.on('mouseleave',function(){
				$(this).html("")
			})
		}
	}
})

appDirective.directive('page',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			if(attr.active==1){
			elem[0].parentNode.className="active";
			}
			elem.on('click',function(){
				var num=$(this).html();
				$(this).parent().siblings().removeClass("active");
				$(this).parent().addClass("active")
				scope.$apply('pageData('+num+')');
			})
		}
	

	}
})

appDirective.directive('next',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			elem.on('click',function(){
					if($(".active").next().children().html()!=="下一页"){
				   $(".active").removeClass("active").next().addClass("active");
					var num=$(".active").children().html()
					scope.$apply('pageData('+num+')');
				}else{
					alert("已经是最后一页了！")
				}
			})
		}
	}
})

appDirective.directive('prev',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			elem.on('click',function(){
					if($(".active").prev().children().html()!=="上一页"){
					   $(".active").removeClass("active").prev().addClass("active");
						var num=$(".active").children().html()
						scope.$apply('pageData('+num+')');
					}else{
						alert("已经是第一页了！")
					}
			})
		}
	}
})

appDirective.directive('header',function(){
	return{
		restrict:"AE",
		templateUrl:"tpl/header.html",
		replace:true,
		link:function(scope,elem,attr){

		}
	}
})

appDirective.directive('yfsize',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			elem.on('mouseenter',function(){
				$(this).addClass("border_style")
			})
			elem.on('mouseleave',function(){
				$(this).removeClass("border_style")
			})
			elem.on('click',function(){
				$(this).siblings().removeClass("yfsize_span")
				$(this).addClass("yfsize_span")
			})
		}
	}
})

appDirective.directive('usermenu',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			var html="";
			if(sessionStorage.getItem("account")){
				html+="<div class='col-md-1'><strong><i>返回</i></strong><a href='index.html'><i>首页</i></a></div>";
				html+="<div class='col-md-offset-7 col-md-4 text-rightq'>";
				html+="<strong><span class='text-primary'>欢迎"+sessionStorage.getItem("account")+"</span></strong>&nbsp;"
				html+="<a class='btn btn-info btn-sm' href='index.html#/myorder'>我的订单</a>&nbsp;";
				html+="<a class='btn btn-danger btn-sm' href='index.html#/shopcart'>我的购物车</a>&nbsp;";
				html+="<a class='btn btn-primary btn-sm exc'>注销</a></div>"
				$(".user_menu").html(html);
				$(".exc").click(function(){
					sessionStorage.setItem("account","");
					window.location.href="index.html"
				})
			}else{
				html+="<div class='col-md-2'><strong><i>返回</i></strong><a href='index.html'><i>首页</i></a></div>";
				html+="<div class='col-md-offset-10 text-danger'>您还未登录,请先&nbsp;<a href='index.html#/userlogin'>登录</a></div>"
				$(".user_menu").html(html);	
			}
		}
	}
})

appDirective.directive('shopcart',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			elem.on('click',function(){
				if(!sessionStorage.getItem("account")){
					window.location.href="index.html#/userlogin"

				}else{
					var account=sessionStorage.getItem("account");
					var obj={};
					var cartList=[]
					obj["bcgimg"]=scope.goodsdetial.bcgimg;
					obj["description"]=scope.goodsdetial.description;
					obj["price"]=scope.goodsdetial.price;
					obj["goodsid"]=scope.goodsdetial.goodsid;
					obj["postage"]=scope.goodsdetial.postage;
					obj["cartcount"]=1;
					obj["total"]=parseFloat(scope.goodsdetial.postage)+parseFloat(scope.goodsdetial.price)
					if(!sessionStorage.getItem(""+account+"cart")){
						cartList.push(obj)
						sessionStorage.setItem(""+account+"cart",JSON.stringify(cartList));
						console.log(sessionStorage.getItem(""+account+"cart"));
						alert("添加成功!");
					}
					else if(sessionStorage.getItem(""+account+"cart")){
						var newarray=JSON.parse(sessionStorage.getItem(""+account+"cart"));
						var copyarray=newarray;
						for(var i=0;i<newarray.length;i++){
							if(obj["goodsid"]===newarray[i].goodsid){
								alert("该商品已在购物车中了，您已添加过该商品!")
								break;
							}
						}
						if(i==newarray.length){
								copyarray.push(obj);
								sessionStorage.setItem(""+account+"cart",JSON.stringify(copyarray));
								alert("添加成功!")
								console.log(sessionStorage.getItem(""+account+"cart"));
						}		
					}

				}
			})
		}
	}
})

appDirective.directive('add',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			elem.on('click',function(){
				var oldcount=scope.item.cartcount;
				var newcount=parseInt(oldcount)+1;
				scope.item.cartcount=newcount;
				$(this).next().val(newcount);
				scope.item.total=parseFloat(scope.item.price)*scope.item.cartcount+parseFloat(scope.item.postage)
				$(this).parent().next().html(scope.item.total+"元")
			})
		}
	}
})

appDirective.directive('down',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			elem.on('click',function(){				
				var oldcount=scope.item.cartcount;
				var newcount=parseInt(oldcount)-1;
				if(newcount===0){newcount=1}
				scope.item.cartcount=newcount;
				$(this).prev().val(newcount);
				scope.item.total=parseFloat(scope.item.price)*scope.item.cartcount+parseFloat(scope.item.postage)
				$(this).parent().next().html(scope.item.total+"元")
			})
		}
	}
})

appDirective.directive('ordercart',function(){
	return{
		restrict:"AE",
		link:function(scope,elem,attr){
			elem.on('click',function(){				
				sessionStorage.setItem("cartorder",JSON.stringify(scope.item));
			})
		}
	}
})



