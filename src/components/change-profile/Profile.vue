<template>
    <div>
        <img style="border-radius:50%" :width="130" v-if="avatar != ''" :src="'http://127.0.0.1:3000/' + avatar" />
        <Button @click="updateAvatarBtnHandler">修改头像</Button>
    
        <Form :model="form" ref="formInline" :rules="myrules">
            <FormItem prop="idcard" label="身份证号码">
                <Input type="text" v-model="form.idcard"></Input>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    created(){
        console.log("★",this.$store.state.me.username);
        // 拉取默认数据
        this.$store.dispatch("profile/loadSomeOneProfile",{"username": this.$store.state.me.username})
    },
    data(){
        return {
            form : {
                idcard : ""
            },
            myrules : {
                idcard : [
                    {
                        required: true, 
                        message: '必须填写身份证号码', 
                        trigger: 'blur' 
                    },
                    {
                        type: "string",
                        pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                        message: '不合法的身份证号码',
                        trigger: 'blur' 
                    }
                ]
            }
        }
    },
    methods: {
        updateAvatarBtnHandler(){
            this.$changeAvatarModel.show();
        }
    },
    computed: {
        nickname(){
            return this.$store.state.me.nickname;
        },
        avatar(){
            return this.$store.state.me.avatar;
        },
        // 过继一下
        idcard(){
            return this.$store.state.profile.info.idcard;
        }
    },
    watch: {
        idcard(v){
            this.form.idcard = v;
        }
    }
};
</script>

<style lang="ess" scoped>

</style>