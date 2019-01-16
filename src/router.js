import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task.vue'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Task',
      component: Task,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})


// ログインが完了していない場合にサインインへリダイレクトさせる
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // firebaseから認証情報を取得できるか確認する
  const currentUser = firebase.auth().currentUser
  if (requiresAuth) {
    if (!currentUser) {
      // singin へリダイレクト
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router
