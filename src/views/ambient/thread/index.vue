<!-- 空气质量详情 -->
<template>
  <div class="contentBox">
      <div class="upDataTips">
          <div class="tipsimg">
              <div class="imgBox">
                  <img src="../../../assets/images/huanjin/icon_airtip.png" alt="">
              </div>
              <div class="imgTxt">{{ allData.time }}更新</div>
          </div>
      </div>
      <div class="airQuality">
        <div class="tongji-titles">空气质量指数及排名</div>
        <div class="aqis">
            <span id="aqi-img">
              <img src="../../../assets/images/huanjin/airRectangle.png">
            </span>
            <div class="aqi-data">
              <div>{{ allData.level }}</div>
              <div style="font-size:40px;">{{ allData.api }}</div> 
              <div style="margin-top:15px;">省/市排名：<span style="color:#d0021b;"> {{ allData.order }}</span></div>
            </div>
            <div class="aqi-color" style="background-color: rgb(66, 207, 24); width: 131.3px;"></div>
        </div>
        <div class="aqi-other">
          <span>
            <img src="../../../assets/images/huanjin/icon-wd.png">
            25.7℃
          </span> 
          <span><img src="../../../assets/images/huanjin/icon-js.png">73%</span>
          <span><img src="../../../assets/images/huanjin/icon-f.png" style="transform: rotate(10deg);margin:0;">&nbsp;&nbsp;10.5m/s</span>
        </div>
      </div>
      <div class="chartOne">
          <div class="cont-charts">
              <div class="tongji-titles winds">
                <div style="height: 21px;line-height: 21px;margin-left: 30px">静稳指数与风</div>
                <div class="wind" @mouseenter="aaaaaa" @mouseleave="bbbbbbb" >
                    <img src="../../../assets/images/huanjin/icon_airtip.png" alt="">
                    <div class="wind-tips" v-show="jinwenShow" >
                      静稳指数是定量反映大气静稳程度的综合气象条件指标。静稳指数越大，则发生或维持大气污染的可能性就越大
                    </div>
                </div>
              </div> 
              <div id="wind-chart">

              </div>
          </div>
          <div class="cont-charts">
              <div class="tongji-titles humid">相对湿度与地表温度</div>
              <div id="humidityg"></div>
          </div>
      </div>
      <div class="aqiBox">
          <div class="tongji-titles">未来三天AQI预报</div>
          <div></div>
      </div>

      <div class="chartTwo">

      </div>
  </div>
</template>

<script>
export default {
name: 'threadAmbient',
  data () {
    return {
      myid: this.$route.query.id,
      allData: {
        api: '',
        time: '',
        level: '',
        order: '',
      },
      jinwenShow: false,
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

  methods: {
    // 请求数据
    getData(){
      let api = '/api/web/huanjingDetail';
      this.$axios.get(api,{
        params:{
          stationNum: this.myid
        }
      }).then( (res)=>{
        console.log( res )
        if(res.data.status == 200){
          let data = res.data.data.content;
          this.allData = data;
          console.log(  this.allData ) 
          let jinwen = data.jingWenData.jingwenData;
          let shidu = data.shiduData.jsonShiDu;
          this.showStabilityCharts(jinwen.arryX,jinwen.arryJW,20,30,jinwen.arryFX,jinwen.arryFL);
          this.showHumidityCharts(shidu.arryX,shidu.arrySD,shidu.arryWD,20,30)
        }
      } )
    },
    aaaaaa(){
      this.jinwenShow = true
    },
    bbbbbbb(){
      this.jinwenShow = false
    },
    // 静稳风
    showStabilityCharts(label,val,start,end,vald,valv) {

      let myChart = this.$echarts.init(document.getElementById("wind-chart"));
      let font_size = 60;
      let option = {
          color: ['#0fbaf4', 'red'],
          grid: {
              left: font_size * 0.5,
              top: font_size * 0.65,
              right: font_size * 0.25,
              bottom: font_size * 0.4
          },
          legend: {
              itemGap: 20,
              data:[
                  {
                      name: '静稳指数',
                      icon: 'circle',
                      textStyle: {
                          fontSize: 0.24 * font_size
                      }
                  },
                  {
                      name: '风 m/s',
                      icon: 'path://M15,8.877l-8.626-5.01l8.789,22.266l8.463-22.266L15,8.877z',
                      textStyle: {
                          fontSize: 0.24 * font_size
                      }
                  }
              ]
          },
          tooltip: {
              show: true,
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow',
                  shadowStyle: {
                      color: 'rgba(150,150,150,0.2)'
                  }
              },
              backgroundColor: 'rgba(245, 245, 245, 0.8)',
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              textStyle: {
                  color: '#000'
              },
              formatter: function(params) {
                  let s = params[0]["data"];
                  let w = params[1]["data"]["value"] + "m/s";
                  if (params[0]["data"]=="") {
                      s = "无"
                  }
                  if (params[1]["data"]["value"]=="") {
                      w = "无"
                  }
                  return params[0]["axisValue"] + "<br>静稳指数:" + s + "<br>风:"+ w;
              }
          },
          brush: {
              toolbox: [''],
              transformable: false,
              xAxisIndex: 'all',
              brushStyle: {
                  colorAlpha: 1,
                  borderWidth: 0,
                  color: 'rgba(80,80,80,0.08)',
                  borderColor: 'rgba(0,0,0,0)'
              },
              inBrush: {
                  colorAlpha: 0.6
              },
              outOfBrush:{
                  colorAlpha: 1
              }
          },
          dataZoom: [
              {
                  type: 'inside',
                  start: 60,
                  end: 100,
                  xAxisIndex: [0]
              }
          ],
          xAxis: {
              axisLine: {
                  lineStyle: {
                      color: '#9b9b9b',
                      width: 1
                  }
              },
              boundaryGap:false,
              axisTick: {
                  length: 0
              },
              data: label,
              axisLabel: {
                  textStyle: {
                      color: "#9b9b9b",
                      fontFamily: "Arial",
                      fontSize: 0.18 * font_size
                  },
                  margin: -3,
                  interval: 0,
                  formatter: (value,index)=> {
                      let minuteSeconds = value.substring(11, 19); 
                      if (minuteSeconds == "02:00:00") {
                          return "׀" + "\n" + parseInt(value.substring(5, 7)) + "月" + parseInt(value.substring(8, 11)) + "日";
                      }
                  }
              }
          },
          yAxis: {
              splitLine: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: '#9b9b9b',
                      width: 1
                  }
              },
              axisTick: {
                  length: 0.06 * font_size,
                  alignWithLabel: true
              },
              axisLabel: {
                  textStyle: {
                      color: "#9b9b9b",
                      fontFamily: "Arial",
                      fontSize: 0.2 * font_size,
                      height: 0.4 * font_size
                  }
              }
          },
          series: [
              {
                  name: '静稳指数',
                  type: 'line',
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  symbol: 'circle',
                  symbolSize: font_size / 12,
                  data: val
              },
              {
                  name: '风 m/s',
                  type: 'line',
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  symbol: 'path://M15,8.877l-8.626-5.01l8.789,22.266l8.463-22.266L15,8.877z',
                  symbolSize: font_size / 8,
                  data: this.convertWindDataAir(vald, valv)
              }
          ]
      };
      myChart.setOption(option);
      myChart.dispatchAction({
          type: 'brush',
          areas: [
              {
                  brushType: 'lineX',
                  coordRange: [start, end],
                  xAxisIndex: [0, 1]
              }
          ]
      }); 
    },

    convertWindDataAir(vald, valv) {
        let newData = [];
        for (let i = 0; i < vald.length; i++) {
            newData.push({
                value: parseFloat(valv[i]),
                symbolRotate: -parseFloat(vald[i])
            })
        }
        return newData;
    },
    // 湿度
    showHumidityCharts(label, valh, valg, start, end) {
        var myChart = this.$echarts.init(document.getElementById("humidityg"));
        var font_size = 60;
        var option = {
            color: ['#0099ff', '#008000'],
            grid: {
                left: font_size * 0.5,
                top: font_size * 0.65,
                right: font_size * 0.25,
                bottom: font_size * 0.4
            },
            legend: {
                itemGap: 20,
                data:[
                    {
                        name: '相对湿度 %',
                        icon: 'rect',
                        textStyle: {
                            fontSize: 0.24 * font_size
                        }
                    },
                    {
                        name: '地表温度 ℃',
                        icon: 'rect',
                        textStyle: {
                            fontSize: 0.24 * font_size
                        }
                    }
                ]
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(150,150,150,0.2)'
                    }
                },
                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                textStyle: {
                    color: '#000'
                },
                formatter: function(params) {
                    var h = params[0]["data"] + "%";
                    var t = params[1]["data"] + "℃";
                    if (params[0]["data"]=="") {
                        h = "无"
                    }
                    if (params[1]["data"]=="") {
                        t = "无"
                    }
                    return params[0]["axisValue"] + "<br>相对湿度:" + h + "<br>地表温度:" + t;
                }
            },
            brush: {
                toolbox: [''],
                transformable: false,
                xAxisIndex: 'all',
                brushStyle: {
                    colorAlpha: 1,
                    borderWidth: 0,
                    color: 'rgba(80,80,80,0.08)',
                    borderColor: 'rgba(0,0,0,0)'
                },
                inBrush: {
                    colorAlpha: 0.6
                },
                outOfBrush:{
                    colorAlpha: 1
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 60,
                    end: 100,
                    xAxisIndex: [0]
                }
            ],
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#9b9b9b',
                        width: 1
                    }
                },
                axisTick: {
                    length: 0
                },
                data: label,
                axisLabel: {
                    textStyle: {
                        color: "#9b9b9b",
                        fontFamily: "Arial",
                        fontSize: 0.18 * font_size
                    },
                    margin: -3,
                    interval: 0,
                    formatter: function (value) {
                        var minuteSeconds = value.substring(11, 19);
                        if (minuteSeconds == "02:00:00") {
                            return "׀" + "\n" + parseInt(value.substring(5, 7)) + "月" + parseInt(value.substring(8, 11)) + "日";
                        }
                    }
                }
            },
            yAxis: {
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#9b9b9b',
                        width: 1
                    }
                },
                axisTick: {
                    length: 0.06 * font_size,
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle: {
                        color: "#9b9b9b",
                        fontFamily: "Arial",
                        fontSize: 0.2 * font_size,
                        height: 0.4 * font_size
                    }
                }
            },
            series: [
                {
                    name: '相对湿度 %',
                    type: 'bar',
                    data: valh
                },
                {
                    name: '地表温度 ℃',
                    type: 'bar',
                    data: valg
                }
            ]
        };
        myChart.setOption(option);
        myChart.dispatchAction({
            type: 'brush',
            areas: [
                {
                    brushType: 'lineX',
                    coordRange: [start, end],
                    xAxisIndex: [0]
                }
            ]
        });
    },
    // AQI变化
    getAQIdata(){
        switch (num) {
            case 1:
                label = data.aqihour.label;
                val = data.aqihour.val;
                start = data.start;
                end = data.end;
                break;
            case 2:
                label = data.aqiday.label;
                val = data.aqiday.val;
                break;
            case 3:
                label = data.aqimonth.label;
                val = data.aqimonth.val;
                break;
        }
        var myChart = echarts.init(document.getElementById("airChartsWarp"));
        var option = {};
        var font_size = 60;
        if (num != 3) {
            option = {
                grid: {
                    left: font_size * 0.63,
                    top: font_size * 0.2,
                    right: font_size * 0.3,
                    bottom: font_size * 0.4
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(150,150,150,0.2)'
                        }
                    },
                    formatter: function(params) {
                        var a = params[0]["data"]["value"];
                        if (params[0]["data"]["value"]=="") {
                            a = "无"
                        }
                        return params[0]["axisValue"] + "<br>AQI值:" + a;
                    },
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    }
                },
                brush: {
                    toolbox: [''],
                    transformable: false,
                    xAxisIndex: 'all',
                    brushStyle: {
                        colorAlpha: 1,
                        borderWidth: 0,
                        color: 'rgba(80,80,80,0.08)',
                        borderColor: 'rgba(0,0,0,0)'
                    },
                    inBrush: {
                        colorAlpha: 0.6
                    },
                    outOfBrush:{
                        colorAlpha: 1
                    }
                },
                xAxis: [{
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            color: '#9b9b9b',
                            width: 1
                        }
                    },
                    axisTick: {
                        length: 0
                    },
                    data: label,
                    axisLabel: {
                        textStyle: {
                            color: "#9b9b9b",
                            fontFamily: "Arial",
                            fontSize: 0.18 * font_size
                        },
                        margin: -3,
                        interval: 0,
                        formatter: function (value) {
                            if (num == 1) {
                                var minuteSeconds = value.substring(11, 19);
                                if (minuteSeconds == "02:00") {
                                    return "׀" + "\n" + parseInt(value.substring(5, 7)) + "月" + parseInt(value.substring(8, 11)) + "日";
                                }
                            } else if (num == 2) {
                                var day = value.substring(8, 10);
                                if (day == "01") {
                                    return "׀" + "\n" + parseInt(value.substring(0, 4)) + "年" + parseInt(value.substring(5, 7)) + "月";
                                }
                            }
                        }
                    }
                }],
                yAxis: [{
                    show: true,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#9b9b9b',
                            width: 1
                        }
                    },
                    max: 500,
                    axisLabel: {
                        textStyle: {
                            color: "#9b9b9b",
                            fontFamily: "Arial",
                            fontSize: 0.18 * font_size
                        },
                        formatter: function (value) {
                            return parseInt(value);
                        }
                    }
                }],
                dataZoom: [
                    {
                        type: 'inside',
                        start: 75,
                        end: 100,
                        xAxisIndex: [0]
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        name: 'AQI值',
                        barGap: 1,
                        data: convertAirData(val)
                    }
                ]
            };
            myChart.setOption(option);
            if(num == 1){
                myChart.dispatchAction({
                    type: 'brush',
                    areas: [
                        {
                            brushType: 'lineX',
                            coordRange: [start, end],
                            xAxisIndex: 0
                        }
                    ]
                });
            }
        } else {
            option = {
                color: ['#43ce19', '#eedc30', '#ffaa01', '#ff401b', '#d20042', '#9b0a4d'],
                grid: {
                    left: font_size * 0.7,
                    top: font_size * 0.2,
                    right: font_size * 0.3,
                    bottom: font_size * 0.4
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(150,150,150,0.4)'
                        }
                    },
                    formatter: '{b0}',
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    }
                },
                yAxis: [{
                    show: true,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#9b9b9b',
                            width: 1
                        }
                    },
                    max: 1,
                    axisLabel: {
                        textStyle: {
                            color: "#9b9b9b",
                            fontFamily: "Arial",
                            fontSize: 0.18 * font_size
                        },
                        formatter: function (value) {
                            return parseInt(value*100) + "%";
                        }
                    }
                }],
                xAxis: {
                    type: 'category',
                    data: label,
                    axisLine: {
                        lineStyle: {
                            color: '#9b9b9b',
                            width: 1
                        }
                    },
                    axisTick: {
                        length: 0
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#9b9b9b",
                            fontFamily: "Arial",
                            fontSize: 0.18 * font_size
                        },
                        align: 'left',
                        margin: -3,
                        interval: 0,
                        formatter: function (value) {
                            var minuteSeconds = value.substring(5, 7);
                            if (minuteSeconds == "01") {
                                return "׀" + "\n" + parseInt(value.substring(0, 4)) + "年";
                            }
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100,
                        xAxisIndex: [0]
                    }
                ],
                series: [
                    {
                        name: '优',
                        type: 'bar',
                        stack: '总量',
                        data: val[0]
                    },
                    {
                        name: '良',
                        type: 'bar',
                        stack: '总量',
                        data: val[1]
                    }
                    ,
                    {
                        name: '轻度',
                        type: 'bar',
                        stack: '总量',
                        data: val[2]
                    }
                    ,
                    {
                        name: '中度',
                        type: 'bar',
                        stack: '总量',
                        data: val[3]
                    }
                    ,
                    {
                        name: '重度',
                        type: 'bar',
                        stack: '总量',
                        data: val[4]
                    }
                    ,
                    {
                        name: '严重',
                        type: 'bar',
                        stack: '总量',
                        data: val[5]
                    }
                ]
            };
            myChart.setOption(option);
        }
    }


  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getData();
    // this.showStabilityCharts();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url();
.contentBox{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    .upDataTips{
      width: 100%;
      height: 68px;
      line-height: 2;color: #666;
      .tipsimg{
        width: 100px;
        margin: 0 auto;
        .imgBox{
          width: 21px;
          height: 21px;
          margin: 0 auto;
          &:hover{
            cursor: pointer;
          }
          
          img{
            width: 100%;
            height: 100%;
          }
        }
        .imgTxt{
          width: 100px;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
    .airQuality{
      margin-top: 20px;
      .tongji-titles{
          background-color: #f2f2f2;
          padding: 0px 10px;
          height: 42px;
          line-height: 42px;
      }
      .aqis{
        width: 100%;
        position: relative;
        #aqi-img{
          width: 100%;
          img{
            width: 100%;
            height: 250px;
            margin: 30px 0;
          }
        }
        .aqi-data{
          position: absolute;
          text-align: center;
          height: 110px;
          top: 75px;
          left: 43.5%;
          color: #333333;
        }
        .aqi-color{
          position: absolute;    
          top: 57%;
          left: 10px;
          height: 55px;
          z-index: -1;
        }
      }
      .aqi-other{
        width: 450px;
        margin: 0 auto;
        text-align: center;
        line-height: 2;
        span {
          margin-right: 80px;
          // width: 120px;
          img {
            width: 26px;
            height: 26px;
            vertical-align: bottom;
            margin-bottom: 5px;
            margin-right: 10px;
          }
        }
        
      }
    }
    .chartOne{
      width: 100%;
      box-sizing: border-box;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      margin-top: 20px;
      .cont-charts{
          width: 48%;
        .tongji-titles{
          background-color: #f2f2f2;          
          height: 42px; 
        }
        .winds{ 
          height: 42px;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          .wind{
              position: relative;
              display: inline-block;
              width: 21px;
              height: 21px;
              margin-left: 10px;
              margin-top: 6px;
              img{
                width: 100%;
                height: 100%;
              }
              .wind-tips{
                position: absolute;
                top: -10px;
                left: 30px;
                z-index: 22;
                width: 360px;
                height: 40px;
                background-color: rgb(68, 68, 68);
                color: #fff;
                font-size: 14px;
              }
          }
        }
        #wind-chart{
            margin-top: 50px;
            height: 220px;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            position: relative;
        }
        .humid{
            box-sizing: border-box;
            padding-left: 30px;
            line-height: 42px;
        }
        #humidityg{
          height: 220px;
          margin-top: 40px;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          position: relative;
        }

      }
    }
    .aqiBox{
      width: 100%;
      box-sizing: border-box;
      margin-top: 20px;
      .tongji-titles{ 
          background-color: #f2f2f2;
          height: 42px;
          line-height: 42px;
          box-sizing: border-box;
          padding-left: 30px;
      }
    }
    .chartTwo{
      width: 100%;
      box-sizing: border-box;
      margin-top: 20px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;


    }
}
</style>