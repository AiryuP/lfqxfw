<!--  -->
<template>
  <div class="pdf">
    
    <div class="pdfBox" >  
      <!-- v-infinite-scroll="load" :infinite-scroll-distance='10' -->
      <pdf 
        :src="pdfUrl"
        ref="pdf"
        :page="pageNum"
        @num-pages="pageTotalNum=$event"
        >
      </pdf>
      <div class="pageBox">
          <div class="topPage" @click="toTop">上一页</div>
          <div class="bomPage" @click="load">下一页</div> 
      </div>
    </div>

  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
name: 'contentTwo',
  components:{
      pdf
  },
  data () {
    return {
        pdfUrl: this.$route.query.url,
        pageNum: 1,
        pageTotalNum: 1,
    };
  },


//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

  methods: {
    load(){
      let p = this.pageNum
      p = p<this.pageTotalNum?p+1:1
      this.pageNum = p
    },
    toTop(){
      let p = this.pageNum
      p = p<0?this.pageTotalNum:p-1
      this.pageNum = p
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log( this.$route.query.url )
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
.pdf{
  width: 100%;
  .pdfBox{
    width: 100%;
    .pageBox{
      width: 100%;
      height: 40px;
      display: flex;
      display: -webkit-flex;
      margin: 10px 0px;
      justify-content: space-around;
      >div{
        width: 60px;
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
    }
  }
}
</style>