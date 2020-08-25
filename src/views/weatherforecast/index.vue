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
            <div class="rightContent CityData" v-show="isActive == '1'" v-html="contentTxt" >
                {{ contentTxt }}
            </div>
            <div class="rightContent MetaphaseData" v-show="isActive == '2'" v-html="contentTxt" >
                {{ contentTxt }}
            </div>
            <div class="rightContent CountyData" v-show="isActive == '3'" v-html="contentTxt" >
                {{ contentTxt }}
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
        isActive: '1',
        weatherType: 'qs',
        contentTxt:''
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
        this.weatherType = 'qs'
        this.getWeatherData()
      },
      getMetaphaseData(){
        this.isActive = '2';
        this.weatherType = 'zq'
        this.getWeatherData()
      },
      getCountyData(){
        this.isActive = '3';
        this.weatherType = 'fx'
        this.getWeatherData()
      },
      //   查询预报数据
      getWeatherData(){
        let api = '/api/web/yubao';
        this.$axios.get( api,{
            params:{
                type: this.weatherType
            }
        } ).then((res)=>{
            if(res.data.status == 200){
                let data  = res.data.data.content.content;
                this.contentTxt = data;
            }
        })
      },

  },
//生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.getWeatherData()
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