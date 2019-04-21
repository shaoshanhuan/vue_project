<template>
    <div>
        <Modal
            :value="$changeAvatarModel.isShow"
            title="更改您的头像"
            @on-cancel="cancel"
            :width="modalWidth"
        >
            <Step1 
                v-if="step == 1" 
                :changeFile="changeFile" 
                :changeStep="changeStep"
            ></Step1>

            <Step2 
                v-if="step == 2" 
                :file="file" 
                :changeStep="changeStep" 
                :changePicname="changePicname" 
                :changePicRealWH="changePicRealWH"
            ></Step2>

            <Step3 
                ref="step3"
                v-if="step == 3" 
                :picname="picname" 
                :picRealWidth="picRealWidth" 
                :picRealHeight="picRealHeight" 
                :changeModalWidth="changeModalWidth"
            ></Step3>
            
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <Button v-show="step == 3" type="primary" @click="okHandler">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';

export default {
    data(){
        return {
            step: 1,
            file: null,
            picname: '',
            picRealWidth: 0,
            picRealHeight: 0,
            modalWidth: 600
        };
    },
    methods:{
        // 改变文件
        changeFile(file){
            this.file = file;
        },
        changeStep(step){
            this.step = step;
        },
        changePicname(picname){
            this.picname = picname;
        },
        changePicRealWH(w, h){
            this.picRealWidth = w;
            this.picRealHeight = h;
        },
        changeModalWidth(w){
            this.modalWidth = w;
        },
        cancel(){
            this.$changeAvatarModel.hide();
            this.step = 1;
            this.file = null;
            this.modalWidth = 600;
        },
        async okHandler(){
            // 得到6个值
            // 切片宽度、高度是相同的
            const cW = Number(this.$refs.step3.cW);
            // 切片的左上角x位置
            const dX = Math.abs(Number(this.$refs.step3.dX));
            // 切片的左上角y位置
            const dY = Math.abs(Number(this.$refs.step3.dY));
            // 原图宽度
            const picRealWidth = Number(this.$refs.step3.picRealWidth);
            // 显示的图片宽度
            const picShowWidth = Number(this.$refs.step3.picShowWidth);
            // 图片的文件名
            const filename = this.$refs.step3.picname;
            

            const {result} = await this.$http.post('/cutavatarandsetavatar', {cW, dX, dY, picRealWidth, picShowWidth, filename}).then(data=>data.data);

            // 关闭对话框
            if(result == 1){
                this.$Message.success('更改成功');
                // 命令me这个store，立即询问数据库，用户的新资料（新资料里面含有用户新头像）
                this.$store.dispatch('me/checkMe');
                //调用cancel
                this.cancel();
            }
        }
    },
    components:{
        Step1,
        Step2,
        Step3
    }
};
</script>

<style lang="less" scoped>
    h1{
        font-size:100px;
    }
</style>