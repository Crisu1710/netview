import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Ips from '@/components/Ips'
import Components from '@/components/Components'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/notFound',
      component: NotFound,
      name: 'NotFound',
    },
    {
      path: '/ips',
      name: 'Ips',
      component: Ips,
    },
    {
      path: '/components',
      name: 'Components',
      component: Components,
    }
  ],
  mode: 'history'
})
