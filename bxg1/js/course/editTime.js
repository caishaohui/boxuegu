  /**
     *
     *课时管理编辑模块
     */
define(['jquery', 'text!tpls/courseEditTime.html', 'common/myModal', 'api', 'template'], function ($, courseEditTimeTpl, myModal, api, template) {
    return function (id,calkback) {
        api.post('course/chapter/edit', { ct_id: id }, function (res) {
            console.log(res);
            // 序列号模板
            var courseEditTime = template.render(courseEditTimeTpl, res.result)
            var $courseEditTime = $(courseEditTime).on('submit', 'form', function (e) {
                // 阻止submit的默认行为
                e.preventDefault()
                // 提交表单
                var formData = $(this).serialize()
                // alert(formData)
                api.post('course/chapter/modify', formData, function (res) {
                    console.log(res);
                    $courseEditTime.modal('hide')
                    calkback()
                })
            }).myModal('#modalCourseTimeEdit')
            // 代码简化,把模板添加到body中同时删除模板重复
        })

    }
})