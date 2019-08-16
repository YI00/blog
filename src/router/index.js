import Vue from 'vue'
import Router from 'vue-router'
import article from '@/components/article.vue'
import sidebar from '@/subcomponents/sidebar.vue'
import articleDetail from '@/components/articleDetail.vue'
import about from '@/components/about.vue'
import signIn from '@/components/admin/signIn.vue'
import background from '@/components/admin/background.vue'


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
      component:background
    }
  ]
})
