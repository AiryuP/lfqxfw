<!--  -->
<template>
  <div id="contentBox"> 
    <div class="crumbs">
        <div class="l_blue"></div>
        <div class="current">当前位置:</div>
        <div class="crumb">
            <span class="c_title"><router-link tag="span" to="/">首页</router-link></span>
            <span class="symbol">></span>
            <span class="c_title"><router-link tag="span" to="/gridpoint">实况格点数据</router-link></span>
        </div>
    </div>
    <div class="contents">
        <div class="contentLeft">
            <div class="leftTitList" :class="{ 'active': isActive == '1' }"  >气温图</div> 
        </div>
        <div class="contentRight">
            <div class="rightContent" v-show="isActive == '1'" >
                <div class="tepTop">
                    <div>产品类型：</div>
                    <div class="temTit" :class="{ 'active': isTemActive == '1' }" @click="toAverage" >平均气温</div>
                    <div class="temTit" :class="{ 'active': isTemActive == '2' }" @click="toHigh">最高气温</div>
                    <div class="temTit" :class="{ 'active': isTemActive == '3' }" @click="toLow">最低气温</div>
                </div>
                <div class="temBom">
                    <div class="averageContent temBomCont" v-show="isTemActive == '1'" >
                        
                        <div class="imgBox">
                            <img src="../../assets/linshi/TempAvg2020072908_54515.png" alt="">
                        </div>
                        <div class="tabBox"> 
                            <template>
                                <el-table
                                :data="TempAvgTableData"
                                border
                                :stretch='true'
                                style="width: 100%">
                                <el-table-column
                                    prop="item"
                                    label="统计项目" >
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="站点名" >
                                </el-table-column>
                                <el-table-column
                                    prop="num"
                                    label="数值">
                                </el-table-column>
                                </el-table>
                            </template> 
                        </div>
                    </div>
                    <div class="highContent temBomCont" v-show="isTemActive == '2'" >

                        <div class="imgBox">
                            <img src="../../assets/linshi/Temp_Max2020072909_54515.png" alt="">
                        </div>
                        <div class="tabBox"> 
                            <template>
                                <el-table
                                :data="TempHighTableData"
                                border
                                :stretch='true'
                                style="width: 100%">
                                <el-table-column
                                    prop="item"
                                    label="统计项目" >
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="站点名" >
                                </el-table-column>
                                <el-table-column
                                    prop="num"
                                    label="数值">
                                </el-table-column>
                                </el-table>
                            </template> 
                        </div>
                    </div>
                    <div class="lowContent temBomCont" v-show="isTemActive == '3'" >

                        <div class="imgBox">
                            <img src="../../assets/linshi/Temp_Min2020072908_54515.png" alt="">
                        </div>
                        <div class="tabBox"> 
                            <template>
                                <el-table
                                :data="TempLowTableData"
                                border
                                :stretch='true'
                                style="width: 100%">
                                <el-table-column
                                    prop="item"
                                    label="统计项目" >
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="站点名" >
                                </el-table-column>
                                <el-table-column
                                    prop="num"
                                    label="数值">
                                </el-table-column>
                                </el-table>
                            </template> 
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

  </div>
</template>

<script>  
export default {
name: 'gridpoint',
//import引入的组件需要注入到对象中才能使用
components: {},
    data() {
    //这里存放数据
        return {
            isActive: '1',
            isTemActive: '1',
            TempAvgTableData: [
                {
                    item: '最高温',
                    name: '文安',
                    num: '24.1℃'
                }, {
                    item: '最低温',
                    name: '大厂',
                    num: '21.9℃'
                }
            ],
            TempHighTableData: [
                {
                    item: '最高温',
                    name: '文安',
                    num: '24.1℃'
                }, {
                    item: '最低温',
                    name: '大厂',
                    num: '21.9℃'
                }
            ],
            TempLowTableData: [
                {
                    item: '最高温',
                    name: '文安',
                    num: '24.1℃'
                }, {
                    item: '最低温',
                    name: '大厂',
                    num: '21.9℃'
                }
            ],
        };
    },
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    toAverage(){
        this.isTemActive = "1"
    },
    toHigh(){
        this.isTemActive = "2"
    },
    toLow(){
        this.isTemActive = "3"
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
                .tepTop{
                    width: 100%;
                    padding: 20px 20px 10px 20px;
                    height: 32px;
                    line-height: 32px;
                    border-bottom: 1px solid #eeeeee;
                    color: #666;
                    display: flex;
                    display: -webkit-flex;
                    div{
                        padding: 0 20px;
                        height: 32px;
                        line-height: 32px;
                    }
                    .temTit{
                        margin: 0 5px;
                        font-size: 14px;
                        color: #1782cc;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                    .active{
                        background-color: #ff6600;
                        border-radius: 6px;
                        overflow: hidden;
                        color: #fff;
                    }
                }
                .temBom{
                    width: 100%;
                    margin-top: 20px;
                    .temBomCont{
                        width: 100%;
                        .imgBox{
                            width: 100%;
                            .imgBox{
                                width: 100%;
                            }
                        }
                    }
                    .tabBox{
                        width: 100%;
                        padding: 3px 40px;
                        box-sizing: border-box;
                    }
                }
            }
        }
 
    }

}
</style>