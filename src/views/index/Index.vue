<template>
    <div>
        <Content style="padding:20px;">   
            <Card>
                <Row>
                    <Col :span="11">
                        <div ref="c1" style="width: 100%;height:400px;"></div>
                    </Col>
                    <Col :span="11" :offset="1">
                        <div ref="c2" style="width: 100%;height:400px;"></div>
                    </Col>
                </Row>
                <Row>
                    <Col :span="11">
                        <div ref="c3" style="width: 100%;height:400px;"></div>
                    </Col>
                    <Col :span="11" :offset="1">
                        <div ref="c4" style="width: 100%;height:400px;"></div>
                    </Col>
                </Row>
                
            </Card>
        </Content>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    mounted(){
        var myChart1 = echarts.init(this.$refs.c1);
        var myChart2 = echarts.init(this.$refs.c2);
        var myChart3 = echarts.init(this.$refs.c3);

        // 指定图表的配置项和数据
        var option1 = {
            color: "blue",
            title: {
                text: 'ECharts 入门示例',
                textStyle: {
                    color: 'orange'
                },
                left: 50
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        var option2 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            ]
        };

        var option3 = {
                title: {
                    text: '基础雷达图'
                },
                tooltip: {},
                legend: {
                    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                    }
                    },
                    indicator: [
                        { name: '打钱能力', max: 100},
                        { name: '发育能力', max: 100},
                        { name: '推进能力', max: 100},
                        { name: '辅助能力', max: 100},
                        { name: 'gank能力', max: 100},
                        { name: '挂机能力', max: 100}
                    ]
                },
                series: [{
                        name: '陈静合的王者荣耀',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data : [
                            {
                                value : [10,11,14,33,23,98],
                                name : '陈静合的王者荣耀'
                            }
                        ]
                    },
                    {
                        name: '方浩的王者荣耀',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data : [
                            {
                                value : [100,81,64,93,23,38],
                                name : '方浩的王者荣耀'
                            }
                        ]
                    }
                ]
            };

        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
        myChart2.setOption(option2);
        myChart3.setOption(option3);
    },
    methods:{
        
    }
};
</script>

<style lang="less" scoped>
    
</style>