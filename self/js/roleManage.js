$(function(){
	var role ={
		valueName:"",
		init:function(){
			var that = this;
			this.addRole();
			this.watchRole();
			this.editRole();
			this.delRole();
			$('#nav-header').load('nav.html',function(){});
			$("#role_table").bootstrapTable({
             // url: '/manage/role/listRoles',
             url:'../../self/json/listRoles.json',
             dataType: 'json',
             sidePagination:'server',
             cache: false,//设置False禁用AJAX请求的缓存
             height: '',
             striped: true,//使表格带有条纹
             pagination: true,//设置True在表格底部显示分页工具栏
             pageSize: 10,
             pageList: [10, 25, 50, 100],
             toolbar:'#custom-toolbar',
             columns: [
                       {field: 'state',checkbox: true},
                       {field: 'roleName',title: '角色名称',align: 'center',valign: 'bottom'},
                       {field: 'roleId',title: '操作',align: 'center',valign: 'bottom',formatter:function(value){
                       	return "<span data-id="+value+"><a href='javascript:void(0)' class='btn btn-success btn-xs' id='btn-watch'>查看</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-info btn-xs' id='btn-edit'>修改</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-danger btn-xs' id='btn-del'>删除</a></span>"}
                       }
       				]
         	})
         	
		},
		//判断当前账号的角色 是否有角色管理的权限
		judgePer:function(){
			$.get("../../self/json/listFirstMenu.json",{"cache": false},function(res){})
		},
		//新增
		addRole:function(){	

			var that = this;
			//登录账号对应角色的权限菜单列表
			this.firstMenu();			
			$('.addBtn').click(function(){

				$("#roleModalLabel").html("新增");
				//所有复选框初始化
				$('#list_table :checkbox').prop("checked",false);
				$('.role-input').val("");
				
				//新增区显示 
				$('#search-wrap').show();
				$('#list_table .list_choice').show();
				//角色名是否可用提示全部隐藏
				$('#search-wrap span').hide();
				

				//查看 修改区隐藏
				$('#list_table .list_person').hide();
				$('#list_table .list_edit').hide()

		 		$("#roleModal").on("hidden.bs.model",function(e){
		    			$(this).removeData();
		    	});

		    	//角色名输入 显示是否可用请求判断 aadCheck
		    	that.checkRole();
		    	
		 		$('#roleModal').modal({show:true})
		 	})	
		 	//获取对应权限的一级菜单列表	 			 	
 	 		that.selectTotal();
 	 		that.saveRole();

		 	
		 	 
		 	    
		},
		//获取对应权限的一级菜单列表 如果是超级管理员默认是全部菜单
		firstMenu:function(){
	 		var str = "";
	 		var data;
	 	 	$.get("../../self/json/listFirstMenu.json",{"cache": false},function(res){
	 	 		console.log(res)	 	 		
	 	 		data = res.data;
	 	 		for(var key = 0;key<data.length;key++){
	 	 			(function(i){
	 	 				var id = data[i].id;
		 	 			str = '<li data-id="'+id+'">'
                              +'<span class="menu-name">'+data[i].name+'&nbsp;&nbsp;:</span>'
                              +'<div class="menu-item"><input type="checkbox" id="add'+i+'" data-id="'+id+'-'+1+'"><label style="display=none" for="add'+i+'">新增</label></div>'
                              +'<div class="menu-item"><input type="checkbox" id="delet'+i+'"  data-id="'+id+'-'+2+'"><label for="delet'+i+'">删除</label></div>'
                              +'<div class="menu-item"><input type="checkbox" id="edit'+i+'"  data-id="'+id+'-'+3+'"><label for="edit'+i+'">修改</label></div>'
                              +'<div class="menu-item"><input type="checkbox" id="search'+i+'"  data-id="'+id+'-'+4+'"><label for="search'+i+'">查询</a></label></div>'
                            +'</li>';

	 	 			})(key)
	 	 			$('#list_table>.list_choice').prepend(str);
	 	 			
	 	 		}
            	
		 	})
		},
		//角色查重
		checkRole:function(){
			var that = this;
			$('.role-input').on("blur",function(){
	    		that.valueName = $(this).val();
	    		$.ajax({
	    			url:"../../self/json/addCheck.json",
	    			cache: false,
	    			async : false,
	    			data:{
	    				"roleName":that.valueNameue
	    			},
	    			success:function(res){
	    				if(res.returnCode == 0){
		    				$('.correct').show();
		    				$('.error').hide();
		    			}else{
		    				$('.correct').hide();
		    				$('.error').show();
		    			}
	    			}
	    		})
		    })
			
		},
		//新增->保存->刷新角色列表
		saveRole:function(){
			var that = this;
			//单个按钮
	 		//监视所有复选框 data-id =  navId-permission
	 		$('#btn-role-save').click(function(){
	 			var ids = [];
 				//只负责传参数 "menu_ids":[{"id":"",permission:[]}]	
	 			$.ajax({
	 				url:"../../self/json/addRole.json",
	 				cache: false,
	 				//async : false,
	 				data:{
	 					"rows":{"menu_ids":ids,"roleName":that.valueName}
	 				},
	 				success:function(res){
	 					console.log(res);
	 					console.log(that.valueName)
			 			var cmenu = {};
			 			$('#list_table li').each(function(){
				 			var cid,cper;
			 				var perArray = [];
			 				
		 					$(this).find('.menu-item :checkbox').each(function(){
		 						var status = $(this).prop("checked");
		 						console.log(status)
		 						if(status){
		 							$(this).prop('checked',true);
		 							cid = $(this).attr('data-id').substring(0,23);
		 							cper = $(this).attr('data-id').substring(25);
		 							perArray.push(cper)
		 						}else{
		 							$(this).prop('checked',false);
		 						}

		 					})	 					
		 					cmenu = {
		 						"id":cid,
		 						"permission":perArray
		 					}
		 					if(cmenu.id != undefined){
		 						ids.push(cmenu);
		 					}					
		 					console.log(cid,cper,perArray,cmenu);
			 				
			 			})
			 			//cmenu-->[{},{}]
			 			console.log(ids)	
	 				}
	 			})
	 			//表格刷新	没有参数？？ 			
	 			$("#role_table").bootstrapTable('refresh', {
		        		url: '/manage/role/listRoles.json',
	            }); 		
	 		})
	 		
		},
		//删除->刷新角色列表
		delRole:function(){
			var that = this;			
			$('#role_table').on("click","#btn-del",function(){

				if(confirm("确定删除这些记录吗？")){
					var roleId = $(this).parent().prop('data-id');
					$.ajax({
						// url:'./manage/role/deleteRole',
						// type:"post",
						url:'../../self/json/deletRole.json',
						async:false,
						data:{
							"roleIds":roleId
						},
						success:function(){
							$table.bootstrapTable('refresh', {
				        		url: '/manage/role/listRoles.json'
			                });
						},
						error:function(){
							console.log('del-refresh----报错');
						}
					})
				}
		
			})
		},
		//修改
		editRole:function(){
			var that = this;
			var roleId,cid;
			var cper = [];
			var cmenuAll = [];
			//初始化选项
			that.oneMenu(roleId);
			$('#role_table').on("click","#btn-edit",function(){
								
				$("#roleModalLabel").html("修改");
				$('#search-wrap').hide();
				$('#list_table .list_choice').hide();
                $('#list_table .list_person').hide();
                $('#list_table .list_edit').show();
                
				//获取当前点击对象的roleId
				roleId = $(this).parent().prop('data-id');
				
				//permission参数回传后台

				$.ajax({
					url:"../../self/json/getOneRole.json",
					cache: false,
					data:{
						"rows":{
							// "menu_ids":[{
							// 	"id":cid,
							// 	"permission":cper
							// }]
							"menu_ids":cmenuAll

						}
					},
					success:function(res){
						var that = this;						
						console.log(res);
						var ids = [];
                        $('#btn-edit-save').click(function(){
                        	//保存当前所有复选框的checked状态
                        	var cmenu = {};
                        	$('#list_table .list_edit li').each(function(){
                        		var cid,cper;
                        		var perArray = [];
                        		$(this).find('.menu-item :checkbox').each(function(){
			 						var status = $(this).prop("checked");
			 						console.log(status)
			 						if(status){
			 							$(this).prop('checked',true);
			 							cid = $(this).attr('data-id').substring(0,23);
			 							cper = $(this).attr('data-id').substring(25);
			 							perArray.push(cper)
			 						}else{
			 							$(this).prop('checked',false);
			 						}

			 					})	 					
			 					cmenu = {
			 						"id":cid,
			 						"permission":perArray
			 					}
			 					if(cmenu.id != undefined){
			 						ids.push(cmenu);
			 						cmenuAll.push(cmenu);
			 					}
			 					console.log(cid,cper,perArray,cmenu);					
                        	})


                        })
					},
					error:function(res){
						console.log('edit---后台报错');
					}
				    	
				 			
				 		
				})
				$('#roleModal').modal({show:true})
			})
		},
		//查看功能
		watchRole:function(){
			var that = this;
			var roleId;
			//获取某角色信息
			this.oneRole(roleId);

			$('#role_table').on("click","#btn-watch",function(){
				//初始化				
				$("#roleModalLabel").html("查看");
				$('#search-wrap').hide();
				$('#list_table .list_choice').hide();
				$('#list_table .list_edit').hide();
				$('#list_table .list_person').show();

				//获取当前点击的roleId
				roleId = $(this).parent().prop('data-id');
				$("#roleModal").on("hidden.bs.model",function(e){
		   			$(this).removeData();
			   	});

				$('#roleModal').modal({show:true})
			})
		},
		//某角色的菜单权限初始状态
		oneMenu:function(roleId){
			var that = this;
			$.ajax({
				url:"../../self/json/getOneRole.json",
				cache: "false",
				data:{
					"roleId":roleId	
				},
				success:function(res){
					var data = res.rows.menu_ids;
					var str = "";						
		 	 		for(var key = 0;key<data.length;key++){
		 	 			(function(i){
		 	 				var id = data[i].id;
			 	 			str = '<li data-id="'+id+'">'
	                              +'<span class="menu-name">'+data[i].name+'&nbsp;&nbsp;:</span>'
	                              +'<div class="menu-item"><input type="checkbox" id="add'+i+'" data-id="'+id+'-'+1+'"><label for="add'+i+'">新增</label></div>'
	                              +'<div class="menu-item"><input type="checkbox" id="delet'+i+'"  data-id="'+id+'-'+2+'"><label for="delet'+i+'">删除</label></div>'
	                              +'<div class="menu-item"><input type="checkbox" id="edit'+i+'"  data-id="'+id+'-'+3+'"><label for="edit'+i+'">修改</label></div>'
	                              +'<div class="menu-item"><input type="checkbox" id="search'+i+'"  data-id="'+id+'-'+4+'"><label for="search'+i+'">查询</a></label></div>'
	                            +'</li>';

		 	 			})(key)
		 	 			
		 	 			$('#list_table>.list_edit').prepend(str);
		 	 			//初始化复选框状态
		 	 			for(var j = 0;j<data[key].permission.length;j++){
		 	 				//console.log(data[key].permission);			 	 				
		 	 				var permStr = data[key].permission[j].toString();
		 	 				//console.log(permStr)
		 	 				//判断权限中是否包含1

		 	 				if(permStr.indexOf("1") != -1 ){
		 	 					var perId = key;
		 	 					//当前的权限数组
		 	 					var perArr = data[key].permission;
		 	 					//console.log(perArr)
		 	 					//当前对象的增加选择框
		 	 					var addChioce = $('#list_table>.list_edit>li[data-id='+data[key].id+'] #add'+key);
		 	 					//console.log(addChioce)
		 	 					//checked
		 	 					addChioce.prop('checked',true);
		 	 					//console.log(addChioce.prop('checked'))
		 	 					
		 	 				}
                            
                            if(permStr.indexOf("2") != -1 ){
		 	 					var perId = key;
		 	 					//当前的权限数组
		 	 					var perArr = data[key].permission;
		 	 					console.log(perArr)
		 	 					//当前对象的增加选择框
		 	 					var delChioce = $('#list_table>.list_edit>li[data-id='+data[key].id+'] #delet'+key);
		 	 					//console.log(addChioce)
		 	 					//checked
		 	 					delChioce.prop('checked',true);
		 	 					
		 	 				}

		 	 				if(permStr.indexOf("3") != -1 ){
		 	 					var perId = key;
		 	 					//当前的权限数组
		 	 					var perArr = data[key].permission;
		 	 					console.log(perArr)
		 	 					//当前对象的增加选择框
		 	 					var edtChioce = $('#list_table>.list_edit>li[data-id='+data[key].id+'] #edit'+key);
		 	 					//console.log(addChioce)
		 	 					//checked
		 	 					edtChioce.prop('checked',true);
		 	 					
		 	 				}
		 	 				
		 	 				if(permStr.indexOf("4") != -1 ){
		 	 					var perId = key;
		 	 					//当前的权限数组
		 	 					var perArr = data[key].permission;
		 	 					console.log(perArr)
		 	 					//当前对象的增加选择框
		 	 					var seaChioce = $('#list_table>.list_edit>li[data-id='+data[key].id+'] #search'+key);
		 	 					//console.log(addChioce)
		 	 					//checked
		 	 					seaChioce.prop('checked',true);
		 	 					
		 	 				}
		 	 			}
		 	 		}
				},
				error:function(){
					console.log('edit-getMenu--报错');
				}
			})
		},
		//获取某角色的信息
		oneRole:function(roleId){
			var that = this;
			var data = "";
			var strTable = "";
			var strMenu = "";
			$.ajax({
				url:"../../self/json/getOneRole.json",
				cache: "false",
				data:{
					"roleId":roleId	
				},
				success:function(res){
					console.log(res)					
					data = res.rows;
					console.log(data.menu_ids);					
					strTable = '<tr>'
	                        +'<td>角色ID</td>'
	                        +'<td>'+data.id+'</td>'
	                      +'</tr>'
	                      +'<tr>'
	                        +'<td>角色名</td>'
	                        +'<td>'+data.name+'</td>'
	                      +'</tr>'
	                      +'<tr>'
	                        +'<td>菜单权限</td>'
	                        +'<td class="menu_permission"></td>'
	                      +'</tr>'
	                     +'<tr>'
	                        +'<td>创建时间</td>'
	                        +'<td>'+data.createTime+'</td>'
	                      +'</tr>';            
	                $('.list_person .table>tbody').append(strTable);

	                //处理菜单权限 
	                for(var i = 0;i<data.menu_ids.length;i++){	                	
	                	//替换 1 2 3 4 ->增删改查
	                	var strPer = data.menu_ids[i].permission.toString();
	                	var a = that.replaceAll(strPer,',',' ');
	                	var b = that.replaceAll(a,'1','新增');
	                	var c = that.replaceAll(b,'2','删除');
	                	var d = that.replaceAll(c,'3','修改');
	                	strPer= that.replaceAll(d,'4','查看');
	                	//console.log(strPer)
	                	strMenu ='<tr>'
	                			   +'<td>'+data.menu_ids[i].name+'&nbsp;&nbsp;&nbsp;&nbsp;</td>'
	                			   +'<td>'+strPer+'&nbsp;</td>'
	                	         +'</tr>'
	                	$('.menu_permission').append(strMenu);
	                	

	                }

	             },
	             error:function(){
	             	console.log('getOneRole----后台报错');
	             }

			})			
		},
		replaceAll:function(str,old,now){
			var reg = new RegExp(old,'g');
			return str.replace(reg,now);
			console.log(reg)
		},
		//全选
		selectTotal:function(){
 	 		//全选按钮
			var selectAll = $('.checkAll input[type="checkbox"]');
			//全选
			selectAll.click(function(){
				var status = $(this).prop('checked');
				//如果【全选】选中
				if(status){
					//让所有的复选框选中
					$('#list_table li input').prop('checked',true);
				}else{
					$('#list_table li input').prop('checked',false);
				}
			});

		}
	}
	role.init();
})










// for(var j = 0;j<data[key].permission.length;j++){
// 	// console.log(data[key].permission[j].toString().indexOf(1) != -1);
// 	var permStr = data[key].permission[j].toString();
// 	//判断权限中是否包含1
// 	if(permStr.indexOf("1") != -1 ){
// 		var perId = key;
// 		//当前的权限数组
// 		var perArr = data[key].permission;
// 		//当前对象的增加选择框
// 		var addChioce = $('#list_table>ul>li[data-id='+data[key].id+'] #add');
// 		console.log(addChioce.prop('checked','checked'))
// 		//checked
// 		addChioce.prop('checked','checked');
		
		
// 	}

// 	if(permStr.indexOf("2") != -1 ){
// 		var perId = key;
// 		//当前的权限数组
// 		var perArr = data[key].permission;
// 		//当前对象的增加选择框
// 		var addChioce = $('#list_table>ul>li[data-id='+data[key].id+'] #delet');
// 		console.log(addChioce.prop('checked','checked'))
// 		//checked
// 		addChioce.prop('checked','checked');
		
		
// 	}

// 	if(permStr.indexOf("3") != -1 ){
// 		var perId = key;
// 		//当前的权限数组
// 		var perArr = data[key].permission;
// 		//当前对象的增加选择框
// 		var addChioce = $('#list_table>ul>li[data-id='+data[key].id+'] #edit');
// 		console.log(addChioce.prop('checked','checked'))
// 		//checked
// 		addChioce.prop('checked','checked');
		
		
// 	}

// 	if(permStr.indexOf("4") != -1 ){
// 		var perId = key;
// 		//当前的权限数组
// 		var perArr = data[key].permission;
// 		//当前对象的增加选择框
// 		var addChioce = $('#list_table>ul>li[data-id='+data[key].id+'] #search');
// 		console.log(addChioce.prop('checked','checked'))
// 		//checked
// 		addChioce.prop('checked','checked');
		
		
// 	}
// }

// var $table = $("#role_table");
// 	 $(function(){
//  		$table.bootstrapTable({
//              url: '/manage/role/listRoles',
//              dataType: 'json',
//              sidePagination:'server',
//              cache: false,//设置False禁用AJAX请求的缓存
//              height: '',
//              striped: true,//使表格带有条纹
//              pagination: true,//设置True在表格底部显示分页工具栏
//              pageSize: 10,
//              pageList: [10, 25, 50, 100],
//              toolbar:'#custom-toolbar',
//              columns: [
//                        {field: 'state',checkbox: true},
//                        // {field: 'name',title: '角色名称',align: 'center',valign: 'bottom'},
//                        {field: 'id',title: '操作',align: 'center',valign: 'bottom',formatter:'showOpt'}
//        				]
//          	});

 		// $("#btn-role-save").on('click',function(){
			// if(!$('#role_form').isValid()){
			// 	return false;
			// }
 		// 	$.ajax({
 		// 		url:'/manage/role/save',
 		// 		data:$("#role_form").serialize(),
			// 	type:"POST",
			// 	async : false,
			// 	success:function(data){//ajax返回的数据
			// 		console.log(data)
			// 		if(data=='success'){
			// 			$('#roleModal').modal('hide');
		 //        		$table.bootstrapTable('refresh', {
		 //        			 url: '/manage/role/search'
		 //                });
		 //        		success();
 		// 			}else{
 		// 				error();
 		// 			}
			// 	}
 		// 	});
 		// });
//  	});
 		
// 	 	function add(){
	 		// $("#roleModalLabel").html("新增");
	 		
	 		// $.get('/manage/role/addRole', '', function(data){
	 		// 	console.log(data)
	 	 //        $('#roleModal .modal-body').html(data);  
	 	 //    }); 
	 		// $("#roleModal").on("hidden.bs.model",function(e){
	   //  			$(this).removeData();
	   //  		});
	 	 //    $('#roleModal').modal({show:true})
// 	 	}
	 	
// 		function showOpt(value){
//             return "<shiro:hasPermission name='role:3'><a href='javascript:void(0)' class=\"btn btn-info btn-xs\" onclick=\"edit('"+value+"')\"><i class=\"fa fa-pencil\"></i> 修改</a></shiro:hasPermission>"+
//                     "<shiro:hasPermission name='role:2'><a href='javascript:void(0)' class=\"btn btn-danger btn-xs\" onclick=\"del('"+value+"')\"><i class=\"fa fa-trash-o\"></i> 删除</a></shiro:hasPermission>";
// 	 	}
		
// 		function edit(id){
// 			$("#roleModalLabel").html("编辑");
	 		
// 	 		$.post('/manage/role/updateCheck/'+id, '', function(data){
// 	 			console.log(data)
// 	 	        $('#roleModal .modal-body').html(data);  
// 	 	    }); 
// 	 		$("#roleModal").on("hidden.bs.model",function(e){
// 	    			$(this).removeData();
// 	    		});
// 	 	    $('#roleModal').modal({show:true})
// 		}
		
// 		function del(id){
// 			if(confirm("确定删除这些记录吗？")){
// 				$.ajax({
//     				type:'POST',
//     				url: '/manage/role/deleteRole/'+id,
//     				success: function(data){
//     					console.log(data)
//     					if(data=='success'){
// 			        		$table.bootstrapTable('refresh', {
// 			        			 url: '/manage/role/search'
// 			                });
// 			        		success();
// 	 					}else{
// 	 						error();
// 	 					}
//     				}
//     			});
// 			}
// 		}