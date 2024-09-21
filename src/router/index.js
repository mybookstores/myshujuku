import { createRouter, createWebHistory } from 'vue-router'
import college from '../views/college.vue'
import major from '../views/major.vue'
import student from '../views/student.vue'
import bar from '../views/bar.vue'
import willone from '../views/willone.vue'
import willtwo from '../views/willtwo.vue'
import willadd from '../views/willadd.vue'
import total from '../views/total.vue'
import add from '../components/add.vue'
const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/chatdemo1.vue')
  },
  {
    path: '/home',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/',
    name: 'demo',
    component: () => import('../views/demo.vue'),

    redirect: {name: "college"},   //输入路由center会重定向到a页面
    children:
      [
        {
          path: "college",
          name: "college",
          component: college
        },
        {
          path: "major",
          name: "major",
          component: major
        },
        {
          path: "student",
          name: "student",
          component: student
        }
        ,
        {
          path: "bar",
          name: "bar",
          component: bar
        },
        {
          path: "willone",
          name: "willone",
          component: willone
        },
        {
          path: "willtwo",
          name: "willtwo",
          component: willtwo
        },
        {
          path: "willadd",
          name: "ailladd",
          component: willadd
        },
        {
          path: "total",
          name: "total",
          component: total
        },
        {
          path: "add",
          name: "add",
          component: add
        }
      ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
