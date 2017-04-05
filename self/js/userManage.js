$(function(){
	var userManage = {
		init:function(){
			$('#nav-header').load('nav.html',function(){});
				$("#role_table").bootstrapTable({
	             // url: '/manage/role/listRoles',
	             url:'../../self/json/listUsers.json',
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
	                       {field: 'userName',title: '用户名称',align: 'center',valign: 'bottom'},
	                       {field: 'roleName',title: '角色名称',align: 'center',valign: 'bottom'},
	                       {field: 'sex',title: '性别',align: 'center',valign: 'bottom'},
	                       {field: 'phone',title: '手机',align: 'center',valign: 'bottom'},
	                       {field: 'department',title: '部门',align: 'center',valign: 'bottom'},
	                       {field: 'app登录',title: 'app登录',align: 'center',valign: 'bottom'},
	                       {field: 'remark',title: '备注',align: 'center',valign: 'bottom'},
	                       {field: 'roleId',title: '操作',align: 'center',valign: 'bottom',formatter:function(value){
		                   	return "<span data-id="+value+"><a href='javascript:void(0)' class='btn btn-info btn-xs' id='btn-edit'>修改</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-danger btn-xs' id='btn-del'>删除</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-success btn-xs' id='btn-watch'>重置密码</a></span>"}
		                   	}
	       				]
	         	})
		}
	}
	userManage.init();
})