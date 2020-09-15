<template>
    <div id="allContentBox">
       <div class="topInfo">
            <div class="infoBox">
                <div class="infoLeft">您好！欢迎访问廊坊市公共气象服务!</div>
                <div class="infoRight"><div style="margin-right: 10px;">关注我们</div> <div @mouseenter="ewmShow = true" @mouseleave="ewmShow = false" class="infoRightImgBox"> <div class="ewm" v-show="ewmShow"><img src="../../assets/images/ewm2.jpg" alt="微信二维码"></div> </div></div>
            </div>
       </div>
       <div class="topBanner">
            <div class="bannerBox">
                <div class="lfqxTit">
                    <img src="../../assets/images/logo.png" alt="廊坊气象局标志">
                </div>
            </div>
       </div>
       <!-- 首页 -->
       <div class="nav">
            <div class="navBox">
                <div class="navList" :class="{ 'active': isActive == '1' }" @click="toHome" >首页</div>
                <div class="navList" :class="{ 'active': isActive == '2' }" @click="toForecast" >天气预报</div>
                <div class="navList" :class="{ 'active': isActive == '3' }" @click="toGridPoint" >实况格点数据</div>
                <div class="navList" :class="{ 'active': isActive == '4' }" @click="toAmbient" >环境气象</div>
                <div class="navList" :class="{ 'active': isActive == '5' }" @click="toRadar" >雷达云图</div>
                <div class="navList" :class="{ 'active': isActive == '6' }" @click="toWarning" >预警信息</div>
                <div class="navList" :class="{ 'active': isActive == '7' }" @click="toTraffic">交通气象</div>
                <div class="navList" :class="{ 'active': isActive == '8' }" @click="toTerm" >气象术语</div>
                <div class="navList" :class="{ 'active': isActive == '9' }" @click="toSpecial" >气象专题</div>
            </div>
       </div>
       <div class="centerContent"></div>
       <div>
            <router-view/>
       </div>
       <div class="footer">
            <div class="footer_con">
                <div class="xgxn">相关信息</div>
                <div class="dzxix">
                    <p>地址：廊坊市爱民东道32号　联系电话：0316-2010123　客服邮箱：lfqxfwzx@163.com</p>
                </div>
            </div>
       </div>
       <div class="footer_bottom">
            <p class="bq">Copyright © 2016 All Rights Reserved 廊坊气象局　版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.beian.miit.gov.cn" target="_blank" style="color:#ffffff;">冀ICP备15012427号-4</a> </p>
       </div>
    </div>
</template>

<script>
export default { 
  name: 'Home',
  data () {
    return {
        ewmShow: false,
        isActive: '1',
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {}, 
//监控data中的数据变化
  watch: {
    //   监听路由变化
    '$route':'getPath'

  }, 
  methods: {
    getPath(){
        let str = this.$route.path;
        if( str == '/home' ){
            this.isActive = '1'
        }else if( str =='/' ){
            this.isActive = '1'
        }else if( str =='/weatherforecast' ){
            this.isActive = '2'
        }else if( str =='/gridpoint' ){
            this.isActive = '3'
        }else if( str == '/ambient'){ 
            this.isActive = '4'
        }else if( str == '/ambient/surface'){ 
            this.isActive = '4'
        }else if( str == '/ambient/thread'){ 
            this.isActive = '4'
        }else if( str =='/radar' ){
            this.isActive = '5'
        }else if( str =='/warning' ){
            this.isActive = '6'
        }else if( str =='/traffic' ){
            this.isActive = '7'
        }else if( str =='/traffic/surface' ){
            this.isActive = '7'
        }else if( str =='/traffic/thread' ){
            this.isActive = '7'
        }else if( str == '/term' ){
            this.isActive = '8'
        }else if( str == '/special' ){
            this.isActive = '9'
        }else if( str == '/special/lists' ){
            this.isActive = '9'
        }else if( str == '/special/content' ){
            this.isActive = '9'
        }
    },  
    toTerm(){
        this.$router.push({
            path: '/term',
        })
    },
    toSpecial(){
        this.$router.push({
            path: '/special',
        })
    },
    toHome(){
        this.$router.push({
            path: '/',
        })
    },
    toForecast(){
        this.$router.push({
            path: '/weatherforecast',
        })
    },
    toGridPoint(){
        this.$router.push({
            path: '/gridpoint',
        })
    },
    toRadar(){
        this.$router.push({
            path: '/radar',
        })
    },
    toWarning(){
        this.$router.push({
            path: '/warning',
        })   
    },
    toAmbient(){
        this.$router.push({
            path: '/ambient',
        })
    },
    toTraffic(){ 
        this.$router.push({
            path: '/traffic',
        })
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.getPath();
  }
}
</script>
<style lang='scss' scoped>

    #allContentBox{
        width: 100%;
        // overflow: auto;
        .topInfo{
            width: 100%;
            height: 35px;
            background-color: #eeeeee;
            font-size: 12px;
            .infoBox{
                width: 1100px;
                margin: 0 auto;
                height: 35px;
                line-height: 35px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                .infoRight{
                    height: 35px;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    .infoRightImgBox{
                        width: 25px;
                        height: 25px;
                        background: url('../../assets/images/new01_06.png') center no-repeat ;
                        position: relative;
                        &:hover{
                            cursor: pointer;
                        }
                        .ewm{
                            position: absolute;
                            top: 30px;
                            z-index: 33;
                        }
                    }
                }
            }
        }
        .topBanner{
            width: 100%;
            height: 100px;
            background: url('../../assets/images/top_bg.gif') top center no-repeat;
            .bannerBox{
                width: 1100px;
                height: 100px;
                margin: 0 auto;                
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                .lfqxTit{
                    height: 63px;

                }
            }
        }
        .nav{
            width: 100%;
            height: 50px;
            background-color: rgb(64, 135, 199);
            .navBox{
                width: 1100px;
                height: 50px;
                margin: 0 auto;
                display: flex;
                display: -webkit-flex;
                justify-content: flex-start;
                .navList{
                    // padding: 0px 10px;
                    font-size: 16px;
                    line-height: 50px;
                    height: 50px;
                    text-align: center;
                    color: #fff;
                    width: 110px;
                    &:hover{
                        background-color: #2e73b1;
                        cursor: pointer;
                    }
                    span{
                        // background-color: red;
                        height: 100%;
                        width: 100%;
                    }
                }
                .active{
                    background-color: #2e73b1;
                }
            }
        }
        .centerContent{
            width: 100%;
        }
        .footer{
            width: 100%;
            height: 65px;
            background-color: #e5e5e5;
            padding-top: 20px;
            .footer_con{
                color: #5a5a5a;
                font-size: 12px;
                width: 1100px;
                height: 65px;
                margin: 0 auto;
                overflow: hidden;
                margin-bottom: 10px;
            }
        }
        .footer_bottom{
            width: 100%;
            height: 60px;
            background: #a3a5a5;
            float: left;
            font-size: 12px;
            .bq{
                color: #FFF;
                margin: 0 auto;
                width: 1000px;
                margin-top: 24px;
                text-align: center;
            }
        }
        
    }
 


</style>