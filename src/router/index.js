import { createRouter, createWebHistory } from 'vue-router'
import * as pages from '../pages/index'
import * as templates from '../templates/index'

const routes = [
    {
        path: '/',
        component: templates.MainTemplate,
        children: [
            {
                path: '',
                name: 'about',
                component: pages.About,
            },
            {
                path: 'login',
                name: 'login',
                component: pages.Login
            },
            {
                path: 'bidding',
                name: 'bidding',
                component: pages.Bidding
            },
            {
                path: 'session/create',
                name: 'session-create',
                component: pages.SessionCreate
            },
            {
                path: 'session/detail/:id',
                name: 'session-detail',
                component: pages.SessionDetail
            },
            // {
            //     path: 'session/result/:id',
            //     name: 'session-result',
            //     component: pages.SessionResult
            // },
            {
                path: 'not-found',
                name: 'not-found',
                component: pages.NotFound
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
