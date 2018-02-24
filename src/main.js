// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './components/layout'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from './pages/index'
import orderListPage from './pages/orderList'
import DatailPage from './pages/datail'
import DatailAnaPage from './pages/datail/analysis'
import DatailCouPage from './pages/datail/count'
import DatailForPage from './pages/datail/forecast'
import DatailPubPage from './pages/datail/publish'
//import axios from 'axios'


//Vue.prototype.$http = axios
Vue.use(VueRouter)
Vue.use(VueResource)
let router = new VueRouter({
	mode: 'history',
	routes:[
		{
			path:'/',
			component:IndexPage
		
		},
		{
			path:'/orderList',
			component:orderListPage
		
		},
		{
			path:'/datail',
			component:DatailPage,
			redirect:'/datail/analysis',//如果访问locahost:8080/datail地址会直接跳转至第一页
			children:[
				{
					path:'analysis',
					component:DatailAnaPage
				},
				{
					path:'count',
					component:DatailCouPage
				},
				{
					path:'forecast',
					component:DatailForPage
				},
				{
					path:'publish',
					component:DatailPubPage
				}
			]
		}
	]
})
//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<layout/>',
  components: { layout }
})
