var Vue = require ("vue");
var VueRource = require("vue-resource");
var VueRouter = require ("vue-router");

//声明引用插件
Vue.use(VueRouter);
Vue。use(VueRource);
//引用组件
var Header = require ("../component/header.vue");
var LeftMenu = require ("../component/leftMenu.vue");
var Footer = require ("../component/footer.vue");
var Login = require ("../component/login.vue");

/*创建路由*/
var router = new VueRouter({
  routes:[
  	{path:'/login',component:Login}
  	// {path:'/classify',component:classify},
  	// {path:'/cart',component:cart}
  ]
})

new Vue({
  router
}).$mount('#vframe')


var vframe = new Vue({
	el:"#vframe",
	components:{
		"top-nav":Header,
		"left-menu":LeftMenu,
		"bottom-footer":Footer

	},
	
	methods:{
		getData:function(){
			alert(1)
			this.$http.get('../self/json/user.json').then(function(res){
				console.log(res)
			})
		}
	}
})



Vue.component('left-menu',{
	props:{
		first:{
			type:String,
			required:true
		},
		second:{
			type:String,
			required:true
		}
	},
	data:function(){

	},
	//只在父模板可用
	components:{
		"leftMenu-first":firstNav
	}
})

// 左侧菜单
// 左侧菜单私有组件 
var firstNav = {
	props:['first','second'],
	template:'<li class="active"><a><i class="fa fa-home">'
				  +'</i> Home <span class="fa fa-chevron-down"></span></a>'
		          +'<ul class="nav child_menu" style="display: block;">'
		           + '<li class="current-page"><a href="index.html">'+{{first}}+'</a></li>'
		           + '<li><a href="index2.html">'+{{second}}+'</a></li>'
		          +'</ul>'
		        +'</li>';
}
// Vue.component('left-menu',{
// 	props:["name"],
// 	mixins:[obj],
// 	data:function(){
// 		return{
			
// 		}
// 	},
// 	render:function(){

// 	}
// })

// var obj = {
// 	methods:{
// 		getData:function(){
// 			alert(1)
// 		}
// 	}
// }