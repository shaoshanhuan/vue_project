export default {
    install(Vue){
        Vue.prototype.$changeProfileDrawer = new Vue({
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