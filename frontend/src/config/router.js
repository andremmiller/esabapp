import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import GameForm from '@/components/game/GameForm'
import GameList from '@/components/game/GameList'
import UserGames from '@/components/game/UserGames'
import Game from '@/components/game/Game'
import Auth from '@/components/auth/Auth'
import LoanList from '@/components/loan/LoanList'
import Loan from '@/components/loan/Loan'

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
    component: UserGames
}, {
    name: 'game',
    path: '/game/:id',
    component: Game
}, {
    name: 'loanList',
    path: '/loans/',
    component: LoanList
}, {
    name: 'loan',
    path: '/loans/:id',
    component: Loan
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
