<template>
    <div>
        <Modal
            :value="$changeAvatarModel.isShow"
            title="更改您的头像"
            @on-ok="ok"
            @on-cancel="cancel"
        >
            <Step1 v-if="step == 1"></Step1>
            <Step2 v-if="step == 2"></Step2>
            <Step3 v-if="step == 3"></Step3>
            
            <div slot="footer">
                <Button @click="cancel">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Step1 from "./Step1.vue";
import Step2 from "./Step2.vue";
import Step3 from "./Step3.vue";

export default {
    data(){
        return {
            step : 1
        }
    },
    methods:{
        ok(){
            this.$changeAvatarModel.hide();

        },
        cancel(){
            this.$changeAvatarModel.hide();
        }
    },
    components:{
        Step1,
        Step2,
        Step3
    }
}
</script>

<style lang="less" scoped>
    h1{
        font-size:100px;
    }
</style>