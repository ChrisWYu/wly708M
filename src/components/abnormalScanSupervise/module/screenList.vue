<template>
    <div>
        <van-popup position="right" class="screenDialog" v-model="show" @close="close">
            <expandSelect v-model="warBelong" :currentValue="warBelong" title="所属战区" showTitle="war_name"
                          showValue="war_code"
                          :list="warBelongList"></expandSelect>
            <expandSelect v-model="checkStatus" :currentValue="checkStatus" title="核查状态" showTitle="name" showValue="id"
                          :list="checkStatusList"></expandSelect>
            <expandSelect v-model="superviseStatus" :currentValue="superviseStatus" title="督导状态" showTitle="name"
                          showValue="id"
                          :list="superviseStatusList"></expandSelect>
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
    import {Toast} from 'vant';

    export default {
        props: ['searchUseData'],
        mounted() {
            // Toast.loading({
            //     getContainer:'body',
            //     mask: true,
            //     message: '加载中...'
            // });
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
                let searchUseData =JSON.parse(JSON.stringify(this.searchUseData));
                this.warBelongList = res.data.data;
                this.warBelong = searchUseData.warBelong;
                this.checkStatus = searchUseData.checkStatus;
                this.superviseStatus = searchUseData.superviseStatus;
                this.loadingCancel();
            }).catch((err) => {
                console.log(err);
                this.loadingCancel();
            });
        },
        components: {
            expandSelect,
        },
        data: function () {
            return {
                loadingStatus: false,
                show: true,
                warBelong: '',
                checkStatus: '',
                superviseStatus: '',
                warBelongList: [],
                checkStatusList: [
                    {
                        id: '1',
                        name: '待督导分派'
                    },
                    {
                        id: '2',
                        name: '待战区分派'
                    },
                    {
                        id: '3',
                        name: '执行中'
                    },
                    {
                        id: '4',
                        name: '部分核查'
                    },
                    {
                        id: '5',
                        name: '全部核查'
                    },
                    {
                        id: '6',
                        name: '未完成'
                    }
                ],
                superviseStatusList: [
                    {
                        id: '1',
                        name: '未反馈',
                    },
                    {
                        id: '2',
                        name: '部分反馈',
                    },
                    {
                        id: '3',
                        name: '全部反馈',
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
            resetClick() {
                this.warBelong = '';
                this.checkStatus = '';
                this.superviseStatus = '';
            },
            confirmClick() {
                this.$parent.screenDataSearch({
                    'warBelong': this.warBelong,
                    'checkStatus': this.checkStatus,
                    'superviseStatus': this.superviseStatus
                });
                this.close();
            }
        }
    }
</script>
<style>
    .screenDialog {
        height: 100%;
        width: 82%;
        padding: 0.43rem 0.16rem;
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