//开发环境服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net';

//测试环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';

//生产环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';

// $.ajaxPrefilter()在发送和接收ajax时都会优先触发此事件
$.ajaxPrefilter(function(params) {
    // console.log(params.url);
    // 需求1：在每次ajax请求发送之前，添加路径
    // console.log('http://api-breakingnews-web.itheima.net' + params.url);
    params.url = baseURL + params.url;

    // 需求2：以/my开头的就可以设置头信息了
    if (params.url.indexOf('/my/') >= 0) { // 或者 != -1
        // headers前面是点后面是等号
        params.headers = {
            Authorization: localStorage.getItem('token') || '',
        };
    }; //以/api开头的什么都不需要更改

    // 需求3：登录拦截（ajax中有一个complete方法 无论接收成功还是失败都会触发这个方法）
    params.complete = function(res) {
        // console.log(res);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = '/login.html';
        };
    };
});