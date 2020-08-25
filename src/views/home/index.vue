<template>
  <div class="contentBox">
      <div class="subNav">
        <div class="subnav_con">
            <div class="subnav_list" :title="item.namecn"  :data-station='item.stationid' v-for="item in citysArr" @click="changeCitySt($event)" >{{item.namecn}}</div>
            
        </div>   
      </div>
      <div class="now">
          <div class="nowBox">
              <div class="nowLeft">
                  <div class="area">{{ leftTop.city }}</div>
                  <div class="nowDate">{{ leftTop.dateTime }}</div>
                  <div>日出 : {{ leftTop.sunrise }}</div>
                  <div>日落 : {{ leftTop.sunset }}</div>
              </div>
              <div class="nowCenter">
                  <div class="weather_tem">
                    <img :src="todayData.icon" alt="">
                    <span>{{todayData.wendu}}</span> 
                  </div>
                  <div class="weather_txt">
                      <span>{{todayData.tianqi}}  | {{todayData.fengxiang}}  | 湿度：{{todayData.shidu}}</span>
                  </div>
              
              </div>
              <div class="nowRight">
                  <div class="today">
                      <div class="today_time">{{rightTop.datetime}}</div>
                      <div class="today_weater_img">
                          <img style="margin-right: 5px" :src="rightTop.icon1" alt="">
                          &nbsp;
                          <img :src="rightTop.icon2" alt="">
                      </div>
                      <div class="day_night">
                          <span style="margin-right: 5px" >白天</span>
                          &nbsp;
                          <span>夜间</span>
                      </div>
                      <div class="tem"> 
                          <span>{{rightTop.max}}</span>
                          &nbsp;/&nbsp;
                          <span>{{rightTop.min}}</span>
                      </div>
                      <div class="updataTime">
                          <span>更新时间：{{rightTop.updateTime}}</span>
                      </div>
                  </div>
              </div> 
              
              <div class="alarm">
              
              </div>

          </div> 

      </div>
      <div class="hd">
          <div :class="{ 'on': isOn == '1' }" @mouseenter="toHours" @mouseleave="play" >逐小时预报</div>
          <div :class="{ 'on': isOn == '2' }" @mouseenter="toDays" @mouseleave="play">七天预报</div>
      </div>
      <div class="slide">
          <div class="slideContent1">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide class="swiper-item">
                <div class="hours">
                  <highcharts id="mychart" style="width:100%;height: 100%;background-color: rgba(0,0,0,0) " ref="myHighChart" :options="chartOptions"  ></highcharts>
                </div>
              </swiper-slide>
              <swiper-slide class="swiper-item">
                
                <div class="sevenDay">
                    <div class="tit">
                      天气预报(未来七天)
                      <span>更新时间：{{ lifeTime }}</span>
                    </div>
                    <div class="content">
                        <div class="sevenDayList"  v-for="item in weekData">
                          <div class="riqi">{{ item.fdate0 }}</div>
                          <div class="tian">{{ item.weekday }}</div>
                          <div class="icon">
                            <div>
                              <img :src="item.weathercode12" alt="">
                            </div>
                            <div style="margin-left: 3px;">
                              <img :src="item.weathercode24" alt="">
                            </div>
                          </div>
                          <div class="tem"><span>{{ item.tempmax }}</span>/<span>{{ item.tempmin }}</span></div>
                          <div class="feng">{{ item.wind12 }}</div>
                        </div>
                    </div>
                </div>
                
              </swiper-slide> 
            </swiper>
          </div>
      </div>
      <div class="airAvideo">
        <div class="pack">
          <div class="airBox">
            <h2>当前空气质量【廊坊】</h2>
            <span class="update_time">更新时间：N/A</span>
            <div class="pm_chart mt30"> 
                <div class="clear-fix"> 
                    <div class="one bbbox"> 
                        <!-- <canvas id="one" width="100" height="100"></canvas>  -->
                        <div class="icon"><i>N/A</i></div> 
                        <div class="text">AQI指数</div> 
                    </div> 
                    <div class="two bbbox"> 
                        <!-- <canvas id="two" width="100" height="100"></canvas>  -->
                        <div class="icon"><i>N/A</i></div> 
                        <div class="text">首要污染物</div> 
                    </div> 
                    <div class="three bbbox"> 
                        <!-- <canvas id="three" width="100" height="100"></canvas>  -->
                        <div class="icon"><i>N/A</i><p>微克/立方米</p></div> 
                        <div class="text">pm2.5浓度</div> 
                    </div> 
                </div> 
            </div>
            <div class="tips">
              空气质量指数：简称AQI，是定量描述空气质量状况的无量纲指数。
            </div>
            <div class="pm_ruler">

                <span class="ruler_icon"></span>

            </div>
          </div>
          <div class="viedoBox">
              <div class="tit">气象视频</div>
              <div class="myVideo">
                <video id="vid" muted :src='videoSrc' controls :poster="videoMsg.videoPic">
                    <!-- <source :src="videoSrc" type="video/mp4">  -->
                </video>
              </div>
          </div>
        </div>
      </div>
      <div class="lifeIndex">
          <div class="pack">
            <div class="tit">
              <div class="teext">生活指数【廊坊】</div>
              <div class="times">预报时间: {{lifeTime}}</div>
            </div>
            <div class="contents">
              <div class="lifeIndexList"  v-for="item in lifeIndexArr" >
                  <div class="icons">
                      <i class="icon iconfont icon-xiche" :class="item.icon" ></i>
                      <span>{{ item.indexName }}</span>
                  </div>
                  <div class="texxts">
                      <div class="zi">{{ item.brf }}</div>
                      <div class="zis">{{ item.txt }}</div>
                  </div>
              </div>
            </div>
          </div>
      </div>
      <div class="maps">
          <div class="pack">
            <div class="times adiv">
                时间选择：
                <el-date-picker
                  v-model="dateTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker> 
 
                <el-button size="small" style="margin-left: 10px" @click="getMapData">显示</el-button>
                     
                <el-switch
                  v-model="switchValue"
                  @change="changeSwitch"
                  style="margin-left: 10px"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                  <!--   -->
                </el-switch>    
                {{countDownNum}}秒刷新
            </div>
            <div class="shichang adiv">
              时长选择：
                <el-radio-group v-model="houRadio" size="medium">
                  <el-radio-button label="1">1小时降雨量</el-radio-button>
                  <el-radio-button label="3">3小时降雨量</el-radio-button>
                  <el-radio-button label="6">6小时降雨量</el-radio-button>
                  <el-radio-button label="12">12小时降雨量</el-radio-button>
                  <el-radio-button label="24">24小时降雨量</el-radio-button>
                </el-radio-group>
            </div>
            <div class="area adiv">
                地区选择：
                <el-radio-group v-model="cityRadio" size="medium">
                  <el-radio-button label="廊坊">廊坊</el-radio-button>
                  <el-radio-button label="廊坊市区">廊坊市区</el-radio-button>
                  <el-radio-button label="三河市">三河市</el-radio-button>
                  <el-radio-button label="香河县">香河县</el-radio-button>
                  <el-radio-button label="固安县">固安县</el-radio-button>
                  <el-radio-button label="永清县">永清县</el-radio-button>
                  <el-radio-button label="霸州市">霸州市</el-radio-button>
                  <el-radio-button label="文安县">文安县</el-radio-button>
                  <el-radio-button label="大城县">大城县</el-radio-button>
                </el-radio-group>
            </div>
            <div class="tit">
                <h2>{{cityRadio}}{{mapTime}} 1小时降水量</h2>
                <p>最高值出现在 <span style="color: red">{{ maxName }}</span> ，为 <span style="color: red">{{ maxNum }}</span> mm，最低值出现在 <span style="color: red">{{ minName}}</span> ，为<span style="color: red">{{ minNum }}</span>mm。</p>
            </div>
            <div class="myMap">
              <div class="mao" @click="showChart = true">图表统计</div>
              <div class="zhezao" v-show="showChart">
                <div class="colseit"  @click="showChart = false" >关闭</div>
                <div class="chartContent">
                      <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                          prop="date"
                          type="index"
                          label="排名" >
                        </el-table-column>
                        <el-table-column
                          prop="stationname"
                          label="城市名" >
                        </el-table-column>
                        <el-table-column
                          prop="data"
                          label="降雨量（从高到低）">
                        </el-table-column>
                      </el-table>
                </div>
              </div>
              <div id="mapbox"></div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
var bMap,alitterTimer,timerSept=1,myCompOverlay;
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
              categories: [],
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
              data: [],
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
      },

      citysArr: [],
      queryCity: "54515",

      videoSrc: '',
      videoImg: '',
      lifeIndexArr: [],
      lifeTime: '',
      shaCity: '',

      leftTop: {},
      rightTop: {},
      todayData: {},
      videoMsg: {},
      weekData: [],
 
      showChart: false,
      houRadio: '1',
      cityRadio: '廊坊',
      dateTime: '',
      switchValue: true,

      isOn: '1',
      countDownNum: 500, 

      mapData: {},
      maxName: '加载中...',
      maxNum: 0,
      minName: '加载中...',
      minNum: 0,

      tableData: [],
      mapTime: ''

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
      this.isOn = '1'
      this.swiper.slideTo(1, 500, false);
      clearInterval( alitterTimer )
    },
    toDays(){
        this.isOn = '2'
        this.swiper.slideTo(2, 500, false)
        clearInterval( alitterTimer )
    },
    play(){
        this.weatherPlay();
    },
    // 获取所有城市
    getAllCity(){
       let api = '/api/web/city';
       this.$axios.get(api,{

       }).then((res)=>{ 
         if( res.data.status == 200 ){
           let data = res.data.data.content;
           this.citysArr = data;

         }
       })
    },
    // 改变城市
    changeCitySt( e ){ 
        let num = e.target.getAttribute('data-station');

        this.queryCity = num;

        this.getWeatherData();
    },
    // 获取首页天气
    getWeatherData(){
      let api = '/api/web/weather';
      this.$axios.get(api,{
        params:{
          station: this.queryCity
        }
      }).then( (res)=>{
        let data = res.data.data.content;  
        let lifeIndexArr = data.lifeIndex.life.index;
        let arr = [];
        this.shaCity = data.lifeIndex.life.stationName;
        this.lifeTime = data.lifeIndex.life.time;
        for( let i=0;i<lifeIndexArr.length;i++ ){ 
            if( lifeIndexArr[i]['indexName'] == "晨练指数" ){
              lifeIndexArr[i]['icon'] = 'icon-wangqiu'
                arr.push(lifeIndexArr[i])
            }
            if( lifeIndexArr[i]['indexName'] == "穿衣指数" ){
              lifeIndexArr[i]['icon'] = 'icon-yifu'
                arr.push(lifeIndexArr[i])
            }
            if( lifeIndexArr[i]['indexName'] == "蓝天指数" ){
              lifeIndexArr[i]['icon'] = 'icon-tiankong'
                arr.push(lifeIndexArr[i])
            }
            if( lifeIndexArr[i]['indexName'] == "洗车指数" ){
              lifeIndexArr[i]['icon'] = 'icon-xiche'
                arr.push(lifeIndexArr[i])
            }
            if( lifeIndexArr[i]['indexName'] == "紫外线指数" ){
              lifeIndexArr[i]['icon'] = 'icon-wendu'
                arr.push(lifeIndexArr[i])
            }
        }
        this.lifeIndexArr = arr;
        if( arr.length == 0 ){
            this.lifeIndexArr = [
              {
                icon: 'icon-wangqiu',
                indexName: '晨练指数',
                brf: '加载中...',
                txt: '加载中...'
              },
              {
                icon: 'icon-yifu',
                indexName: '穿衣指数',
                brf: '加载中...',
                txt: '加载中...'
              },
              {
                icon: 'icon-tiankong',
                indexName: '蓝天指数',
                brf: '加载中...',
                txt: '加载中...'
              },
              {
                icon: 'icon-xiche',
                indexName: '洗车指数',
                brf: '加载中...',
                txt: '加载中...'
              },
              {
                icon: 'icon-wendu',
                indexName: '紫外线指数',
                brf: '加载中...',
                txt: '加载中...'
              },
            ]
        }

        this.leftTop = data.leftTop;
        this.rightTop = data.rightTop;
        this.todayData = data.todayData;
        this.videoMsg = data.videoMsg;
        this.videoSrc = data.videoMsg.video;
        this.weekData = data.weekData;

        this.setCharts( data.hourData )



      } )
    },

    // 设置chart
    setChartss( data ){
 
        let arr = data.hourTime;
        let brr = data.hourTem;

        let chartOptions = {
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
              categories: arr,
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
              data: brr,
          }]
        }

        this.$set(this.chartOptions,chartOptions)
        
        // let charts =new HighCharts.chart( 'mychart', this.chartOptions );
    }, 
    setCharts(data){ 
      let arr = data.hourData.hourTime;
      let brr = data.hourData.hourTem;
      let myHighChart = this.$refs.myHighChart; 
      myHighChart.options.xAxis.categories = arr;
      myHighChart.options.series[0].data = brr;

    },
    // 初始化地图
    initMap(){
        bMap = new BMap.Map("mapbox");
        // 创建地图实例
        const point = new BMap.Point(116.404, 39.915);
        // 创建点坐标
        bMap.centerAndZoom(point, 9);
        // 初始化地图，设置中心点坐标和地图级别
        bMap.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        bMap.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  
    },
    // 获取地图数据
    getMapData(){ 
      let api = '/api/web/rainMsg';
      this.$axios.get( api,{
        params:{
            hour: this.houRadio,
            city: this.cityRadio,
            time: this.dateTime,
        }
      } ).then((res)=>{
        let data = res.data.data.content.list;
        this.mapData = data;
        this.tableData = data;
        this.maxName = data[0].maxName;
        this.minName = data[0].minName;
        this.maxNum = data[0].max;
        this.minNum = data[0].min;
        for( let i = 0;i<data.length;i++  ){
            let point = new BMap.Point( data[i].Longitude,data[i].Latitude );
            let text = data[i].stationname;
            let num = data[i].data; 
            this.selfOverfay(point ,text, num )
            bMap.addOverlay(myCompOverlay)
        }
 

      })
    },

        // 自定义覆盖物
    selfOverfay( point, text , num ){
        function ComplexCustomOverlay(point, text , num ){
          this._point = point;
          this._text = text; 
          this._num = num; 
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(bMap){
          this._map = bMap;
          let div = this._div = document.createElement("div");
          // 覆盖物样式
          div.style.position = "absolute";
          div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
          div.style.color = "#000";
          div.style.backgroundColor = "#fff";
          div.style.border = "1px solid red";
          div.style.whiteSpace = "nowrap";
          div.style.MozUserSelect = "none";
          div.style.fontSize = "12px";
          div.style.textAlign = 'center';
          div.style.cursor = 'pointer';
          div.className = 'point'; 
 
          // 地点
          let nameText = this._span = document.createElement("div");
          let numText = this._span = document.createElement("div");
          div.appendChild(nameText);
          div.appendChild(numText);
          nameText.appendChild(document.createTextNode(this._text));  
          nameText.style.display = "block";
          // nameText.style.border = "1px solid #ddd";
          nameText.style.padding = 2 + "px"; 
          numText.appendChild(document.createTextNode(this._num + 'mm'));
          bMap.getPanes().labelPane.appendChild(div);
          
          return div;
        }

        ComplexCustomOverlay.prototype.draw = function(){
          var map = this._map;
          var pixel = map.pointToOverlayPixel(this._point);
          this._div.style.left = pixel.x + "px";
          this._div.style.top  = pixel.y - 30 + "px";
        }

        myCompOverlay = new ComplexCustomOverlay(point, text, num)
    },

    // 是否刷新
    changeSwitch(a){ 

    },

    // 倒计时
    countDown(){
        setInterval(() => {
          this.countDownNum -= 1;
          if( this.countDownNum == 0 ){
            this.countDownNum = 500;
            
            if( this.switchValue ){ 
                this.getmyDate();
                this.getMapData();
            }
          }
        }, 1000);
    }, 
    

    // 获取当前时间
    getmyDate() {
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss =  date.getSeconds();
      if (month >= 1 && month <= 9) {
      month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
      }

      if (hh >= 0 && hh <= 9) {
        hh = "0" + hh;
      }
      if (mm >= 0 && mm <= 9) {
        mm = "0" + mm;
      }
      if (ss >= 0 && ss <= 9) {
        ss = "0" + ss;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate+ ' ' + hh + seperator2 + mm +seperator2 + ss;
      let mapTime = year+'年'+month+'月'+strDate+'日'+hh+'时'+mm+'分';
      this.mapTime = mapTime;
      this.dateTime = currentdate; 
    },

    // 天气轮播 
    weatherPlay(){ 
      let _that = this;
      alitterTimer = setInterval(() => {
          timerSept += 1;
          this.isOn = timerSept;
          if( this.isOn == 1){ 
            _that.swiper.slideTo(1, 500, false)
          }else if( this.isOn == 2){
            
            _that.swiper.slideTo(2, 500, false)
          }
          if(timerSept==2){
            timerSept = 0
          }
      }, 5000);
    }








  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getmyDate();
    this.getAllCity();
    this.getWeatherData();
    this.initMap();
    this.countDown();
    this.getMapData();
    this.weatherPlay();
    
},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
      // this.swiper.init();
  }, //生命周期 - 更新之后
  beforeDestroy() {
    clearInterval(alitterTimer)
  }, //生命周期 - 销毁之前
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
        &:hover{
          cursor: pointer;
        }
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
          .sevenDay{ 
            width: 1100px;
            height: 230px;
            .tit{
              height: 50px;
              box-sizing: border-box;
              color: #03CB98;
              font-size: 22px;
              span{
                font-size: 12px;
                color: #c5c5c5;
                margin-left: 25px;
              }
            }
            .content{
              width: 100%;
              display: flex;
              display: -webkit-flex;
              justify-content: center;
              .sevenDayList{
                width: 135px;
                height: 100px;
                text-align: center;
                color: #fff;
                >div{
                  font-size: 14px;
                  height: 1.8em;
                  line-height: 1.8em;
                }
                .icon{
                  width: 57px;
                  margin: 0 auto;
                  >div{
                    display: inline-block;
                    width: 27px;
                    height: 27px;
                    img{
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
              }

            }
          }
        }
      }
    }
    .airAvideo{
      width: 100%;
      background: rgba(52, 121, 183, 0.7); 
      padding: 20px 0px;
      .pack{
        width: 1100px;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        .airBox{    
          width: 400px;
          height: 380px;
          border: 1px solid #E7EFF8; 
          padding: 20px;
          background: #fff;
          position: relative;
          h2{
              padding: 0;
              margin: 0;
              font-size: 20px;
              font-weight: bold;
              color: #2E73B1;
          }
          .update_time{
            position: absolute;
            top: 25px;
            right: 20px;
            font-size: 14px;
            color: #999;
          }
          .pm_chart{
              // height: 127px;
              margin-top: 30px;
              .clear-fix{
                display: flex;
                display: -webkit-flex;
                .bbbox{
                    width: 33.333%;
                    .icon{
                      width: 100px;
                      height: 100px;
                      margin: 0 auto;
                      // line-height: 100px;
                      padding-top: 50px;
                      box-sizing: border-box;
                      text-align: center;
                      p{
                        font-size: 12px;
                        color: rgb(88, 88, 88);
                      }
                    }
                    .text{
                      width: 100px;
                      box-sizing: border-box;
                      color: #18a3fd;
                      border: 1px solid #cccccc;
                      border-radius: 8px;
                      text-align: center;
                      font-size: 12px;
                      font-weight: bold;
                      margin: 0 auto;
                      padding: 4px 2px;
                      margin-top: 20px;
                    }
                }
              }
          }
          .tips{
            font-size: 12px;
            border-top: 1px solid #ccc;
            margin-top: 10px;
            // padding: 20px 0 0 0;
            text-align: center;
            color: #6e6e6e;
            box-sizing: 57px;
            line-height: 57px;
          }
          .pm_ruler{    
            background: url('../../assets/images/ruler_icon1.jpg') left bottom no-repeat;
            height: 110px;
            position: relative;

            .ruler_icon{
              display: inline-block;
              position: absolute;
              left: 0;
              top: 10px;
              padding-bottom: 6px;
              height: 23px;
              background: url('../../assets/images/ruler_icon2.jpg');
              width: 50px;
              line-height: 23px;
              text-align: center;
              color: #fff;
            }
          }
        }
        .viedoBox{
          width: 642px;
          height: 422px;
          border: 8px solid #8ED1FF;
          box-sizing: border-box;
          .tit{
            color: #fff;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            background-color:#8ED1FF;
          }
          .myVideo{
            width: 626px;
            height: 376px;
            #vid{
              width: 100%;
              height: 100%;
            }
          }
        }
      }

    }
    .lifeIndex{
      width: 100%;
      padding: 0px 0px;
      background: rgba(52, 121, 183, 0.7);
      .pack{
        width: 1100px;
        margin: 0 auto;
        background-color: #fff;
        height: 215px;
        box-sizing: border-box;
        .tit{ 
          width: 100%;
          box-sizing: border-box;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          .teext{
            // width: 40%;
            font-size: 20px;
            font-weight: bold;
            color: #2E73B1;
            height: 30px;
            line-height: 30px;
            margin: 15px ;
          }
          .times{
            // width: 40%;
            font-size: 14px;
            color: #999;
            height: 30px;
            line-height: 30px;
            margin: 15px ;
          }
        }
        .contents{
          display: flex;
          display: -webkit-flex;
          justify-content: space-around; 
          .lifeIndexList{
            width: 202px;
            height: 122px;
            border: 1px solid rgb(202, 202, 202);
            box-sizing: border-box;;
            padding: 10px;
            display: flex;
            display: -webkit-flex;
            .icons{
              width: 80px;
              color: #177DC2;
              text-align: center;
              i{
                display: block;
                width: 52px;
                height: 52px;
                margin: 12px auto 10px auto;
                font-size: 46px;
              }
            }
            .texxts{
              width: 95px;
              font-size: 14px;
              .zi{
                width: 100%;
                height: 30px;
                line-height: 30px;
                overflow: hidden;
                color: #177DC2;
              }
              .zis{
                width: 100%;
                height: 60px;
                line-height: 19px;
                overflow: hidden;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .maps{ 
      width: 100%;
      padding: 20px 0px;
      background: rgba(52, 121, 183, 0.7);
      .pack{
        width: 1100px;
        margin: 0 auto;
        background-color: #fff;
        .adiv{  
          width: 100%;
          height: 46px;
          line-height: 46px;
          background-color: #ccc;
          box-sizing: border-box;
          padding-left: 10px;
          font-size: 14px;
        }
        .times{

        }
        .shichang{
          margin: 3px 0px;
        }
        .tit{
          background: #fff;
          text-align: center;
          padding: 10px 0px;
          h2{
            margin: 0;
            padding: 0;
            font-size: 20px;
            font-weight: bold;
            color: #2E73B1;
          }
          p{
            margin: 0;
            padding: 0;
            color: #333;
            font-size: 14px;
          }
        }
        .myMap{
          height: 570px;
          position: relative;
          .mao{
            position: absolute;
            border: 1px solid #000;
            padding: 3px 5px;
            right: 15px;
            top: 20px;
            z-index: 1000;
            &:hover{
              cursor: pointer;
            }
          }
          .zhezao{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1001;
            background-color: #1158885d;
            .colseit{
              position: absolute;
              right: 20px;
              top: 20px;
              background: rgba(0, 0, 0, 0.747);
              color: #fff;
              padding: 6px 20px;
              border-radius: 5px;
              &:hover{
                cursor: pointer;
              }
            }
            .chartContent{
              width: 46%;
              height: 480px;
              margin: 40px auto 0;
              background-color: #fff;
            }
          }
          #mapbox{
            height: 570px;
          }
        }
      }
    }

  }

</style>