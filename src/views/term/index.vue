<!--  -->
<template>
  <div id="contentBox"> 
    <div class="crumbs">
        <div class="l_blue"></div>
        <div class="current">当前位置:</div>
        <div class="crumb">
            <span class="c_title"><router-link tag="span" to="/">首页</router-link></span>
            <span class="symbol">></span>
            <span class="c_title"><router-link tag="span" to="/term">气象术语</router-link></span>
        </div>
    </div>
    <div class="contents">
        <div class="topsearch">
            <div class="seachBox">
                <el-input v-model="searchValue" placeholder="请输入关键词"></el-input>
            </div>
            <div class="searchBtn">搜索</div>
            <div class="words">
                推荐搜索：
                <span>日界</span>
                <span>空气质量指数</span>
                <span>AQI</span>
                <span>首要污染物</span>
                <span>国家站</span>
                <span>区域站</span>
                <span>日照时数</span> 
            </div> 
        </div>
        <div class="result" v-if="!isShow">
            <div class="resultList" v-for="item in itemArr" :key="item.id" @click="toShowData(item)">{{ item.name }}</div>
        </div>
        <div class="fhaf" v-if="isShow">
            暂无您搜索的数据
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
        isShow: false,

        // 假消息
        itemArr:[
            {
                id: '1',
                name: '日界',
                content: '气象日界是实行24小时制，以晚上20点为界，从晚上20时至第天早上08时的12个小时为晚上，从早上08时到晚上20时的12个小时为白天，一天是先晚上后白天为一天时间。凌晨：03-05时，早晨：05-08时，上午：08-11时，中午：11-13时，下午：13-17时，傍晚：17-20时，前半夜20-次日02时，后半夜：次日02-08时。'
            },
            {
                id: '2',
                name: '空气质量指数',
                content: '空气污染指数（即AQI），就是根据环境空气质量标准和各项污染物对人体健康、生态、环境的影响，将常规监测的几种空气污染物浓度简化成为单一的概念性指数值形式，它将空气污染程度和空气质量状况分级表示，适合于表示城市的短期空气质量状况和变化趋势。针对单项污染物的还规定了空气质量分指数。参与空气质量评价的主要污染物为细颗粒物、可吸入颗粒物、二氧化硫、二氧化氮、臭氧、一氧化碳等六项。空气污染指数的取值范围定为0～500，其中0～50、51～100、101～200、201～300和大于300，分别对应国家空气质量标准中'
            }
        ]
    };
  },

  components: {},

//监听属性 类似于data概念
  computed: {},

//监控data中的数据变化
  watch: {},

  methods: {
    toShowData( item ){
        this.$alert( item.content , item.name, {
            confirmButtonText: '确定',
            callback: action => {}
        });
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
            height: 200px;
            line-height: 200px;
            text-align: center;
            color: #000;
        }
    }

}

</style>