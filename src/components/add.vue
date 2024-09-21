<template>
    <el-form ref="formRef" :model="newBook" label-width="120px" :rules="rules">
        <el-form-item label="书号" prop="id">
            <el-input v-model="newBook.id" />
        </el-form-item>
        <el-form-item label="书名" prop="name">
            <el-input v-model="newBook.name" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="newBook.author" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
            <el-input v-model="newBook.price" />
        </el-form-item>
        <el-form-item label="图片" prop="img">
            <el-input v-model="newBook.img" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
            <!-- <el-input v-model="newBook.type" /> -->
            <el-select v-model="newBook.type" class="m-2" placeholder="请选择书籍类型" size="large">
                <!-- <el-option v-for="item in booktypes" :key="item.id" :label="item.name" :value="item.value" /> -->
                <el-option label="最新" value="new" />
                <el-option label="热卖" value="hot" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addBookFn(formRef)">添加</el-button>
            <el-button @click="cancelFn">取消</el-button>
        </el-form-item>
    </el-form>
</template>
    
<script  setup>
import { reactive, ref } from 'vue';
// import { addBookApi,getBookTypeApi } from "@/api/crud"

const emit = defineEmits(['close', "ok"]);

const booktypes = reactive([]);

// const getBookType = () => {
//     getBookTypeApi()
//     .then(res=>{
//         if(res.data){
//             booktypes.length=0;
//             booktypes.push(...res.data);
//         }
//     })
// }

// getBookType();

const formRef = ref();
//  定义添加的书籍
const newBook = reactive({
    "id": "",
    "name": "",
    "author": "",
    "price": 0,
    "img": "",
    "type": ""
})



// 表单验证的规则
const rules = reactive({
    "id": [
        { required: true, message: '请输入书号', trigger: 'blur' }
    ],
    "name": [
        { required: true, message: '请输入书名', trigger: 'blur' }
    ],
    "author": [
        { required: true, message: '请输入作者', trigger: 'blur' }
    ],
    "price": [
        { required: true, message: '请输入价格', trigger: 'blur' }
    ],
    "img": [
        { required: true, message: '请输入图片地址', trigger: 'blur' }
    ],
    "type": [
        { required: true, message: '请输入类型', trigger: 'blur' }
    ],
})


// const addBookFn = (formEl) => {
//     if (!formEl) {
//         return;
//     }
//     console.log("newBook",newBook);

//     formEl.validate((isOk) => {
//         if (isOk) {
//             addBookApi(newBook)
//                 .then(res => {
//                     console.log(res);
//                     if (res.data) {
//                         // 添加成功
//                         alert("添加成功！");
//                         // 关闭弹窗
//                         emit("ok");
//                     }
//                 })
//                 .catch(err => {

//                 })
//         }
//     })


// }

const cancelFn = () => {
    emit('close');
}



</script>