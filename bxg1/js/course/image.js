
/**
 * 课程管理 课程图片模块
 */
define(['jquery', 'text!tpls/courseImage.html', 'api', 'template'], function ($, courseImageTpl, api, template) {
    return function (id) {
        api.get('course/picture', { cs_id: id }, function (res) {
            console.log(res);
            var courseImage = template.render(courseImageTpl, res.result)
            $('.panel-content .panel-body').html(courseImage)

            $("#file_upload_1").uploadify({
                // 注意点 
                // 上传完404报错不用管  
                //一定要改浏览器的fash应许,刷新旁的圆感叹号里
                //一定要在服务器打开
                auto: true,//选择文件之后是否自动上传        true自动上传

                //        buttonImage:"../imgs/pic.jpg",

                //        checkExisting:true,//选择一个文件的时候，检测上传队列中是否有相同的文件,如果相同会有提示

                fileObjName: "cs_cover_original",//：等同于file标签的name值


                fileTypeExts: "*.jpg; *.png; *.gif",
                buttonText: '上传图片',
                formData: { cs_id: id },    //用于表单提交的额外数据
                // itemTemplate: "<span></span>",    //上传模板,设置了没有上传的进度条

                // height: 198, //按钮的宽高
                swf: '/assets/uploadify/uploadify.swf',//swf文件的地址,主文件路劲要写对
                uploader: '/api/uploader/cover',//服务器中处理上传请求的地址
                // width: 195,
                //文件上传完毕之后执行
                /**
                 *
                 * @param file 上传成功的文件信息
                 * @param data 日期
                 * @param response 接口的返回值
                 */
                onUploadSuccess: function (file, data, response) {
                    // console.log(file);
                    // console.log(data);
                    // console.log(response);
                    $(".left .list-group .course-manager").trigger("click");
                }

            });
        })
    }
})