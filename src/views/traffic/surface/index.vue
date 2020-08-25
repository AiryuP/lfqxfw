<!-- 交通1级 -->
<template>
  <div id="contentBox">
      <div class="mapBox" v-show="show_map_list == 'map'">
          <div id="bdMap"></div>
      </div>
      <div class="listBox" v-show="show_map_list == 'list'">
          <div class="liebiaoContent">
              <div class="liebiaoContentTit">廊坊6小时1KM格点能见度实况</div>
              <div class="content_lb">
                <div class="njd_box" v-for="item in njdArr" >
                    <div class="njd_img_box">
                        <img :src="item.url" alt="">
                        <!-- require() -->
                    </div>
                    <div class="njd_time_txt">{{ item.time }}</div>
                </div>
              </div>
          </div>
      </div>
      <div class="suspension">
        <div class="tomap" :class="{ 'w_lActive' : isW_LActive == '1' }" @click="changeMap" >
            <img :src="dt_img" alt="">
            高速天气
        </div>
        <div class="tolist" :class="{ 'w_lActive' : isW_LActive == '2' }" @click="changeList">
            <img :src="lb_img" alt="">  
            能见度 
        </div>
      </div> 
  </div>
</template>

<script>
var bMap;
export default {
name: 'surface',
  data () {
    return {
        isW_LActive: '1',  
        dt_blue_img: '/static/warning/icon-gs-blue.png',
        dt_wit_img: '/static/warning/icon-gs-white.png',
        dt_img: '/static/warning/icon-gs-white.png',
        lb_blue_img: '/static/warning/icon-njd-blue.png',
        lb_wit_img: '/static/warning/icon-njd-white.png',
        lb_img: '/static/warning/icon-njd-blue.png',
        show_map_list: 'map',
        njdArr: [
            
        ],
        stationName: ''
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
    // 转到显示地图
    changeMap(){
        this.isW_LActive = '1';
        this.dt_img = this.dt_wit_img;
        this.lb_img = this.lb_blue_img;
        this.show_map_list = 'map';

    },
    // 转到显示列表
    changeList(){
        this.isW_LActive = '2'; 
        this.dt_img = this.dt_blue_img;
        this.lb_img = this.lb_wit_img;
        this.show_map_list = 'list';
        this.getVisibilityData();
    },
    // 展示点
    showPoints(datas) {
        for (var i = 0; i < datas.length; i++) {
            (function () {
                var infoLabelText;
                var Number = datas[i]['id'];
                var myIcon = new BMap.Icon("img/blank.png", new BMap.Size(5, 5));
                var marker = new BMap.Marker(new BMap.Point(datas[i]['long'], datas[i]['lat']), {icon: myIcon});
                if (datas[i]['warn_pic'] != "") {
                    infoLabelText = "<div class='roadLabel clearfix' style='min-width: 1.4rem'>" + "<div class='road_icon'>" + "<img src='http://wx.hbweather.com.cn/jy_module/jcqx/road_icon/" + data[i]['road_pic'] + ".png'>" + "</div>" + "<div class='warn_icon'>" + "<img src='http://wx.hbweather.com.cn/jy_module/jcqx/warn_icon/" + data[i]['warn_pic'] + ".png'>" + "</div>" + "</div>";
                } else {
                    infoLabelText = "<div class='roadLabel clearfix'>" + "<div class='road_icon'>" + "<img src='http://wx.hbweather.com.cn/jy_module/jcqx/road_icon/" + data[i]['road_pic'] + ".png'>" + "</div>" + "</div>";
                }
                var label = new BMap.Label(infoLabelText, {
                    offset: new BMap.Size(0, 0)
                });
                label.setStyle({
                    textAlign: "center",
                    padding: "0",
                    border: "none",
                    background: "transparent"
                });
                marker.setLabel(label);
                map.addOverlay(marker);
                label.addEventListener("click", function (e) {
                    window.location.href='jiaotong-content.php?id='+Number;
                }, false);
            })();
        }
    },
    // 获取高速路图标
    getAllH_SImg(){
      let api = '/api/web/gaosu';
      this.$axios.get( api,{

      } ).then((res)=>{
        let data = res.data.data.content.list;
        this.show_gs_img(data) 
      })
    },
    // 展示高速图标
    show_gs_img( data ){
        let _that = this;
        for (let i = 0; i < data.length; i ++) {
            let point = new BMap.Point( data[i].longitude,data[i].latitude);
            let myIcon = new BMap.Icon( data[i].picUrl , new BMap.Size(50,48));
            myIcon.setImageSize(new BMap.Size(50,48))
            let marker = new BMap.Marker(point,{icon:myIcon});
            marker.mycanshu = data[i].canshu;
            bMap.addOverlay(marker); 
            
            marker.addEventListener("click",_that.attribute);
        }
    },
    // 高速点击事件
    attribute(e){
        let p = e.target 
        this.$router.push({
            path: '/traffic/thread',
            query: {
                id: p.mycanshu
            }
        })
    },
    // 查询能见度
    getVisibilityData(){
        let api = '/api/web/nengjiandu';
        this.$axios.get( api,{

        } ).then((res)=>{
            let data = res.data.data.content.list;
            this.njdArr = data
            
        })
    }
    

  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMap();
    this.getAllH_SImg();
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
        top: 40px;
        right: 0;
        z-index: 10;
        background-color: #fff;
        border-radius: 10px 0 0 10px;
        border: 1px solid #d7dcd8;
        border-right: none;
        width: 122px;
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
    .mapBox{
        width: 100%;  
        #bdMap{
            width: 100%;
            height: 650px;
        }
    }
    .listBox{
        width: 100%;
        .liebiaoContent{
            width: 100%;
            .liebiaoContentTit{
                color: #2e72b1;
                font-size: 28px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                margin-bottom: 50px;
            }
            .content_lb{
                width: 100%;
                display: flex;
                display: -webkit-flex;
                flex-wrap: wrap;
                .njd_box{
                    width: 290px;
                    box-sizing: border-box;
                    margin: 20px 25px;
                    text-align: center;
                    .njd_img_box{
                        width: 100%;
                        border: 1px solid #e4e4e4;
                        img{
                            width: 100%;
                        }
                    }
                    .njd_time_txt{
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>