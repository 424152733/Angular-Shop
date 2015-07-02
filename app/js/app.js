var routerApp=angular.module('routerApp',['ui.router','appController','appDirective'])
// 把路由中变量对象放入全局对象中
routerApp.run(function($rootScope, $state, $stateParams){
	$rootScope.$state=$state;
	$rootScope.$stateParams=$stateParams;
})

routerApp.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/index');
	$stateProvider.state('index',{
		url:'/index',
		views:{
			'':{
				templateUrl:'tpl/home.html'
			},
			'header@index':{
				templateUrl:'tpl/header.html'
			},
			'nav@index':{
				templateUrl:'tpl/nav.html'
			},
			'content@index':{
				templateUrl:'tpl/content.html'
			}

		}
	}).state('index.goodstype',{
		url:'/:typeid',
		views:{
			'content@index':{
				templateUrl:'tpl/contenttype.html'
			}	
		}
	}).state('userlogin',{
		url:'/userlogin',
		templateUrl:'tpl/login.html'

	}).state('register',{
		url:"/register",
		templateUrl:'tpl/register.html'
	}).state('gooddetial',{
		url:"/gooddetial/:goodsid",
		templateUrl:'tpl/gooddetial.html'
	}).state('orderform',{
		url:"/orderform/:goodsid",
		templateUrl:"tpl/orderform.html"
	}).state('myorder',{
		url:"/myorder",
		templateUrl:"tpl/myorder.html"
	}).state('shopcart',{
		url:"/shopcart",
		templateUrl:"tpl/shopcart.html"
	}).state('cartorderform',{
		url:"/cartorderform/:goodsid",
		templateUrl:"tpl/cartorderform.html"
	})
})