
/**课程管理 基本信息功能
 * 
 */
define(['jquery', 'text!tpls/courseBaseInfo.html', 'api', 'template', 'common/myModal'], function ($, courseBaseInfoTpl, api, template, myModal) {
    return function (id) {
        // 获取基本信息数据
        api.get('course/basic', { cs_id: id }, function (res) {
            // console.log(res);
            var courseBaseInfo = template.render(courseBaseInfoTpl, res.result)
            // 点击提交submit
            var $courseBaseInfo = $(courseBaseInfo).on('submit', 'form', function () {
                var formData = $(this).serialize()
                // ajax异步提交数据
                api.post('course/update/basic', formData, function (res) {
                    console.log(res);
                    $(".left .list-group .course-manager").trigger("click");//触发讲师管理菜单的click事件
                })
                return false;
                // 顶级下拉框改变触发change事件
            }).on('change', '.category-top', function () {
                var val = $(this).val()
                // 重新编写子级下拉框的数据
                api.get('category/child', { cg_id: val }, function (res) {
                    var str = ''
                    res.result.forEach(function (v) {
                        str += '<option value="' + v.cg_id + '" >' + v.cg_name + '</option>'
                    })
                    // 用html清空数据再植入数据
                    $courseBaseInfo.find('.category-childs').html(str)
                    console.log(res);
                })
            })
            // 渲染页面
            $('.panel-content .panel-body').html($courseBaseInfo)

        })
    }
})