<template>
  <div id="contentBox"> 
    <div class="crumbs">
        <div class="l_blue"></div>
        <div class="current">当前位置:</div>
        <div class="crumb">
            <span class="c_title"><router-link tag="span" to="/">首页</router-link></span>
            <span class="symbol">></span>
            <span class="c_title"><router-link tag="span" to="/weatherforecast">天气预报</router-link></span>
        </div>
    </div>
    <div class="contents">
        <div class="contentLeft">
            <div class="leftTitList" :class="{ 'active': isActive == '1' }" @click="getCityData" >全市预报</div>
            <div class="leftTitList" :class="{ 'active': isActive == '2' }" @click="getMetaphaseData" >中期预报</div>
            <div class="leftTitList" :class="{ 'active': isActive == '3' }" @click="getCountyData" >分县预报</div>
        </div>
        <div class="contentRight">
            <div class="rightContent CityData" v-show="isActive == '1'" >
                廊坊市气象台下午发布全市天气预报 <br>
                廊坊市气象台7月28日16时发布：受高空槽东移影响，预计今天夜间到明天白天我市 <br>
                天气为阴有雷阵雨转多云，气象条件对于空气污染物的扩散无明显影响。 <br>
                ------------------------------------------------ <br>
                具体预报： <br>
                今天夜间：阴有雷阵雨    风向风速：东南风2-3级  最低气温：22℃ <br>
                明天白天：多云间阴，有分散性雷阵雨    风向风速：西南风2-3级  最高气温：32℃ <br>
                明天夜间：多云 风向风速：西南风2-3级  最低气温：25℃ <br>
                后天白天：阴，有分散性雷阵雨 风向风速：西南风2-3级  最高气温：34℃ <br>
                <br>
                发布时间: 2020年7月28日15:50     预报员:66 <br>
                ------------------------------------------------<br>
            </div>
            <div class="rightContent MetaphaseData" v-show="isActive == '2'">
                中期重要天气过程趋势区域分片文字预报 <br>
                                (7月29日-8月3日） <br>
                预计未来一周内，我市以多云天气为主，多雷阵雨或阵雨，雷雨时段可能伴有短时强降水、短时大风、等强对流天气；周内气温小幅波动，最高气温31℃～35℃，最低气温22℃～26℃，空气污染物气象扩散条件以二到三级为主，部分时段四级。 <br>
                具体预报如下： <br>
                今天下午至夜间：阴转雷阵雨  西南风转东南风2—3级  31℃～22℃； <br>
                29日：多云    西南风2—3级    34℃～25℃； <br>
                30日：多云转阴    西南风2—3级    35℃～26℃； <br>
                31日：雷阵雨转阴    东南风2—3级    32℃～24℃； <br>
                1日：多云    南风2—3级    33℃～25℃； <br>
                2日：多云    南风转北风2—3级    33℃～24℃； <br>
                3日：雷阵雨    东风2—3级    31℃～24℃ 。  <br>
                                            预报员：66 <br>
                                            气象台 <br>
                                        2020年7月28日11时 <br>
            </div>
            <div class="rightContent CountyData" v-show="isActive == '3'">
                廊坊市区24小时预报 <br>
                三河:雷阵雨，东南风2—3级转西南风2—3级，21～32℃ <br>
                大厂:雷阵雨转多云，东南风2—3级转西南风2—3级，21～32℃ <br>
                香河:雷阵雨，东南风2—3级转西南风2—3级，22～32℃ <br>
                固安:雷阵雨转多云，东南风2—3级转西南风2—3级，22～32℃ <br>
                廊坊:雷阵雨转多云，东南风2—3级转西南风2—3级，22～32℃ <br>
                永清:雷阵雨转多云，东南风2—3级转西南风2—3级，22～32℃ <br>
                霸州:阴转多云，东南风2—3级转西南风2—3级，22～33℃ <br>
                文安:阴转多云，东南风2—3级转西南风2—3级，22～33℃ <br>
                大城:阴转多云，东南风2—3级转西南风2—3级，23～33℃ <br>
                <br>
                <br>
                廊坊市区48小时预报 <br>
                三河:多云转雷阵雨，西南风2—3级，24～33℃ <br>
                大厂:多云转雷阵雨，西南风2—3级，23～33℃ <br>
                香河:多云转雷阵雨，西南风2—3级，24～33℃ <br>
                固安:多云转阴，西南风2—3级，24～33℃ <br>
                廊坊:多云转阴，西南风2—3级，25～34℃ <br>
                永清:多云转阴，西南风2—3级，25～34℃ <br>
                霸州:多云转阴，西南风2—3级，24～34℃ <br>
                文安:多云转阴，西南风2—3级，24～34℃ <br>
                大城:多云转阴，西南风2—3级，25～34℃ <br>
                <br>
                <br>
                廊坊市区72小时预报 <br>
                三河:阴转雷阵雨，西南风2—3级转东南风2—3级，25～33℃<br>
                大厂:阴转雷阵雨，西南风2—3级转东南风2—3级，25～33℃<br>
                香河:阴转雷阵雨，西南风2—3级转东南风2—3级，25～33℃<br>
                固安:阴，西南风2—3级转东南风2—3级，24～33℃ <br>
                廊坊:阴，西南风2—3级转东南风2—3级，26～33℃ <br>
                永清:阴，西南风2—3级转东南风2—3级，25～33℃ <br>
                霸州:阴，西南风2—3级转东南风2—3级，25～33℃ <br>
                文安:阴，西南风2—3级转东南风2—3级，25～33℃ <br>
                大城:阴转雷阵雨，西南风2—3级转东南风2—3级，26～33℃<br>
            </div>
        </div>


    </div>

  </div>
</template>

<script>
export default {
name: 'weatherforecast',
  data () {
    return {
        isActive: '1'
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

  methods: {
      getCityData(){
        this.isActive = '1';
      },
      getMetaphaseData(){
        this.isActive = '2';
      },
      getCountyData(){
        this.isActive = '3';
      },

  },
//生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

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
        padding: 35px 35px 30px;
        display: flex;
        display: -webkit-flex;
        .contentLeft{
            width: 21%;
            .leftTitList{
                // width: 100%;
                height: 55px;
                line-height: 55px;
                text-align: right;
                box-sizing: border-box;
                padding-right: 50px;    
                font-size: 14px;
                &:hover{
                    background-color: #eeeeee;
                    color: #2e73b1;
                    border-left: 3px solid #1782cc;
                    cursor: pointer;
                }
            }
            .active{
                background-color: #eeeeee;
                color: #2e73b1;
                border-left: 3px solid #1782cc;
            }
        }
        .contentRight{
            width: 79%;
            min-height: 100px;
            padding: 20px;
            box-sizing: border-box;
            background-color:#eeeeee;
            .rightContent{
                width: 100%;

            }
        }
 
    }

}
</style>