define(['jquery', 'text!tpls/personalCenter.html', 'api',
    'template', 'ueAll', 'upload'], function ($, personalCenterTpl, api, template) {
        return function () {
            $('#modalPersonalCenter').remove()
            api.get('teacher/profile', {}, function (res) {
                // console.log(res);
                var personalCenter = template.render(personalCenterTpl, res.result)
                var $personalCenter = $(personalCenter).on('submit', 'form', function (e) {
                    e.preventDefault()
                    var formData = $(this).serialize()
                    // console.log(formData);
                    api.post('teacher/modify', formData, function (res) {
                        // console.log(res);

                        $personalCenter.modal('hide')
                        location.reload();
                    })
                }).appendTo('body').modal();
                // 删除id去除第二次点击加载失败的效果
                UE.delEditor('ueContainer');
                var ue = UE.getEditor('ueContainer'); //"container"也就对应了id为"container"的script标签
                // 方法一：UE.delEditor('courseContainer');
                // var ue = UE.getEditor('courseContainer');
                // 21:22:09
                // 陈祖路
                // 方法二：ue.destroy();
                ue.ready(function () {
                    //设置编辑器内容
                    // 这里设置了上面的加载编辑器的容器的文字无效
                    // 
                    ue.setContent(res.result.tc_introduce);
                })
                $("#file_upload_1").uploadify({

                    auto: true,//选择文件之后是否自动上传        true自动上传

                    //        buttonImage:"../imgs/pic.jpg",

                    //        checkExisting:true,//选择一个文件的时候，检测上传队列中是否有相同的文件,如果相同会有提示

                    fileObjName: "tc_avatar", //：等同于file标签的name值

                    // fileTypeExts: "*.jpg; *.png; *.gif",
                    fileSizeLimit: '100MB',
                    formData: {},       //用于表单提交的额外数据
                    buttonText: '选择上传图片',
                    // itemTemplate: "<span></span>",     //上传模板
                    //        height        : 198,
                    swf: '../assets/uploadify/uploadify.swf',//swf文件的地址
                    uploader: '/api/uploader/avatar',//服务器中处理上传请求的地址
                    //        width         : 195,

                    //文件上传完毕之后执行
                    /**
                     *
                     * @param file 上传成功的文件信息
                     * @param data
                     * @param response 接口的返回值
                     */
                    onUploadSuccess: function (file, data, response) {
                        // 获取上传图片的src设置到前端学院的图片上
                        // console.log(data);
                        // 强字符串转换为对象
                        var dataObj = JSON.parse(data)
                        // console.log(src);
                        var src = dataObj.result.path
                        console.log('上传成功');
                        $('.profile img').attr('src', src)
                    }

                });

            })

        }
    })