
define(['jquery', 'text!tpls/courseTimeList.html', 'api', 'template',
    'course/timeAdd','course/editTime'], function ($, courseTimeListTpl, api, template, timeAdd,editTime) {
        return function (id) {
            var fn=arguments.callee;
            api.get('course/lesson', { cs_id: id }, function (res) {
                console.log(res);
                var courseTimeList = template.render(courseTimeListTpl, res.result)
                var $courseTimeList = $(courseTimeList).on('click', '.btn-add', function () {
                    var ct_id = $(this).parent().attr('ct_id')
                    // alert(ct_id)
                    timeAdd(ct_id, function () {
                        // 回调函数是第3行的f()
                        f(id)
                    })
                }).on('click','.btn-edit',function(){
                    var ct_id=$(this).parent().attr('ct_id')
                    editTime(ct_id,function(){
                        fn(id)
                    })
                })
                $('.panel-content .panel-body').html($courseTimeList)

            })

        }
    })