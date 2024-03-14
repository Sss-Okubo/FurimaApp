import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _33046eea = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _3df30e9a = () => interopDefault(import('..\\pages\\item.vue' /* webpackChunkName: "pages/item" */))
const _5b8e49f9 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _68443c4a = () => interopDefault(import('..\\pages\\mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _a75ef38e = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _2981d7a1 = () => interopDefault(import('..\\pages\\purchase.vue' /* webpackChunkName: "pages/purchase" */))
const _31a36043 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _dc32b23c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _33046eea,
    name: "inspire"
  }, {
    path: "/item",
    component: _3df30e9a,
    name: "item"
  }, {
    path: "/login",
    component: _5b8e49f9,
    name: "login"
  }, {
    path: "/mypage",
    component: _68443c4a,
    name: "mypage"
  }, {
    path: "/profile",
    component: _a75ef38e,
    name: "profile"
  }, {
    path: "/purchase",
    component: _2981d7a1,
    name: "purchase"
  }, {
    path: "/register",
    component: _31a36043,
    name: "register"
  }, {
    path: "/",
    component: _dc32b23c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
