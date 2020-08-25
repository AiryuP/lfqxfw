<!-- 环境1级 -->
<template>
  <div id="contentBox">
      <div class="mapBox" v-show="show_map_list == 'map'">
           <div id="bdMap"></div>
      </div>
      <div class="listBox" v-show="show_map_list == 'list'">
          <div class="lb_content_box">
              <div class="city_tit">定位城市</div>
              <div class="city_data dw_city_data">
                  <div class="city_name">
                      <div class="cityName">廊坊</div>
                      <div class="cityUpdateTime">14:00更新</div>
                  </div>
                  <div class="alttileCont air">
                    <div class="labelTxt">空气质量指数:</div>
                    <div class="font-big">58</div>
                    <div class="air-color" :class="{  }" >良</div>
                  </div>
                  <div class="alttileCont pm2"> 
                    <div class="labelTxt">PM2.5:</div>
                    <div class="font-big">20</div>
                    <div class="sm_color"></div>
                  </div>
                  <div class="alttileCont pm10">
                    <div class="labelTxt">PM10:</div>
                    <div class="font-big">34</div>
                    <div class="sm_color"></div>
                  </div>
                  <div class="alttileCont temp">
                    <div class="labelTxt">气温:</div>
                    <div class="font-big">37.1</div>
                    <div class="unit">℃</div>
                  </div>
                  <div class="alttileCont wet">
                    <div class="labelTxt">湿度:</div>
                    <div class="font-big">34</div>
                    <div class="unit">%</div>
                  </div>
                  <div class="alttileCont wind"> 
                    <div class="labelTxt">风:</div>
                    <div class="font-big">3.7</div>
                    <div class="unit">m/s</div>
                  </div>
              </div>
              
              <div class="city_tit">其他城市</div>
              <div class="city_data dw_city_data">
                  <div class="city_name">
                      <div class="cityName">固安党校</div>
                      <div class="cityUpdateTime">14:00更新</div>
                  </div>
                  <div class="alttileCont air">
                    <div class="labelTxt">空气质量指数:</div>
                    <div class="font-big">117</div>
                    <div class="air-color">轻度污染</div>
                  </div>
                  <div class="alttileCont pm2"> 
                    <div class="labelTxt">PM2.5:</div>
                    <div class="font-big">20</div>
                    <div class="sm_color"></div>
                  </div>
                  <div class="alttileCont pm10">
                    <div class="labelTxt">PM10:</div>
                    <div class="font-big">34</div>
                    <div class="sm_color"></div>
                  </div>
                  <div class="alttileCont temp">
                    <div class="labelTxt">气温:</div>
                    <div class="font-big">37.1</div>
                    <div class="unit">℃</div>
                  </div>
                  <div class="alttileCont wet">
                    <div class="labelTxt">湿度:</div>
                    <div class="font-big">34</div>
                    <div class="unit">%</div>
                  </div>
                  <div class="alttileCont wind"> 
                    <div class="labelTxt">风:</div>
                    <div class="font-big">3.7</div>
                    <div class="unit">m/s</div>
                  </div>
              </div>
          </div>
      </div>
      <div class="suspension">
          <div class="tomap" :class="{ 'w_lActive' : isW_LActive == '1' }" @click="changeMap" >
              <img :src="dt_img" alt="">
              地图
          </div>
          <div class="tolist" :class="{ 'w_lActive' : isW_LActive == '2' }" @click="changeList">
              <img :src="lb_img" alt="">  
              列表 
          </div>
      </div>
  </div>
</template>

<script>
var bMap, myCompOverlay;
export default {
name: 'surfaceAmbient',
  data () {
    return {
        isW_LActive: '1',  
        dt_blue_img: '/static/warning/icon-dt-blue.png',
        dt_wit_img: '/static/warning/icon-dt-white.png',
        dt_img: '/static/warning/icon-dt-white.png',
        lb_blue_img: '/static/warning/icon-lb-blue.png',
        lb_wit_img: '/static/warning/icon-lb-white.png',
        lb_img: '/static/warning/icon-lb-blue.png',
        show_map_list: 'map',
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},
  //          #42cf18     #efdd30   #ffab00     #ff401a     #d30040    #9b0a4c

  // "air"    <= 50       <= 100    <= 150      <= 200      <= 300
  // "pm2"    <= 35       <= 75     <= 115      <= 150      <= 250
  // "pm10"   <= 50       <= 150    <= 250      <= 350      <= 420
  //         





  methods: {    
    // 初始化地图
    initMap(){
        bMap = new BMap.Map("bdMap");
        // 创建地图实例
        const point = new BMap.Point(116.404, 39.915);
        // 创建点坐标
        bMap.centerAndZoom(point, 9);
        // 初始化地图，设置中心点坐标和地图级别
        bMap.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        bMap.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        // 自定义地图样式
        let myStyleJson = [
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": {
                    "color": "#ffffff",
                    "visibility": "off"
                }
            }
        ]
        bMap.setMapStyle({styleJson: myStyleJson });
    },
    // 转到显示地图
    changeMap(){
        this.isW_LActive = '1';
        this.dt_img = this.dt_wit_img;
        this.lb_img = this.lb_blue_img;
        this.show_map_list = 'map';
        this.getMapData();

    },
    // 转到显示列表
    changeList(){
        this.isW_LActive = '2'; 
        this.dt_img = this.dt_blue_img;
        this.lb_img = this.lb_wit_img;
        this.show_map_list = 'list';
        this.getDataList()
    },
    // 获取列表信息
    getDataList(){
      let api = '/api/web/huanjingList';
      this.$axios.get( api,{

      } ).then((res)=>{
        
      })
    },
    // 获取地图数据
    getMapData(){
      let api = '/api/web/huanjing';
      let _that = this;
      this.$axios.get( api,{

      } ).then((res)=>{
        let data = res.data.data.content.list;

        for( let i = 0;i<data.length;i++  ){
            let point = new BMap.Point( data[i].clong,data[i].clat );
            let text = data[i].aqiVal;
            let aid = data[i].stationNum; 
            let tipColor = data[i].color;
            this.selfOverfay(point ,text,tipColor, aid )
            bMap.addOverlay(myCompOverlay)
            myCompOverlay.addEventListener("click",_that.attribute);
        }

      })
    },


    // 自定义覆盖物
    selfOverfay( point, text, tipColor,id ){
        function ComplexCustomOverlay(point, text, tipColor,id){
          this._point = point;
          this._text = text; 
          this._tipColor = tipColor;
          this._id = id;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(bMap){
          this._map = bMap;
          let div = this._div = document.createElement("div");
          let backColor = this._tipColor;
          // 覆盖物样式
          div.style.position = "absolute";
          div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
          div.style.color = "#fff";
          div.style.whiteSpace = "nowrap";
          div.style.MozUserSelect = "none";
          div.style.fontSize = "12px";
          div.style.textAlign = 'center';
          div.style.cursor = 'pointer';
          div.className = 'point'; 
 
          // 地点
          let nameText = this._span = document.createElement("span");
          div.appendChild(nameText);
          nameText.appendChild(document.createTextNode(this._text)); 
          nameText.id = this._id;
          nameText.style.backgroundColor = backColor ;
          nameText.style.display = "block";
          nameText.style.border = "1px solid #ddd";
          nameText.style.padding = 2 + "px"; 
          bMap.getPanes().labelPane.appendChild(div);
          
          return div;
        }

        ComplexCustomOverlay.prototype.draw = function(){
          var map = this._map;
          var pixel = map.pointToOverlayPixel(this._point);
          this._div.style.left = pixel.x + "px";
          this._div.style.top  = pixel.y - 30 + "px";
        }
        ComplexCustomOverlay.prototype.addEventListener = function(event,fun){
            this._div['on'+event] = fun;
        }

        myCompOverlay = new ComplexCustomOverlay(point, text, tipColor,id)
    },

    // 点点击事件
    attribute(e){
        let p = e.target.id
        this.$router.push({
            path: '/ambient/thread',
            query: {
                id: p
            }
        })
    }




  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMap();
    this.getMapData();
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
#contentBox{
    width: 100%; 
    padding: 15px 25px 10px;
    box-sizing: border-box;
    position: relative;
    .suspension{
        position: absolute;
        top: 10px;
        right: 0;
        z-index: 10;
        background-color: #fff;
        border-radius: 10px 0 0 10px;
        border: 1px solid #d7dcd8;
        border-right: none;
        width: 82px;
        overflow: hidden;
        >div{
            text-align: center;
            line-height: 34px;
            &:hover{
                cursor: pointer;
            }
            >img{
                width: 20px;
                margin-right: 5px;
                vertical-align: middle;
            }
        }
        .tomap{
            width: 100%;
            height: 34px;
        }
        .tolist{
            width: 100%;
            height: 34px;

        }
        .w_lActive{
            background-color: #2e72af;
            color: #fff;
        }
    }
    .listBox{
      width: 100%;
      .lb_content_box{
        width: 100%;
        .city_tit{
          width: 100%;
          height: 38px;
          background-color: #d8d8d8;
          line-height: 38px;
          padding-left: 20px;
          box-sizing: border-box;
        }
        .city_data{
            display: flex;
            display: -webkit-flex;
            align-items: center;
            box-sizing: border-box;
            padding: 10px 0px;
            background-color: #f5f5f5;
            &:hover{
              color: #0088ff;
              cursor: pointer;
            }
            .alttileCont{ 
                height: 54px; 
                display: flex;
                display: -webkit-flex;
                align-items: center;
                margin-left: 14px;
              .labelTxt{
                  line-height: 54px;
                  font-size: 16px;
              }
              .font-big{ 
                line-height: 54px; 
                font-size: 28px;
                font-weight: 400;
                color: #000;
                margin-left: 6px;
              }
              .sm_color{
                height: 19px;
                width: 4px;
                border-radius: 2px;
                background-color: #42cf18;
                margin-left: 5px;
                overflow: hidden;
              }
              .unit{
                font-size: 16px;
              }
            } 
            .city_name{
                width: 150px;
                height: 66px; 
                box-sizing: border-box;
                padding-left: 30px;
                .cityName{
                  height: 33px;
                  line-height: 33px;
                  font-size: 22px;
                }
                .cityUpdateTime{ 
                  height: 33px;
                  line-height: 33px;
                  font-size: 14px;
                }
            }
            .air{ 
              .air-color{
                height: 19px;
                padding: 0 25px;
                color: #fff;
                border-radius: 10px;    
                background-color: rgb(239, 221, 48); 
              }
            }
            .pm2{  

            }
        }
      }
    }
    .mapBox{ 
        width: 100%;  
        #bdMap{
            width: 100%;
            height: 650px;
        }
    }
}
</style>