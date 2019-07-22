<template>
    <div>
        <div class="row topSearch"><input class="expandInput" v-model="searchData.distributor"
                                          placeholder="请输入经销商名字查询" v-on:keyup.13="searchDataClick"/>
            <i class="icon iconfont iconweibiaoti--2"></i>
        </div>
        <div class="row screen">
            <i class="icon iconfont iconselect"></i>
            <span class="detail" @click="screenDataClick">筛选</span>
        </div>
        <div class="bodyContent">
            <van-list v-if="tableData.length > 0"
                      id="van-list"
                      v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
            >
                <div class="listContent" v-for="(item,index) in tableData" :key="index" @click="handleClick(item)">
                    <div class="row">
                        <span class="statusTitle">
                            核查状态：{{item.checkStatus}}
                        </span>
                        <span class="statusTitle Right">
                            督导状态：{{item.superviseStatus}}
                        </span>
                    </div>
                    <hr class="solidHr"/>
                    <div class="listLabel">
                        <div class="labelTitle">{{item.distributor}}</div>
                        <p class="labelContent">异常扫码数：{{totalAbnormalStatusTotal(item)}}</p>
                        <p class="labelContent">所属战区：{{item.warBelong}}</p>
                        <p class="labelContent">截止时间：{{item.checkEndTime}}</p>
                    </div>
                </div>
            </van-list>
            <div v-if="tableData.length === 0" class="emptyList">
                暂无数据～
            </div>
        </div>
        <screenList v-if="screenShow" v-model="screenShow" :searchUseData="searchUseData"></screenList>
    </div>
</template>

<script>
    import screenList from './module/screenList'
    import {EventUtil} from '../../assets/lib/util'

    export default {
        components: {
            screenList
        },
        data() {
            return {
                loading: false,
                finished: false,
                screenShow: false,
                searchData: {
                    distributor: '',
                    checkStatus: '',
                    superviseStatus: '',
                    warBelong: '',
                    endDate: '',
                    warCheck: '',
                    warOperatorValue: '',
                    superviseChargeValue: '',
                },
                searchUseData: {
                    distributor: '',
                    checkStatus: '',
                    superviseStatus: '',
                    warBelong: '',
                    endDate: '',
                    warCheck: '',
                    warOperatorValue: '',
                    superviseChargeValue: '',
                },
                tableData: [],
                tableTotal: '',
                currentPage: 1,
                pageSize: 10,
                scrollY: '',
                timer:{},
            }
        },
        computed: {
            userLevel: function () {
                return sessionStorage.roleid;
            },
        },
        created: function () {
            // EventUtil.add(document.querySelector('.van-list'), 'scroll', this.windowScroll);
            let searchUseData = this.$store.state['abnormalScanSuperviseList'].searchUseData;
            for (let ke in searchUseData) {
                this.searchUseData[ke] = searchUseData[ke];
            }
            let searchData = this.$store.state['abnormalScanSuperviseList'].searchData;
            for (let key in searchData) {
                this.searchData[key] = searchData[key];
            }
            if (this.userLevel != 'D' && this.userLevel != 'DE' && this.userLevel != 'X') {
                this.searchData.warCheck = sessionStorage.warcode;
                this.searchUseData.warCheck = sessionStorage.warcode;
            }
            if (this.userLevel == 'B' || this.userLevel == 'E' || this.userLevel == 'WE' || this.userLevel == 'KE' || this.userLevel == 'TE') {
                this.searchData.warOperatorValue = sessionStorage.userid;
                this.searchUseData.warOperatorValue = sessionStorage.userid;
            }
            if (this.userLevel == 'DE') {
                this.searchData.superviseChargeValue = sessionStorage.userid;
                this.searchUseData.superviseChargeValue = sessionStorage.userid;
            }
            // setTimeout(()=> {
            //     // for (let key in searchData) {
            //     //     _this.searchData[key] = searchData[key];
            //     // }
            //     this.scrollToHistory(scrollY);
            //     // _this.loadingCancel();
            // }, 2000);

            this.getFirstList(true);
        },
        mounted: function () {

        },
        methods: {
            scrollToHistory: function () {
                let scrollY = this.$store.state['abnormalScanSuperviseList'].scrollY;
                let offsetHeight = document.getElementsByClassName("listContent")[0].offsetHeight;
                let num = Math.floor(scrollY/offsetHeight);
                document.getElementsByClassName("listContent")[num].scrollIntoView();
            },
            renderTableCheck() {
                let render_content = document.getElementsByClassName('listContent').length;
                if (render_content) {
                    this.scrollToHistory();
                    clearTimeout(this.timer);
                    // this.loadingCancel();
                } else {
                    this.timer = setTimeout(this.renderTableCheck, 100);
                }
            },
            windowScroll: function () {
                if (document.querySelector('.van-list').pageXOffset) {
                    this.scrollInfo = {
                        x: document.querySelector('.van-list').pageXOffset,
                        y: document.querySelector('.van-list').pageYOffset
                    }
                } else {
                    this.scrollInfo = {
                        x: document.querySelector('.van-list').body.scrollLeft + document.querySelector('.van-list').documentElement.scrollLeft,
                        y: document.querySelector('.van-list').body.scrollTop + document.querySelector('.van-list').documentElement.scrollTop
                    }
                }
            },
            totalAbnormalStatusTotal(e) {
                return e.codeA + e.codeB + e.codeC + e.codeD;
            },
            handleClick: function (row) {
                this.scrollHeight();
                this.$router.push(
                    {
                        name: 'abnormalScanSuperviseList/listDetail',
                        params: {
                            id: row.id
                        }
                    }
                );
            },
            searchDataClick: function () {
                this.searchUseData = JSON.parse(JSON.stringify(this.searchData));
                this.getFirstList();
            },
            screenDataClick: function () {
                this.screenShow = !this.screenShow;
            },
            screenDataSearch(searchData) {
                for (let key in searchData) {
                    this.searchUseData[key] = searchData[key];
                    this.searchData[key] = searchData[key];
                }
                this.getFirstList();
            },
            scrollTop() {
                if (document.getElementById("van-list")) {
                    document.getElementById("van-list").scrollIntoView();
                }
            },
            scrollHeight() {
                this.scrollY = document.getElementsByClassName('bodyContent')[0].scrollTop;
            },
            getFirstList() {
                let is_scroll =  arguments[0];
                let table_history_data =  JSON.parse(JSON.stringify(this.$store.state['abnormalScanSuperviseList'].tableData));
                if(table_history_data.length>0 && is_scroll){
                    let table_history_total =  JSON.parse(JSON.stringify(this.$store.state['abnormalScanSuperviseList'].tableTotal));
                    this.tableData = table_history_data;
                    this.tableTotal = table_history_total;
                    this.timer = setTimeout(this.renderTableCheck, 100);
                }else{
                    this.getList().then((res) => {
                        this.tableData = res.data.data.list;
                        this.tableTotal = res.data.data.total;
                    });
                }

            },
            getBottomMoreList() {
                this.getList().then((res) => {
                    let current = JSON.parse(JSON.stringify(this.tableData));
                    this.tableData = current.concat(res.data.data.list);
                    this.loading = false;
                });
            },
            getList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI01",
                        "data": {
                            //当前页数
                            currentPage: this.currentPage,
                            //每页条数
                            pageSize: this.pageSize,
                            //核查情况
                            checkStatus: this.searchUseData.checkStatus,
                            //督导情况
                            superviseStatus: this.searchUseData.superviseStatus,
                            //所属战区
                            warBelong: this.searchUseData.warBelong,
                            //经销商
                            distributor: this.searchUseData.distributor,
                            //截止日期
                            checkEndTime: this.searchUseData.endDate,

                            //核查战区
                            warCheck: this.searchUseData.warCheck,
                            //战区负责人
                            warCharge: '',
                            //战区执行人
                            warOperator: this.searchUseData.warOperatorValue,
                            //督导负责人
                            superviseCharge: this.searchUseData.superviseChargeValue,
                            //异常大类
                            abnormalLargeCategory: '',
                            //异常小类
                            abnormalSmallCategory: '',
                            //创建日期
                            createDate: [],
                            //分派日期
                            checkStartTime: [],
                            //用户id
                            userid: sessionStorage.userid
                        }
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                );
            },
            onLoad() {
                setTimeout(() => {
                    let currentPage = this.currentPage;
                    let tableTotal = this.tableTotal;
                    let pageSize = this.pageSize;
                    let max = Math.ceil(tableTotal / pageSize);
                    if (currentPage >= max) {
                        this.loading = false;
                        this.finished = true;
                    } else {
                        this.currentPage = currentPage + 1;
                        this.getBottomMoreList();
                    }
                }, 500);
            },
        },
        beforeDestroy() {
            // this.$store.commit('saveSearchData', this.searchData);
            // this.$store.commit('saveSearchUseData', this.searchUseData);
            this.$store.commit('scrollToY', {module: 'abnormalScanSuperviseList', scrollY: this.scrollY});
            this.$store.commit('saveTableData', {module: 'abnormalScanSuperviseList', tableData: this.tableData});
            this.$store.commit('saveTableTotal', {module: 'abnormalScanSuperviseList', tableTotal: this.tableTotal});
            this.$store.commit('saveSearchData', {module: 'abnormalScanSuperviseList', tableTotal: this.searchData});
            this.$store.commit('saveSearchUseData',{module: 'abnormalScanSuperviseList', tableTotal: this.searchUseData});
            this.$store.commit('changeCurrentPage',{module: 'abnormalScanSuperviseList', tableTotal: this.currentPage});
            EventUtil.remove(window, 'scroll', this.windowScroll);
        },
    }
</script>
<style>

</style>