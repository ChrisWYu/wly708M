<template>
    <router-view></router-view>
</template>

<script>
    import "../assets/fonts/iconfont.css";

    export default {
        computed: {},
        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    }
</script>
<style>
    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 100px;
        /*height: 100%;*/
        background-color: #F2F3F5;
    }

    body {
        /*height: 100%;*/
        font-size: 12px;
        position: relative;
    }

    /*#app .van-dialog {*/
    /*top: 30%;*/
    /*}*/

    #app .van-dialog__header {
        padding-top: 0.16rem;
        font-size: 0.16rem;
    }

    #app .van-dialog__content {
        margin-top: 0.16rem;
        margin-bottom: 0.18rem;
    }

    #app {
        font-family: 'PingFangSC', 'Helvetica Neue ', Helvetica, Arial, 'Microsoft YaHei', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        background-color: #F2F3F5;
        height: 100%;
        /* margin-top: 60px; */
    }

    .row {
        display: block;

    }

    .row .expandInput {
        display: block;
        width: 3.38rem;
        height: 0.4rem;
        outline: none;
        border: 0.01rem solid #E5E5E5;
        border-radius: 0.04rem;
        margin: auto;
        color: #9B9B9B;
    }

    .row.screenSearch {
        position: relative;
        margin-bottom: 0.08rem;
    }

    .row.screenSearch .iconfont {
        position: absolute;
        top: 0.13rem;
        left: 0.08rem;
        color: #9B9B9B;
    }

    .row .expandScreenInput {
        display: block;
        /*width: 3.38rem;*/
        height: 0.4rem;
        width: 100%;
        outline: none;
        border: 0.01rem solid #E5E5E5;
        border-radius: 0.04rem;
        padding-left: 0.28rem;
        /*margin: auto;*/
        color: #9B9B9B;
    }

    .row .expandInput:focus, .row .expandScreenInput:focus {
        border: 1px solid #F13D3D;
    }

    .row .expandInput:hover {
        border: 1px solid #C0C4CC;
    }

    .row.topSearch {
        width: 100%;
        background-color: #FFFFFF;
        height: 0.56rem;
        line-height: 0.56rem;
        position: fixed;
        top: 0;
        padding: 0 0.08rem;
    }

    .row.topSearch .expandInput {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -0.2rem;
        margin-left: calc(0.08rem - 50%);
        padding: 0 0.3rem;
        font-size: 0.15rem;
        width: calc(100% - 0.16rem);
    }

    .row.topSearch .icon {
        position: absolute;
        left: 0.2rem;
        color: #B2B2B2;
    }

    .row.screen {
        position: fixed;
        top: 0.62rem;
        right: 0.1rem;
        /*text-align: right;*/
        color: #B2B2B2;
        /*margin: 0.68rem 0.1rem 0 0;*/
    }

    .row.screen .icon {
        font-size: 0.15rem;
    }

    .row.screen .detail {
        font-size: 0.15rem;
    }

    .Right {
        float: right;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #B2B2B2;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #B2B2B2;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #B2B2B2;
    }

    .bodyContent {
        height: calc(100% - 0.72rem);
        position: fixed;
        width: 100%;
        overflow: scroll;
        top: 0.88rem;
        /*【】margin-top: 0.84rem;*/
    }

    .bodyContent.hasFooter {
        top: 1.1rem;
        height: calc(100% - 1.89rem);
    }

    .footerOperate {
        height: 0.72rem;
        line-height: 0.72rem;
        text-align: center;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #FFFFFF;
    }

    .footerOperate .submitLargeButton {
        margin: 0.16rem;;
        background-color: #F13D3D;
        color: #FFFFFF;
        border-radius: 0.04rem;
        height: 0.36rem;
        line-height: 0.36rem;
    }

    .van-overlay {
        background-color: rgba(51, 51, 51, .6);
    }


    #app .van-list {
        margin: 0 0.1rem 0;
        box-shadow: 0 2pt 4pt 0 rgba(239, 239, 239, .5);
    }

    .solidHr {
        margin-top: 0.09rem;
        height: 0.01rem;
        border: none;
        border-top: 0.01rem solid #EEEEEE;
    }

    .emptyList {
        height: 100%;
        padding-top: 1rem;
        text-align: center;
        background-color: #ffffff;
    }

    /*.listContent:nth-child(1) {*/
    /*margin-top: 29px;*/
    /*}*/
    .listContent:nth-child(1) {
        margin-top: 0;
    }

    .listContent {
        margin-top: 0.08rem;
        background: #FFFFFF;
        padding: 0.15rem 0.13rem;
        border-radius: 0.04rem;
    }

    .listContent .statusTitle {
        font-size: 0.15rem;
        color: #BB9677;
    }

    .listContent .listLabel {
        margin: 0.16rem 0 0.06rem 0.03rem;
    }

    .listContent .listLabel .labelTitle {
        color: #333333;
        font-size: 0.15rem;
        margin-bottom: 0.06rem;
    }

    .listContent .listLabel .labelContent {
        color: #B2B2B2;
        font-size: 0.13rem;
        margin-top: 0.03rem;
    }

    .cusButton {
        display: inline-block;
        width: 0.6rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.13rem;
        text-align: center;
        border-radius: 0.02rem;
        cursor: pointer;
        letter-spacing: 0.04rem;
        vertical-align: middle;
    }

    .cusRed {
        border: 0.01rem solid #F13D3D;
        color: #F13D3D;
        /*background-color: #F13D3D;*/
        /*color: #ffffff;*/
    }

    /*.cusRed:hover {*/
    /*background-color: #C80512;*/
    /*}*/

    .cusWhite {
        border: 0.01rem solid #D0D0D0;
        background-color: #F8F8F8;
        color: #333333;
    }

    .row.submitButton {
        margin: 0.16rem;
        position: absolute;
        bottom: 0.01rem;
        left: 0;
        width: calc(100% - 0.32rem);
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        background-color: #F13D3D;
        border-radius: 0.04rem;
        color: #FFFFFF;
        font-size: 0.15rem;
        letter-spacing: 0.08rem;
    }

    .row.screenButton {
        position: absolute;
        bottom: 0.01rem;
        left: 0;
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        border-top: 0.01rem solid #F13D3D;
        text-align: right;
    }

    .row.screenButton .button {
        width: 49%;
        display: inline-block;
        text-align: center;
        font-size: 0.15rem;
    }

    .row.screenButton .button.reset {
        color: #333333;
    }

    .row.screenButton .button.confirm {
        color: #FFFFFF;
        background-color: #F13D3D;
    }

    .topContent {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        background-color: #FFFFFF;
        padding: 0.16rem;
    }

    .topContent .row {
        margin-top: 0.08rem;
        font-size: 0.13rem;
    }

    .topContent .row:nth-child(1) {
        margin-top: 0;
        font-size: 0.15rem;
        font-weight: bold;
    }

    .topContent .row:nth-child(2) {
        margin-top: 0.06rem;
    }

    .loading {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(51, 51, 51, .3)
    }

</style>