
define(['jquery', 'text!tpls/courseList.html', 'template', 'api','course/time',
'course/baseinfo','course/fileAdd'], function ($, courseListTpl, template, api,courseTime,baseinfo,fileAdd) {
    return function () {
        api.get('course', {}, function (res) {
            console.log(res);
            var courseList = template.render(courseListTpl, res)
            var $courseList=$(courseList).on('click','.btn-time',function(){
                var cs_id=$(this).parent().attr('cs_id')
                // alert(cs_id)
             courseTime(cs_id)
            }).on('click','.btn-baseinfo',function(){
                var cs_id=$(this).parent().attr('cs_id')
               baseinfo(cs_id) 
            }).on('click','a',function(){
                var id=$(this).attr('cs_id')
               fileAdd(id)
            })
            $('.panel-content .panel-body').html( $courseList)
        })

    }
})