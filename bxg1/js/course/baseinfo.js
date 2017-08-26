
define(['jquery', 'text!tpls/courseBaseInfo.html', 'api', 'template'], function ($, courseBaseInfoTpl, api, template) {
    return function (id) {
        api.get('course/basic', { cs_id: id }, function (res) {
            console.log(res);
            var courseBaseInfo = template.render(courseBaseInfoTpl, res.result)
            var $courseBaseInfo = $(courseBaseInfo).on('submit', 'form', function () {
                var formdata = $(this).serialize()
                // alert(formdata)
                api.post('course/update/basic', formdata, function (res) {
                    // console.log(res);
                    $(".left .list-group .course-manager").trigger("click");//触发讲师管理菜单的click事件
                })
                return false;
            }).on('change', '.category-top', function () {
                var val = $(this).val()
                api.get('category/child', { cg_id: val }, function (res) {
                    // alert(5)
                    console.log(res);
                    var str=''
                    res.result.forEach(function(v,i){
                        str+='<option value="'+v.cg_id+'">'+v.cg_name+'</option>'
                    })
                   $courseBaseInfo.find('.category-childs').html(str)
                })
            })
            $('.panel-content .panel-body').html($courseBaseInfo)
        })
    }
})