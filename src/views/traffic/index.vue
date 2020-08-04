<!-- 交通气象 -->
<template>
  <div id="contentBox"> 
    <div class="crumbs">
        <div class="l_blue"></div>
        <div class="current">当前位置:</div>
        <div class="crumb">
            <span class="c_title"><router-link tag="span" to="/">首页</router-link></span>
            <span class="symbol">></span>
            <span class="c_title"><router-link tag="span" to="/traffic">交通气象</router-link></span>
            <span class="symbol" v-show="showCrumb == '2'" >></span>
            <span class="c_title" v-show="showCrumb == '2'"> {{ trafficNext }} </span>
        </div>
    </div>
    <div class="contents">
        <router-view/>
    </div>
  </div>
</template>

<script>
export default {
name: 'traffic',
  data () {
    return {
      trafficNext: '北京五环详情',
      showCrumb: '1'
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: { 
  },

//监控data中的数据变化
  watch: { 
    //   监听路由变化
    '$route':'getPath'
  },

  methods: {
    getPath(){
      let str = this.$route.path;
      if( str =='/traffic/surface' ){
          this.showCrumb = '1'
      }else if(  str =='/traffic/thread'  ){
          this.showCrumb = '2' 
      }
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getPath();
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
        // padding: 15px 25px 10px;
        box-sizing: border-box;
    }
}
</style>