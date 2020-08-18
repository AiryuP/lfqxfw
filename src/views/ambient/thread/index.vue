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
      }
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
        }
      } )
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
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
          padding: 5px 10px;
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
}
</style>