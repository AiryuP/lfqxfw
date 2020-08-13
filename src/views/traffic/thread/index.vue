<!-- 交通二级 -->
<template>
  <div id="contentBox">
      <div class="mapBox">
          <div id="bdMap"></div>
      </div>
  </div>
</template>

<script>
var bMap;
export default {
name: 'thread',
  data () {
    return {
      myid: this.$route.query.id,
      roadName: ''
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
    // 传参请求数据
    getData(){
        let api = '/api/web/gaosuPoint';
        this.$axios.get(api,{
          params:{
            canshu: this.myid
          }
        }).then( (res)=>{
          console.log( res );
          if( res.data.status == 200 ){
            let data = res.data.data.content.list;
            let roadName = data[0].bianhaoname;
            console.log( data )
            console.log( roadName )
            this.$store.commit('setRoadName', roadName);
          }
        } )
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMap();
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
#contentBox{
    width: 100%; 
    padding: 15px 25px 10px;
    box-sizing: border-box;
    position: relative; 
    .mapBox{
        width: 100%;  
        #bdMap{
            width: 100%;
            height: 650px;
        }
    } 
}
</style>