<template>
  <div class="contentBox">
      <div class="subNav">
        <div class="subnav_con">
            <div class="subnav_list" title="廊坊">廊坊</div>
            <div class="subnav_list" title="固安">固安</div>
            <div class="subnav_list" title="永清">永清</div>
            <div class="subnav_list" title="香河">香河</div>
            <div class="subnav_list" title="大城">大城</div>
            <div class="subnav_list" title="文安">文安</div>
            <div class="subnav_list" title="大厂">大厂</div>
            <div class="subnav_list" title="霸州">霸州</div>
            <div class="subnav_list" title="三河">三河</div>
        </div>   
      </div>
      <div class="now">
          <div class="nowBox">
              <div class="nowLeft">
                  <div class="area">廊坊</div>
                  <div class="nowDate">2020年7月22日 周三</div>
                  <div>日出 : 05:04</div>
                  <div>日落 : 19:35</div>
              </div>
              <div class="nowCenter">
                  <div class="weather_tem">
                    <img src="../../assets/images/icon_weather_day_01.png" alt="">
                    <span>29℃</span> 
                  </div>
                  <div class="weather_txt">
                      <span>多云  | 东南风1-2级  | 湿度62%</span>
                  </div>
              
              </div>
              <div class="nowRight">
                  <div class="today">
                      <div class="today_time">今天</div>
                      <div class="today_weater_img">
                          <img style="margin-right: 5px" src="../../assets/images/icon_weather_day_01.png" alt="">
                          &nbsp;
                          <img src="../../assets/images/icon_weather_day_02.png" alt="">
                      </div>
                      <div class="day_night">
                          <span style="margin-right: 5px" >白天</span>
                          &nbsp;
                          <span>夜间</span>
                      </div>
                      <div class="tem"> 
                          <span>34℃</span>
                          &nbsp;/&nbsp;
                          <span>22℃</span>
                      </div>
                      <div class="updataTime">
                          <span>更新时间：2020-07-22 08 :00</span>
                      </div>
                  </div>
              </div> 
              
              <div class="alarm">
              
              </div>

          </div> 

      </div>
      <div class="hd">
          <div class="on" @click="toHours" >逐小时预报</div>
          <div @click="toDays" >七天预报</div>
      </div>
      <div class="slide">
          <div class="slideContent1">
              <!-- <div class="hours">
              <highcharts style="width:100%;height: 100%;background-color: rgba(0,0,0,0) " :options="chartOptions"  ></highcharts>
              </div>
              <div class="days"></div> -->
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide class="swiper-item">
                <div class="hours">
                  <highcharts style="width:100%;height: 100%;background-color: rgba(0,0,0,0) " :options="chartOptions"  ></highcharts>
                </div>
              </swiper-slide>
              <swiper-slide class="swiper-item">Slide 2</swiper-slide> 
            </swiper>
          </div>
      </div>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
name: 'homes',
  data () {
    return {
      chartOptionss: {
        chart: {
            type: 'spline',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: ''
        }, 
        tooltip:{
          // headerFormat: '<div style="font-size: 10px;color: blue"> { this.x }时 </div>',
        },
        xAxis: { 
            categories: ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23','00','01','02','03','04','05','06','07','08','09','10','11'],
            tickPosition: 'outside',
            labels:{
              style:{
                color: '#fff'
              }
            }
        },
        yAxis: {
            title: {
                // text: '气温 (°C)'
                enabled: false
            },
            labels:{
              formatter: function () {
                  return this.value + "℃"
              },
              style:{
                color: '#fff'
              }
            }
        },  
        credits: {
          enabled: false
        },
        legend: {
    			enabled: false
	    	},
        // plotOptions: {
        //     line: {
        //         dataLabels: {
        //             // 开启数据标签
        //             enabled: true          
        //         },
        //         // 关闭鼠标跟踪，对应的提示框、点击事件会失效
        //         enableMouseTracking: false
        //     }
        // },
        series: [{ 
            name: '温度',
            data: [28,29,27,30,28,33,36,37,32,32,34,35,28,29,27,30,28,33,36,37,32,32,34,35],
            itemStyle : { normal: {label : {show: true}}},
            color: '#ff7a52',
            lineWidth: 2,
            states:{
              hover:{
                marker:{//线上数据点
                  symbol:'circle',//圆点显示
                  radius:5,
                  lineWidth:6,
                  lineColor:'#ff7a5217',
                  fillColor:'#ff7a5217',
                  states:{
                    hover:{
                      enabled:false
                    }
                  }
                } 
              }
            },
            marker:{
              enabled: false
            }

        }]
      },
      chartOptions: {
          chart: {
              type: 'spline',
              backgroundColor: 'rgba(0,0,0,0)'
          },
          credits: {
              enabled: false
          },
          legend: {
              enabled: false
          },
          colors:['#F28362'],
          title: {
              text: '',
              style: {color:'#FFFFFF'}
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              categories: ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23','00','01','02','03','04','05','06','07','08','09','10','11'],
              labels: {
                  style: {color:'#FFFFFF'}
              }
          },
          yAxis: {
              title: {
                  text: '',
                  style: {color:'#FFFFFF'}
              },
              labels: {
                  formatter: function() {
                      return this.value +'℃'
                  },
                  style: {color:'#FFFFFF'}
              }
          },
          tooltip: {
              formatter: function() {
                  return '<b>'+ this.x +'时</b><br />'+ '温度:'+this.y +'℃';
              },
              crosshairs: true,
              shared: true
          },
          plotOptions: {
              spline: {
                  dataLabels:{
                      enabled :true,//是否在点的旁边显示数据
                      rotation:0 , 
                      verticalAlign:'bottom', 
                      padding:10, 
                      formatter: function() { 
                          return this.y +'' 
                      }, 
                      style: {color:'#FFFFFF'} 
                  }, 
                  marker: { 
                      radius: 5, 
                      lineColor: '#ffffff', 
                      lineWidth: 0 
                  }, 
                  states: { 
                      hover: { 
                          enabled :true 
                      } 
                  } 
              } 
          }, 
          series: [{ 
              name: '温度', 
              marker: { 
                  symbol: 'circle' 
              }, 
              data: [28,29,27,30,28,33,36,37,32,32,34,35,28,29,27,30,28,33,36,37,32,32,34,35],
          }] 
      },
      swiperOptions: {
        // direction: 'vertical',
    　　observer:true,//修改swiper自己或子元素时，自动初始化swiper 
    　　observeParents:true,//修改swiper的父元素时，自动初始化swiper 
        loop:true,
        autoplay:{
            disableOnInteraction: false,
            delay: 2000,
        },
        // autoplayDisableOnInteraction: false,
      }
    };
  },

  components: {
    highcharts: Chart
  },

//监听属性 类似于data概念
  computed: {
    swiper() {
        return this.$refs.mySwiper.$swiper
      }
  },

//监控data中的数据变化
  watch: {},

  methods: {
    toHours(){
        this.swiper.slideTo(1, 500, false)
    },
    toDays(){
        this.swiper.slideTo(2, 500, false)
    },
    // 获取所有城市
    getAllCity(){
       let api = '/api/web/city';
       this.$axios.get(api,{

       }).then((res)=>{
         console.log(res)
       })
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getAllCity();
},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
      // this.swiper.init();
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>

  .contentBox{
    width: 100%;
    background: url('../../assets/images/bg01.jpg') center center no-repeat fixed;
    .subNav{
      width: 100%;
      height: 40px;
      background: url('../../assets/images/subnav_bg.jpg') repeat-x;
      .subnav_con{
        width: 1100px;
        height: 40px;
        margin: 0 auto;
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        .subnav_list{ 
          padding: 0 25px;
          font-size: 12px; 
          line-height: 40px;
          height: 40px;
          text-align: center;
          color: #d1d7e1;
          &:hover{
            cursor: pointer;
            color: aqua;
          }
        }
      } 
    }
    .now{
      width: 100%;
      height: 350px;
      background-color: rgba(52, 121, 183, 0.5);
      color: #fff;
      .nowBox{
        width: 1100px;
        height: 350px;
        margin: 0 auto;
        position: relative;
        overflow:hidden;
        .nowLeft{
          position: absolute;
          height: 140px;
          width: 200px; 
          top: 20px;
          font-size: 19px;
          >div{
            margin: 6px 0;
          }
          .area{
            font-size: 36px;
          }
          .nowDate{
            margin-bottom: 10px;
          }
        }
        .nowCenter{
          // position: absolute;
          // top: 50px;
          // font-size: 68px;
          // left: 385px; 
          height: 170px;
          margin: 50px auto 0;
          text-align: center;
          color: #fff;
          font-size: 68px;
          position: relative;
          .weather_tem{
            height: 170px; 
            text-align: center;
            color: #fff;
            font-size: 68px;
            position: relative;
              img{
                width: 170px;
                height: 170px;  
              }
              >span{
                display: inline-block;
                *display: inline;
                *zoom: 1;
                width: 160px;
                height: 100px;
                line-height: 100px;
                position: relative;
                bottom: 30px;
                left: 0;
              }
          }
          .weather_txt{
            font-size: 19px;
            text-align: center;
          }
        }
        .nowRight{
            position: absolute;  
            top: 20px; 
            right: 0;
            .today{
              display: flex;
              display: -webkit-flex;
              width: 175px;
              text-align: center; 
              flex-wrap: wrap;
              >div{
                width: 100%;
              }
              .today_time{
                font-size: 1.4em;
                height: 30px;
                line-height: 30px;
              }
              .today_weater_img{ 
                img{
                  width: 32px;
                  height: 32px;
                }
              }
              .day_night{
                margin: 5px 0;
              }
              .tem{
                margin: 8px 0;
              }
              .updataTime{
                margin-top: 5px;
                font-size: 12px;
              }
            }
        }
        .alarm{
          width: 520px;
          position: absolute;
          left: 50%;
          margin-left: -260px;
          top: 270px;
          border-top: #CCC 1px solid;
        }
      } 
    }
    .hd{
      height: 40px;
      background: rgba(52, 121, 183, 0.5);
      text-align: center;
      >div{
        display: inline-block;
        color: #c5c5c5;
        line-height: 39px;
        height: 39px;
        padding: 0 15px;
        font-size: 18px;
      }
      .on{
        color: #fff;
        border-bottom: #fff 1px solid;
      }
    }
    .slide{
      width: 100%;
      background: rgba(52, 121, 183, .8);
      padding: 20px 0 10px 0;
      .slideContent{
        width: 1100px;
        overflow: hidden;
        margin: 0 auto;
        .hours{
          width: 1100px;
          height: 230px; 
        }
        .days{
          width: 1100px; 
        }
      }
      .slideContent1{
        width: 1100px; 
        overflow: hidden;
        margin: 0 auto;
        .swiper-item{
          width: 100%;
          .hours{
            width: 1100px;
            height: 230px; 
          }
        }
      }
    }

  }

</style>