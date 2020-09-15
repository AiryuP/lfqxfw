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
        path:"/",
        name:"Homes",
        component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
      },
      {
        path:"/secondary",
        name:"secondary",
        component: () => import(/* webpackChunkName: "secondary" */ '../views/secondary/index.vue'),
        children:[
          {
            path:"/special",
            name:"special",
            component: () => import(/* webpackChunkName: "special" */ '../views/special/index.vue'),
            children:[    
              {
                path:"/special/lists",
                name:"lists",
                component: () => import(/* webpackChunkName: "special" */ '../views/special/lists/index.vue')
              },    
              {
                path:"/special/contentTwo",
                name:"contentTwo",
                component: () => import(/* webpackChunkName: "special" */ '../views/special/contentTwo/index.vue')
              },
              {
                path:"/special/lists/detail",
                name:"detail",
                component: () => import(/* webpackChunkName: "special" */ '../views/special/lists/detail.vue')
              }
            ],
            redirect: '/special/lists'
          },
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
            component: () => import(/* webpackChunkName: "ambient" */ '../views/ambient/index.vue'),
            children: [      
              {
                path:"/ambient/surface",
                name:"surfaceAmbient",
                component: () => import(/* webpackChunkName: "ambient" */ '../views/ambient/surface/index.vue')
              },     
              {
                path:"/ambient/thread",
                name:"threadAmbient",
                component: () => import(/* webpackChunkName: "ambient" */ '../views/ambient/thread/index.vue')
              }, 
            ],
            redirect: '/ambient/surface'
          },        
          {
            path:"/traffic",
            name:"traffic",
            component: () => import(/* webpackChunkName: "traffic" */ '../views/traffic/index.vue'),
            children: [      
              {
                path:"/traffic/surface",
                name:"surface",
                component: () => import(/* webpackChunkName: "traffic" */ '../views/traffic/surface/index.vue')
              },     
              {
                path:"/traffic/thread",
                name:"thread",
                component: () => import(/* webpackChunkName: "traffic" */ '../views/traffic/thread/index.vue')
              }, 
            ],
            redirect: '/traffic/surface'
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
