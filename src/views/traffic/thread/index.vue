<!-- 交通二级 -->
<template>
  <div id="contentBox">
      <div class="mapBox">
          <div id="bdMap"></div>
      </div>
  </div>
</template>

<script>
var bMap;
export default {
name: 'thread',
  data () {
    return {
      myid: this.$route.query.id,
      roadName: ''
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

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
    },
    // 传参请求数据
    getData(){
        let api = '/api/web/gaosuPoint';
        this.$axios.get(api,{
          params:{
            canshu: this.myid
          }
        }).then( (res)=>{
          if( res.data.status == 200 ){
            let data = res.data.data.content;
            let roadName = data.list[0].bianhaoname;
            this.$store.commit('setRoadName', roadName);
            this.showmap( data )
          }
        } )
    },
    showmap(data) {

        let p1 = new BMap.Point(data.startlong, data.startlat);
        let p2 = new BMap.Point(data.endlong, data.endlat);
        let driving = new BMap.DrivingRoute(bMap, {renderOptions: {map: bMap, autoViewport: true}});
        driving.search(p1, p2);
        driving.setMarkersSetCallback(function (pois) {
            let myIcon = new BMap.Icon("/static/imgs/blank.png", new BMap.Size(0, 0));
            for (let i = 0; i < pois.length; i++) {
                pois[i].marker.setIcon(myIcon);
            }
        });
        driving.setPolylinesSetCallback(function (routes) {
            for (let i = 0; i < routes.length; i++) {
                routes[i].getPolyline().setStrokeColor('#406095');
                routes[i].getPolyline().setStrokeOpacity(1);
            }
        });
        this.showPoints(data.list);
    },
    showPointss(datas) {
        let that = this;
        for (let j = 0; j < datas.length; j++) {
            (function () {
                let point = new BMap.Point(datas[j]['long'], datas[j]['lat']);
                let infoLabelText;
                let infoWindowText;
                if (datas[j]['disaster'] != "") {
                    infoLabelText = "<div class='roadLabel clearfix'>" + "<div class='road_icon'>" + "<img style='display:block;width:36px;height:auto;' src='http://wx.hbweather.com.cn/jy_module/jcqx/warn_icon/" + datas[j]['warn'].icon + ".png'>" + "</div>" + "</div>";
                    infoWindowText = "<div class='roadWindowBox'><div class='title'>" + datas[j]['name'] + "</div>" + "<p class='warnInfo'>" + datas[j]['warn'].articel + "<p></div>"
                } else if (datas[j]['fuwuquforecastdayList'].length > 0) {
                    infoLabelText = "<div class='roadCircleBox'>" + "<div class='roadCircle'>" + "<svg><use xlink:href='" + that.transformToCode(datas[j]['weather'][0]['icon1'], false) + "'></use></svg>" + "</div></div>";
                    infoWindowText = "<div class='roadWindowBox'><div class='title'>" + datas[j]['name'] + "</div>" + "<table>";
                    for (let i = 0; i < datas[j]['weather'].length; i++) {
                        if (datas[j]['weather'][i]['icon1'] == datas[j]['weather'][i]['icon2']) {
                            infoWindowText += "<tr>" + "<td class='num date'>" + datas[j]['weather'][i]['date'] + "</td>" + "<td class='icons'>" + "<svg><use xlink:href='" + that.transformToCode(datas[j]['weather'][i]['icon1'], false) + "'></use></svg>" + "</td>" + "<td class='texts'>" + datas[j]['weather'][i]['text1'] + "</td>" + "<td class='tmps num'>" + datas[j]['weather'][i]['temp1'] + "℃<span>~</span>" + datas[j]['weather'][i]['temp2'] + "℃</td>" + "</tr>";

                        } else {
                            infoWindowText += "<tr>" + "<td class='num date'>" + datas[j]['weather'][i]['date'] + "</td>" + "<td class='icons'>" + "<svg><use xlink:href='" + that.transformToCode(datas[j]['weather'][i]['icon1'], false) + "'></use></svg>" + "<svg><use xlink:href='" + that.transformToCode(datas[j]['weather'][i]['icon2'], false) + "'></use></svg>" + "</td>" + "<td class='td texts'>" + datas[j]['weather'][i]['text1'] + "转" + datas[j]['weather'][i]['text2'] + "</td>" + "<td class='tmps num'>" + datas[j]['weather'][i]['temp1'] + "℃<span>~</span>" + datas[j]['weather'][i]['temp2'] + "℃</td>" + "</tr>";
                        }
                    }
                    infoWindowText = infoWindowText + "<table></div>";
                    infoWindowText = infoWindowText + "<div>当前能见度<span style='margin-left:15px;'>"+datas[j]['vis']+"</span></div>";
                }else{
                    infoLabelText = "";
                    infoWindowText = "";
                }
                let font_size = 43.3;
                let label = new BMap.Label(infoLabelText, {
                    offset: new BMap.Size(-font_size * 0.34, -font_size * 0.82),
                    position: point
                })
                label.setStyle({
                    textAlign: "center",
                    padding: "0",
                    border: "none",
                    background: "transparent"
                });
                bMap.addOverlay(label);
                let infoWindow = new BMap.InfoWindow(infoWindowText, {
                    enableMessage: false
                });
                label.addEventListener("click", function () {
                    bMap.openInfoWindow(infoWindow, point);
                });
            })();
        }
    },
    transformToCode(num, boolean) { //num传入的天气数字，boolean为true代表是黑夜
        var number = parseInt(num);
        switch (number) {
            case 0:
                if (boolean) {
                    return "#icon-yeqing";
                } else {
                    return "#icon-riqing"
                }
            case 1:
                if (boolean) {
                    return "#icon-yejianduoyun";
                } else {
                    return "#icon-rijianduoyun"
                }
            case 2:
                return "#icon-yin";
            case 3:
                return "#icon-zhenyusvg";
            case 4:
                return "#icon-leizhenyu";
            case 5:
                return "#icon-leizhenyubanyoubingbao";
            case 6:
                return "#icon-yujiaxue";
            case 7:
                return "#icon-xiaoyu";
            case 8:
                return "#icon-zhongyu";
            case 9:
                return "#icon-dayu";
            case 10:
                return "#icon-baoyu";
            case 11:
                return "#icon-dabaoyu";
            case 12:
                return "#icon-tedabaoyu";
            case 13:
                return "#icon-zhenxue";
            case 14:
                return "#icon-xiaoxue";
            case 15:
                return "#icon-zhongxue";
            case 16:
                return "#icon-daxue";
            case 17:
                return "#icon-baoxue";
            case 18:
                return "#icon-wu";
            case 19:
                return "#icon-dongyu";
            case 20:
                return "#icon-shachenbao";
            case 21:
                return "#icon-xiaodaozhongyu";
            case 22:
                return "#icon-zhongdaodayu";
            case 23:
                return "#icon-dadaobaoyu";
            case 24:
                return "#icon-baoyudaodabaoyu";
            case 25:
                return "#icon-dabaoyudaotedabaoyu";
            case 26:
                return "#icon-xiaodaozhongxue";
            case 27:
                return "#icon-zhongdaodaxue";
            case 28:
                return "#icon-dadaobaoxue";
            case 29:
                return "#icon-fuchen";
            case 30:
                return "#icon-yangsha";
            case 31:
                return "#icon-qiangshachenbao";
            case 32:
                return "#icon-nongwu";
            case 33:
                return "#icon-xiaoxue";
            case 49:
                return "#icon-qiangnongwu";
            case 53:
                return "#icon-mai";
            case 54:
                return "#icon-zhongdumai";
            case 55:
                return "#icon-zhongdumai1";
            case 56:
                return "#icon-yanzhongmai";
            case 57:
                return "#icon-dawu";
            case 58:
                return "#icon-teqiangnongwu";
            case 99:
                return "#icon-wu1";
        }
    },

    showPoints(datas){ 
        let _that = this; 

        for( let i = 0; i<datas.length; i++ ){ 
            let point = new BMap.Point(datas[i]['longitude'], datas[i]['latitude']);
            let infoLabelText;
            let infoWindowText;
            let tdata = datas[i]['fuwuquforecastdayList'];

            infoLabelText = "<div class='roadCircleBox'>"  
                            + "<div class='roadCircle' style='border: 1px solid orange;background-color: #60C5F1;padding: 5px;border-radius: 50%'>"
                            + "<img style=' width: 28px;height:28px ' src='"+ datas[i]['picUrl'] +"'/>"
                            + "</div>"
                            + "</div>";

            infoWindowText = "<div> <div class='title'>"+ datas[i]['city']  + "</div>";
                            for( let j = 0;j< tdata.length;j++ ){
                                if( tdata[j]['weathercode12'] == tdata[j]['weathercode24']){
                                   infoWindowText += "<div> <div style='display:inline-block'>" 
                                                  + tdata[j]['updatetime'] + "</div>"
                                                  + "<div style='display:inline-block;background-color: rgb(129, 189, 238);margin: 0 10px;padding: 0px 10px;width: 60px;height:28px'><img style=' width: 28px;height:28px ' src='"+ tdata[j]['weathercode12'] +"'/>"
                                                  + "</div><div style='display:inline-block;margin-right: 8px'>"+ tdata[j]['weathertext12']
                                                  + "</div><div style='display:inline-block'>"+ tdata[j]['temp12'] + "~" + tdata[j]['temp24'] + "</div>"
                                                  
                                }else{
                                   infoWindowText += "<div> <div style='display:inline-block'>" 
                                                  + tdata[j]['updatetime'] + "</div>"
                                                  + "<div style='display:inline-block;width: 60px;background-color: rgb(129, 189, 238);margin: 0 10px;padding: 0px 10px;height:28px'><img style=' width: 28px;height:28px ' src='"+ tdata[j]['weathercode12'] +"'/>"
                                                  + "<img style=' width: 28px;height:28px ' src='"+ tdata[j]['weathercode24'] +"'/>"
                                                  + "</div><div style='display:inline-block;margin-right: 8px'>"+ tdata[j]['weathertext12']+ "转" + tdata[j]['weathertext24']
                                                  + "</div><div style='display:inline-block'>"+ tdata[j]['temp12'] + "~" + tdata[j]['temp24'] + "</div>"
                                }
                            } 
                            // infoWindowText +=  "<div>当前能见度<span style='margin-left:15px;'>"+datas[i]['vis']+"</span></div>";
                            infoWindowText +=  "</div>";

            
            let font_size = 43.3;
            let label = new BMap.Label(infoLabelText, {
                offset: new BMap.Size(-font_size * 0.34, -font_size * 0.82),
                position: point
            })
            label.setStyle({
                textAlign: "center",
                padding: "0",
                border: "none",
                background: "transparent"
            });
            bMap.addOverlay(label);
            let infoWindow = new BMap.InfoWindow(infoWindowText, {
                enableMessage: false
            });
            label.addEventListener("click", function () {
                bMap.openInfoWindow(infoWindow, point);
            });

        }

    }










  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMap();
    this.getData();
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
    // display: inline-block;
    .mapBox{
        width: 100%;  
        #bdMap{
            width: 100%;
            height: 650px;
        }
    }
    .warn_icon img,.road_icon img{
        width:50px;
    }
    .roadCircleBox {
        width: 50px;
        height:30px;
    }
    .roadCircleBox .roadCircle {
        width: 36px;
        height:36px;
        background: #fff;
        border: 1px solid #ff9966;
        // color:rgb(129, 189, 238);
        border-radius: 20px;
    }
    .roadCircleBox .roadCircle svg {
        width:36px;
        height:30px;
        margin-top: 3px;
    }
    .icons svg{
        width:20px;
        height:20px;
    }
    .title,.warnInfo{
        width:550px;
    }
}
</style>