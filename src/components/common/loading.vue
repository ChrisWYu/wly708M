<template>
    <van-loading size="24px" vertical>加载中</van-loading>
</template>

<script>
    export default {
        mounted() {

        },
        components: {},
        data: function () {
            return {
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                //禁止滚动参数
                prevBodyStyle_scrollTop: 0,
                prevBodyStyle_top: 0,
                prevBodyStyle_position: 0,
            }
        },
        methods: {
            close: function () {
                this.$emit('input', false);
            },
            onConfirm(value, index) {
                console.log(`当前值：${value}, 当前索引：${index}`);
            },
            onCancel() {
                console.log('取消');
            },
            onChange(picker, value, index) {
                console.log(picker);
            }
        },
        beforeMount() {
            // 获取原来的scrollTop 并将body的top修改为对应的值
            // this.prevBodyStyle_scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            // this.prevBodyStyle_top = window.getComputedStyle(document.body, null).getPropertyValue('top');
            // document.body.style.top = `-${this.prevBodyStyle_scrollTop}px`;
            // // // 获取原来body的position 为了解决iOS上光标漂移的问题 将position修改为fixed
            // this.prevBodyStyle_position = window.getComputedStyle(document.body, null).getPropertyValue('position');
            // document.body.style.position = 'fixed';
        },

        beforeDestroy() {
            // document.body.style.top = this.prevBodyStyle_top || '0px';
            // document.body.style.position = this.prevBodyStyle_position;
            // document.body.scrollTop = document.documentElement.scrollTop = this.prevBodyStyle_scrollTop || 0;
        }
    }
</script>
<style>
    .selectPicker.van-picker {
        z-index: 3000;
        position: absolute;
        width: calc(100% - 0.32rem);
    }

    .selectPicker.van-picker .van-picker-column__wrapper {
        /*margin-top: -131px;*/
    }
</style>