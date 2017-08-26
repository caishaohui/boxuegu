/**
 *
 *课程管理模块
 */
define(['jquery', 'text!tpls/courseList.html', 'api', 'template',
    'course/time', 'course/baseinfo','course/image'], function ($, courseListTpl, api, template, courseTime, baseinfo,courseImage) {
        return function () {
            // var fn=arguments.callee
            api.get('course', {}, function (res) {
                console.log(res);

                var courseList = template.render(courseListTpl, res)

                var $courseList = $(courseList).on('click', '.btn-time', function () {
                    //点击课时信息按钮
                    var cs_id = $(this).parent().attr('cs_id')
                    courseTime(cs_id)
                }).on('click', '.btn-baseinfo', function () {
                    //点击基本信息按钮
                    var cs_id = $(this).parent().attr('cs_id')
                    baseinfo(cs_id)
                }).on('click','a',function(){
                    // 点击图片进入课程图片模块
                    var cs_id = $(this).attr('cs_id')
                   courseImage(cs_id)
                })
                $('.panel-content .panel-body').html($courseList)
            })

        }
    })