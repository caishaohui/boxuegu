
define(['jquery', 'text!tpls/courseTimeList.html', 'api',
    'template', 'course/editTime'], function ($, courseTimeListTpl, api, template, editTime) {
        return function fn(id) {
            api.get("course/lesson", { cs_id: id }, function (res) {
                console.log(res);
                var courseTimeList = template.render(courseTimeListTpl, res.result)
                var $courseTimeList = $(courseTimeList).on('click', '.btn-edit', function () {
                    var ct_id = $(this).parent().attr('ct_id')
                    editTime(ct_id,function(){
                        fn(id)
                    })
                })
                $('.panel-content .panel-body').html($courseTimeList)
            })
        }
    })