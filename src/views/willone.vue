<template>
    <div style="margin: 0 auto;width: calc(100vw - 230px);">
      <div class="searchtop" >
        <el-form :inline="true" :model="willform">
            <el-form-item label="">
				<el-input v-model="willform.studentidcard" placeholder="请输入准考证号" ></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-input v-model="willform.studentnickname" placeholder="请输入学生姓名" ></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-input v-model="willform.collegename" placeholder="请输入学校名称" ></el-input>
			</el-form-item>
            <el-form-item label="">
				<el-input v-model="willform.majorname" placeholder="请输入专业名称" ></el-input>
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
        
      <el-table :data="wills" style="margin: 20px auto;">
        <el-table-column label="准考证号" prop="studentidcard"/>
        <el-table-column label="学生姓名" prop="studentnickname"/>
        <el-table-column label="申请学校" prop="collegename"/>
        <el-table-column label="意向专业" prop="majorname"/>
        <el-table-column label="考研分数" prop="studentscore"/>
        <el-table-column label="审核状态" prop="status"/>
        <el-table-column label="提交年份" prop="applytime"/>
        <el-table-column align="left" label="操作" width="200px">
          <template #default="scope" >
            <el-button  color="#756aff"  style="color: #fff;"  @click="handleInfo(scope.$index, scope.row)">
              资料
            </el-button>
            <el-button  color="#d11579" style="color: #fff;"
                type="danger" v-if="scope.row.status=='审核中'"
                @click="handleEdit(scope.$index, scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      
    </div>
    
    </div>
   
    <!-- 编辑学校页面 -->
    <el-dialog
        title="审核确认"
        v-model="edit_dialog_visible"
        width="20%" style="padding-left:30px;"
        :before-close="handleClose"
    >
      <el-form
          ref="editFormRef"
          :model="willform"
          status-icon
          label-width="70px"
          class="demo-ruleForm"
      >
    <el-form-item label="录取状态" prop="status">
            <el-radio-group v-model="willform.status">
                <el-radio value="已通过" >录取</el-radio>
                <el-radio value="已驳回">退回</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm(editFormRef)">提交</el-button>
          <el-button @click="resetForm(editFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  </template>
  
  <script>
  import axios from 'axios'
import { v4 as uuid4 } from 'uuid'
  import {reactive, ref, onMounted} from "vue";
  import {ElMessageBox,ElMessage} from 'element-plus'
  export default {
    name: "will",
    data() {
      return {
        edit_dialog_visible:false,
        add_dialog_visible:false,
        info_dialog_visible:false,
        wills:[],
        willform:{
          id:"",
          collegename:"",
          studentidcard:"",
          studentnickname:"",
          majorname:"",
          status:"",
          type:""
        },
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
       this.getWills();
    },
    
    methods: {
        handleInfo(index, scope){
        for (let key in scope) {
          this.studentform[key] = scope[key]
        }
        console.log(this.wills[index].studentidcard);
        axios.post(`http://localhost:9099/willone/findStudents/${this.wills[index].studentidcard}` ).then((res) => {
            console.log(res.data);
            this.studentform=res.data[0]
            this.info_dialog_visible = true
            // console.log(response.data);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
       

      },
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
       getWills() {
          axios.get('http://localhost:9099/willone/findAll').then(res => {
              // 处理返回的数据
              console.log(res.data);
              this.wills.splice(0, this.wills.length)
              this.wills.push(...res.data)
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
              axios.delete(`http://localhost:9099/willone/deleteById/${scope.id}`).then(() => {
                this.getWills()
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
          // axios.delete(`http://localhost:9099/will/${scope.id}`).then(() => {
          //   this.getWills()
          // })
      },
      handleEdit(index, scope){
        for (let key in scope) {
          this.willform[key] = scope[key]
        }
        this.edit_dialog_visible = true
        console.log(this.wills[this.wills.length-1].id);
        console.log("33333333333333");
        console.log(index);
        console.log(this.wills[index].id);
        this.willform.id=this.wills[index].id;
      },
      // 编辑提交按钮
      submitEditForm(formEl){
        console.log("hhhhhhhhhhhh"+this.willform.id)
        if(this.willform.status=='已通过')
        {
            this.willform.type='1';
        }
        else if(this.willform.status=='已驳回')
        {
            this.willform.type='2';
        }
        else{
            return;
        }
        axios.post(`http://localhost:9099/willone/applychoice`, this.willform).then((res) => {
          
          formEl.resetFields()
          this.edit_dialog_visible = false
          this.getWills()
        })
      },
      searchResult(){
        console.log(this.willform)
        axios.post(`http://localhost:9099/willone/searchWill`, this.willform).then((res) => {
          
          console.log(res.data);
          
          if(res.data.length)
          {
            this.wills.splice(0, this.wills.length)
            this.wills.push(...res.data)
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
        this.willform.id= this.wills[this.wills.length-1].id+1;
        axios.post('http://localhost:9099/will/addWill', this.willform).then(() => {
          
          this.add_dialog_visible = false
          this.resetForm(formEl)
          this.getWills()
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
  