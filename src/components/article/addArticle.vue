<template>
    <div>
      <el-form :label-position="'left'" label-width="60px" >
        <el-form-item label="标 题" prop="title">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="title">
          <el-input v-model="gist"></el-input>
        </el-form-item>
     </el-form>
      <div class="tag_wrap">
        <span>标签: </span>
        <el-tag
            class="tag_margin"
            :key="tag"
            v-for="tag in labels"
            :closable="true"
            :close-trasition="true"
            @close="handleClose(tag)"
            type="primary"
        >{{ tag }}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
        <mavon-editor 
            v-model="content" 
            ref="md" 
            @change="change" 
            style="min-height: 600px"
        />

        <button @click="submit">提交</button>
    </div>
</template>



<script>
import { throws } from 'assert';
export default {
    data() {
        return {
            content:'', // 输入的markdown
            html:'',    // 及时转的html
            title:'',//标题
            inputVisible: false,
            inputValue: '',
            gist:'',
            labels:[]
        }
    },
    // mounted(){
    //     if(this.$route.params.id){
    //         const res=this.$axios.get('/api/articleDetail/'+this.$route.params.id)
    //         this.content = res.data.content
    //         this.html = res.data.html
    //         this.title = res.data.title
    //         this.date = res.data.date
    //         this.gist = res.data.gist
    //         this.labels = res.data.labels
    //         console.log(res)
    //     }
    // },
    methods: {
        // element标签组件
      handleClose: function (tag) {
        this.labels.splice(this.labels.indexOf(tag), 1)
      },
      showInput: function () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm: function () {
        let inputValue = this.inputValue
        if (inputValue) this.labels.push(inputValue)
        this.inputVisible = false
        this.inputValue = ''
      },
        // 所有操作都会被解析重新渲染
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
        // 提交
       async submit(){
            console.log(this.content);
            console.log(this.html);
            const html = this.html
            const md = this.render
            const res = await this.$axios.post('/api/admin/saveArticle',
            {
              html:html,
              md:this.content,
              date:new Date(),
              gist:this.gist,
              labels:this.labels,
              title:this.title
            })
            if(res.data.code==1){
                this.$message({
                    type:'success',
                    message:res.data.message
                })
                this.$router.push('/admin/background')
            }
        }
    },
    mounted() {
        
    }
}
</script>