var appController=angular.module('appController',[]);

appController.controller('myController1',['$scope','$http','$state','$stateParams',function($scope,$http,$state,$stateParams){
	 var pagelist=[];
	 $scope.count=1;
	 // 为数组原型对象添加方法
	Array.prototype.removeArray=function(obj){ 
			for(var i =0;i <this.length;i++){ 
				var temp = this[i]; 
				if(!isNaN(obj)){ 
					temp=i; 
				} 
				if(temp == obj){ 
					for(var j = i;j <this.length;j++){ 
						this[j]=this[j+1]; 
					} 
					this.length = this.length-1; 
				} 
			} 
	}
	// 第一次加载商品列表
	 $scope.firstLoad=function(){
	 	$http.get("data/data0.json")
			.success(function(data){
				pagelist=data
				var array=[];
				$scope.pagesize=Math.ceil(data.length/9);
				$scope.items1=data.slice(0,9);
				for(var i=1;i<=$scope.pagesize;i++){
					array.push({pageoption:i});
				}
				$scope.pages=array;	
			})
	 }
	 // 个人订单列表
	$scope.myOrder=function(){
		if(sessionStorage.getItem("account")){
			var account=sessionStorage.getItem("account");
			var myorderlist=JSON.parse(sessionStorage.getItem(""+account+""));
			pagelist=myorderlist;
			$scope.items2=myorderlist.slice(0,10);
			$scope.istype=1;
			$scope.pagesize=Math.ceil(myorderlist.length/10)
			var array=[];
			for(var i=1;i<=$scope.pagesize;i++){
					array.push({pageoption:i});
			   }
			$scope.pages=array;
		}else{
			window.location.href="index.html#/userlogin"
		}
		

	}
	// 个人购物车商品列表
	$scope.cartLoad=function(){
		if(!sessionStorage.getItem("account")){
			window.location.href="index.html#/userlogin"
		}
		var account=sessionStorage.getItem("account");
		$scope.cartdata=JSON.parse(sessionStorage.getItem(""+account+"cart"));
		pagelist=$scope.cartdata;
		$scope.items3=$scope.cartdata.slice(0,5);
		$scope.istype=2;
		$scope.pagesize=Math.ceil($scope.cartdata.length/5);
		var array=[];
		for(var i=1;i<=$scope.pagesize;i++){
			array.push({pageoption:i});
		}
		$scope.pages=array;			
	}
	$scope.cartOrder=function(){
		$scope.cartdata=JSON.parse(sessionStorage.getItem("cartorder"));
		console.log($scope.cartdata)
	}
	// 购物车删除商品功能
	$scope.removeData=function(number){
		var account=sessionStorage.getItem("account");
		$scope.cartdata.removeArray($scope.items3[number])
		//分页还有点一点点bug
		$scope.items3.removeArray(number);
		sessionStorage.setItem(""+account+"cart",JSON.stringify($scope.cartdata))	 
	}
	// 分页的数据加载
	$scope.pageData=function(number){
		if($scope.istype==1){
		$scope.items2=pagelist.slice(10*(number-1),10*number)
		}else if($scope.istype==2){
			$scope.items3=pagelist.slice(5*(number-1),5*number)
		}else{
			$scope.items1=pagelist.slice(9*(number-1),9*number)
		}
		
	}
	// 根据商品类型加载商品数据
	$scope.goodsType=function(){
		if($stateParams.typeid){
			$http.get("data/data0.json").success(function(data){
				var array=[];
				for(var i=0;i<data.length;i++){
					if(data[i].typeid==$stateParams.typeid){
						$scope.typename=data[i].typename;
						pagelist.push(data[i]);
					}
				}
				$scope.items1=pagelist.slice(0,9);
				$scope.pagesize=Math.ceil(pagelist.length/9);
				for(var i=1;i<=$scope.pagesize;i++){
					array.push({pageoption:i});
				}
				$scope.pages=array;

			})
			
		}
	}
	// 下单功能
	$scope.localList=function(num){
		if(!sessionStorage.getItem("account")){
			window.location.href="index.html#/userlogin"
		}
		else{
		var obj={};
		var listarray=[]
		obj["description"]=$("#description").html()
		obj["address"]=$("#address").val();
		if($scope.total){
			obj["total"]=$scope.total
		}else{
			obj["total"]=$scope.cartdata.total;
		}	
		obj["phone"]=$("#phone").val();
		obj["goodsid"]=num;
		listarray.push(obj);
		var account=sessionStorage.getItem("account");
		if(!sessionStorage.getItem(""+account+"")){//如果是第一次下单，新建这个session
			sessionStorage.setItem(""+account+"",JSON.stringify(listarray))
		}
		else{//如果不是，取数这个key的值，再添加新元素
			var array=JSON.parse(sessionStorage.getItem(""+account+""));
			array.push(obj);
			sessionStorage.setItem(""+account+"",JSON.stringify(array))
		}
		alert("订单已生成，请在我的订单中查看");
		setTimeout(function(){
			window.location.href="index.html"
		},1000)
		}
	}

// 用户登录数据存储
	$scope.userData=function(){
		var account=$("#account").val();
		sessionStorage.setItem("account",""+account+"");
		window.location.href="index.html";
	}
// 单个商品详情数据加载
	$scope.goodsDetial=function(){
			$http.get("data/data0.json").success(function(data){
				var array=[]
				for(var i=0;i<data.length;i++){
					if(data[i].goodsid==$stateParams.goodsid){
						$scope.goodsdetial=data[i];
						array.push(data[i]);
						$scope.routegoodid=array;	
						$scope.stylelist=data[i].stylelist[0];
						$scope.stylename=data[i].stylelist[1];
						$scope.$watch('count',function(newVal,oldVal,scope){
							if(newVal>=1){
								if($scope.goodsdetial.postage==="免运费"){
									$scope.goodsdetial.postage=0;
									$scope.total=parseFloat($scope.goodsdetial.price);
								}else{
									$scope.total=parseFloat($scope.goodsdetial.postage)+parseFloat($scope.goodsdetial.price)*$scope.count;
									
								}
							}else{
								$scope.total=0;
							}	
						})
					}
				}
				
			})
	}
}])


