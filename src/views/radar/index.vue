<!--  -->
<template>
  <div id="contentBox"> 
    <div class="crumbs">
        <div class="l_blue"></div>
        <div class="current">当前位置:</div>
        <div class="crumb">
            <span class="c_title"><router-link tag="span" to="/">首页</router-link></span>
            <span class="symbol">></span>
            <span class="c_title"><router-link tag="span" to="/radar">雷达云图</router-link></span>
        </div>
    </div>
    <div class="contents">
        <div class="contentLeft">
            <div class="leftTitList" :class="{ 'active': isActive == '1' }" @click="getRadar" >雷达图</div>
            <div class="leftTitList" :class="{ 'active': isActive == '2' }" @click="getCloud" >卫星云图</div> 
        </div>
        <div class="contentRight">
            <div class="rightContent" v-show="isActive == '1'" >
                <div class="radarContent"> 
                    <div class="radarTitTxt"> 雷达图 <span class="tips">提示</span> </div>
                </div>
            </div>
            <div class="rightContent" v-show="isActive == '2'" >
    22222222222222
            </div>
        </div>


    </div>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
name: 'radar',
//import引入的组件需要注入到对象中才能使用
components: {},
    data() {
    //这里存放数据
        return {
            isActive: '1'
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      getRadar(){
        this.isActive = '1';
      },
      getCloud(){
        this.isActive = '2';
      }, 
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
//@import url(); 引入公共css类
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
                background-color: #fff;
                .radarContent{
                    width: 100%;
                    box-sizing: border-box;
                    .radarTitTxt{
                        width: 100%;
                        height: 44px;
                        line-height: 44px;
                        font-size: 18px;
                        text-align: center;
                        font-weight: 600;
                        position: relative;
                        .tips{
                            display: inline-block;
                            position: absolute;
                            right: 5px;
                            font-size: 14px;
                            color: red;
                            background-color: #f6f6f6;
                            border-color: #ddd;
                            text-shadow: 0 1px 0 #f3f3f3;
                            width: 52px;
                            height: 36px;
                            top: 3px;
                            line-height: 36px;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                    }
                }
                
            }
        }
 
    }

}
</style>