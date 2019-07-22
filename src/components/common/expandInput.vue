<template>
    <div>
        <div class="row expandInput">
            <div class="title">
                {{title}}
            </div>
            <input class="content" placeholder="请输入" v-model="text"/>
            <!--<i class="icon iconfont iconwuliangyeicon-2"></i>-->
        </div>
    </div>
</template>

<script>

    export default {
        props: ['title', 'currentValue'],
        mounted() {

        },
        watch: {
            currentValue: function () {
                this.text = JSON.parse(JSON.stringify(this.currentValue));
            },
            text: function () {
                this.$emit('input', this.text);
            }
        },
        components: {},
        data: function () {
            return {
                text: ''
            }
        },
        methods: {}
    }
</script>
<style>
    .expandInput {
        font-size: 0.15rem;
        border-bottom: 0.01rem solid #E5E5E5;
        padding: 0.09rem 0 0;
        cursor: pointer;
    }

    .expandInput .title {
        display: inline-block;
        width: 0.8rem;
    }

    .expandInput .content {
        display: inline-block;
        width: calc(100% - 1.1rem);
        padding: 0;
        vertical-align: middle;
        border: none;
        outline: none;
    }

    .expandSelect .icon {
        font-size: 0.16rem;
    }


</style>