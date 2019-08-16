<template>
    <div class="screenDetailList">
        <van-popup position="right" class="screenDialog" v-model="show" @close="close">
            <div class="row screenSearch"><input class="expandScreenInput" v-model="logisticsCode"
                                                 placeholder="请输入物流码名称查询" v-on:keyup.13="searchLogisticsCodeClick"/>
                <i class="icon iconfont iconweibiaoti--2"></i>
            </div>
            <expandInput v-model="scanOutDistributor" :currentValue="scanOutDistributor" title="出库经销商"></expandInput>
            <!--<expandSelect v-model="scanOutDistributor" :currentValue="scanOutDistributor" title="出库经销商" showTitle="war_name"-->
            <!--showValue="war_code"-->
            <!--:list="warBelongList"></expandSelect>-->
            <expandSelect v-model="scanOutWar" :currentValue="scanOutWar" title="出库战区" showTitle="war_name"
                          showValue="war_code"
                          :list="warBelongList"></expandSelect>
            <expandSelect v-model="isWarCheck" :currentValue="isWarCheck" title="是否核查" showTitle="name" showValue="id"
                          :list="isWarCheckList"></expandSelect>
            <expandSelect v-model="isSupervise" :currentValue="isSupervise" title="督导状态" showTitle="name"
                          showValue="id"
                          :list="isSuperviseList"></expandSelect>
            <div v-if="loadingStatus" class="loading">
                <van-loading vertical>加载中</van-loading>
            </div>
            <div class="row screenButton">
                <span class="button reset" @click="resetClick()">
                    重置
                </span>
                <span class="button confirm" @click="confirmClick()">
                    确定
                </span>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import expandSelect from '../../common/expandSelect'
    import expandInput from '../../common/expandInput'
    import {Toast} from 'vant';

    export default {
        props: ['searchUseData'],
        mounted() {
            this.loadingShow();
            this.$http.post("/api/ddadapter/openApi/data", {
                    "code": "00711ZI03",
                    "data": {
                        userid: sessionStorage.userid
                    }
                }, {
                    headers: {
                        'content-type': 'application/json',
                    },
                }
            ).then((res) => {
                let searchUseData = JSON.parse(JSON.stringify(this.searchUseData));
                this.warBelongList = res.data.data;
                this.isWarCheck = searchUseData.isWarCheck;
                this.isSupervise = searchUseData.isSupervise;
                this.scanOutWar = searchUseData.scanOutWar;
                this.scanOutDistributor = searchUseData.scanOutDistributor;
                this.logisticsCode = searchUseData.logisticsCode;
                this.loadingCancel();
            }).catch((err) => {
                this.loadingCancel();
            });
        },
        components: {
            expandSelect,
            expandInput
        },
        data: function () {
            return {
                loadingStatus: false,
                show: true,
                logisticsCode: '',
                scanOutDistributor: '',
                scanOutWar: '',
                isWarCheck: '',
                isSupervise: '',
                warBelongList: [],
                isWarCheckList: [
                    {
                        id: '2',
                        name: '是'
                    },
                    {
                        id: '1',
                        name: '否'
                    }
                ],
                isSuperviseList: [
                    {
                        id: '2',
                        name: '是'
                    },
                    {
                        id: '1',
                        name: '否'
                    }
                ],
            }
        },
        methods: {
            loadingShow: function () {
                this.loadingStatus = true;
            },
            loadingCancel: function () {
                this.loadingStatus = false;
            },
            close: function () {
                this.$emit('input', false);
            },
            searchLogisticsCodeClick() {
                this.$parent.screenDataSearch({
                    'logisticsCode': this.logisticsCode,
                });
            },
            resetClick() {
                this.scanOutWar = '';
                this.isWarCheck = '';
                this.isSupervise = '';
                this.scanOutDistributor = '';
                this.logisticsCode = '';
            },
            confirmClick() {
                this.$parent.screenDataSearch({
                    'scanOutDistributor': this.scanOutDistributor,
                    'scanOutWar': this.scanOutWar,
                    'isWarCheck': this.isWarCheck,
                    'isSupervise': this.isSupervise
                });
                this.close();
            },
        }
    }
</script>
<style>
    .screenDetailList .screenDialog {
        height: 100%;
        width: 82%;
        padding: 0.18rem 0.16rem;
    }

    .loading .van-loading {
        margin-top: 2rem;
    }

    .loading .van-loading .van-loading__text {
        color: #ffffff;
    }

    .loading .van-loading .van-loading__spinner--circular {
        color: #ffffff !important;
    }
</style>