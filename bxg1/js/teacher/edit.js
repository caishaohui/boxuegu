
define(['jquery', 'text!tpls/teacherEdit.html', 'template','datatime','datatimeLange'], function ($, teacherEditTpl, template) {

    return function (id) {
        $.ajax({
            url: '/api/teacher/edit',
            type: 'get',
            data: { tc_id: id },
            success: function (res) {
                // console.log('成功');
                console.log(res);
                // console.log($(this).parent());

                if (res.code != 200) throw new Errow(res.msg)
                var teacherEdit = template.render(teacherEditTpl, res.result)
                $('#modalTeacherEdit').remove()
                var $teacherEdit = $(teacherEdit).on('submit', 'form', function () {
                    var formData = $(this).serialize()
                    // console.log(formData);
                    $.ajax({
                        url: '/api/teacher/update',
                        type: 'post',
                        data: formData,
                        success: function (res) {
                            // console.log('成功');
                            // console.log(res);
                            if (res.code != 200) throw new Errow(res.msg)
                            $teacherEdit.modal('hide')
                            $('.left .list-group .teacher-manager').trigger('click')
                        }
                    })
                    return false;
                }).appendTo('body').modal()
                $teacherEdit.find('.btn-time').datetimepicker({
                    format: 'yyyy-mm-dd',
                    language: "zh-CN",
                    weekStart: "1",       //从周几开始
                    autoclose: true,        //选定一个日期之后就自动隐藏日期控件
                    minView: "month", //如果是月，最小能够精确到哪一天，如果是天，最小能够精确到哪一个小时
                    todayBtn: true
                    // todayHighlight: true
                })

            }
        })

    }
})