<template>
    <div style="margin: 0 auto;width: calc(100vw - 230px);">
      <div class="searchtop" >
        <el-form :inline="true" :model="majorform">
      <el-form-item label="专业代码" prop="id">
				<el-input-number v-model="majorform.code" controls-position="right" :min="20001" />
			</el-form-item>
			<el-form-item label="专业名">
				<el-input v-model="majorform.name" placeholder="请输入专业名称" ></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button
					type="primary"
					style="margin-left: -16px;color: #fff;"
					@click="searchResult" color="#26aefc" 
				>
					查询
				</el-button>
			</el-form-item>
		</el-form>
      </div>
      
     
      <!-- 数据表格 -->
      <div class="table">
        <div class="insert">
            <!--  添加图书按钮 -->
          <el-button type="primary" @click="add_dialog_visible = true" color="#d11579">新增</el-button>
        </div>
      <el-table :data="majors" style="margin: 20px auto;">
        <el-table-column label="学校名称" prop="collegename"/>
        <el-table-column label="学校代码" prop="collegecode"/>
        <el-table-column label="专业名称" prop="name"/>
        <el-table-column label="专业代码" prop="code"/>
        <el-table-column align="center" label="操作" width="300px">
          <template #default="scope" >
            <el-button  color="#626aef"  @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button  color="#b692db" style="color: #fff;"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    
    </div>
    <el-dialog
        title="添加专业信息"
        v-model="add_dialog_visible"
        width="30%"
        :before-close="handleClose"
    >
      <el-form
          ref="ruleFormRef"
          :model="majorform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
      <el-form-item label="学校代码" prop="collegecode">
          <el-input v-model="majorform.collegecode" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="专业名称" prop="name">
          <el-input v-model="majorform.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="专业代码" prop="code">
          <el-input v-model="majorform.code" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑学校页面 -->
    <el-dialog
        title="编辑专业信息"
        v-model="edit_dialog_visible"
        width="30%"
        :before-close="handleClose"
    >
      <el-form
          ref="editFormRef"
          :model="majorform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
      
        <el-form-item label="专业名称" prop="name">
          <el-input v-model="majorform.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="专业代码" prop="code">
          <el-input v-model="majorform.code" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm(editFormRef)">提交</el-button>
          <el-button @click="resetForm(editFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </template>
  
  <script>
  import axios from 'axios'
  import {reactive, ref, onMounted} from "vue";
  import {ElMessageBox,ElMessage} from 'element-plus'
  export default {
    name: "major",
    data() {
      return {
        edit_dialog_visible:false,
        add_dialog_visible:false,
        majors:[],
        majorform:{
          id:"",
          code: "",
          name: "",
          collegename:"",
          collegecode:""
        }
      };
    },
    setup()
    {
      const ruleFormRef = ref()
      const editFormRef = ref()
      const resetForm=(formEl)=>{
        
          formEl.resetFields()
        }
        return{
          ruleFormRef,
          editFormRef,
          resetForm
        }
    },
    mounted() {
       this.getMajors();
    },
    
    methods: {
      
        handleClose(done){
        ElMessageBox.confirm('确认关闭？',{
              confirmButtonText: '确认',
              cancelButtonText: '取消'
            })
            .then(() => {
              done();
            })
            .catch(() => {
            });
      },
       getMajors() {
          axios.get('http://localhost:9099/major/findAll').then(res => {
              // 处理返回的数据
              console.log(res.data);
              this.majors.splice(0, this.majors.length)
              this.majors.push(...res.data)
              // console.log(response.data);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
      },
      handleDelete(index, scope){
          console.log(scope.id);
          console.log("ddddddddd");
          ElMessageBox.confirm(
            '确认是否删除?',
            '警告',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            }
          )
            .then(() => {
              axios.delete(`http://localhost:9099/major/deleteById/${scope.id}`).then(() => {
                this.getMajors()
              })
              ElMessage({
                type: 'success',
                message: '删除成功',
              })
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '取消删除',
              })
            })
          // axios.delete(`http://localhost:9099/major/${scope.id}`).then(() => {
          //   this.getMajors()
          // })
      },
      handleEdit(index, scope){
        for (let key in scope) {
          this.majorform[key] = scope[key]
        }
        this.edit_dialog_visible = true
        console.log(this.majors[this.majors.length-1].id);
        console.log("33333333333333");
        console.log(index);
        console.log(this.majors[index].id);
        this.majorform.id=this.majors[index].id;
      },
      // 编辑提交按钮
      submitEditForm(formEl){
        axios.put(`http://localhost:9099/major/updateMajor`, this.majorform).then((res) => {
          
          formEl.resetFields()
          this.edit_dialog_visible = false
          this.getMajors()
        })
      },
      searchResult(){
        console.log(this.majorform)
        axios.post(`http://localhost:9099/major/searchMajor`, this.majorform).then((res) => {
          
          console.log(res.data);
          
          if(res.data.length)
          {
            this.majors.splice(0, this.majors.length)
            this.majors.push(...res.data)
          }
          else{
            ElMessage({
                type: 'info',
                message: '未搜索到结果',
              })
          }

        })
      },
      changeSidebar(name) {
        // this.sidebarItem = name;
        this.$router.push({
          path: name,
        });
        this.activeItem=name;
      },
      submitForm(formEl){
        var maxid=0;
        for(var i=0;i<this.majors.length;i++)
        {
            if(maxid<this.majors[i].id)
            {
                maxid=this.majors[i].id;    
            }    
        }
        this.majorform.id= maxid+1;
        // console.log(this.majorform.id);
        axios.post('http://localhost:9099/major/addMajor', this.majorform).then(() => {
          
          this.add_dialog_visible = false
          this.resetForm(formEl)
          this.getMajors()
        })
      },
      gopage1(url)
      {
        
        this.$router.push(url)
      }
    },
  };

  
  </script>
  
<style lang="scss" scoped>

.searchtop{
  background-color: #fff;
  display: flex;
  align-items: center;
  height:70px;
  padding-top: 10px;
  padding-left: 20px;
  border-radius: 5px;
  margin-top: 10px;
  width: 95%;
  margin-left: 25px;
}

.table{
  background-color: #fff;
  padding:5px 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 95%;
  margin-left: 25px;
}
.insert{
  // background-color: rgb(46, 20, 69);
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: 10px;
}
</style>
  