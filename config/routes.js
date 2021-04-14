const ALL_ALLOW = ['admin', 'captain', 'manager', 'baller'];
const EXCEPT_BALLER = ['admin', 'captain', 'manager'];
const BALLER = ['baller'];
const EXCEPT_ADMIN = ['captain', 'manager'];
// const CAPTAIN_AND_ADMIN = ['admin', 'captain'];

export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      // 登陆
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        // 基础布局
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              // 进入系统重定向到 home，展示公告
              {
                path: '/',
                redirect: '/home',
              },
              // {
              //   // 首页
              //   path: '/welcome',
              //   name: 'welcome',
              //   icon: 'team',
              //   authority: ALL_ALLOW,
              //   component: './Welcome',
              // },
              // 日程表
              {
                path: '/schedule',
                name: 'schedule',
                icon: 'schedule',
                authority: ALL_ALLOW,
                component: './Schedule',
              },
              // 花名册
              {
                path: '/roster',
                name: 'roster',
                icon: 'skin',
                component: './Roster',
                authority: ALL_ALLOW,
              },
              // 运动队数据与结果
              {
                path: '/dataResult',
                name: 'dataResult',
                icon: 'database',
                authority: ALL_ALLOW,
                component: './DataResult',
              },
              // 运动队瞬间记录
              {
                path: '/moment',
                name: 'moment',
                icon: 'star',
                authority: ALL_ALLOW,
                component: './Moment',
              },
              // 运动队荣誉
              {
                path: '/honor',
                name: 'honor',
                icon: 'crown',
                authority: ALL_ALLOW,
                component: './Honor',
              },
              // 管理
              {
                path: '/teamManagement',
                name: 'teamManagement',
                icon: 'edit',
                authority: EXCEPT_BALLER,
                routes: [
                  // {
                  //   path: '/teamManagement/sechdule',
                  //   name: 'sechdule',
                  //   component: './TeamManagement/subPages/sechdule',
                  // },
                  {
                    path: '/teamManagement/roster',
                    name: 'roster',
                    component: './TeamManagement/subPages/roster',
                  },
                  {
                    path: '/teamManagement/dataResult',
                    name: 'dataResult',
                    component: './TeamManagement/subPages/dataResult',
                  },
                  // {
                  //   path: '/teamManagement/star',
                  //   name: 'star',
                  //   component: './TeamManagement/subPages/star',
                  // },
                  // { path: '/teamManagement/honor', name: 'honor', component: './TeamManagement/subPages/honor' },
                ],
              },
              // 公告发布
              {
                path: '/announcement',
                name: 'announcement',
                icon: 'notification',
                authority: EXCEPT_BALLER,
                component: './Announcement',
              },
              // 队伍/个人设置
              {
                path: '/t_setting',
                name: 't_setting',
                icon: 'setting',
                authority: EXCEPT_BALLER,
                component: './Setting/Tsetting.jsx',
              },
              {
                path: '/p_setting',
                name: 'p_setting',
                icon: 'user',
                component: './Setting/Psetting.jsx',
                authority: EXCEPT_ADMIN,
              },
              {
                component: './Welcome',
              },
              {
                component: './404',
              },
            ],
          },

          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
