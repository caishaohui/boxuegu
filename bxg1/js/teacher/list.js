
define(['jquery', 'text!tpls/teacherList.html', 'template', 'teacher/teacherShow','teacher/add','teacher/edit'], function ($, teacherListTpl, template, teacherShow,teacherAdd,teacherEdit) {

    return function () {
        $.ajax({
            url: '/api/teacher',
            type: 'get',
            success: function (res) {
                // console.log(res.result);
                var teacherList = template.render(teacherListTpl, res)
                var $teacherList = $(teacherList).on('click', '.btn-show', function () {
                    var tc_id = $(this).parent().attr('tc_id')
                    // alert(tc_id)
                    teacherShow(tc_id)
                }).on('click','.btn-add',function(){
                    teacherAdd()
                }).on('click','.btn-edit',function(){
                    var tc_id=$(this).parent().attr('tc_id')
                   teacherEdit(tc_id)
                }).on('click','.btn-status',function(){
                    // alert(1)
                 var $btn_e=$(this);
                 console.log($btn_e);
                 
                    // alert(id)
                    
                    $.ajax({
                        url:'/api/teacher/handle',
                        type:'post',
                        data:{
                            tc_id:$(this).parent().attr('tc_id'),
                            tc_status:$(this).parent().attr('tc_status'),
                        },
                        success:function(res){
                            console.log('成功');
                            console.log(res);
                            if(res.code!=200)throw new Errow(res.msg)
                            var tc_status=res.result.tc_status
                            // console.log(tc_sta);
                            $btn_e.text(tc_status==0?'注销':'启用')
                            $btn_e.parent().siblings('.td-status').text(tc_status==0?'启用':'注销')
                            $btn_e.parent().attr('tc_status',tc_status)
                            
                        }
                        
                    })
                })
                $('.panel-content .panel-body').html($teacherList)
            }
        })

    }
})