var webpack = require ("webpack");

var path = require('path');

module.exports= {
	entry:{
		 index:'./js/index.js'
		// style:'./plugins/less'
	},
	output:{
		filename:'./dist/js/main.js'
	},
	module:{
		loaders:[
			{
				test:/\.vue$/,
				loader:'vue-loader'
		    },
			{
				test: /\.css$/, 
				loader: 'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test: /\.less$/, 
				loader: 'style-loader!css-loader!autoprefixer-loader!less.loader'
			},
			{
				test: /\.js$/, 
				loader: 'babel-loader',
				query:{
					presets:['es2015']
				}
			}
		]
	},
	resolve: {//设置别名
	    alias: { 
	    	//将vue设置为引用整个dist文件
	    	//更改vue引用为全局路径
	    	//因为vue2.x以后 只加载vue.js文件 缺少模板解析
	    	//更改vue别名 引用vue下dist下所有的vue文件
	        vue: path.join(__dirname,'./node_modules/vue/dist/vue')
	    }
	    //extensions:['.js','.jsx']//自动补全后缀名
  	}
} 