

define(['jquery'], function ($) {

    var obj = {
        ajax: function (url, type, data, calkback) {
            $.ajax({
                url: '/api/' + url,
                type: type,
                data: data,
                success: function (res) {
                    if (res.code != 200) throw new Errow(res.msg)
                  calkback&&calkback(res)
                }
            })
        },
        get: function (url, data, calkback) {
            this.ajax(url, 'get', data, calkback)
        },
        post: function (url, data, calkback) {
            this.ajax(url, 'post', data, calkback)
        }
    }

    "post, get".split(',').forEach(function (v) {
        obj[v]=function(url,data,callback){
            this.ajax(url,v,data,callback)
        }
    })
    return obj

})