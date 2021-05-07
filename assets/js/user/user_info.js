$(function() {
    //1. 定义校验规则
    let form = layui.form;
    form.verify({
        // 用户昵称1-6位
        nickname: function(value) {
            //判断错误的情况
            if (value.length > 6) return '昵称长度必须在 1 - 6 个字符之间！';
        }
    });


    // 2.把用户信息渲染到form表单中
    initUserInfo();
    let layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status != 0)
                    return layer.msg(res.message);
                // res.data的赋值给某个form表单赋值
                // 应该用form.val('跟form表单的lay-filter属性值相对应')
                // 最重要的是属性名是一一对应
                form.val('formUserInfo', res.data);
                // let text = res.data.username
            }
        });
    };


    // 3.重置：重置按钮你按照form表单中html默认value值重置的
    $('#btnReset').on('click', function(e) {
        // 阻止重置按钮的默认重置行为
        e.preventDefault();
        // 重新渲染一下表单即可
        initUserInfo();
    });

    // 4.更新基本用户信息
    $('#formUserInfo').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                initUserInfo();
                //调用父页面的头像渲染方法
                window.parent.getUserInfo();
            }
        });
    });

    // 5. 重置密码

});