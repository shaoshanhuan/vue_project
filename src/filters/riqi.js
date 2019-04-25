import moment from 'moment';
export default {
    install(Vue){
        Vue.filter('riqi', (str, formateConfig)=>{
            return moment(str).format(formateConfig);
        });
    }
}