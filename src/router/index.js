import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
let router = new Router({
    mode: 'history',
    routes: [

        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: '登录',
            component: () => import('@/views/user/Login')
        },
        {
            path: '/main',
            redirect: '/Home',
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/views/main'),
            children: [
                {
                    path: '/Home',
                    name: 'Home',
                    component: () => import('@/views/Home'),

                }, {
                    path: '/app/appuser',
                    name: 'app用户',
                    component: () => import('@/views/APPmanage/appuser'),

                }, {
                    path: '/app/appimage',
                    name: 'app图片',
                    component: () => import('@/views/APPmanage/appimage'),

                }, {
                    path: '/cms/content',
                    name: '博客管理',
                    component: () => import('@/views/content/List'),

                }, {
                    path: '/cms/cmsblogcomments',
                    name: '博客评论',
                    component: () => import('@/views/content/blogComments'),
                }, {
                    path: '/cms/file',
                    name: '文件管理',
                    component: () => import('@/views/file/List'),

                }, {
                    path: '/admin/exam',
                    name: '成绩分析',
                    component: () => import('@/views/exam/list'),

                }, {
                    path: '/admin/answer',
                    name: '用户答题',
                    component: () => import('@/views/exam/answer'),

                }, {
                    path: '/exam/question',
                    name: '题库管理',
                    component: () => import('@/views/exam/question'),

                }, {
                    path: '/exam/paper',
                    name: '试卷管理',
                    component: () => import('@/views/exam/paper'),
                }, {
                    path: '/activiti/list',
                    name: '流程部署',
                    component: () => import('@/views/Activiti/activiti'),
                }, {
                    path: '/activiti/task',
                    name: '流程申请',
                    component: () => import('@/views/Activiti/task'),
                }, {
                    path: '/activiti/approvetask',
                    name: '流程审批',
                    component: () => import('@/views/Activiti/approvetask'),
                }, {
                    path: '/activiti/historytask',
                    name: '审批历史',
                    component: () => import('@/views/Activiti/historytask'),
                }, {
                    path: '/admin/generator',
                    name: '代码生成',
                    component: () => import('@/views/generator/List'),
                }, {
                    path: '/admin/test',
                    name: '测试',
                    component: () => import('@/views/test/test'),
                }, {
                    path: '/admin/job',
                    name: '计划任务',
                    component: () => import('@/views/job/task'),
                }, {
                    path: '/shop/address',
                    name: '收货地址',
                    component: () => import('@/views/shop/addresslist'),
                }, {
                    path: '/shop/user',
                    name: '客户管理',
                    component: () => import('@/views/shop/user'),
                }, {
                    path: '/shop/orderlist',
                    name: '订单管理',
                    component: () => import('@/views/shop/orderlist'),
                }, {
                    path: '/shop/goods',
                    name: '商品管理',
                    component: () => import('@/views/shop/goods'),
                }, {
                    path: '/base/log',
                    name: '系统日志',
                    component: () => import('@/views/log/List'),
                }, {
                    path: '/base/service',
                    name: '基础服务',
                    component: () => import('@/views/service/List'),
                }, {
                    path: '/admin/menu',
                    name: '菜单管理',
                    component: () => import('@/views/menu/List'),
                }, {
                    path: '/admin/role',
                    name: '角色管理',
                    component: () => import('@/views/role/List'),
                }, {
                    path: '/admin/user',
                    name: '用户管理',
                    component: () => import('@/views/user/List'),
                },{//用户设置下级路由
                    path: '/user/settings',
                    redirect: '/user/settings/BaseSetting',
                    name: '用户设置',
                    component: () => import('@/views/settings/Index'),
                    children: [{
                        path: '/user/settings/BaseSetting',
                        name: '基础设置',
                        component: () => import('@/views/settings/BaseSetting'),
                    },{
                        path: '/user/settings/Security',
                        name: '安全设置',
                        component: () => import('@/views/settings/Security'),
                    },{
                        path: '/user/settings/Binding',
                        name: '账户绑定',
                        component: () => import('@/views/settings/Binding'),
                    },{
                        path: '/user/settings/Notification',
                        name: '通知设置',
                        component: () => import('@/views/settings/Notification'),
                    },]
                },{
                    path: '/user/center',
                    name: '个人中心',
                    component: () => import('@/views/center/Index'),
                }, {
                    path: '/base/SeimiCrawler',
                    name: '爬虫管理',
                    component: () => import('@/views/SeimiCrawler/list'),
                }]
        }

    ]

})

router.beforeEach((to, from, next) => {
    // console.log('to:' + to.path)

    if (to.path.startsWith('/login')) {
        window.localStorage.removeItem('access-token')
        //window.localStorage.removeItem('access-user')
        next()
    } else if (to.path.startsWith('/index')) {
        next()
    }
    else if (to.path.startsWith('/myjshop')) {
        next()
    }
    else if (to.path.startsWith('/myexamonline')) {
        next()
    }
    else if (to.path.startsWith('/myblog')) {
        next()
    }
    else if (to.path.startsWith('/mytest')) {
        next()
    } else {
        let user = window.localStorage.getItem('access-token');
        if (!user) {
            next({path: '/login'})
        } else {
            next()
        }
    }
})

export default router
