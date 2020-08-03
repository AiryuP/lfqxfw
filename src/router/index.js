import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:"/home",
        name:"Homes",
        component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
      },
      {
        path:"/secondary",
        name:"secondary",
        component: () => import(/* webpackChunkName: "secondary" */ '../views/secondary/index.vue'),
        children:[
          {
            path:"/term",
            name:"term",
            component: () => import(/* webpackChunkName: "term" */ '../views/term/index.vue')
          },          
          {
            path:"/weatherforecast",
            name:"weatherforecast",
            component: () => import(/* webpackChunkName: "weatherforecast" */ '../views/weatherforecast/index.vue')
          },         
          {
            path:"/gridpoint",
            name:"gridpoint",
            component: () => import(/* webpackChunkName: "gridpoint" */ '../views/gridpoint/index.vue')
          },         
          {
            path:"/radar",
            name:"radar",
            component: () => import(/* webpackChunkName: "radar" */ '../views/radar/index.vue')
          },        
          {
            path:"/warning",
            name:"warning",
            component: () => import(/* webpackChunkName: "warning" */ '../views/warning/index.vue')
          },        
          {
            path:"/ambient",
            name:"ambient",
            component: () => import(/* webpackChunkName: "ambient" */ '../views/ambient/index.vue')
          },        
          {
            path:"/traffic",
            name:"traffic",
            component: () => import(/* webpackChunkName: "traffic" */ '../views/traffic/index.vue')
          },
        ]
      }
    ],
    redirect: '/home'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
