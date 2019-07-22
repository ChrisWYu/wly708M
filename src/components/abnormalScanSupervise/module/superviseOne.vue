<template>
    <van-dialog
            class="checkDialog"
            v-model="show"
            title="督导"
            :before-close="beforeClose"
            show-cancel-button
            @cancel="close"
            @confirm="confirm"
            confirmButtonText="提交"
            confirmButtonColor="#F13D3D"
    >
        <expandDateSelect style="margin: 0 0.16rem;" v-model="date" :currentValue="date" title="日期"
        ></expandDateSelect>
        <expandTextarea style="margin: 0 0.16rem;" v-model="handleResult" :currentValue="handleResult" title="处理结果"
        ></expandTextarea>
    </van-dialog>
    <!--<van-popup position="right" class="checkDialog" v-model="show" @close="close">-->
    <!--<div>-->
    <!--<p>处理结果</p>-->
    <!--<textarea>-->

    <!--</textarea>-->
    <!--</div>-->
    <!--<div class="row submitButton" @click="submitClick()">-->
    <!--提交-->
    <!--</div>-->
    <!--</van-popup>-->
</template>

<script>
    import expandDateSelect from '../../common/expandDateSelect'
    import expandTextarea from '../../common/expandTextarea'
    import {Toast} from 'vant';

    export default {
        props: ['currentData'],
        mounted() {

        },
        components: {
            expandDateSelect,
            expandTextarea
        },
        data: function () {
            return {
                show: true,
                date: '',
                handleResult: ''
            }
        },
        methods: {
            messagePrompt: function (way, info) {
                this.loadingCancel();
                Toast[way]({message: info, duration: 1500});
                if (way === 'success') {
                    this.close();
                }
            },
            loadingShow: function () {
                this.loadingStatus = true;
            },
            loadingCancel: function () {
                this.loadingStatus = false;
            },
            submitClick: function () {

            },
            beforeClose(action, done) {
                if (action === 'confirm') {
                    if (this.date === '') {
                        Toast['fail']({message: '日期不能为空', duration: 1500});
                        done(false);
                    } else if (this.handleResult === '') {
                        Toast['fail']({message: '处理结果不能为空', duration: 1500});
                        done(false);
                    } else {
                        this.confirm(true);
                        done();
                    }
                } else {
                    done();
                }
            },
            close() {
                this.$emit('input', false);
            },
            confirm(isContinue) {
                if (!isContinue) {
                    return false;
                }
                this.loadingShow();
                let data = {
                    'retvemo': this.handleResult,
                    'datetime': this.date,
                    'codeIds': [this.currentData.id]
                };
                this.$http.post("/api/ddadapter/openApi/data", {
                        "code": "00711ZI10",
                        "data": data
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                ).then(res => {
                    let way = Number(res.data.statusCode) === 200 ? 'success' : 'fail';
                    this.messagePrompt(way, res.data.message)
                }, error => {
                    this.loadingCancel();
                    this.messagePrompt('error', '服务器错误！');
                });
            }
        },
    }
</script>
<style>
    /*.checkDialog {*/
    /*height: 100%;*/
    /*width: 100%;*/
    /*padding: 0.43rem 0;*/
    /*background-color: #F2F3F5;*/
    /*}*/

    /*.checkDialog p {*/
    /*margin-left: 0.16rem;*/
    /*}*/

    /*.checkDialog textarea {*/
    /*width: 100%;*/
    /*border: none;*/
    /*outline: none;*/
    /*padding: 0.07rem 0.16rem;*/
    /*height: 1.41rem;*/
    /*margin-top: 0.16rem;*/
    /*}*/
</style>