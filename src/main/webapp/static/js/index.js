$(function(){

	function addTabs(title, url,iconCls){
		if ($('#tabs').tabs('exists', title)){
			$('#tabs').tabs('select', title);//选中并刷新
			var currTab = $('#tabs').tabs('getSelected');
			var url = $(currTab.panel('options').content).attr('src');
			if(url != undefined && currTab.panel('options').title != 'Home') {
				$('#tabs').tabs('update',{
					tab:currTab,
					options:{
						content:createFrame(url)
					}
				})
			}
		} else {
			var content = createFrame(url);
			$('#tabs').tabs('add',{
				title:title,
				content:content,
				iconCls:iconCls,
				fit:true,
				closable:true
			});
		}
		tabClose();
	}

	function createFrame(url) {
		var s = '<iframe scrolling="no" frameborder="0"  src="'+url+'" style="width:100%;height:99%;"></iframe>';
		return s;
	}

	$(".modify-password").click(function(){
		$('#modify-password-dlg').dialog('open');
	});

	$('#modify-password-dlg').dialog({
		title: '修改密码',
		width: 400,
		height: 300,
		closed: true,
		cache: false,
		modal: true,
		buttons:[{
			text:'提交',
			iconCls:'icon-ok',
			handler:function(){
				formAddSubmit();
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){
				$('#modify-password-dlg').dialog("close");
			}
		}]
	});

	function formAddSubmit(){
		$('#modify-password-form').form('submit', {
			url:'admin/admin/ModifyAdminPassword',
			onSubmit: function(){
				return $(this).form('enableValidation').form('validate');
			},
			success:function(data){
				console.log(data);
				var data = eval('(' + data + ')');
				if(data.code == 200){
					$.messager.alert("修改提示", "密码修改成功");
					$('#modify-password-dlg').dialog("close");
					$('#modify-password-form').form("clear");
				}else{
					HandleException(data);
				}
			},
			error:function(){
				alert("error");
			}
		});
	}

	$(".logout").click(function(){
		//提醒用户是否是真的删除数据
		$.messager.confirm("提示消息", "您确定要退出本系统吗？", function (r) {
			if (r) {
				$.ajax({
					url: "logout",
					type: "get",
					dataType: "json",
					success: function (data) {
						if(data.code == 200){
							window.location.href="login";
						}else{
							HandleException(data);
						}
					}
				});
			}
		});
	});
	
});