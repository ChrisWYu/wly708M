// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as dd from 'dingtalk-jsapi';
import store from './vuex/store'
import Vuex from 'vuex'
// import {
//     Step,
//     Steps,
//     Card,
//     List,
//     Cell,
//     Panel,
//     Button,
//     Dialog,
//     RadioGroup,
//     Radio,
//     Field,
//     Swipe,
//     SwipeItem,
//     Toast,
//     Popup
// } from 'vant'
import Axios from 'axios'
import {
    dingTalkM //手机端 dingTalkM
} from 'dingtalk-auth'
import vant from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.use(dd);
Vue.use(vant);
Vue.use(Vuex)
//Vue.use(Step).use(Steps).use(Card).use(List).use(Cell).use(Panel).use(Button).use(Dialog).use(RadioGroup).use(Radio).use(Field).use(Swipe).use(SwipeItem).use(Toast).use(Popup)
Vue.prototype.$http = Axios
/* eslint-disable no-new */
Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
let jsApiList = [
    'biz.contact.choose', 'biz.contact.complexPicker', 'biz.ding.post', 'biz.util.downloadFile', 'biz.util.previewImage', 'biz.util.uploadImage', 'biz.contact.choose', 'biz.user.get', 'device.geolocation.get'
]
// dingTalkM.ddConfig(jsApiList, '/api/ddadapter/dingding/expBarcode/getJsTicketMob').then(re => {
//     console.log('开始鉴权')
//     console.log(re)
//     sessionStorage.setItem('corpId', re.corpId)
//     // 免登
//     dingTalkM.authLogin(re.corpId, '/api/ddadapter/dingding/expBarcode/getUserCode').then(res => {
//         console.log('开始免登')
//         console.log(res)
//         // axios.defaults.headers.common['tokenid'] = res.tokenid; //头文件
//         // axios.defaults.headers.common['tokencode'] = res.tokencode; //头文件
//         // sessionStorage.setItem("tokencode", res.tokencode);
//         sessionStorage.setItem('roleid', res.roleid)
//         sessionStorage.setItem('userid', res.userid)
//         sessionStorage.setItem('username', res.username)
//         sessionStorage.setItem('warcode', res.warinfo.warcode)
//         // //用户名
//         new Vue({
//             el: '#app',
//             router,
//             store,
//             template: '<App/>',
//             components: {
//                 App
//             }
//         })
//         router.replace({
//             name: 'abnormalScanSuperviseList'
//         })
//     }, err => {
//         console.log(err)
//     })
// }, err => {
//     console.log(err)
// })
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})