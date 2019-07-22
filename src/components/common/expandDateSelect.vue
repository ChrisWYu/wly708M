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
        <div class="dateLoading" v-if="selectPickerShow">
            <van-datetime-picker
                    v-model="dateTime"
                    type="datetime" @cancel="onCancel"
                    @confirm="onConfirm"
            />
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            title: {
                type: String
            },
            currentValue: {}
        },
        mounted() {

        },
        watch: {
            currentValue: function () {
                if (this.currentValue === '') {
                    this.text = ''
                }
            }
        },
        computed: {
            isEmpty: function () {
                return this.text === ''
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
                dateTime: new Date(),
            }
        },
        methods: {
            selectPickerClick() {
                this.selectPickerShow = true;
            },
            close: function () {
                this.selectPickerShow = false;
            },
            onConfirm(value, index) {
                // let current = this.showData[index];
                // this.$emit('input', current[this.showValue]);
                this.text = new Date(value).format('yyyy-MM-dd hh:mm:ss');
                this.$emit('input', value);
                this.close();
            },
            onCancel() {
                this.close();
            }
        }
    }
</script>
<style>
    .dateLoading {
        position: unset;
    }

    .expandSelect {
        font-size: 0.15rem;
        border-bottom: 0.01rem solid #E5E5E5;
        padding: 0.09rem 0;
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
        width: 100%;
    }

    .selectPicker.van-picker .van-picker-column__wrapper {
        /*margin-top: -131px;*/
    }
</style>