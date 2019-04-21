<template>
    <div>
        <div class="avatar_box">
            <img style="border-radius:10%" :width="130" v-if="avatar != ''" :src="'http://127.0.0.1:3000/' + avatar" />
            <span @click="$changeAvatarModel.show()"></span>
        </div>
        
    
        <Form :model="form" ref="theform" :rules="myrules"  :label-width="100">
            <Row>
                <Col :span="12">
                    <FormItem prop="username" label="用户名">
                        <Input v-model="form.username" :disabled="true"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :span="12">
                    <FormItem prop="nickname" label="昵称">
                        <Input v-model="form.nickname" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :span="12">
                    <FormItem prop="sex" label="性别">
                        <RadioGroup  v-model="form.sex">
                            <Radio  label="男"></Radio >
                            <Radio  label="女"></Radio >
                            <Radio  label="">未知</Radio >
                        </RadioGroup >
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :span="12">
                    <FormItem prop="age" label="年龄">
                        <Input type="number" v-model="form.age"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :span="12">
                    <FormItem prop="idcard" label="身份证号">
                        <Input type="text" v-model="form.idcard"></Input>
                    </FormItem>
                </Col>
                <Col :span="12">
                    
                </Col>
            </Row>
            <Row>
                <Col :span="12">
                    <FormItem prop="mobile" label="手机号码">
                        <Input type="text" v-model="form.mobile"></Input>
                    </FormItem>
                </Col>
                <Col :span="12">
                    
                </Col>
            </Row>
            <Row>
                <Col :span="12">
                    <FormItem prop="qq" label="QQ号码">
                        <Input type="text" v-model="form.qq"></Input>
                    </FormItem>
                </Col>
                <Col :span="12">
                    
                </Col>
            </Row>
            <Row>
                <Col :span="12">
                    <FormItem prop="weixin" label="微信">
                        <Input type="text" v-model="form.weixin"></Input>
                    </FormItem>
                </Col>
                <Col :span="12">
                    
                </Col>
            </Row>
            <Row>
                <Col :span="24">
                    <FormItem prop="signature" label="签名">
                        <Input type="text" v-model="form.signature"></Input>
                    </FormItem>
                </Col>
                <Col :span="12">
                    
                </Col>
            </Row>
            <Row>
                <Col :span="24">
                    <FormItem>
                        <Button type="primary" @click="okhandler">确认修改</Button>
                    </FormItem>
                    
                </Col>
                <Col :span="12">
                    
                </Col>
            </Row>
           
        </Form>
    </div>
</template>

<script>
export default {
    created(){
        // 拉取默认数据
        this.$store.dispatch("profile/loadSomeOneProfile",{"username": this.$store.state.me.username})
        console.log(this.$store.state.profile.info)
   },
    data(){
        const info = this.$store.state.profile.info;
        return {
            form : {
                idcard : info.idcard,
                age : info.age,
                signature: info.signature,
                qq: info.qq,
                weixin: info.weixin,
                mobile: info.mobile,
                nickname : info.nickname
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
                ],
                age : [
                    {
                        validator (rule,value,callback){
                            if(value < 10 || value > 100){
                                callback(new Error('请输入10到100的整数'));
                            }else{
                                callback();
                            }
                        },
                        trigger: 'blur' 
                    }
                ],
                nickname : [
                    {
                        validator : (rule,value,callback) => {
                            this.$http.get("/checknickname?nickname=" + value + "&username=" + this.username).then(data=>{
                                if(data.data == "no"){
                                    callback();
                                }else{
                                    callback(new Error('对不起你的名字被占用了，请换一个'));
                                }
                            })
                        },
                        trigger: 'blur' 
                    }
                ]
            }
        }
    },
    methods: {
        updateAvatarBtnHandler(){
            this.$changeAvatarModel.show();
        },
        okhandler(){
            var self = this;
            // 点击提交按钮之后，校验整个表单
            this.$refs.theform.validate().then(data=>{
                // 表单没有错误，提交表单
                if(data){
                    //提交表单
                    this.$http.post("/profile/" + this.$store.state.me.username , this.form).then(data=>{
                        if(data.data.result == 1){
                            self.$changeProfileDrawer.hide();
                            self.$Message.success('修改成功');
                            self.$store.dispatch("me/checkMe");
                        }
                    })
                }
            });
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
        },
        sex(){
            return this.$store.state.profile.info.sex;
        },
        age(){
            return this.$store.state.profile.info.age;
        },
        signature(v){
            return this.$store.state.profile.info.signature;
        },
        qq(v){
            return this.$store.state.profile.info.qq;
        },
        weixin(v){
            return this.$store.state.profile.info.weixin;
        },
        mobile(v){
            return this.$store.state.profile.info.mobile;
        },
        username(v){
            return this.$store.state.profile.info.username;
        },
        nickname(v){
            return this.$store.state.profile.info.nickname;
        } 
    },
    watch: {
        idcard(v){
            this.form.idcard = v;
        },
        sex(v){
            this.form.sex = v;
        },
        age(v){
            this.form.age = Number(v);
        },
        signature(v){
            this.form.signature = v;
        },
        qq(v){
            this.form.qq = v;
        },
        weixin(v){
            this.form.weixin = v;
        },
        mobile(v){
            this.form.mobile = v;
        },
        username(v){
            this.form.username = v;
        } ,
        nickname(v){
            this.form.nickname = v;
        } 
    }
};
</script>

<style lang="less" scoped>
    .avatar_box{
        width:130px;
        height:130px;
        margin:10px auto;
        margin-bottom:30px;
        position: relative;

        img{
            border:1px solid #eee;
        }

        &:hover span{
            display: block;
        }

        span{
            cursor: pointer;
            display: none;
            position: absolute;
            bottom:0;
            right:0;
            width:20px;
            height:20px;
            background:url(/images/pencil.svg);
            background-size:cover;
        }
    }
</style>