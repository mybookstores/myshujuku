<template>
    <div style="margin: 0 auto;width: calc(100vw - 230px);">
      <div class="searchtop" >
        <el-form :inline="true" :model="studentform">
            <el-form-item label="准考证号">
				<el-input v-model="studentform.idcard" placeholder="请输入准考证号" ></el-input>
			</el-form-item>
			<el-form-item label="学生姓名">
				<el-input v-model="studentform.nickname" placeholder="请输入学生姓名" ></el-input>
			</el-form-item>
			<el-form-item label="" style="width: 200px">
				<el-select v-model="studentform.status" placeholder="学生状态" clearable >
					<el-option
						v-for="item in statuslist"
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
      <el-table :data="students" style="margin: 20px auto;">
        <el-table-column label="学生姓名" prop="nickname"/>
        <el-table-column label="联系电话" prop="phone"/>
        <el-table-column label="联系邮箱" prop="email"/>
        <el-table-column label="性别" prop="sex"/>
        <el-table-column label="出生年月" prop="birth"/>
        <el-table-column label="分数" prop="score"/>
        <el-table-column label="学校" prop="collegename"/>
        <el-table-column align="center" label="操作" width="300px">
          <template #default="scope" >
            <el-button  color="#26a1f0"  style="color: #fff;" @click="handleInfo(scope.$index, scope.row)">
              详细资料
            </el-button>
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
    <el-drawer
    v-model="info_dialog_visible"
    title="学生详细信息"
    direction="rtl"
    class="demo-drawer"
  >
  <el-form
          ref="editFormRef"
          :model="studentform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
      
        <el-form-item label="学生姓名" prop="nickname">
          <el-input v-model="studentform.nickname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="准考证号" prop="idcard">
          <el-input v-model="studentform.idcard" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="studentform.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model.number="studentform.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="studentform.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="studentform.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="studentform.address" autocomplete="off"/>
        </el-form-item>
            <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="studentform.sex">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
            <el-date-picker
                v-model="studentform.birth"
                type="date"
                placeholder="请选择您的出生年月"
                style="width: 100%"
            />
        </el-form-item>
        <el-form-item label="报考类型"  prop="examtype" >
      <el-select v-model="studentform.examtype" placeholder="请选择您的报考类型">
        <el-option label="国家计划外委培" value="国家计划外委培" />
        <el-option label="国家计划内非定向" value="国家计划内非定向" />
      </el-select>
    </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="studentform.score" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="学校" prop="collegename">
          <el-input v-model="studentform.collegename" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="报考年份" prop="examtime">
          <el-input v-model="studentform.examtime" autocomplete="off"/>
        </el-form-item>
       
        
      </el-form>
  </el-drawer>
    <el-dialog
        title="添加学生信息"
        v-model="add_dialog_visible"
        width="45%"
        :before-close="handleClose"
    >
      <el-form
          ref="ruleFormRef"
          :model="studentform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
      <div class="myform">
        <div  class="myformleft">
            <el-form-item label="学生姓名" prop="nickname">
          <el-input v-model="studentform.nickname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="准考证号" prop="idcard">
          <el-input v-model="studentform.idcard" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="studentform.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model.number="studentform.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="studentform.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="studentform.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="studentform.address" autocomplete="off"/>
        </el-form-item>
        </div>
        <div  class="myformright">
            <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="studentform.sex">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
            <el-date-picker
                v-model="studentform.birth"
                type="date"
                placeholder="请选择您的出生年月"
                style="width: 100%"
            />
        </el-form-item>
        <el-form-item label="报考类型"  prop="examtype" >
      <el-select v-model="studentform.examtype" placeholder="请选择您的报考类型">
        <el-option label="国家计划外委培" value="国家计划外委培" />
        <el-option label="国家计划内非定向" value="国家计划内非定向" />
      </el-select>
    </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="studentform.score" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="学校" prop="collegename">
          <el-input v-model="studentform.collegename" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="报考年份" prop="examtime">
          <el-input v-model="studentform.examtime" autocomplete="off"/>
        </el-form-item>
        </div>
      </div>
      <div class="myformbottom">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </div>
        
      </el-form>
    </el-dialog>
    <!-- 编辑学校页面 -->
    <el-dialog
        title="编辑学生信息"
        v-model="edit_dialog_visible"
        width="45%"
        :before-close="handleClose"
    >
      <el-form
          ref="editFormRef"
          :model="studentform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
      <div class="myform">
        <div  class="myformleft">
            <el-form-item label="学生姓名" prop="nickname">
          <el-input v-model="studentform.nickname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="准考证号" prop="idcard">
          <el-input v-model="studentform.idcard" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="studentform.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model.number="studentform.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="studentform.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="studentform.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="studentform.address" autocomplete="off"/>
        </el-form-item>
        </div>
        <div  class="myformright">
            <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="studentform.sex">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
            <el-date-picker
                v-model="studentform.birth"
                type="date"
                placeholder="请选择您的出生年月"
                style="width: 100%"
            />
        </el-form-item>
        <el-form-item label="报考类型"  prop="examtype" >
      <el-select v-model="studentform.examtype" placeholder="请选择您的报考类型">
        <el-option label="国家计划外委培" value="国家计划外委培" />
        <el-option label="国家计划内非定向" value="国家计划内非定向" />
      </el-select>
    </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="studentform.score" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="学校" prop="collegename">
          <el-input v-model="studentform.collegename" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="报考年份" prop="examtime">
          <el-input v-model="studentform.examtime" autocomplete="off"/>
        </el-form-item>
        </div>
      </div>
      <div class="myformbottom">
        <el-form-item>
          <el-button type="primary" @click="submitEditForm(editFormRef)">提交</el-button>
          <el-button @click="resetForm(editFormRef)">重置</el-button>
        </el-form-item>
      </div>
        
        
      </el-form>
    </el-dialog>
  </template>
  
  <script>
  import axios from 'axios'
import { v4 as uuid4 } from 'uuid'
  import {reactive, ref, onMounted} from "vue";
  import {ElMessageBox,ElMessage} from 'element-plus'
  export default {
    name: "student",
    data() {
      return {
        statuslist:['未录取','已录取','已调剂'],
        edit_dialog_visible:false,
        add_dialog_visible:false,
        info_dialog_visible:false,
        students:[],
        studentform:{
          id:"",
          nickname: "",
          idcard: "",
          sex: "",
          birth: "",
          phone: "",
          email: "",
          address: "",
          account:"123",
          password:"123",
          examtype:"",
          score:"",
          collegename:"",
          examtime:"",
          status:""
          
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
       this.getStudents();
    },
    
    methods: {
      // handelCurrentChange(page) {
      //       this.currentPage= page
      //       // currentPage.value = 1
      //       const index = this.pageSize * (page - 1)
      //       const nums = this.pageSize * page
      //       const tables = []
      //       for (let i = index; i < nums; i++) {
      //           if (this.students[i]) tables.push(this.students[i])
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
       getStudents() {
          axios.get('http://localhost:9099/student/findAll').then(res => {
              // 处理返回的数据
              console.log(res.data);
              this.students.splice(0, this.students.length)
              this.students.push(...res.data)
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
              axios.delete(`http://localhost:9099/student/deleteById/${scope.id}`).then(() => {
                this.getStudents()
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
          // axios.delete(`http://localhost:9099/student/${scope.id}`).then(() => {
          //   this.getStudents()
          // })
      },
      handleEdit(index, scope){
        for (let key in scope) {
          this.studentform[key] = scope[key]
        }
        this.edit_dialog_visible = true
        console.log(this.students[this.students.length-1].id);
        console.log("33333333333333");
        console.log(index);
        console.log(this.students[index].id);
        this.studentform.id=this.students[index].id;
      },
      handleInfo(index, scope){
        for (let key in scope) {
          this.studentform[key] = scope[key]
        }
        this.info_dialog_visible = true
      },
      // 编辑提交按钮
      submitEditForm(formEl){
        axios.put(`http://localhost:9099/student/updateStudent`, this.studentform).then((res) => {
          
          formEl.resetFields()
          this.edit_dialog_visible = false
          this.getStudents()
        })
      },
      searchResult(){
        console.log(this.studentform)
        axios.post(`http://localhost:9099/student/searchStudent`, this.studentform).then((res) => {
          
          console.log(res.data);
          
          if(res.data.length)
          {
            this.students.splice(0, this.students.length)
            this.students.push(...res.data)
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
        this.studentform.id= this.students[this.students.length-1].id+1;
        axios.post('http://localhost:9099/student/addStudent', this.studentform).then(() => {
          
          this.add_dialog_visible = false
          this.resetForm(formEl)
          this.getStudents()
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
.myform{
    display: flex;
    justify-content: center;
    // align-items: center;
}
.myformleft{
    // float:left;
    width:350px;
    margin-left: -50px;
}
.myformright{
    width:350px;
}
.myformbottom{
    width: 620px;
    display: flex;
    justify-content: center;
}
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
  