<template>
    <div class="container" style="width:100%;">
        <Chatlist></Chatlist>
        <div v-if="!switchStore.isChat && !switchStore.isGroupChat" class="nullBox">
            <div>
                <img style="margin-top: 2rem" src="../../assets/img/2.png">
                <div class="nulltetx">快去找好友聊天吧~</div>
            </div>
        </div>
        <Friendlist v-if="false"></Friendlist>
        <Grouplist v-if="false"></Grouplist>
        <Chatlist></Chatlist>
    </div>
</template>

<script setup>
import Chatlist from './components/chatlist.vue'
import Friendlist from './components/friendlist.vue'
import Grouplist from './components/grouplist.vue'
import Searchinfo from './components/searchinfo.vue'
// import friendlist from './components/friendlist.vue'
// import useSwitchStore from '../../store/modules/switch'

const switchStore = useSwitchStore()


</script>

<style scoped>
.container {
    width: 100%;
    animation: ani 1s;
}

@keyframes ani {
    0% {
        transform: translateX(600px);
    }

    100% {
        transform: translateX(0px);
    }
}

.nullBox {
    width: 95.5%;
    height: 400px;
    /* background-color: red; */
    border-bottom: rgba(121, 163, 159, 0.3) 1px solid;
    overflow-y: scroll;
    overflow: auto;
    padding: 15px;
    display: flex;
    justify-content: center;
}
.nulltetx {
    margin-left: 90px;
    margin-top: 10px;
}
</style>