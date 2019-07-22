<template>
    <div>
        <div class="row expandInput">
            <div class="title">
                {{title}}
            </div>
            <textarea placeholder="请输入" class="content" v-model="text"/>
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
                this.$emit('input',  this.text);
            }
        },
        components: {},
        computed: {

        },
        data: function () {
            return {
                text: '',
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
        vertical-align: middle;
        border: none;
        outline: none;
        resize: none;
        padding: 0 0.04rem;
    }

    .expandInput.empty .content {
        color: #B2B2B2;
    }

    .expandSelect .icon {
        font-size: 0.16rem;
    }


</style>