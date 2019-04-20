<template>
    <div ref="step3_wrap">
        <div class="wrap_img" :style="{'width':picShowWidth+'px','height' : picShowHeight + 'px'}">
            <img 
                :src="`/api/uploads/${picname}`" 
                :width="picShowWidth"
                :height="picShowHeight"
            >

            <div class="mask"></div>

            <div class="cut" ref="cut">
                <img 
                    :src="`/api/uploads/${picname}`" 
                    :width="picShowWidth"
                    :height="picShowHeight"
                    :style="{'position':'absolute','left':dX + 'px','top' : dY + 'px'}"
                >
            </div>
        </div>
        <div class="preview_box">
            <div class="da">
                <img 
                    :src="`/api/uploads/${picname}`" 
                    :width="picShowWidth"
                    :height="picShowHeight"
                    :style="{'position':'absolute','left':dX + 'px','top' : dY + 'px'}"
                >
            </div>
            <div class="zhong">
                <img 
                    :src="`/api/uploads/${picname}`" 
                    :width="picShowWidth"
                    :height="picShowHeight"
                    :style="{'position':'absolute','left':dX + 'px','top' : dY + 'px'}"
                >
            </div>
            <div class="xiao">
                <img 
                    :src="`/api/uploads/${picname}`" 
                    :width="picShowWidth"
                    :height="picShowHeight"
                    :style="{'position':'absolute','left':dX + 'px','top' : dY + 'px'}"
                >
            </div>
        </div>

        <div class="cl"></div>
    </div>
</template>

<script>
export default {
    props:['picname','picRealWidth','picRealHeight','changeModalWidth'],
    data(){
        return {
            // 图片的显示宽度和高度
            picShowWidth : this.picRealWidth,
            picShowHeight : this.picRealHeight,
            dX : 0,
            dY : 0
        }
    },
    // 组件已经创建
    created(){
        // 如果图片的真实高度大于了400，此时就要让他约束一下
        if(this.picRealHeight > 400){
            this.picShowHeight = 400;
            // 宽度应该等比例减小
            this.picShowWidth = (400 / this.picRealHeight) *  this.picRealWidth;
        }

        // 通知父亲改变模态框宽度
        this.changeModalWidth(this.picShowWidth + 190);
    },
    // 组件所有DOM就绪。
    mounted(){
        // 动态加载jQuery库
        var scriptDOM1 = document.createElement('script');
        var scriptDOM2 = document.createElement('script');
        var scriptDOM3 = document.createElement('link');
        // 设置src，指向jQuery库，和jQuery-ui库
        scriptDOM1.src = '/jslib/jquery-3.4.0.min.js';
        scriptDOM2.src = '/jslib/jquery-ui.min.js';
        scriptDOM3.href = '/styles/jquery-ui.min.css';
        scriptDOM3.rel = 'stylesheet';

        document.body.appendChild(scriptDOM1);
        document.body.appendChild(scriptDOM2);
        document.body.appendChild(scriptDOM3);

        var self = this;
        // 已经加载好的数量
        var doneCount = 0;
        // 加载好库之后，计数器加1，如果计数器是2了，表示都好了
        scriptDOM1.onload = function(){
            doneCount++;
            if(doneCount == 3){
                start();
            }
        }
        scriptDOM2.onload = function(){
            doneCount++;
            if(doneCount == 3){
                start();
            }
        }
        scriptDOM3.onload = function(){
            doneCount++;
            if(doneCount == 3){
                start();
            }
        }

        function start(){
            // 拖拽
            $(self.$refs.cut).draggable({
                // 限制范围
                containment : 'parent',
                // 当拖拽的时候做的事情
                drag(event,ui){
                    self.dX = -ui.position.left;
                    self.dY = -ui.position.top;
                }
            });

            // 更改尺寸
            $(self.$refs.cut).resizable({
                // 限制范围
                containment : 'parent',
                // 限制比例为方形
                aspectRatio: 1,
                // 当用户改变尺寸的时候做的事情
                resize(event,ui){
                    console.log(ui.size.width , ui.size.height);
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
    .step3_wrap{
        overflow: hidden;
    }
    .cl{
        clear:both;
    }
    .wrap_img{
        border:1px solid #eee;
        box-sizing:content-box;
        position: relative;
        float:left;

        .mask{
            position: absolute;
            width:100%;
            height:100%;
            top:0;
            left:0;
            background:rgba(0,0,0,.7);
        }

        .cut{
            position: absolute;
            width:100px;
            height:100px;
            top:0;
            left:0;
            border:1px solid white;
            overflow: hidden;
        }
    }
    .preview_box{
        float:left;
        width:150px;
        padding-left:10px;
        
        .da{
            width:140px;
            height:140px;
            border:1px solid #ccc;
            margin-bottom:10px;
            overflow: hidden;
            position: relative;
        }
        .zhong{
            width:100px;
            height:100px;
            border:1px solid #ccc;
            margin-bottom:10px;
            overflow: hidden;
            position: relative;
        }
        .xiao{
            width:60px;
            height:60px;
            border:1px solid #ccc;
            margin-bottom:10px;
            overflow: hidden;
            position: relative;
        }
    }
</style>