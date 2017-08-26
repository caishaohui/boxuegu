
define(['jquery', 'text!tpls/courseAdd.html', 'api','course/list'], function ($, courseAddTpl, api,courseList) {
    return function () {
        $('#modalCourseAdd').remove()
        var $courseAddTpl = $(courseAddTpl).on('submit', 'form', function (e) {
            e.preventDefault()
            var formData = $(this).serialize()
            api.post('course/create', formData, function (res) {
                console.log(res);
                 $courseAddTpl.modal('hide')
                courseList()
                $('.list-group .course-manager').addClass('active').siblings().removeClass('active')

            })
        }).appendTo('body').modal()

    }
})