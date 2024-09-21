<template>
    <input type="text"  v-model="state.userMessage" v-on:keypress="txtMsgOnkeypress"/>
    <input type="text"  v-model="state.userMessage1" v-on:keypress="txtMsgOnkeypress1"/>
    <div><ul>
        <li v-for="(msg,index) in state.messages" :key="index">{{msg}}</li>
    </ul></div>
  </template>
  
  <script setup>
  import { ref, reactive,onMounted} from 'vue'
  import * as signalR from "@microsoft/signalr";
  const state = reactive({
    userMessage: '',
    userMessage1: '',
    messages: [],
    userId:"2223333"
  })
  
  var connection;
  const userId=11111;
  const txtMsgOnkeypress = async (e) => {
    if (e.key !== 'Enter') return;
    else{
     await connection.invoke("SendPublicMessage", state.userMessage);//客户端向服务器端发送消息
     state.userMessage = '';
    }
  }
  const txtMsgOnkeypress1 = async (e) => {
    if (e.key !== 'Enter') return;
    else{
     await connection.send("SendMessage", state.userId, state.userMessage1);//客户端向服务器端发送消息
     state.userMessage1 = '';
    }
  }
  
   onMounted(() => {
    //skipNegotiation 跳过协商  transport指定传输方式
    const options = { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets  };
    connection = new signalR.HubConnectionBuilder()
                      .withUrl('http://localhost:9090/chathub',options)
                      .withAutomaticReconnect().build();
    connection.start();
     connection.on("ReceivePublicMessage", (message) => {
      //监听服务器端发送过来的消息
     state.messages.push(message);
   })
   connection.on("ReceiveMessage", (message) => {
      //监听服务器端发送过来的消息
     state.messages1.push(message);
   })
   })
  
  </script>
  
  <style scoped>
  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
  }
  
  h3 {
    font-size: 1.2rem;
  }
  
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
  
  @media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
      text-align: left;
    }
  }
  </style>
  
  