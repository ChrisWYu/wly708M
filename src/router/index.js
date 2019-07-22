import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'abnormalScanSupervise',
      component: Home,
      children: [
        {
          path: 'abnormalScanSuperviseList',
          name: 'abnormalScanSuperviseList',
          icon: '&#xe620;',
          title: '异常扫码稽查',
          component: () => import('@/components/abnormalScanSupervise/abnormalScanSuperviseList.vue')
        }
      ]
    },
    {
      hidden: true,
      component: Home,
      path: '/',
      name: '',
      children: [
        {
          path: 'abnormalScanSuperviseListDetail/:id',
          name: 'abnormalScanSuperviseList/listDetail',
          component: () => import('@/components/abnormalScanSupervise/module/listDetail.vue')
        }
      ]
    },
  ]
})
