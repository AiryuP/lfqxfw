<!--  -->
<template>
  <div id="contentBox"> 
    <div class="crumbs">
        <div class="l_blue"></div>
        <div class="current">当前位置:</div>
        <div class="crumb">
            <span class="c_title"><router-link tag="span" to="/">首页</router-link></span>
            <span class="symbol">></span>
            <span class="c_title"><router-link  tag="span" to="/term">气象术语</router-link></span>
        </div>
    </div>
    <div class="contents">
        <div class="topsearch">
            <div class="seachBox">
                <el-input v-model="searchValue" placeholder="请输入关键词"></el-input>
            </div>
            <div class="searchBtn" @click="search">搜索</div>
            <div class="words">
                推荐搜索：
                <span  v-for="item in recommendArr" :key="item.id" @click="toShowData(item.id)">{{ item.name }}</span>
                <!-- <span>日界</span>
                <span>空气质量指数</span>
                <span>AQI</span>
                <span>首要污染物</span>
                <span>国家站</span>
                <span>区域站</span>
                <span>日照时数</span>  -->
            </div> 
        </div>
        <div class="result" v-if="!isShow">
            <div class="resultList" v-for="item in itemArr" :key="item.id" @click="toShowData(item.id)">{{ item.name }}</div>
        </div>
        <div class="fhaf" v-if="isShow">
            {{ defaultTip }}
        </div>


    </div>

  </div>
</template>

<script>
export default {
name: 'term',
  data () {
    return {
        searchValue: '',
        isShow: true,
        itemArr:[],
        recommendArr:[],
        defaultTip: '请输入关键字搜索！'
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

  methods: {
    toShowData( id ){ 

        let api = "/api/web/detail";
        this.$axios.get(api,{
            params:{
                id: id
            }
        }).then((res)=>{
            console.log( res )
            if( res.data.status == 200){
                let data = res.data.data.content.data;

                this.$alert( data.content , data.name, {
                    confirmButtonText: '确定',
                    callback: action => {}
                });
            }
        })

 
    },
    // 搜索功能
    search(){ 
        let api = '/api/web/keyword';
        this.$axios.get(api,{
            params:{
                name: this.searchValue
            }
        }).then((res)=>{
            console.log( res )
            if( res.data.status == 200 ){
                this.isShow = false;
                this.defaultTip = '请输入关键字搜索！'
                this.itemArr = res.data.data.content.data;
                if( this.itemArr.length < 1 ){
                    this.isShow = true;
                    this.defaultTip = '暂无您输入的关键字信息！'
                }
            }
        }).catch((res)=>{

        })
    },
    recommend(){
        let api = '/api/web/recommend';
        this.$axios.get(api,{
            
        }).then((res)=>{
            console.log( res );
            if(res.data.status == 200){
                let data = res.data.data.content.data;
                this.recommendArr = data
            }
        })
    }

  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.recommend()
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
        .topsearch{
            width: 100%;
            height: 40px;
            display: flex;
            display: -webkit-flex;
            .searchBtn{
                background-color: #199bd3;
                border: none;
                color: white;
                padding: 0px 30px;
                border-radius: 5px;
                font-size: 14px;
                margin-left: 10px;
                outline: none;
                line-height: 40px;
                &:hover{
                    cursor: pointer;
                }
            }
            .words{
                color: rgb(114, 114, 114);
                margin-left: 20px;
                span{
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 20px;
                    color: blue;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
        .result{
            width: 100%;
            min-height: 300px;
            .resultList{
                width: 100%;
                height: 32px;
                line-height: 32px;
                border-bottom: 1px solid #ccc;
                margin: 15px 0;
                padding: 0 20px;
                box-sizing: border-box;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .fhaf{
            width: 100%;
            height: 300px;
            line-height: 300px;
            text-align: center;
            color: #000;
        }
    }

}

</style>