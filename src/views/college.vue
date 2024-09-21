<template>
    <div style="margin: 0 auto;width: calc(100vw - 230px);">
      <div class="searchtop" >
        <el-form :inline="true" :model="collegeform">
      <el-form-item label="学校代码" prop="id">
				<el-input-number v-model="collegeform.code" controls-position="right" :min="10001" />
			</el-form-item>
			<el-form-item label="学校名称">
				<el-input v-model="collegeform.name" placeholder="请输入学校名称" ></el-input>
			</el-form-item>
			<el-form-item label="" style="width: 200px">
				<el-select v-model="collegeform.level" placeholder="学校级别" clearable >
					<el-option
						v-for="item in levellist"
						:key="item"
						:label="item"
						:value="item"
            
					/>
				</el-select>
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
      <el-table :data="colleges" style="margin: 20px auto;">
        <el-table-column label="学校代码" prop="code"/>
        <el-table-column label="中文名" prop="name"/>
        <el-table-column label="级别" prop="level"/>
        <el-table-column label="学校类型" prop="type"/>
        <el-table-column label="联系电话" prop="phone"/>
        <el-table-column label="联系邮箱" prop="email"/>
        <el-table-column label="地址" prop="address"/>
        <el-table-column align="center" label="操作" width="200px">
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
      <!-- <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :small="small"
      :disabled="disabled"
      background
      layout=" jumper, prev, pager, next"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    </div>
    
    </div>
    <el-dialog
        title="添加学校信息"
        v-model="add_dialog_visible"
        width="30%"
        :before-close="handleClose"
    >
      <el-form
          ref="ruleFormRef"
          :model="collegeform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
      <el-form-item label="学校代码" prop="code">
          <el-input v-model="collegeform.code" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="中文名" prop="name">
          <el-input v-model="collegeform.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-input v-model="collegeform.level" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="学校类型" prop="type">
          <el-input v-model.number="collegeform.type" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="collegeform.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="collegeform.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="collegeform.address" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑学校页面 -->
    <el-dialog
        title="编辑学校信息"
        v-model="edit_dialog_visible"
        width="30%"
        :before-close="handleClose"
    >
      <el-form
          ref="editFormRef"
          :model="collegeform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-form-item label="学校代码" prop="code">
          <el-input v-model="collegeform.code" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="中文名" prop="name">
          <el-input v-model="collegeform.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-input v-model="collegeform.level" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="学校类型" prop="type">
          <el-input v-model.number="collegeform.type" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="collegeform.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="collegeform.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="collegeform.address" autocomplete="off"/>
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
import { v4 as uuid4 } from 'uuid'
  import {reactive, ref, onMounted} from "vue";
  import {ElMessageBox,ElMessage} from 'element-plus'
  export default {
    name: "college",
    data() {
      return {
        levellist:['985','211','双一流'],
        edit_dialog_visible:false,
        add_dialog_visible:false,
        colleges:[],
        collegeform:{
          id:"",
          code: "",
          name: "",
          level: "",
          type: "",
          phone: "",
          email: "",
          address: "",
          account:"123",
          password:"123",
          remark:"1",
          currentPage:4,
          pageSize:10
        }
      };
    },
    setup()
    {
      const ruleFormRef = ref()
      const editFormRef = ref()
      const resetForm=(formEl)=>{
        console.log("111111")
          formEl.resetFields()
          console.log("2222222222")
        }
        return{
          ruleFormRef,
          editFormRef,
          resetForm
        }
    },
    mounted() {
       this.getColleges();
    },
    
    methods: {
      // handelCurrentChange(page) {
      //       this.currentPage= page
      //       // currentPage.value = 1
      //       const index = this.pageSize * (page - 1)
      //       const nums = this.pageSize * page
      //       const tables = []
      //       for (let i = index; i < nums; i++) {
      //           if (this.colleges[i]) tables.push(this.colleges[i])
      //       }
      //       currentTableData = tables
      //   },
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
       getColleges() {
          axios.get('http://localhost:9099/college/findAll').then(res => {
              // 处理返回的数据
              console.log(res.data);
              this.colleges.splice(0, this.colleges.length)
              this.colleges.push(...res.data)
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
              axios.delete(`http://localhost:9099/college/deleteById/${scope.id}`).then(() => {
                this.getColleges()
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
          // axios.delete(`http://localhost:9099/college/${scope.id}`).then(() => {
          //   this.getColleges()
          // })
      },
      handleEdit(index, scope){
        for (let key in scope) {
          this.collegeform[key] = scope[key]
        }
        this.edit_dialog_visible = true
        console.log(this.colleges[this.colleges.length-1].id);
        console.log("33333333333333");
        console.log(index);
        console.log(this.colleges[index].id);
        this.collegeform.id=this.colleges[index].id;
      },
      // 编辑提交按钮
      submitEditForm(formEl){
        axios.put(`http://localhost:9099/college/updateCollege`, this.collegeform).then((res) => {
          
          formEl.resetFields()
          this.edit_dialog_visible = false
          this.getColleges()
        })
      },
      searchResult(){
        console.log(this.collegeform)
        axios.post(`http://localhost:9099/college/searchCollege`, this.collegeform).then((res) => {
          
          console.log(res.data);
          
          if(res.data.length)
          {
            this.colleges.splice(0, this.colleges.length)
            this.colleges.push(...res.data)
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
        this.collegeform.id= this.colleges[this.colleges.length-1].id+1;
        axios.post('http://localhost:9099/college/addCollege', this.collegeform).then(() => {
          
          this.add_dialog_visible = false
          this.resetForm(formEl)
          this.getColleges()
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
  