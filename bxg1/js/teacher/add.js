define(['jquery', 'text!tpls/teacherAdd.html','bootstrap','datatime','datatimeLange'], function ($, teacherAddTpl) {
    return function () {
        // console.log($teacherAdd);
        $('#modalTeacherAdd').remove()
      var $teacherAdd = $(teacherAddTpl).on('submit', 'form',function () {
            // alert(1)
            var formData = $(this).serialize()
            // alert(formData)
            $.ajax({
                url: '/api/teacher/add',
                type: 'post',
                data: formData,
                success: function (res) {
                    console.log(res);
                    console.log('成功');
                    if(res.code!=200) throw new Error(res.msg);
                     $teacherAdd.modal('hide')
                    $('.left .list-group .teacher-manager').trigger('click')
                }
            })
            return false;
        }).appendTo('body').modal()
// data-time
        $teacherAdd.find('.data-time').datetimepicker({
          format: 'yyyy-mm-dd',
            language: "zh-CN",
            weekStart: "1",       //从周几开始
            autoclose: true,        //选定一个日期之后就自动隐藏日期控件
            minView: "month", //如果是月，最小能够精确到哪一天，如果是天，最小能够精确到哪一个小时
            todayBtn: true
            // todayHighlight: true
        });

    }
})