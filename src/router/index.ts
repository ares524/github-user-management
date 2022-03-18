import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { homepageRoutes } from '@/components/hompepage/homepage.routes'
import { setTitle } from '@/components/helpers/dom'

const routes: Array<RouteRecordRaw> = [...homepageRoutes]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.meta.title) {
    setTitle(to.meta.title as string)
  }

  next()
})

export default router
