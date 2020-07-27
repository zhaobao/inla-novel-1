import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index"
import Home from "../views/index/Home";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index/a/home/recommend'
    },
    {
        path: '/index/:m',
        name: 'Index',
        component: Index,
        children: [
            {
                path: 'home',
                name: 'Home',
                props: true,
                component: Home,
                children: [
                    {
                        path: 'recommend',
                        name: 'Recommend',
                        props: true,
                        component: () => import('../views/index/home/Recommend.vue')
                    },
                    {
                        path: 'hot',
                        name: 'Hot',
                        props: true,
                        component: () => import('../views/index/home/Hot.vue')
                    },
                    {
                        path: 'rank',
                        name: 'Rank',
                        props: true,
                        component: () => import('../views/index/home/Rank.vue')
                    },
                    {
                        path: 'cate/:name',
                        name: 'Cate',
                        props: true,
                        component: () => import('../views/index/home/Cate.vue')
                    }
                ],
            },
            {
                path: 'explorer',
                name: 'Explorer',
                props: true,
                component: () => import('../views/index/Explorer.vue')
            },
            {
                path: 'book',
                name: 'Book',
                props: true,
                component: () => import('../views/index/Book.vue')
            },
            {
                path: 'about',
                name: 'About',
                props: true,
                component: () => import('../views/index/About.vue')
            },
        ]
    },
    {
        path: '/list/:group',
        name: 'List',
        props: true,
        component: () => import('../views/List.vue')
    },
    {
        path: '/grid/:group',
        name: 'Grid',
        props: true,
        component: () => import('../views/Grid.vue')
    },
    {
        path: '/comic/:comic_id',
        name: 'Detail',
        props: true,
        component: () => import('../views/Detail.vue')
    },
    {
        path: '/read/:comic_id/:chapter_index',
        name: 'Read',
        props: true,
        component: () => import('../views/Read.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
