import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import UserView from '../views/UserView.vue';
import { ImproveRelevance } from '@vicons/carbon';
import { ImportContactsFilled } from '@vicons/material';
import cookies from 'vue-cookies';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        isLogin: false,
        isSuperuser: false,
      },
      component: HomeView,
    },
    {
      path: '/login',
      name: 'LoginView',
      meta: {
        isLogin: false,
        isSuperuser: false,
      },
      component: LoginView,
    },
    {
      path: '/register',
      name: 'RegisterView',
      meta: {
        isLogin: false,
        isSuperuser: false,
      },
      component: RegisterView,
    },
    {
      path: '/home',
      name: 'UserView',
      meta: {
        isLogin: true,
        isSuperuser: false,
      },
      component: UserView,
    },
    {
      path: '/message',
      name: 'message',
      redirect:'/message/receive',
      meta: {
        isLogin: true,
        isSuperuser: true,
      },
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
      meta: {
        isLogin: true,
        isSuperuser: true,
      },
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/searchresult/:keyword',
      name: 'searchresult',
      meta: {
        isLogin: false,
        isSuperuser: false,
      },
      component: () => import('../views/SearchResultView.vue'),
    },
    {
      path: '/player/:musicId',
      name: 'player',
      meta: {
        isLogin: false,
        isSuperuser: false,
      },
      component: () => import('../views/PlayerView.vue'),
    },
    {
      path: '/home/user/:userId',
      name: 'OtherUserView',
      meta: {
        isLogin: false,
        isSuperuser: false,
      },
      component: () => import('../views/OtherUserView.vue'),
    },
    {
      path: '/listdetail/:playlistId/',
      name: 'listdetail',
      meta: {
        isLogin: false,
        isSuperuser: false,
      },
      component: () => import('../views/ListDetailed.vue'),
    },
    {
      path: '/listdetail/:playlistId/:shareModal',
      name: 'listdetailshare',
      component: () => import('../views/ListDetailed.vue'),
    },
    {
      path: '/history',
      name: 'HistoryView',
      meta: {
        isLogin: true,
        isSuperuser: false,
      },
      component:() => import('../views/HistoryView.vue'),
    },
    {
      path: '/tags/:tagName',
      name: 'TagClickView',
      component:() => import('../views/TagClickView.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin && !cookies.isKey('userid')) {
    next({path: '/'});
  }
  else if (to.meta.isSuperuser && cookies.get('is_superuser') == 'false') {
    next({path: '/'});
  }
  else if (to.name === 'home' && cookies.get('is_superuser') == 'true') {//管理员应该前往管理员界面
    next({ path: '/admin' });
  }
  else {
    next();
  }
});

export default router;
