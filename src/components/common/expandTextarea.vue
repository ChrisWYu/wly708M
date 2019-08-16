<template>
    <div>
        <div class="row expandTextarea">
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
                this.$emit('input', this.text);
            }
        },
        components: {},
        computed: {},
        data: function () {
            return {
                text: '',
            }
        },
        methods: {}
    }
</script>
<style>
    .expandTextarea {
        font-size: 0.15rem;
        border-bottom: 0.01rem solid #E5E5E5;
        padding: 0.09rem 0 0;
        cursor: pointer;
    }

    .expandTextarea .title {
        display: inline-block;
        width: 0.8rem;
        vertical-align: top;
    }

    .expandTextarea .content {
        display: inline-block;
        width: calc(100% - 0.95rem);
        height: 0.8rem;
        vertical-align: middle;
        border: none;
        outline: none;
        resize: none;
        /*padding: 0.04rem;*/
        color: rgba(153, 153, 153, 1);
        /*background: rgba(242, 243, 245, 1);*/
        border-radius: 0.04rem;
        margin-bottom: 0.09rem;
    }

    .expandTextarea.empty .content {
        color: #B2B2B2;
    }
</style>