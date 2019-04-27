export default {
    install(Vue){
        Vue.filter('yiwan', (str)=>{
            return Math.round(str / 10000);
        });
    }
};