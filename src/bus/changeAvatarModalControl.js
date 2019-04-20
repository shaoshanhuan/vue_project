export default {
    install(Vue){
        Vue.prototype.$changeAvatarModel = new Vue({
            data: {
                isShow: false
            },
            methods: {
                show(){
                    this.isShow = true;
                },
                hide(){
                    this.isShow = false;
                }
            }
        });
    }
};