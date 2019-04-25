<template>
    <div class="header_wrap">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="$store.state.routerStore.column" @on-select="selectMenuHandler">
                    <div class="layout-logo">
                        <img src="images/logo.png" />
                    </div>
                    <div class="user_zone">
                        <Poptip trigger="click">
                            <Avatar v-if="avatar != ''" :src="'http://127.0.0.1:3000/' + avatar" />
                            <span>
                                {{nickname}}
                            </span>
                            <ul slot="content">
                                <li>
                                    <a href="javascript:;" @click="showModel">更改头像</a>
                                </li>
                                <li>
                                    <a href="javascript:;" @click="showDrawer">我的信息</a>
                                </li>
                                <li>
                                    <a href="">充值</a>
                                </li>
                                <li>
                                    <a href="">站内信</a>
                                </li>
                                <li>
                                    <a href="">退出登陆</a>
                                </li>
                            </ul>
                        </Poptip>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <Icon type="ios-navigate"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="court">
                            <Icon type="ios-keypad"></Icon>
                            球场
                        </MenuItem>
                        <MenuItem name="match">
                            <Icon type="ios-analytics"></Icon>
                            赛事
                        </MenuItem>
                        <MenuItem name="schedule">
                            <Icon type="ios-analytics"></Icon>
                            日程
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <router-view></router-view>
            <Footer class="layout-footer-center">
                2019-2019 &copy; 考拉软件
            </Footer>
        </Layout>
    </div>
</template>

<script>
export default {
    computed: {
        nickname(){
            return this.$store.state.me.nickname;
        },
        avatar(){
            return this.$store.state.me.avatar;
        }
    },
    // 这里面定义方法
    methods:{
        showModel(){
            this.$changeAvatarModel.show();
        },
        showDrawer(){
            this.$changeProfileDrawer.show();
        },
        selectMenuHandler(name){
            this.$router.push({'name': name});
        }
    }
};
</script>

<style lang="less">
    .header_wrap{
        min-width:1100px;
    }
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover{
        background:gold;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .ivu-layout-header{
        background:-webkit-linear-gradient(left, #146d54, #20a75e 20%, #064f52);
        .ivu-menu-dark{
            background:none;
        }
    }
    .layout-logo{
        width: 300px;
        height: 30px;
        
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
        img{
            width:100%;
        }
    }
    .layout-nav{
        width: 420px;
        float:right;
    }
    .user_zone{
        float:right;
        width:120px;
        cursor: pointer;

        span{
            color:white;
        }
        .ivu-poptip-body{
            padding:2px;
        }
        ul{
            list-style:none;

            li{
                font-size:16px;
                line-height: 24px;
                border-bottom:1px dotted #eee;
                padding:10px 6px;
                a{
                    color:#333;
                    display: block;
                    height:30px;
                    line-height: 30px;
                    &:hover{
                        background:#eee;
                    }
                }
            }
        }
        
    }
    .layout-footer-center{
        text-align: center;
    }
</style>