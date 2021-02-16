$(function() {
    //提取layui中的form表单模块
    // let form = layui.form;
    const { form, layer } = layui;
    //1.点击去登录、去注册切换表单
    $('.content .link a').click(function() {
        $('.login-form').toggle();
        $('.reg-form').toggle();
    });
    //2.登录表单绑定表单提交事件
    $('.login-form').submit(function(e) {
            //2.1 阻止表单提交默认事件
            e.preventDefault();
            console.log(123);
            //2.2发送ajax请求
            console.log($(this).serialize());
            //发送ajax请求
            axios.post('/api/login', $(this).serialize())
                .then(res => {
                    console.log(res);
                    //验证是否登录成功
                    if (res.status !== 0) {
                        return layer.msg('登录失败!')
                    }
                    //登录成功后将res.token 个人身份凭证保存在本地
                    localStorage.setItem('token', res.token);
                })
        })
        //表单验证
    form.verify({

        pass: [
            /^\w{6,12}$/, '密码只能在6-12位之间'
        ],
        samepass: function(value) {
            if (value != $('#pass').val()) {
                return '两次输入密码不一致'
            }
        }
    });
    //实现注册功能
    $('.reg-form').submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        //发送ajax
        axios.post('/api/reguser', $(this).serialize())
            .then(res => {
                if (res.status !== 0) {
                    return layer.msg('注册失败!')
                }
                layer.msg('注册成功!')
                $('.login-form a').click()
            })
    });












})