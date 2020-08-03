<!--  -->
<template>

  <div id="contentBox"> 
    <div class="crumbs">
        <div class="l_blue"></div>
        <div class="current">当前位置:</div>
        <div class="crumb">
            <span class="c_title"><router-link tag="span" to="/">首页</router-link></span>
            <span class="symbol">></span>
            <span class="c_title"><router-link tag="span" to="/gridpoint">预警信息</router-link></span>
        </div>
    </div>
    <div class="contents">
        <div class="map_list" v-show="show_map_list == 'map'">
            <div class="mapBox" id="bdMap">
            </div>
            <div class="warningTipBox">
                <div class="province" :class="{ 'active' : isWarningActive == '1' }" @click="getProvinceWarningInfo" >
                    省
                    <el-badge class="mark" :value="provinceNum" />
                </div>
                <div class="city" :class="{ 'active' : isWarningActive == '2' }" @click="getCityWarningInfo">
                    市
                    <el-badge class="mark" :value="cityNum" />
                </div>
            </div>
        </div>

        <div class="warningList" v-show="show_map_list == 'list'">

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
  </div>
</template>

<script>
var bMap;
export default {
name: 'warning',
  data () {
    return {
        isWarningActive: '1',
        isW_LActive: '1',
        provinceNum: 0,
        cityNum: 3,
        dt_blue_img: '/static/warning/icon-dt-blue.png',
        dt_wit_img: '/static/warning/icon-dt-white.png',
        dt_img: '/static/warning/icon-dt-white.png',
        lb_blue_img: '/static/warning/icon-lb-blue.png',
        lb_wit_img: '/static/warning/icon-lb-white.png',
        lb_img: '/static/warning/icon-lb-blue.png',
        show_map_list: 'map',
        markerArr: [
            {
                title: "名称：锦江区门诊部",
                point: "115.201545,40.614124",
                lat: '115.201545',
                lon: '40.614124',
                address: "成都市锦江区通源街188号",
                tel: "028-86712080"
            },
            {
                title: "名称：青羊区门诊部",
                point: "114.76001,38.931948",
                lat: '114.76001',
                lon: '38.931948',
                address: "成都市青羊区春晓路15号 ",
                tel: "028-81067120"
            },
            {
                title: "名称：高新区门诊部",
                point: "117.020578,39.957202",
                lat: '117.020578',
                lon: '39.957202',
                address: "成都市高新区益州大道中段和天府二街交叉口复城国际T3-2号",
                tel: "028-81067120"
            }
        ]
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

  methods: {
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
    //  获取省内预警信息
    getProvinceWarningInfo(){
        this.isWarningActive = '1'

    },
    // 获取市内预警信息
    getCityWarningInfo(){
        this.isWarningActive = '2'
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
    },
    // 获取省级预警数
    getProvinceWarningList(){
        let _that = this;
        // 假设已经获取
        for(let i = 0;i<this.markerArr.length;i++){
            let ipoint = this.markerArr[i].point;
            let ilat = this.markerArr[i].lat;
            let ilon = this.markerArr[i].lon;
            let point = new BMap.Point(ilat,ilon);
            let marker = new BMap.Marker(point);
            bMap.addOverlay(marker);
            _that.addMarker( marker )
            marker.addEventListener("click",_that.getAttr);
        }
        

    },
    // 编写自定义函数,创建标注
    addMarker(point){
        let _that = this;
        console.log( point )
        let marker = new BMap.Marker(point);
        bMap.addOverlay(marker);
    },
    getAttr(  ){
		// var p = marker.getPosition();       //获取marker的位置
		alert("marker的位置是" );   
	}




  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.initMap();
      this.getProvinceWarningList();
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
    margin-top: 25px;
    padding-bottom: 4px;
    .crumbs{
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: -webkit-flex;
        display: flex;
        .l_blue{
            height: 50px;
            width: 10px;
            background: url('../../assets/images/line_left.jpg') center no-repeat;
        }
        .current{
            color: #000;
            margin: 0 10px;
        }
        .crumb{
            height: 50px;
            line-height: 50px;
            color: blue;
            span{
                margin-right: 5px;
            }
            .c_title{
                &:hover{
                    cursor: pointer;
                }
            }
            .symbol{
                color: #000;
            }
        }
    }
    .contents{
        width: 100%;
        border: 1px solid #ccc;
        padding: 15px 25px 10px;
        box-sizing: border-box;
        position: relative;
        // display: flex;
        // display: -webkit-flex;
        .map_list{
            width: 100%;
            position: relative;
            .mapBox{
                width: 100%;
                height: 650px; 
            }
            .warningTipBox{
                position: absolute;
                width: 300px;
                height: 36px; 
                z-index: 9999;
                top: 6%;
                left: calc( 50% - 150px );
                overflow: hidden;
                // border-top-left-radius: 6px;
                border-radius: 10px;
                display: flex;
                display: -webkit-flex;
                .province{
                    border-right: 1px solid rgb(133, 133, 133);
                    border-top-left-radius: 10px; 
                    border-bottom-left-radius: 10px;
                }
                .city{  
                    border: 1px solid rgb(175, 175, 175);
                    border-top-right-radius: 10px; 
                    border-bottom-right-radius: 10px;
                }
                >div{
                    width: 50%;
                    height: 100%; 
                    background-color: rgb(255, 255, 255);
                    line-height: 36px;
                    text-align: center; 
                    box-sizing: border-box;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .active{
                    color: #fff;
                    background-color: #2e72af;
                    border-color: #2e72af;
                }
            }
        }
        .warningList{
            width: 100%;
        }
        .suspension{
            position: absolute;
            top: 40px;
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
 
    }

}
</style>