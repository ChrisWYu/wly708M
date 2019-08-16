<template>
    <div>
        <div class="topContent">
            <div class="row" style="white-space: nowrap;">
                码源经销商：{{operateRow.distributor}}
            </div>
            <div class="row">
                码源战区：{{operateRow.warBelong}}
            </div>
            <div class="row">
                异常扫码日期：{{operateRow.createDate}}
            </div>
        </div>
        <!--<div class="row topSearch"><input class="expandInput" v-model="searchData.logisticsCode"-->
        <!--placeholder="请输入物流码名称查询" v-on:keyup.13="searchDataClick"/>-->
        <!--<i class="icon iconfont iconweibiaoti&#45;&#45;2"></i>-->
        <!--</div>-->
        <!--<div class="row screen">-->
        <!--<i class="icon iconfont iconselect"></i>-->
        <!--<span class="detail" @click="screenDataClick">筛选</span>-->
        <!--</div>-->
        <div class="bodyContent hasFooter">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                        v-if="tableData.length > 0"
                        id="van-list"
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="listContent" v-for="item in tableData" :key="item.id">
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
                            <div class="labelTitle">物流码：{{item.logisticsCode}}</div>
                            <p class="labelContent">异常大类：{{item.abnormalLargeCategory}}</p>
                            <p class="labelContent">异常明细：{{item.abnormalSmallCategory}}</p>
                            <p class="labelContent">终端名称：{{item.storeName}}</p>
                            <p class="labelContent">终端战区：{{item.storeWar}}</p>
                            <p class="labelContent">终端扫码时间：{{item.storeInTime}}</p>
                            <p class="labelContent">码源渠道：{{item.codeSourceChannel}}</p>
                            <p class="labelContent">扫码出库经销商：{{item.scanOutDistributor}}</p>
                            <p class="labelContent">扫码出库战区：{{item.scanOutWar}}</p>
                            <p class="labelContent">扫码出库渠道：{{item.scanOutChannel}}</p>
                            <p class="labelContent">扫码出库时间：{{item.scanOutTime}}</p>
                            <p class="labelContent">经销商入库时间：{{item.distributorInTime}}</p>
                            <p class="labelContent">战区核查执行人：{{item.warOperator}}</p>
                            <p class="labelContent">战区核查时间：{{item.warCheckTime}}</p>
                            <p class="labelContent">战区核查结果：{{item.warCheckResult}}</p>
                            <p class="labelContent">督导负责人：{{item.superviseCharge}}</p>
                            <p class="labelContent">督导时间：{{item.superviseTime}}</p>
                            <p class="labelContent">督导结果：{{item.superviseResult}}</p>
                            <div class="row" style="text-align: right;margin-top:0.1rem;">
                                <div v-if="buttonControl.checkShow" class="cusButton cusRed" @click="checkClick(item)">
                                    核查
                                </div>
                                <!--<div v-if="true" class="cusButton cusRed" @click="checkClick(item)">核查-->
                                <!--</div>-->
                                <div v-if="buttonControl.superviseShow" class="cusButton cusRed"
                                     @click="superviseClick(item)">督导
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
            <div v-if="tableData.length === 0" class="emptyList">
                暂无数据～
            </div>
        </div>
        <div class="footerOperate">
            <div class="submitLargeButton" @click="submitDetailList">提交</div>
        </div>
        <screenDetailList v-if="screenShow" v-model="screenShow" :searchUseData="searchUseData"></screenDetailList>
        <checkOne v-if="checkOneShow" v-model="checkOneShow" :currentData="currentData"></checkOne>
        <superviseOne v-if="superviseOneShow" v-model="superviseOneShow" :currentData="currentData"></superviseOne>
    </div>
</template>

<script>
    import screenDetailList from './screenDetailList'
    import checkOne from './checkOne'
    import superviseOne from './superviseOne'
    import {powerControlLib} from '../../../assets/lib/powerControl'

    export default {
        mounted() {
            let _this = this;
            this.operateRow = _this.$store.state['abnormalScanSuperviseList'].operateRow;
            dd.biz.navigation.setRight({
                show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                text: '筛选',//控制显示文本，空字符串表示显示默认文本
                onSuccess: function (result) {
                    _this.screenDataClick();
                },
                onFail: function (err) {
                }
            });
            this.buttonControl = powerControlLib(this.userLevel, 'abnormalScanSuperviseList');
            this.getFirstList();
        },
        components: {
            screenDetailList,
            checkOne,
            superviseOne
        },
        data: function () {
            return {
                isLoading: false,
                loading: false,
                finished: false,
                screenShow: false,
                checkOneShow: false,
                superviseOneShow: false,
                tableData: [],
                tableTotal: '',
                currentPage: 1,
                pageSize: 10,
                operateRow: {},
                currentData: {},
                searchData: {
                    logisticsCode: '',
                    abnormalLargeCategory: '',
                    abnormalSmallCategory: '',
                    isWarCheck: '',
                    isSupervise: '',
                    scanOutDistributor: '',
                    scanOutWar: '',
                    scanOutChannel: ''
                },
                searchUseData: {
                    logisticsCode: '',
                    abnormalLargeCategory: '',
                    abnormalSmallCategory: '',
                    isWarCheck: '',
                    isSupervise: '',
                    scanOutDistributor: '',
                    scanOutWar: '',
                    scanOutChannel: ''
                },
                buttonControl: {},
            }
        },
        computed: {
            expDistributorId: function () {
                return this.$route.params.id;
            },
            userLevel: function () {
                return sessionStorage.roleid;
            },
        },
        methods: {
            onRefresh() {
                this.getFirstList();
                this.isLoading = false;
            },
            backToLast: function () {
                this.$router.push({
                    name: 'abnormalScanSuperviseList'
                });
            },
            checkClick: function (row) {
                this.currentData = row;
                this.checkOneShow = !this.checkOneShow;
            },
            superviseClick: function (row) {
                this.currentData = row;
                this.superviseOneShow = !this.superviseOneShow;
            },
            screenDataClick: function () {
                this.screenShow = !this.screenShow;
            },
            getFirstList() {
                this.getList().then((res) => {
                    this.tableData = res.data.data.list;
                    this.tableTotal = res.data.data.total;
                });
            },
            getBottomMoreList() {
                this.getList().then((res) => {
                    let current = JSON.parse(JSON.stringify(this.tableData));
                    this.tableData = current.concat(res.data.data.list);
                    this.loading = false;
                });
            },
            searchDataClick: function () {
                this.searchUseData = JSON.parse(JSON.stringify(this.searchData));
                this.getFirstList();
            },
            screenDataSearch(searchSendData) {
                // let searchUseData = JSON.parse(JSON.stringify(this.searchUseData));
                // let searchData = JSON.parse(JSON.stringify(this.searchData));
                // for (let key in searchSendData) {
                //     searchUseData[key] = searchSendData[key];
                //     searchData[key] = searchSendData[key];
                // }
                // this.searchUseData = searchUseData;
                // this.searchData = searchData;
                for (let key in searchSendData) {
                    this.searchUseData[key] = searchSendData[key];
                    this.searchData[key] = searchSendData[key];
                }
                this.getFirstList();
            },
            getList: function () {
                return this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI02",
                        "data": {
                            //当前页数
                            currentPage: this.currentPage,
                            //每页条数
                            pageSize: this.pageSize,
                            //物流码
                            logisticsCode: this.searchUseData.logisticsCode,
                            //异常大类
                            abnormalLargeCategory: this.searchUseData.abnormalLargeCategory,
                            //异常明细
                            abnormalSmallCategory: this.searchUseData.abnormalSmallCategory,
                            //战区是否核查
                            isWarCheck: this.searchUseData.isWarCheck,
                            //是否督导
                            isSupervise: this.searchUseData.isSupervise,
                            //扫码出库经销商
                            scanOutDistributor: this.searchUseData.scanOutDistributor,
                            //扫码出库战区
                            scanOutWar: this.searchUseData.scanOutWar,
                            //扫码出库渠道
                            scanOutChannel: this.searchUseData.scanOutChannel,
                            //异常扫码内容id
                            expDistributorId: this.expDistributorId
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
            submitDetailList() {
                this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI11",
                        "data": {
                            'expDistributorId': this.$route.params.id,
                            'roleid': sessionStorage.getItem("roleid")
                        }
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                ).then(res => {
                    this.backToLast();
                }, error => {
                    this.backToLast();
                });
            }
        }
    }
</script>
<style>

</style>