import Vue from 'vue'
import Router from 'vue-router'
import Tools from '@/components/Tools'
import Release from '@/components/Release'
import Drainage from '@/components/Drainage'
import Index from '@/components/Index'


import BasicInfo from '@/components/BasicInfo'
import Chart1 from '@/components/Chart1'
import Chart2 from '@/components/Chart2'
import Chart3 from '@/components/Chart3'


import Developing from '@/components/Placeholder/developing'

import Stream from '@/components/Stream'











Vue.use(Router);
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      meta:{index:0},
      component: Index
    },
    {
      path: '/basic_info',
      name: 'BasicInfo',
      meta:{index:4},
      component: BasicInfo
    },
    {
      path: '/chart1',
      name: 'Chart1',
      meta:{index:5},
      component: Chart1
    },
    {
      path: '/chart2',
      name: 'Chart2',
      meta:{index:6},
      component: Chart2
    },
    {
      path: '/chart3',
      name: 'Chart3',
      meta:{index:7},
      component: Chart3
    },
    {
      path: '/developing',
      name: 'Developing',
      meta:{index:8},
      component: Developing
    },
    {
      path: '/stream',
      name: 'Stream',
      meta:{index:9},
      component: Stream
    },
    {
      path: '/tools',
      name: 'Tools',
      meta:{index:1},
      component: Tools
    },
    {
      path: '/release',
      name: 'Release',
      meta:{index:2},
      component: Release

    },
    {
      path: '/drainage',
      name: 'Drainage',
      meta:{index:10},
      component: Drainage

    }
  ]
})
