<template>
    <el-form ref="formRef" :model="editBook" label-width="120px" :rules="rules">
        <el-form-item label="书号" prop="id">
            <el-input v-model="editBook.id" />
        </el-form-item>
        <el-form-item label="书名" prop="name">
            <el-input v-model="editBook.name" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="editBook.author" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
            <el-input v-model="editBook.price" />
        </el-form-item>
        <el-form-item label="图片" prop="img">
            <el-input v-model="editBook.img" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
            <el-input v-model="editBook.type" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="editBookFn(formRef)">修改</el-button>
            <el-button @click="cancelFn">取消</el-button>
        </el-form-item>
    </el-form>
</template>
    
<script  setup>
import { reactive, ref,watch } from 'vue';
import { getBookDetailApi,editBookApi } from '@/api/crud';

const props = defineProps(["id"]);

const formRef = ref();

//  定义修改的书籍
const editBook = reactive({
    "id": "",
    "name": "",
    "author": "",
    "price": 0,
    "img": "",
    "type": ""
})


// 获取当前修改的书籍信息
const getBookDetail = async () => {
    try {
        const res = await getBookDetailApi(props.id);
        // editBook = res.data;
        for(let key in editBook){
            editBook[key] = res.data[key];
        }

    } catch (err) {
        console.log("服务器出错",err);
    }
}

console.log("props",props);

watch(props,()=>{
    console.log("props.id变了");
    getBookDetail();
},{deep:true,immediate:true})

const emit = defineEmits(['close', "ok"]);

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

const editBookFn = (formEl) => {
    if (!formEl) {
        return;
    }

    formEl.validate((isOk) => {
        if (isOk) {
            editBookApi(props.id,editBook)
                .then(res => {
                    console.log(res);
                    if (res.data) {
                        alert("修改成功！");
                        // 关闭弹窗
                        emit("ok");
                    }
                })
                .catch(err => {

                })
        }
    })


}


const cancelFn = () => {
    emit('close');
}


</script>