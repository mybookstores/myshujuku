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
            <el-button  color="#ff6b9a" style="color:#fff;" @click="handleEdit(scope.$index, scope.row)">
              专业
            </el-button>
            
          </template>
        </el-table-column>
      </el-table>
      
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
        title="填报第一志愿"
        v-model="edit_dialog_visible"
        width="30%"
        :before-close="handleClose"
    >
    <el-table :data="majors" style="margin: 20px auto;">
        <el-table-column label="专业名称" prop="name"/>
        <el-table-column label="专业代码" prop="code"/>
        <el-table-column align="center" label="操作" width="200px">
          <template #default="scope" >
            <el-button  color="#626aef"  @click="handleEdit1(scope.$index, scope.row)">
              分数线
            </el-button>
            <el-button  color="#b692db" style="color: #fff;"
                type="danger"
                @click="handleEdit2(scope.$index, scope.row)">填报</el-button>
          </template>
        </el-table-column>
      </el-table>
        
    </el-dialog>
    <el-dialog
        title="分数线"
        v-model="edit1_dialog_visible"
        width="35%" style="margin-top:150px;"
        :before-close="handleClose"
    >
    <el-table :data="bars" style="margin: 20px auto;">
        <el-table-column  align="center"  label="年份" prop="year"/>
        <el-table-column  align="center" label="最低分" prop="minscore"/>
        <el-table-column  align="center" label="最高分" prop="maxscore"/>
        <el-table-column  align="center" label="平均分" prop="avgscore"/>
        <el-table-column  align="center" label="录取人数" prop="people"/>
          
      </el-table>
        
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
        edit1_dialog_visible:false,
        add_dialog_visible:false,
        colleges:[],
        majors:[],
        bars:[],
        wills:[],
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
          remark:"1"
        },
        willform:{
          id:"",
          majorid: "",
          studentid: "1",
          status: "审核中",
          applytime: "2025",
          type: "1"
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
       this.getWills();
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
      getWills() {
          axios.get('http://localhost:9099/willadd/findAll').then(res => {
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
        //   axios.delete(`http://localhost:9099/college/${scope.id}`).then(() => {
        //     this.getColleges()
        //   })
      },
      handleEdit(index, scope){
        for (let key in scope) {
          this.collegeform[key] = scope[key]
        }
        this.edit_dialog_visible = true
        
        this.collegeform.id=this.colleges[index].id;
        console.log(this.colleges[index].id);
        axios.post(`http://localhost:9099/willadd/findByCollege/${this.colleges[index].id}` ).then((res) => {
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
      handleEdit2(index, scope){
        
        this.edit_dialog_visible = false
        
        var maxid=0;
        for(var i=0;i<this.wills.length;i++)
        {
            if(maxid<this.wills[i].id)
            {
                maxid=this.wills[i].id;    
            }    
        }
        console.log("ffffffffff");
        console.log(maxid);
        this.willform.id= maxid+1;
        this.willform.majorid=this.majors[index].id;
        console.log(this.willform.id);
        axios.post("http://localhost:9099/willadd/addWillone" ,this.willform).then((res) => {
            console.log(res.data);
            ElMessage({
                type: 'success',
                message: '填报成功',
              })
            // this.majors.splice(0, this.majors.length)
            // this.majors.push(...res.data)
            // console.log(response.data);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });

      },
      handleEdit1(index, scope){
        // for (let key in scope) {
        //   this.collegeform[key] = scope[key]
        // }
        this.edit1_dialog_visible = true
        
        // this.collegeform.id=this.colleges[index].id;
        // console.log(this.colleges[index].id);
        axios.post(`http://localhost:9099/willadd/findByMajor/${this.majors[index].id}` ).then((res) => {
            console.log(res.data);
            this.bars.splice(0, this.bars.length)
            this.bars.push(...res.data)
            // console.log(response.data);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });

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
  