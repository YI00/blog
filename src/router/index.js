import Vue from 'vue'
import Router from 'vue-router'
import article from '@/components/article/article.vue'
import sidebar from '@/subcomponents/sidebar.vue'
import articleDetail from '@/components/article/articleDetail.vue'
import about from '@/components/about.vue'
import signIn from '@/components/admin/signIn.vue'
import background from '@/components/admin/background.vue'
import Users from '@/components/admin/users.vue'
import UserEdit from '@/components/admin/userEdit.vue'
import AddArticle from '@/components/article/addArticle.vue'
import articles from '@/components/admin/articleList.vue'
import EditArticle from '@/components/article/editArticle.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {default:article,sidebar:sidebar}
    },
    {
      path:'/article',
      components:{default:article,sidebar:sidebar}
    },
    {
      path:'/articleDetail/:id',
      components:{default:articleDetail,sidebar:sidebar}
    },
    {
      path:'/about',
      components:{default:about,sidebar:sidebar}
    },
    {
      path:'/admin/signIn',
      component:signIn
    },
    {
      path:'/admin/background',
      component:background,
      redirect:'/admin/background/articles',
      children:[
        {
          path:'users',
          component:Users
        },
        {
          path:'userEdit',
          component:UserEdit
        },
        {
          path:'articles',
          component:articles
        }
      ]
    },{
      path:'/admin/editArticle/:id',
      component:EditArticle
    },{
      path:'/admin/addArticle',
      component:AddArticle
    }
  ]
})
