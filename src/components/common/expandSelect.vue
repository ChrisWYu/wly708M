<template>
    <div>
        <div class="row expandSelect" :class="{ empty: isEmpty }" @click="selectPickerClick">
            <div class="title">
                {{title}}
            </div>
            <div class="content">
                {{isEmpty ?'请选择': text}}
            </div>
            <i class="icon iconfont iconwuliangyeicon-2"></i>
        </div>
        <div class="loading" v-if="selectPickerShow">
            <van-picker show-toolbar class="selectPicker" :columns="showData" @cancel="onCancel"
                        @confirm="onConfirm"/>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            title: {
                type: String
            },
            showTitle: {
                type: String
            },
            showValue: {
                type: String
            },
            list: {
                type: Array,
                default() {
                    return [];
                }
            },
            currentValue: {
                type: String
            }
        },
        mounted() {
            this.listHandle();
        },
        computed: {
            isEmpty: function () {
                return this.text === ''
            }
        },
        watch: {
            list: function () {
                this.listHandle();
            },
            currentValue: function () {
                if (this.currentValue === '') {
                    this.text = ''
                } else {
                    this.listHandle();
                }
            }
        },
        components: {},
        data: function () {
            return {
                selectPickerShow: false,
                //禁止滚动参数
                prevBodyStyle_scrollTop: 0,
                prevBodyStyle_top: 0,
                prevBodyStyle_position: 0,
                showData: [],
                text: '',
            }
        },
        methods: {
            selectPickerClick() {
                this.selectPickerShow = true;
            },
            listHandle() {
                let showData = JSON.parse(JSON.stringify(this.list));
                let currentValue = this.currentValue;
                let showValue = this.showValue;
                let showTitle = this.showTitle;
                for (let i = 0; i < showData.length; i++) {
                    if (showTitle !== 'text') {
                        showData[i].text = showData[i][showTitle];
                    }
                    if (showData[i][showValue] === currentValue) {
                        this.text = showData[i].text;
                    }
                }
                this.showData = showData;
            },
            close: function () {
                this.selectPickerShow = false;
            },
            onConfirm(value, index) {
                let current = this.showData[index];
                this.$emit('input', current[this.showValue]);
                this.text = current[this.showTitle];
                this.close();
            },
            onCancel() {
                this.close();
            }
        }
    }
</script>
<style>
    .expandSelect {
        font-size: 0.15rem;
        border-bottom: 0.01rem solid #E5E5E5;
        padding: 0.14rem 0 0.09em 0;
        cursor: pointer;
    }

    .expandSelect .title {
        display: inline-block;
        width: 0.8rem;
    }

    .expandSelect .content {
        display: inline-block;
        width: calc(100% - 1.1rem);
    }

    .expandSelect.empty .content {
        color: #B2B2B2;
    }

    .expandSelect .icon {
        font-size: 0.16rem;
    }

    .selectPicker.van-picker {
        z-index: 3001;
        position: absolute;
        /*width: calc(100% - 0.32rem);*/
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .selectPicker.van-picker .van-picker-column__wrapper {
        /*margin-top: -131px;*/
    }
</style>