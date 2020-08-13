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
                    <div class="radarTitTxt"> 雷达图 <span class="tips" @click="openTips">提示</span> </div>
                    <div class="areaBox">  
                        <el-select v-model="areaValue" style="width: 100%;color: #000"  placeholder="选择地区">
                            <el-option
                                v-for="item in areaOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </div>
                    <div class="carouselTit">北京雷达图</div>
                    <div class="radarBox">
                        <div class="imgsBox">
                            <div class="imgList">
                                <img src="../../assets/linshi/radar1.png" alt="">
                            </div>
                            <!-- <div class="imgList">
                                <img src="../../assets/linshi/radar2.png" alt="">
                            </div> -->
                        </div>
                        <div class="playSpeed">
                            <div class="playOrStop" @click="playImg">
                                <img :src='switchImg' alt="">
                            </div>
                            <div class="progressBar">
                                <el-progress :show-text="false" :percentage="percentage" color="#409eff"></el-progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightContent" v-show="isActive == '2'" >
                <div class="cloudContent">
                    <div class="cloudTitTxt"> 云图 </div> 
                    <div class="cloudBox">
                        <div class="imgsBox">
                            <div class="imgList">
                                <img src="../../assets/linshi/cloud1.jpg" alt="">
                            </div>
                            <!-- <div class="imgList">
                                <img src="../../assets/linshi/radar2.png" alt="">
                            </div> -->
                        </div>
                        <div class="playSpeed">
                            <div class="playOrStop" @click="playImg">
                                <img :src='switchImg' alt="">
                            </div>
                            <div class="progressBar">
                                <el-progress :show-text="false" :percentage="percentage" color="#409eff"></el-progress>
                            </div>
                        </div>
                    </div>
                </div>
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
            isActive: '1',
            areaOptions: [
                {
                    value: '1',
                    label: '石家庄'
                }, {
                    value: '2',
                    label: '张家口'
                }, {
                    value: '3',
                    label: '承德'
                }, {
                    value: '4',
                    label: '秦皇岛'
                }, {
                    value: '5',
                    label: '沧州'
                },{
                    value: '6',
                    label: '濮阳'
                }
            ],
            areaValue: '',
            playStatus: '0',
            switchImg: '/static/radar/start.png',
            startImg: '/static/radar/start.png',
            stopImg: '/static/radar/stop.png',
            percentage: 20, // 进度
        }
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
      openTips(){
        this.$alert('<p>雨、云、雪等降水粒子能够产生回波，并能较好地反应云雨区结构和变化，因此，通过气象雷达绘制的雷达图，已经成为我们对短时雷雨大风、冰雹等强对流天气进行监测预警的重要手段。</p><p> 雷达回波的强度，我们在雷达图上通过不同色谱表示。雷达回波从蓝色到紫色，降雨强度逐渐增强。<span style="color: red">一般来说，浅绿色有可能有降雨，深绿色一定有降雨，黄色红色区域的雨势往往非常大。</span>通过最近几张雷达图的动画观看，可以一目了然的看出雨带的移动和天气过程的走势，作为出行的参考。</p>', '提示', {
          confirmButtonText: '确定',
          distinguishCancelAndClose: true,
          center: true, 
          dangerouslyUseHTMLString: true
        });
      },
      playImg(){
          if( this.playStatus == '1' ){
              this.playStatus = '0'
              this.switchImg = this.startImg
          }else if( this.playStatus == '0' ){
              this.playStatus = '1'
              this.switchImg = this.stopImg
          }
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
                            background-color: #c4c2c2;
                            border-color: #ddd;
                            text-shadow: 0 1px 0 #f3f3f3;
                            width: 52px;
                            height: 36px;
                            top: 3px;
                            line-height: 36px;
                            border-radius: 4px;
                            &:hover{
                                cursor: pointer;
                                background-color: #1782cc;
                                color: #fff;
                            }
                        }
                    }
                    .areaBox{
                        width: 100%;
                        padding: 5px;
                        box-sizing: border-box;
                        /deep/.el-select{ 
                            .el-input{
                                    text-align: center;
                                .el-input__inner{
                                    color: #000; 
                                    text-align: center; 
                                }
                                input::-webkit-input-placeholder{
                                    color: #000;  
                                }
                                input::-moz-placeholder{/* Mozilla Firefox 19+ */
                                    color: #000;  
                                }
                                input:-moz-placeholder{/* Mozilla Firefox 4 to 18 */
                                    color: #000;  
                                }
                                input:-ms-input-placeholder{
                                    color: #000;  
                                }
                            }
                        }
                    }
                    .carouselTit{
                        width: 100%;
                        padding: 5px;
                        box-sizing: border-box;
                        text-align: center;
                        height: 50px;
                        line-height: 50px;
                        font-size: 20px;
                        font-weight: 600;
                    }
                    .radarBox{
                        width: 100%;
                        padding: 0px 30px;
                        margin-top: 10px;
                        box-sizing: border-box;
                        .imgsBox{
                            width: 700px;
                            margin: 0 auto;
                            border: 6px solid #193759;
                            border-radius: 6px;
                            overflow: hidden;
                            .imgList{
                                width: 100%;
                                img{
                                    width: 100%;
                                }
                            }
                        }
                        .playSpeed{
                            width: 700px;
                            margin: 0 auto;
                            display: flex;
                            display: -webkit-flex;
                            .playOrStop{
                                width: 48px;
                                height: 48px;
                            }
                            .progressBar{
                                width: calc( 100% - 50px );
                                box-sizing: border-box;
                                padding: 0 10px;
                                padding-top: 21px;
                            }
                        }
                    }
                }
                .cloudContent{ 
                    width: 100%;
                    box-sizing: border-box;
                    .cloudTitTxt{
                        width: 100%;
                        height: 44px;
                        line-height: 44px;
                        font-size: 18px;
                        text-align: center;
                        font-weight: 600; 
                    }
                    .cloudBox{
                        width: 100%;
                        padding: 0px 30px;
                        margin-top: 10px;
                        box-sizing: border-box;
                        .imgsBox{
                            width: 700px;
                            margin: 0 auto;
                            border: 6px solid #193759;
                            border-radius: 6px;
                            overflow: hidden;
                            .imgList{
                                width: 100%;
                                img{
                                    width: 100%;
                                }
                            }
                        }
                        .playSpeed{
                            width: 700px;
                            margin: 0 auto;
                            display: flex;
                            display: -webkit-flex;
                            .playOrStop{
                                width: 48px;
                                height: 48px;
                            }
                            .progressBar{
                                width: calc( 100% - 50px );
                                box-sizing: border-box;
                                padding: 0 10px;
                                padding-top: 21px;
                            }
                        }
                    }
                }
                
            }
        }
 
    } 

}
</style>