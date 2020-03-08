<template>
        <div class="col-sm-10" style="">
            <div class="head">
                <br>
                <p>账号信息</p>
            </div>
            <br>
            <div class="user-info">
                <form action="" class="" enctype="multipart/form-data" method="post" id="MyUserForm">
                    <div class="form-group">
                        <label for="user-name" class="control-label col-sm-4">邮箱</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="user-name" readonly="readonly" v-model="privateState.userMessage.userEmail">
                        </div>
                        <div class="col-sm-4"></div>
                    </div>
                    <br>

                    <div class="form-group">
                        <br>
                        <label for="head_images" class="control-label col-sm-4" onclick="" id="head-images-label">头像</label>
                        <div class="col-sm-3" style="max-width: 120px;">
                            <img  v-bind:src= "privateState.userMessage.headImgUrl" alt="" height="100" width="100" id="head-show" class="img-responsive">
                        </div>
                        <div class="col-sm-2 head-upload">
                            <div type="text" class="form-control text-center" onclick="document.getElementById('head_images').click();">
                                <span class="glyphicon glyphicon-open"></span>
                                <span style="cursor:pointer">上传头像</span>
<!--                                <inputhidden="hidden" type="file" class="form-control" id="head_images" onchange="previewImage();" onclick="">-->
                            </div>
                            <form id="upform" enctype='multipart/form-data' style="display:none;">
                                <input id="head_images" name="upfile" type="file" class="form-control-file" v-on:change="showImg" >
                            </form>
                            <p>&emsp;&nbsp;限制120X120像素</p>

                        </div>
                        <div class="col-sm-4"></div>
                    </div>
                    <div class="form-group" style="margin-top: 100px;">
                        <br>
                        <label for="name" class="control-label col-sm-4">姓名</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="name" v-model="privateState.userMessage.realName">
                        </div>
                        <div class="col-sm-4"></div>
                    </div>
                    <!--<br>-->
                    <div class="form-group">
                        <br>
                        <label for="company-name" class="control-label col-sm-4">公司/机构</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="company-name" v-model="privateState.userMessage.companyName">
                        </div>
                        <div class="col-sm-4"></div>
                    </div>
                    <!--<br>-->
                    <div class="form-group">
                        <br>
                        <label for="job-name" class="control-label col-sm-4">职位</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="job-name" v-model="privateState.userMessage.job">
                        </div>
                        <div class="col-sm-4"></div>
                    </div>
                    <div class="form-group">
                        <br>
                        <button  id="submit" class="btn center-block" type="button" v-on:click="submitEvent()">保存</button>
                    </div>
                </form>
            </div>
        </div>
</template>

<script>
    import store from '../store/store'
    export default {
        name: "myinfo",
        data:function () {
            return {
                sharedState:store.state,
                privateState: {
                        userMessage:{
                                id:"",userEmail:"",password:"",realName:"",companyName:"",job:"",headImgUrl:"",conferenceList:null,messageList:null,myOrderList:null,paperList:null,ticketDetailList:null
                        }
                    }
            }
        },
        mounted:function () {
            let vm=this;
            this.axios.get("/checkme").then(function (response) {
                let UserMessage=response.data.data;
                UserMessage.headImgUrl=UserMessage.headImgUrl+'?r=' + new Date().getTime();
                store.setUserMessageAction(UserMessage);
                vm.privateState.userMessage=UserMessage;
            }).catch(function () {
                window.location.href= '/index';
            });
        },
        methods: {
            submitEvent: function() {
                let formdata=new FormData();
                formdata.append("userEmail",this.privateState.userMessage.userEmail);
                formdata.append("realName",this.privateState.userMessage.realName);
                formdata.append("companyName",this.privateState.userMessage.companyName);
                formdata.append("job",this.privateState.userMessage.job);
                formdata.append("headImgFile",document.getElementById("head_images").files[0]);
                window.console.log(document.getElementById("head_images"));

                let _this=this;

                this.axios.defaults.headers.post['Content-Type']='multipart/form-data;charse=UTF-8';
                this.axios.post('/account/updateUser',formdata).then(function (response) {
                    let resultSet = response.data;
                    if(resultSet.code === 200){

                        _this.privateState.userMessage.headImgUrl=resultSet.message+'?r=' + new Date().getTime();
                        store.setUserMessageAction(_this.privateState.userMessage);
                        //_this.userMessage.headImgUrl=_this.userMessage.headImgUrl+'?r=' + new Date().getTime();
                        window.console.log(store.state);

                        window.alert("信息已保存");
                    }else if (resultSet.code===500){
                        window.alert(resultSet.message);
                    }

                }).catch(function () {
                    window.location.href= '/index';
                })

            },

            //这里可能有问题在显示图片
            showImg:function (e) {
                let _this = this;
                let files = e.target.files[0];
                if (!e || !window.FileReader) return; // 看支持不支持FileReader
                let reader = new FileReader();
                reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function () {
                    _this.privateState.userMessage.headImgUrl = this.result;
                }

            }
        }
    }
</script>

<style scoped>
    #submit{
        margin-top: 10px;
    }
</style>
