export default {
    name:"store",
    debug: true,
    state: {
        userMessage:{
            id:"",userEmail:"",password:"",realName:"",companyName:"",job:"",headImgUrl:"",conferenceList:null,messageList:null,myOrderList:null,paperList:null,ticketDetailList:null
        }
    },
    setUserMessageAction (newValue) {
        if (this.debug) console.log('setMessageAction triggered with', newValue);
        this.state.userMessage = newValue;
    },
    clearUserMessageAction () {
        if (this.debug) console.log('clearMessageAction triggered');
        this.state.userMessage = '';
    }
};

