import { createRouter, createWebHistory } from 'vue-router'
//import FirstPage from './FirstPage'



const routes = [
    {
        path : '/',
        component : () => import('@/views/hr/emp/LoginPage'),
        mode: "history",
        name: "LoginPage"
    },
    {
        path: '/MainPage',
        component: () => import('@/views/base/MainPage'),
        mode: "history",
        name: 'MainPage',
/*        beforeEnter: function (to, from, next) {
            console.log(to)
            console.log(from)
            console.log(next)
            if()
        }*/
    },
    {
        path: '/RequestApproval',
        component: () => import('@/views/hr/approval/RequestApproval'),
        mode: "history",
        name: 'RequestApproval',
    },
    {
        path: '/DocumentApprovalList',
        component: () => import('@/views/hr/approval/DocumentApprovalList'),
        mode: "history",
        name: 'DocumentApprovalList',
    },
    {
        path: '/ExecutiveDocumentApproval',
        component: () => import('@/views/hr/approval/ExecutiveDocumentApproval'),
        mode: "history",
        name: 'ExecutiveDocumentApproval',
    },
    {
        path: '/DocumentList',
        component: () => import('@/views/hr/approval/DocumentList'),
        mode: "history",
        name: 'DocumentList',
    },
    {
        path: '/MyDocumentInfo',
        component: () => import('@/views/hr/approval/MyDocumentInfo'),
        mode: "history",
        name: 'MyDocumentInfo',
    },
    {
        path: '/EmpManager',
        component: () => import('@/views/hr/emp/EmpManager'),
        mode: "history",
        name: 'EmpManager',
    },
    {
        path: '/test',
        component: () => import('@/views/hr/emp/test'),
        mode: "history",
        name: 'test',
    },
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;