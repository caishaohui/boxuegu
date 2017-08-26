
define(['jquery', 'text!tpls/courseFileAdd.html', 'template', 
'api','upload'], function ($, courseFileAddTpl, template, api) {
    return function (id) {
        api.get('course/picture', { cs_id: id }, function (res) {
            // console.log(res);
            var courseFileAdd=template.render(courseFileAddTpl,res.result)
            $('.panel-content .panel-body').html(courseFileAdd)
            $('#fileImage').uploadify({
                 auto:true,//选择文件之后是否自动上传        true自动上传

                fileObjName:"cs_cover_original", //：等同于file标签的name值

                fileTypeExts:"*.jpg; *.png; *.gif",

                formData:{
                    cs_id:id
                },       //用于表单提交的额外数据

                // itemTemplate:"<span></span>",     //上传模板

                buttonText:"选择图片",

                //height        : 198,
                //文件地址：/表示网站根目录
                swf           : '../../assets/uploadify/uploadify.swf',//swf文件的地址
                uploader      : '/api/uploader/cover',//服务器中处理上传请求的地址
                //width         : 195,
                onUploadSuccess:function(){
                    $(".left .list-group .course-manager").trigger("click");
                }
            })
        })
    }
})
