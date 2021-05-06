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
});