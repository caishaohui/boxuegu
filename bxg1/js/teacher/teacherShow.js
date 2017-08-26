
define(['jquery', 'text!tpls/teacherShow.html', 'template'], function ($, teacherShowTpl, template) {
    return function (id) {
        // alert('加载了查看讲师')
        $.ajax({
            url: "/api/teacher/view",
            type: 'get',
            data: { tc_id: id },
            success: function (res) {
                console.log('成功');
                console.log(res);
                if(res.code!=200) return console.log(res.msg);
                 var ateacherShowTpl = template.render(teacherShowTpl, res.result)
                // alert(ateacherShowTpl)
                var $teacherShowTpl = $(ateacherShowTpl)
                // console.log($teacherShowTpl);
                $('#modalTeacherShow').remove()
                $teacherShowTpl.appendTo('body').modal()
                
            }
        })

    }
})