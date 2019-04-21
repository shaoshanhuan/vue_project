<template>
    <div>
        <Row>
            <Col :span="8">
                <input type="file" hidden ref="file" @change="changeHandler">
                <Button type="primary" @click="chooseImageBtnHandler">选择计算机中的图片...</Button>
            </Col>
            <Col :span="24 - 8">
                <h3>注意事项</h3>
                <p>
                    1) 上传图片要小于200kb
                </p>
                <p>
                    2) 仅支持jpg、png图片格式上传
                </p>
                <p>
                    3) 图片最小宽度、高度是100px；最大宽度、高度为1500px
                </p>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props : ['changeFile', 'changeStep'],
    methods:{
        chooseImageBtnHandler(){
            // 模拟鼠标事件对象
            const evt = document.createEvent('MouseEvents');
            // 初始化
            evt.initMouseEvent('click', false, false);
            // 派遣事件
            this.$refs.file.dispatchEvent(evt);
        },
        changeHandler(e){
            // 这里面干嘛？？
            // 这里产出一个file文件对象，这个组件不负责上传，而是交给step2上传
            // 调用父亲的函数
            this.changeFile(e.target.files[0]);
            // 改为第2个组件登场
            this.changeStep(2);
        }
    }
};
</script>

<style lang="less" scoped>

</style>