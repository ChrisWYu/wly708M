import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    pageSizes: [10, 15, 20, 25],
    abnormalScanSuperviseList: {
        pageSize: 10,
        currentPage: 1,
        searchData: {},
        searchUseData: {},
        scrollY: 0,
        operateRow: {},
        tableData: [],
        tableTotal: '',
    },
}

// 定义所需的 mutations
const mutations = {
    changePageSize(state, params) {
        let pageSize = params.pageSize;
        let module = params.module;
        state[module].pageSize = pageSize;
    },
    changeCurrentPage(state, params) {
        let currentPage = params.currentPage;
        let module = params.module;
        state[module].currentPage = currentPage;
    },
    scrollToY(state, params) {
        let scrollY = params.scrollY;
        let module = params.module;
        state[module].scrollY = scrollY;
    },
    saveTableData(state, params) {
        let tableData = params.tableData;
        let module = params.module;
        state[module].tableData = tableData;
    },
    saveTableTotal(state, params) {
        let tableTotal = params.tableTotal;
        let module = params.module;
        state[module].tableTotal = tableTotal;
    },
    saveSearchData(state, params) {
        state[params.module].searchData = params;
    },
    saveSearchUseData(state, params) {
        state[params.module].searchUseData = params;
    },
    saveOperateRow(state, params) {
        let module = params.module;
        state[module].operateRow = params.operateRow;
    },
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})