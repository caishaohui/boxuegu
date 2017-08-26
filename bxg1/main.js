/**
 * 这里是文档注释
 * Author:Wilbert
 *   Date:2017/8/17
 */
require.config({
    baseUrl: "js",
    paths: {
        jquery: 'lib/jquery-2.1.4',
        bootstrap: '../assets/bootstrap/js/bootstrap',
        text: 'lib/text',
        tpls: '../tpls',
        template: 'lib/template-web',
        cookie: 'lib/jquery.cookie',
        datatime: '../assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker',
        datatimeLange: '../assets/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN',
        api: 'common/api',
        // 
        upload: '../assets/uploadify/jquery.uploadify',
        //ueditor配置文件
        
        ueConf: '../assets/ueditor/ueditor.config',
        ueAll: '../assets/ueditor/ueditor.all',
        ZeroClipboard:'../assets/ueditor/third-party/zeroclipboard/ZeroClipboard',
        // 图表依赖
        echarts:'lib/echarts.min'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        datatimeLange: {
            deps: ['datatime']
        },
        upload: {
            deps: ['jquery']
        },
        ueAll: {
            deps: ['ueConf']
        }
    }


})

require(['jquery', 'teacher/list', 'cookie', 
    'course/list', 'course/add', 'common/personal','chart/index', 'bootstrap', 'text'], function ($, teacherList, cookie, courseList, courseAdd, personal,chartIndex) {
        // var one = sessionStorage.getItem('name')
        var one = $.cookie('name')
        // console.log(one);
        // alert(one)
        if (!one) {
            location.href = 'login.html'
            return;
        }
        //    alert(name);
        var name = JSON.parse(one)
        //    console.log(name);
        var tx_name = name.tc_name;
        // console.log(tx_name);
        var tx_pass = name.tc_avatar;
        // console.log(tx_pass);
        $('.profile img').attr('src', tx_pass)
        $('.profile h4').text(tx_name)
        $('.left .list-group').on('click', '.list-group-item', function () {
            if ($(this).hasClass('teacher-manager')) {
                teacherList()
                // 讲师管理
            } else if ($(this).hasClass('course-manager')) {
                // 课程管理
                
                alert(1)
            } else if ($(this).hasClass('add-course')) {
                courseAdd()
                // 添加课程
            } else if ($(this).hasClass('course-category')) {
                // 课程分类
                categoryList()
            } else if ($(this).hasClass('chart')) {
             chartIndex()
            //  图表统计
            }
            $(this).addClass('active').siblings().removeClass('active')
        })

        $('.left .list-group .teacher-manager').trigger('click')
        $('#linkPersonalCenter').on('click', function () {
            personal()
        })
        // $('.left .list-group a').on('click', function () {
        //     switch ($(this).index()) {
        //         case 0:
        //             teacherList()
        //             break;
        //         case 1:
        //             $('.panel-content .panel-body').html('课程管理')
        //             break;
        //         case 2:
        //             $('.panel-content .panel-body').html('课程分类')
        //             break;
        //         case 3:
        //             $('.panel-content .panel-body').html('图表统计')
        //             break;

        //         // default:
        //         //     break;
        //     }
        // })
        // $('.left .list-group a:eq(0)').trigger('click')

    })