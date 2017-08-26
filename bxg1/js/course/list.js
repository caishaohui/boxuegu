define(['jquery', 'text!tpls/courseList.html', 'api', 'template','course/time'], function ($, courseListTpl, api, template,courseTime) {
    return function () {
        api.get('course', {}, function (res) {
            console.log(res);
            
            var courseList = template.render(courseListTpl,res)
            var $courseList=$(courseList).on('click','.btn-time',function(){
                var cs_id=$(this).parent().attr('cs_id')
              courseTime(cs_id)
            })
            $('.panel-content .panel-body').html( $courseList)
        })

    }
})