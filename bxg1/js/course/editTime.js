define(['jquery', 'text!tpls/courseTimeEdit.html','api','template'], function ($, courseTimeEditTpl,api,template) {
    $.fn.myModal = function (id) {
        id && $(id).remove()
        this.appendTo('body').modal()
        return this;
    }
    return function (id,calkback) {
        api.get('course/chapter/edit', { ct_id: id}, function (res) {
            // console.log(res);
            var courseTimeEdit=template.render(courseTimeEditTpl,res.result)
            var $courseTimeEdit=$(courseTimeEdit).on('submit','form',function(e){
                e.preventDefault()
                var formData=$(this).serialize()
                // alert(formData)
                api.post('course/chapter/modify',formData,function(res){
                    // console.log(res);
                    $courseTimeEdit.modal('hide')
                    calkback()
                })
            }).myModal('#modalCourseTimeEdit')

        })
    }
})