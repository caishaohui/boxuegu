/**
 * 个人中心模块功能
 */
define(['jquery', 'text!tpls/personalCenter.html', 'api', 'template', 
'common/myModal', 'ueAll','upload'], function ($, personalCenterTpl, api, template, myModal) {
    return function () {
        // 获取个人数据
        api.get('teacher/profile', {}, function (res) {
            console.log(res);
            var personalCenter = template.render(personalCenterTpl, res.result)
            var $personalCenter = $(personalCenter).on('submit', 'form', function () {
                var formData = $(this).serialize()
                // 异步提交修改后的个人中心数据
                api.post('teacher/modify', formData, function (res) {
                    // console.log(res);
                    $personalCenter.modal('hide')
                    // 重新加载页面
                    location.reload()
                })
                return false
            }).myModal('#modalPersonalCenter')
            UE.delEditor('ueContainer')
            var ue = UE.getEditor('ueContainer'); //"container"也就对应了id为"container"的script标签
            //   方法2:  ue.destroy();
            ue.ready(function () {
                //设置编辑器内容
                // 可以设置text插件的模板内容,这里写里初始化的内容无效
                ue.setContent(res.result.tc_introduce);
            })
            $("#file_upload_1").uploadify({

                auto: true,//选择文件之后是否自动上传        true自动上传

                //        buttonImage:"../imgs/pic.jpg",

                //        checkExisting:true,//选择一个文件的时候，检测上传队列中是否有相同的文件,如果相同会有提示

                fileObjName: "tc_avatar", //：等同于file标签的name值

                fileTypeExts: "*.jpg; *.png; *.gif",
                buttonText:'上传头像',
                formData: {},       //用于表单提交的额外数据

                // itemTemplate: "<span></span>",     //上传模板

                //        height        : 198,
                swf: '/assets/uploadify/uploadify.swf',//swf文件的地址
                uploader: '/api/uploader/avatar',//服务器中处理上传请求的地址
                //        width         : 195,
                onUploadSuccess: function () {
                    //修改首页中的用户头像
                    console.log('成功');
                }

            });
        })
    }
})