<!--  -->
<template>
<div class="allBox">
    <div class="listsBox">
      <div class="listsf hj" @click="openList('1')" >
          <div class="tit">环境评估报告</div>
      </div>
      <div class="listsf qx" @click="openList('6')" >
          <div class="tit">气象信息快报</div>
      </div>
      <div class="listsf zb" @click="openList('2')" >
          <div class="tit">环境气象周报</div>
      </div>
      <div class="listsf zy" @click="openList('5')" >
          <div class="tit">重要天气周报</div>
      </div>
      <div class="listsf ns" @click="openList('4')" >
          <div class="tit">农事专报</div>
      </div>
  </div>
</div>
</template>

<script>
export default {
name: 'lists',
  data () {
    return {

    

    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

  methods: {
    openList(num){

      this.$router.push({
          path: '/special/lists/detail',
          query: {
              id: num
          }
      })
    }
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
//@import url();
.allBox{
  .listsBox{
      width: 100%;
      box-sizing: border-box;
      padding: 20px 20px;
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      .listsf{
          width: 150px;
          height: 150px;
          border-radius: 12px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          margin: 15px 30px;
          position: relative; 
          background-size: cover;
          &:hover{
              cursor: pointer;
          }
          .tit{
              width: 100%;
              height: 36px;
              position: absolute;
              background-color: rgba(0, 0, 0, 0.4);
              top: 57px;
              text-align: center;
              line-height: 36px;
              color: #fff;
          }
      }
      .hj{
          background: url('../../../assets/images/zhuanti/icon-hj.png') no-repeat;
      }
      .qx{
          background: url('../../../assets/images/zhuanti/icon-qx.png') no-repeat;
      }
      .zb{
          background: url('../../../assets/images/zhuanti/icon-zb.png') no-repeat;
      }
      .zy{
          background: url('../../../assets/images/zhuanti/icon-zy.png') no-repeat;
      }
      .ns{
          background: url('../../../assets/images/zhuanti/icon-ns.png') no-repeat;
      }

  }
  .listCont{
    width: 100%; 
    box-sizing: border-box; 
  }
}
</style>