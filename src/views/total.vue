<template>
    <div  style="display:flex;flex-wrap:wrap;width:calc(100vw - 250px);">
        <div class="execharts">
            <div ref="echartsContainer" style="width: 800px; height: 360px;"></div>
        </div>
        <div class="execharts2">
            <div ref="echartsContainer2" style="width: 600px; height: 360px;"></div>
        </div>
        <div class="execharts">
            <div ref="echartsContainer3" style="width: 600px; height: 360px;"></div>
        </div>
        <div class="execharts2">
            <div ref="echartsContainer4" style="width: 600px; height: 360px;"></div>
        </div>
    </div>
    
  </template>
   
  <script>
  import * as echarts from 'echarts';
  import axios from 'axios'
  export default {
    name: '',
    data() {
      return {
        activeItem:"",
        majors:[],
        majorsnumber:[],
        majorsname:[],
        status:[],
        status2:[{
            value:"",
            name:""
        },
        {
            value:"",
            name:""
        }],
        statusnumber:[],
        statusname:[],
        types:[],
        types2:[{
            value:"",
            name:""
        },
        {
            value:"",
            name:""
        }],
        typesnumber:[],
        typesname:[],
        years:[],
        yearsnumber:[],
        yearsname:[]
      };
    },
    methods:{
        getMajors() {
          axios.get('http://localhost:9099/total/getTotalMajors').then(res => {
              // 处理返回的数据
            //   console.log(res.data);
              this.majors.splice(0, this.majors.length)
              this.majors.push(...res.data)
              for (var i=0;i<this.majors.length;i++) {
                this.majorsnumber[i]=this.majors[i].majorsnumber
                this.majorsname[i]=this.majors[i].majorsname
                }
            //     console.log("this.majorsnumber");
            //   console.log(this.majorsnumber);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
      },
      getYears() {
          axios.get('http://localhost:9099/total/getTotalYears').then(res => {
              // 处理返回的数据
            //   console.log(res.data);
              this.years.splice(0, this.years.length)
              this.years.push(...res.data)
              for (var i=0;i<this.years.length;i++) {
                this.yearsnumber[i]=this.years[i].yearsnumber
                this.yearsname[i]=this.years[i].yearsname
                }
            //     console.log("this.yearsnumber");
            //   console.log(this.yearsnumber);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
      },
      getTypes() {
          axios.get('http://localhost:9099/total/getTotalTypes').then(res => {
              // 处理返回的数据
            //   console.log(res.data);
              this.types.splice(0, this.types.length)
              this.types.push(...res.data)
              for (var i=0;i<this.types.length;i++) {
                this.types2[i].value=this.types[i].typesnumber
                this.types2[i].name=this.types[i].typesname
                }
            //     console.log("this.typesnumber");
            //   console.log(this.types2);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
      },
      getStatus() {
          axios.get('http://localhost:9099/total/getTotalStatus').then(res => {
              // 处理返回的数据
              console.log(res.data);
              this.status.splice(0, this.status.length)
              this.status.push(...res.data)
              for (var i=0;i<this.status.length;i++) {
                this.status2[i].value=this.status[i].statusnumber
                this.status2[i].name=this.status[i].statusname
                }
                console.log("this.statusnumber");
              console.log(this.status2);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
      }

    },
    mounted() {
      this.getMajors();
      this.getYears();
      this.getTypes();
      this.getStatus();
      setTimeout(() => {
        var that=this;
      var myChart = echarts.init(this.$refs.echartsContainer);
      myChart.setOption({
        title: {
          text: '各专业人数',
          left: 'center', // 居中显示
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {},
        xAxis: {
          data: that.majorsname
        },
        yAxis: {
            
        },
        series: [{
          name: '人数',
          type: 'bar',
          itemStyle: {
            color: function (params) {
                // 参数 params 是每个柱子对象，包含 index、value 等属性
                var colorList = ['#9ebc19','#007175', '#59afff', '#2f89cf', '#7ed6df'];
                return colorList[params.dataIndex]; // 根据数据索引设置颜色
            }
        },
          data: that.majorsnumber
        }]
      });
      var myChart2 = echarts.init(this.$refs.echartsContainer2);
      myChart2.setOption({
        title: {
          text: '各年报考人数',
          left: 'center', // 居中显示
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {},
        xAxis: {
          data: that.yearsname
        },
        yAxis: {
            
        },
        series: [{
          name: '人数',
          type: 'line',
          data: that.yearsnumber
        }]
      });
      var myChart3 = echarts.init(this.$refs.echartsContainer3);
      myChart3.setOption({
        title: {
          text: '录取人数统计',
          left: 'center', // 居中显示
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {},
        series: [{
          name: '人数',
          type: 'pie',
          radius: ['40%', '70%'],
          data: that.status2,
          itemStyle: {
            color: function (params) {
                // 参数 params 是每个柱子对象，包含 index、value 等属性
                var colorList = [ '#9ebc19','#007175'];
                return colorList[params.dataIndex]; // 根据数据索引设置颜色
            }
        }
        }]
      });
      var myChart4 = echarts.init(this.$refs.echartsContainer4);
      myChart4.setOption({
        title: {
          text: '报考类型统计',
          left: 'center', // 居中显示
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {},
        
        series: [{
          name: '人数',
          type: 'pie',
          data:  that.types2,
          itemStyle: {
            color: function (params) {
                // 参数 params 是每个柱子对象，包含 index、value 等属性
                var colorList = [ '#2f89cf', '#7ed6df'];
                return colorList[params.dataIndex]; // 根据数据索引设置颜色
            }
        }
          
        }]
      });
    
      }, 2000);
    }
      
  }
</script>
<style lang="scss" scoped>
*{
  margin:0px;
  padding: 0px;
}
.execharts{
    width:800px;
    background-color: #fff;
    margin:10px;
    border-radius: 5px;
    padding-top: 20px;
    margin-left: 20px;
}
.execharts2{
    width:600px;
    background-color: #fff;
    margin:10px;
    border-radius: 5px;
    padding-top: 20px;
    
}
</style>