export default {
    namespaced: true,
    state: {
        column: '',
        columnChinese : '',
        subcolumn: '',
        subcolumnChinese : ''
    },
    mutations: {
        changeRouter(state,{column,columnChinese,subcolumn,subcolumnChinese}){
            state.column = column || subcolumn;
            state.columnChinese = columnChinese || subcolumnChinese;
            state.subcolumn = subcolumn;
            state.subcolumnChinese = subcolumnChinese;
            console.log("我是routerStore",state);
        }
    }
}