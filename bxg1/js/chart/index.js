
define(['jquery', 'text!tpls/chartIndex.html', 'echarts', 'api'], function ($, chartIndexTpl, echarts, api) {
    return function () {
        // 基于准备好的dom，初始化echarts实例
        var count = [
            { value: 0, name: '男' },
            { value: 0, name: '女' }
        ]
        api.get('teacher', {}, function (res) {
            console.log(res);
            res.result.forEach(function (v) {
                if (v.tc_gender == 0) {
                    count[0].value++
                } else (
                    count[1].value++
                )
            })
            console.log(count);
            var $chartIndex = $(chartIndexTpl)
            
            $('.panel-content .panel-body').html($chartIndex)

            // 图表插件
            var domMain = $chartIndex.find('.main')[0]
            var myChart = echarts.init(domMain);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '网站中男女比例',
                    subtext: '进攻参考\n上面是假的',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    top:30,
                    right:30,
                    data: count.map(function(v,i){
                        return v.name;
                    })
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: count,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        })


    }
})