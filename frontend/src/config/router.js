import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import GameForm from '@/components/game/GameForm'
import GameList from '@/components/game/GameList'
import Game from '@/components/game/Game'
import Auth from '@/components/auth/Auth'
import LoanList from '@/components/loan/LoanList'

// import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'gameAdd',
    path: '/game/add',
    component: GameForm
}, {
    name: 'gameUpdate',
    path: '/game/update/:id',
    component: GameForm
}, {
    name: 'gameList',
    path: '/game/',
    component: GameList
}, {
    name: 'gameOwned',
    path: '/game/owned',
    component: GameList
}, {
    name: 'game',
    path: '/game/:id',
    component: Game
}, {
    name: 'loanList',
    path: '/loans/',
    component: LoanList
}
// , {
//     name: 'articlesByCategory',
//     path: '/categories/:id/articles',
//     component: ArticlesByCategory
// }, {
//     name: 'articleById',
//     path: '/articles/:id',
//     component: ArticleById
// }
, {
    name: 'auth',
    path: '/auth',
    component: Auth
}
]

const router = new VueRouter({
    mode: 'history',
    routes
}
)

// router.beforeEach((to, from, next) => {
//     const json = localStorage.getItem(userKey)

//     if(to.matched.some(record => record.meta.requiresAdmin)) {
//         const user = JSON.parse(json)
//         user && user.admin ? next() : next({ path: '/' })
//     } else {
//         next()
//     }
// })

export default router
