<!--  -->
<template>
  <div class="contentBox">
        <el-table
            :data="listData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="typeName"
            label="类别">
            </el-table-column>
            <el-table-column
            prop="title"
            label="标题">
            </el-table-column>
            <el-table-column
            prop="time"
            label="时间">
            </el-table-column> 
            <el-table-column 
                label="操作" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageBox">
           <el-pagination
              background
              @current-change="changePage"
              layout="prev, pager, next"
              :total="tol">
            </el-pagination>
        </div>
       
  </div>
</template>

<script>
export default {
name: 'detail',
  data () {
    return {
        listData: [],
        current: 1,
        tol: 0,
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

  methods: {
      getData(){
          let api ='/api/web/zhuanTiQiXiang';
          this.$axios.get(api,{
              params:{
                  typeId: this.$route.query.id,
                  current: this.current,
                  pageSize: 10
              }
          }).then((res)=>{
              if(res.data.status == 200){
                  let data = res.data.data.content;
                  this.listData = data;
                  this.tol = res.data.data.pagination.total;
                  this.current = res.data.data.pagination.current;
              }
          })
      },
      handleClick(item){ 
        // this.$router.push({
        //     path: '/special/contentTwo',
        //     query: {
        //         url: item.url
        //     }
        // })
        if( item.url != ''){
          window.open(item.url);
        }else{
          this.$message({
            message: '暂无PDF文件！',
            type: 'warning'
          });
        }
      },
      changePage(val){
          this.current = val;
          this.getData();
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
  .pageBox{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    margin: 10px 10px;
  }
}
</style>