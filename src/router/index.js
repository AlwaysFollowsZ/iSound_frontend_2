import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'UserView',
      component: UserView
    },
    {
      path: '/message',
      name: 'message',
      redirect:'/message/receive',
      component: () => import('../views/MessageView.vue'),
      children: [
        {
          path: 'receive',
          component: () => import('../views/ReceiveMessage.vue'),
        },
        {
          path: 'reply',
          component: () => import('../views/ReplyMessage.vue'),
        },
        {
          path: 'send',
          component: () => import('../views/SendMessage.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/searchresult',
      name: 'searchresult',
      component: () => import('../views/SearchResultView.vue')
    },
  ]
})

export default router
