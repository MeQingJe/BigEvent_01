$(function() {
    // 需求1：获取用户信息，并渲染头像
    getUserInfo();

    // 需求2：退出
    $('#btnLogOut').on('click', function() {
        // 弹出对话框
        layer.confirm('确定要退出?', { icon: 3, title: '提示' }, function(index) {
            //关闭对话框
            layer.close(index);
            // 跳转到login.html
            location.href = '/login.html';
            // 清除token
            localStorage.removeItem('token');
        });
    });

    // 需求3：登录拦截
});
// 需求1：获取用户信息，并渲染头像(封装函数，放入到入口函数的外面)
// 原因，其他页面也会用到这个函数，保证这个函数是全局函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 若没有token值则返回一个null 浏览器会渲染成空字符串（没有也行）
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function(res) {
            // console.log(res);
            // 状态校验
            if (res.status != 0) return layui.layer.msg(res.message);
            // 成功后渲染用户（头像和名称）
            renderAvatar(res.data);
        }
    });
};

function renderAvatar(user) {
    // 1.名称的渲染(优先使用昵称，获取首字母然后大写)
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&emsp;' + name);
    // 2.头像的渲染
    if (user.user_pic) {
        // 有图片头像：显示图片头像，赋值src，隐藏文字头像;
        $('.userinfo img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 没有图片头像:显示文字头像，赋值html()，隐藏图片头像
        let text = name[0].toUpperCase();
        $('.userinfo img').hide();
        $('.text-avatar').show().html(text);
    };
};