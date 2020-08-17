<!--  -->
<template>

  <div id="contentBox"> 
    <div class="crumbs">
        <div class="l_blue"></div>
        <div class="current">当前位置:</div>
        <div class="crumb">
            <span class="c_title"><router-link tag="span" to="/">首页</router-link></span>
            <span class="symbol">></span>
            <span class="c_title"><router-link tag="span" to="/warning">预警信息</router-link></span>
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

        <div class="warningList" v-show="show_map_list == 'list'" >
            <div class="warningBox" v-for="item in warningListArr"  @click="yjList.bind(item)" >
                <div class="imgBox">
                    <!-- v-show=" warningListArr.length > 0 " -->
                    <img :src="item.icon" alt="">
                </div>
                <div class="warnTit">
                    1111
                    {{ item.area }}{{ item.publishTime }}发布{{ item.type }}{{ item.level }}预警
                </div>
                <div class="warnTime">
                    {{ item.publishTime }}
                </div> 
            </div>
            <!-- <div v-show=" warningListArr.length <= 0 ">
                暂无数据
            </div> -->
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

    <el-dialog
        title="预警信息"
        :visible.sync="warningVisible"
        width="60%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="warningTit">
           {{ warnDiogData.area }}{{ warnDiogData.publishTime }}发布{{ warnDiogData.type }}{{ warnDiogData.level }}预警
        </div>
        <div class="warningCont">
            <div class="pubTime">发布时间：	{{ warnDiogData.publishTime }}</div>
            <div class="">发布单位：	{{ warnDiogData.area }}</div>
            <div>信号名称：	{{ warnDiogData.area }}{{ warnDiogData.publishTime }}发布{{ warnDiogData.type }}{{ warnDiogData.level }}预警</div>
            <div>预报结论：	{{ warnDiogData.content }}</div>
        </div>


        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="warningVisible = false">关 闭</el-button>
        </span>
    </el-dialog>





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
        cityNum: 0,
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
                tel: "028-86712080",
                img: 'https://s1.ax1x.com/2020/08/03/aa2eY9.gif',
                id: '1'
            },
            {
                title: "名称：青羊区门诊部",
                point: "114.76001,38.931948",
                lat: '114.76001',
                lon: '38.931948',
                address: "成都市青羊区春晓路15号 ",
                tel: "028-81067120",
                img: 'https://s1.ax1x.com/2020/08/03/aa2uS1.gif',
                id: '2'
            },
            {
                title: "名称：高新区门诊部",
                point: "117.020578,39.957202",
                lat: '117.020578',
                lon: '39.957202',
                address: "成都市高新区益州大道中段和天府二街交叉口复城国际T3-2号",
                tel: "028-81067120",
                img: 'https://s1.ax1x.com/2020/08/03/aa2mWR.gif',
                id: '3'
            }
        ],
        warningVisible: false,
        warNum: '1',
        warnDiogData: [],
        warningListArr: [{
            icon: '',
            area: 'hhahh',
        }]

        
        
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
        this.warNum = '1';
        this.getWarningData();
    },
    // 获取市内预警信息
    getCityWarningInfo(){
        this.isWarningActive = '2'
        this.warNum = '2'
        this.getWarningData();
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
        this.getOther()
    },
    // 获取省级预警数
    getProvinceWarningList( data ){
        let _that = this; 
        for(let i = 0;i< data.length;i++){ 
            let ilat = data[i].lat;
            let ilon = data[i].long; 
            let point = new BMap.Point(ilon,ilat);
            let myIcon = new BMap.Icon( data[i].pic , new BMap.Size(50,43));
            myIcon.setImageSize(new BMap.Size(50,43))
            let marker = new BMap.Marker(point,{icon: myIcon}); 
            marker.customData= data[i] ;
            bMap.addOverlay(marker);
            _that.addMarker( marker )
            marker.addEventListener("click",_that.getAttr);
        }

        


    },
    // 编写自定义函数,创建标注
    addMarker(point){
        let _that = this; 
        let marker = new BMap.Marker(point);
        bMap.addOverlay(marker);
    },
    getAttr( a ){
		// var p = marker.getPosition();       //获取marker的位置
        // alert("marker的位置是" );   
        console.log( a.target.customData )
        this.warnDiogData = a.target.customData;
        this.warningVisible = true
    },
    // 获取预警
    getWarningData(){
        let api = '/api/web/warn';
        this.$axios.get( api,{
            num: this.warNum
        } ).then( (res)=>{
            console.log(res)
            let data = res.data.data.content.data; 
            let warnList = data.list
            this.provinceNum = data.sheng
            this.cityNum = data.shi 
            let point =  new BMap.Point(data.longitude, data.latitude);
            bMap.centerAndZoom( point,data.zoom) 
            this.getProvinceWarningList( warnList )
        } )
    },

    getOther(){
        let api = '/api/web/warnList';
        this.$axios.get( api,{

        } ).then( (res)=>{
            console.log( res )
            if( res.data.status == 200 ){
                // this.warningListArr = res.data.data.content.list;
            }
        } )
    },

    yjList(a){
        console.log( a )
    },




    // 
    handleClose(){

    },




  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.initMap();
      this.getWarningData();
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
            color:#2750ba;
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
                z-index: 99;
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
            box-sizing: border-box;
            padding: 10px;
            .warningBox{
                width: 100%;
                height: 60px;
                background-color: rgba(165, 165, 165, 0.541);
                margin-bottom: 10px;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                &:hover{
                    cursor: pointer;
                }
                >div{
                    margin: 0px 30px;
                }
                .imgBox{
                    width: 50px;
                    height: 50px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .warnTit{
                    line-height: 50px;
                    height: 50px;
                    font-size: 20px; 
                }
            }
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
    /deep/.el-dialog__wrapper{
        .el-dialog__body{
            padding: 10px 20px;
            .warningTit{
                width: 100%;
                text-align: center;
                font-size: 18px;
                color: #000;
                font-weight: 600;
            }
            .warningCont{
                margin: 20px 0px;
                >div{
                    margin: 5px 0px;
                    line-height: 20px;
                }
            }
        }
    }

}
</style>