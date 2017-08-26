
define(['jquery', 'text!tpls/courseTimeAdd.html', 'api'], function ($, courseTimeAddTpl, api) {
    return function (id,calkback) {
        $('#modalCourseTimeAdd').remove()

        var $courseTimeAdd = $(courseTimeAddTpl).on('submit', 'form', function (e) {
            e.preventDefault()
            // 序列化填入表格中的数据,因为没有ct_cs_id这个参数要手动的加上才能获取数据id 设置点击按钮的父元素上
            var formData = $(this).serialize()
            formData += "&ct_cs_id=" + id;
            // alert(formData)
            // 添加课时
            api.post('course/chapter/add', formData, function (res) {
                console.log(res);
                $courseTimeAdd.modal('hide')
                // 这个是time.js的f()的回调函数是为了刷新数据
                calkback()
            })
        }).appendTo('body').modal()
    }
})