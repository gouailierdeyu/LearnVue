<template>
  <div id="app">
    <header class="">
        <nav class="nav navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-section">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="/index" class="navbar-brand">
                        <span class="glyphicon glyphicon-education"></span>
                        <span>会议系统</span>
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="nav-section">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="first-li">
                            <a href="/conference/edit" class="first-li-first-a" style="">
                                <div class="" style="">
                                    <span class="glyphicon glyphicon-plus"></span>
                                    <span>创建活动</span>
                                </div>
                            </a>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle text-center" data-toggle="dropdown" >
                                <img  v-bind:src= "sharedState.userMessage.headImgUrl" alt="" height="25" width="25" >
                                &nbsp;
                                <span v-cloak>{{sharedState.userMessage.realName|lengthLimit(5)}}</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="text-center">
                                    <a href="/account/index">
                                        <span class="glyphicon glyphicon-home"></span>
                                        &nbsp;
                                        <span>个人中心</span>
                                    </a>
                                </li>
                                <li class="text-center">
                                    <a href="/account/event">
                                        <span class="glyphicon glyphicon-bookmark"></span>
                                        &nbsp;
                                        <span>我的活动</span>
                                    </a>
                                </li>
                                <li class="text-center">
                                    <a href="javascript:void(0);" v-on:click="exitEvent()">
                                        <span class="glyphicon glyphicon-off"></span>
                                        &nbsp;
                                        <span>退出</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </header>



    <section class="container-fluid">
        <div class="row">
            <div class="col-sm-2">
                <ul class="nav nav-stacked">
                    <li id="myevent" >
                        <!--                    class="Act1" v-on:click="change(1)"-->
                        <a href="#/myevent" style="" class="text-center" v-on:click="change(1)">
                            <span class="glyphicon glyphicon-bookmark"></span>
                            &nbsp;
                            <span>我的活动</span>
                        </a>
                    </li>
                    <li id="myjoin" >
                        <!--                    class="Act2" v-on:click="change(2)"-->
                        <a href="#/myjoin" style="" class="text-center" v-on:click="change(2)">
                            <span class="glyphicon glyphicon-tag"></span>
                            &nbsp;
                            <span>我的参与</span>
                        </a>
                    </li>
                    <li id="mymess" >             <!-- class="Act3" v-on:click="change(3)"-->
                        <a href="#/mymess" style="" class="text-center" v-on:click="change(3)">
                            <span class="glyphicon glyphicon-envelope"></span>
                            &nbsp;
                            <span>我的消息</span>
                        </a>
                    </li>
                    <li  id="mypaper">
                        <!--                    class="Act4" v-on:click="change(4)"-->
                        <a href="#/mypaper" style="" class="text-center"  v-on:click="change(4)">
                            <span class="glyphicon glyphicon-file"></span>
                            &nbsp;
                            <span>我的论文</span>
                        </a>
                    </li>
                    <li  class="myinfo" id="myinfo" style=" background-color: aliceblue">
                        <!--                    class="Act5" v-on:click="change(5)"-->
                        <a href="#/myinfo"  class="text-center" v-on:click="change(5)">
                            <span class="glyphicon glyphicon-cog"></span>
                            &nbsp;
                            <span>我的账号</span>
                        </a>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </div>

    </section>

</div>
</template>

<script>
    import store from "./store/store"
export default {
    name:"App",
    data:function() {
        return {
            sharedState:store.state
    }
    },
    methods:{
        change:function (num) {
            if(num==1){
                let myevent=document.getElementById("myevent");
                myevent.style.backgroundColor="aliceblue";
                document.getElementById("myjoin").style.backgroundColor=null;
                document.getElementById("mymess").style.backgroundColor=null;
                document.getElementById("mypaper").style.backgroundColor=null;
                document.getElementById("myinfo").style.backgroundColor=null;

            }else if(num==2){
                document.getElementById("myjoin").style.backgroundColor="aliceblue";
                document.getElementById("myevent").style.backgroundColor=null;
                document.getElementById("mymess").style.backgroundColor=null;
                document.getElementById("mypaper").style.backgroundColor=null;
                document.getElementById("myinfo").style.backgroundColor=null;
            }else if(num==3){
                document.getElementById("mymess").style.backgroundColor="aliceblue";
                document.getElementById("myevent").style.backgroundColor=null;
                document.getElementById("myjoin").style.backgroundColor=null;
                document.getElementById("mypaper").style.backgroundColor=null;
                document.getElementById("myinfo").style.backgroundColor=null;
            }else if(num==4){
                document.getElementById("mypaper").style.backgroundColor="aliceblue";
                document.getElementById("myevent").style.backgroundColor=null;
                document.getElementById("myjoin").style.backgroundColor=null;
                document.getElementById("mymess").style.backgroundColor=null;
                document.getElementById("myinfo").style.backgroundColor=null;
            }else if(num==5){
                document.getElementById("myinfo").style.backgroundColor="aliceblue";
                document.getElementById("myevent").style.backgroundColor=null;
                document.getElementById("myjoin").style.backgroundColor=null;
                document.getElementById("mymess").style.backgroundColor=null;
                document.getElementById("mypaper").style.backgroundColor=null;
        }
        },
        exitEvent:function () {
            this.axios.get("/logout").then(function (value) {
                if(value.data=="logout")
                    window.location.href="/index";
            }).catch(function (reason) {
                window.console.log(reason)
            });
        }

    },
    filters:{
        lengthLimit:function (input,length) {
            if(input == null||input=="")
                return '';
            if(input.length > length){
                return input.substring(0, length) + '...';
            }
            else return input;
        }
    },
    created:function () {
        let vm=this;
        this.axios.get("/checkme").then(function (response) {
            let UserMessage=response.data.data;
            UserMessage.headImgUrl=UserMessage.headImgUrl+'?r=' + new Date().getTime();
            store.setUserMessageAction(UserMessage);
            window.console.log(vm.sharedState.userMessage);
        }).catch(function () {
            window.location.href= '/index';
        });
    }
}
</script>
<style scoped>
    li:hover{
        background-color: aliceblue;
    }
    [v-cloak]{
        display: none;
    }
    .nav > li > a:hover, .nav > li > a:focus {

         background-color: aliceblue;
    }

/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 0px;*/
/*}*/
</style>
