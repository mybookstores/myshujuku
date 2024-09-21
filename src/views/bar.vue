<template>
    <div style="margin: 0 auto;width: calc(100vw - 230px);">
      <div class="searchtop" >
        <el-form :inline="true" :model="barform">
            <el-form-item label="学校名称">
				<el-input v-model="barform.collegename" placeholder="请输入学校名称" ></el-input>
			</el-form-item>
			<el-form-item label="专业名称">
				<el-input v-model="barform.majorname" placeholder="请输入专业名称" ></el-input>
			</el-form-item>
			<el-form-item label="年份">
				<el-input v-model="barform.year" placeholder="请输入年份" ></el-input>
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
      <el-table :data="bars" style="margin: 20px auto;">
        <el-table-column label="学校名称" prop="collegename"/>
        <el-table-column label="专业名称" prop="majorname"/>
        <el-table-column label="年份" prop="year"/>
        <el-table-column label="最低分" prop="minscore"/>
        <el-table-column label="最高分" prop="maxscore"/>
        <el-table-column label="平均分" prop="avgscore"/>
        <el-table-column label="录取人数" prop="people"/>
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
     
    </div>
    
    </div>
    <el-dialog
        title="添加分数情况"
        v-model="add_dialog_visible"
        width="30%"
        :before-close="handleClose"
    >
      <el-form
          ref="ruleFormRef"
          :model="barform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
      <el-form-item label="学校名称" prop="collegename">
          <el-input v-model="barform.collegename" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="专业名称" prop="majorname">
          <el-input v-model="barform.majorname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-input v-model="barform.year" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="最低分" prop="minscore">
          <el-input v-model="barform.minscore" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="最高分" prop="maxscore">
          <el-input v-model.number="barform.maxscore" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="平均分" prop="avgscore">
          <el-input v-model="barform.avgscore" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="录取人数" prop="people">
          <el-input v-model="barform.people" autocomplete="off"/>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑学校页面 -->
    <el-dialog
        title="编辑分数情况"
        v-model="edit_dialog_visible"
        width="30%"
        :before-close="handleClose"
    >
      <el-form
          ref="editFormRef"
          :model="barform"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
      
        <el-form-item label="专业名称" prop="majorname">
          <el-input v-model="barform.majorname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-input v-model="barform.year" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="最低分" prop="minscore">
          <el-input v-model="barform.minscore" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="最高分" prop="maxscore">
          <el-input v-model.number="barform.maxscore" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="平均分" prop="avgscore">
          <el-input v-model="barform.avgscore" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="录取人数" prop="people">
          <el-input v-model="barform.people" autocomplete="off"/>
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
    name: "bar",
    data() {
      return {
        edit_dialog_visible:false,
        add_dialog_visible:false,
        bars:[],
        collegelist:[],
        majorlist:[],
        barform:{
          id:"",
          majorname: "",
          collegename: "",
          year: "",
          minscore: "",
          maxscore: "",
          avgscore: "",
          people: ""
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
       this.getBars();
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
       getBars() {
          axios.get('http://localhost:9099/bar/findAll').then(res => {
              // 处理返回的数据
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
              axios.delete(`http://localhost:9099/bar/deleteById/${scope.id}`).then(() => {
                this.getBars()
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
          // axios.delete(`http://localhost:9099/bar/${scope.id}`).then(() => {
          //   this.getBars()
          // })
      },
      handleEdit(index, scope){
        for (let key in scope) {
          this.barform[key] = scope[key]
        }
        this.edit_dialog_visible = true
        console.log(this.bars[this.bars.length-1].id);
        console.log("33333333333333");
        console.log(index);
        console.log(this.bars[index].id);
        this.barform.id=this.bars[index].id;
      },
      // 编辑提交按钮
      submitEditForm(formEl){
        axios.put(`http://localhost:9099/bar/updateBar`, this.barform).then((res) => {
        //   console.log(res.data)
            if(res.data=="error")
          {
            ElMessage({
                type: 'warning',
                message: '该学校无此专业',
              })
          }
          formEl.resetFields()
          this.edit_dialog_visible = false
          this.getBars()
        })
      },
      searchResult(){
        console.log(this.barform)
        axios.post(`http://localhost:9099/bar/searchBar`, this.barform).then((res) => {
          
          console.log(res.data);
          
          if(res.data.length)
          {
            this.bars.splice(0, this.bars.length)
            this.bars.push(...res.data)
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
        for(var i=0;i<this.bars.length;i++)
        {
            if(maxid<this.bars[i].id)
            {
                maxid=this.bars[i].id;    
            }    
        }
        this.barform.id= maxid+1;
        axios.post('http://localhost:9099/bar/addBar', this.barform).then(() => {
          
          this.add_dialog_visible = false
          this.resetForm(formEl)
          this.getBars()
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
  