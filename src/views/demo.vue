<template>
    <el-container class="layout-container-demo" >
        
        <el-container >
            <el-header class="header"  >
                <el-icon style="margin-top: 2px;margin-right:10px;"><Expand /></el-icon><h3 class="headertext" style="margin-right: 10px;">考研信息管理系统</h3>
            </el-header>
            <el-aside width="230px" class="sidebar">
            <el-scrollbar>
            <el-menu :default-openeds="['1']" active-text-color="#756aff" >
            
                <el-menu-item index="1" @click="gopage1('/college')"><el-icon><OfficeBuilding /></el-icon>学校信息</el-menu-item>
                <el-menu-item index="2" @click="gopage1('/student')"><el-icon><User /></el-icon>个人信息</el-menu-item>
                <el-menu-item index="3" @click="gopage1('/major')"><el-icon><Tickets /></el-icon>专业信息</el-menu-item>
                <el-menu-item index="4" @click="gopage1('/willadd')"><el-icon><Pointer /></el-icon>志愿填报</el-menu-item>
                
                <el-sub-menu index="5">
                <template #title><el-icon><Menu /></el-icon>志愿管理</template>
                <el-menu-item index="5-1"  @click="gopage1('/willone')"><el-icon><StarFilled /></el-icon>第一志愿</el-menu-item>
                <el-menu-item index="5-2"  @click="gopage1('/willtwo')"><el-icon><Promotion /></el-icon>调剂志愿</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="6" @click="gopage1('/bar')"><el-icon><DataAnalysis /></el-icon>历年分数</el-menu-item>
                <el-menu-item index="7" @click="gopage1('/total')"><el-icon><Histogram /></el-icon>统计数据</el-menu-item>
                
            </el-menu>
            </el-scrollbar>
        </el-aside>
        
        
      </el-container>
      <el-main  class="mymain">
            <div class="content">
                <router-view></router-view>
            </div>
        </el-main>
    </el-container>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { Menu, StarFilled, Promotion,User,Expand,Histogram,Tickets,DataAnalysis,OfficeBuilding,Pointer } from '@element-plus/icons-vue'
  import AddBook from "../components/add.vue";
  export default {
    name: "test1",
    data() {
      return {
        activeItem:""
      };
    },
    components:{
        User,
        Tickets,
        DataAnalysis,
        Menu,
        StarFilled,
        Promotion,
        OfficeBuilding,
        Expand,
        Pointer,
        Histogram
        
    },
    setup()
    {
        // const item = {
        //     date: '2016-05-02',
        //     name: 'Tom',
        //     address: 'No. 189, Grove St, Los Angeles',
        // }
        // const tableData = ref(Array.from({ length: 20 }).fill(item))
        // return{
        //     item,
        //     tableData
        // }
    },
    mounted() {
    //   this.sidebarItem = this.$route.name;
    },
    methods: {
       getData() {
          axios.get('http://localhost:9099/college/findAll').then(response => {
              // 处理返回的数据
              console.log(response.data);
          })
          .catch(error => {
              // 处理错误
              console.error(error);
          });
      },
      changeSidebar(name) {
        // this.sidebarItem = name;
        this.$router.push({
          path: name,
        });
        this.activeItem=name;
      },
      gopage1(url)
      {
        
        this.$router.push(url)
      }
    },
  };

  </script>
  
  <style lang="scss" scoped>
  *{
    margin:0px;
    padding: 0px;
  }
  

  .mymain
  {
    background-color:#efefef;
  }
  .header{
    display:flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    background: #fff;
    color:#756aff;
    height:70px;
  }
  
  
  .sidebar{
    width:230px;
    

  }
//   .el-menu{
//         width: 230px;
//     }
//     .el-menu-item{
//         width: 230px;
//     }
// .el-scrollbar{
//     width: 230px;
// }
  .layout-container-demo {
    width:100vw;
    height:100vh;
  }
  .layout-container-demo .el-header {
    position: relative;
    // background-color: var(--el-color-primary-light-7);
    // color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
    
  }
  .layout-container-demo .el-menu {
    border-right: none;
  }
  .layout-container-demo .el-main {
    padding: 0;
  }
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
  </style>
  