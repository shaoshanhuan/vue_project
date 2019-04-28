<template>
    <!-- 一个左浮动的盒子，会自动收紧 -->
    <div style="position:relative;float:left;" >
        <img ref="img" :src="src" :style="{'width':width,'height':height}"/>
        <div ref="spin">
            <Spin  size="large" fix></Spin>
        </div>   
    </div>
</template>

<script>
export default {
    // 这个属性传入的使用要求上层传入px。
    props : ["width","height","src"],
    created(){
        if(!this.height){
            return "auto";
        }
        if(!this.width){
            return "auto";
        }
        console.log("created");
    },
    mounted(){
        this.hhh();
    },
    updated(){
        // Vue有最小量更新，当你换页面的时候，还用的是这个组件本身
        // 所以Vue不会让组件消亡，不走mounted了，而是走updated了。
        this.hhh();
    },
    methods : {
        hhh(){
            // 用DOM方法（不能用state，防止死循环）让loading界面显示和隐藏
            this.$refs.spin.style = "block";

            var img = new Image();
            img.src = this.src;
            var self = this;
            img.onload = function(){
                // 图片加载完毕
                self.$refs.spin.style.display = "none";
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
     
</style>