import { RouteRecordRaw } from 'vue-router'

export const homepageRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('@/views/Homepage.vue'),
    meta: {
      requiresAuth: false,
      requiresUnauth: true,
      sidebarHidden: true,
      useWhiteBackground: true,
      title: 'Homepage | Frontend Test',
    },
    children: [
      {
        path: 'remove/:itemId',
        name: 'PopupRemoveItem',
        component: () => import('@/components/homepage/popups/PopupRemoveItem.vue'),
        meta: {
          backRoute: 'Homepage',
          isPopup: true,
          title: 'Delete Airport | Frontend Test',
        },
      },
      {
        path: 'add',
        name: 'PopupAddAirport',
        component: () => import('@/components/homepage/popups/PopupAddAirport.vue'),
        meta: {
          backRoute: 'Homepage',
          isPopup: true,
          title: 'Add Airport | Frontend Test',
        },
      },
      {
        path: 'edit/:itemId',
        name: 'PopupEditAirport',
        component: () => import('@/components/homepage/popups/PopupEditAirport.vue'),
        meta: {
          backRoute: 'Homepage',
          isPopup: true,
          title: 'Edit Airport | Frontend Test',
        },
      },
    ],
  },
]
