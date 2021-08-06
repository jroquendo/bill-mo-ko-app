<template>
    <Page @loaded="pageLoaded" class="page">
        <ActionBar title="OTP Verification">
            <NavigationButton android.systemIcon="ic_menu_back" @tap="onNavBtnTap"/>
        </ActionBar>
        <ScrollView>
		<StackLayout class="v-center">
			<Label class="h3 text-center" text="Set Transaction Pin" />
			<Label class="m-x-15 h4 text-center" text="Secure your transaction by setting up a 6 digit secure transaction pin." />
			<FlexboxLayout id="pinBox" class="m-x-15 m-y-30 pin-box">
				<TextField class="txt-pin" :text="d0"  maxLength="1" returnKeyType="next" keyboardType="number" secure="true" :isEnabled="!processing"/>
				<TextField class="txt-pin" :text="d1"  maxLength="1" returnKeyType="next" keyboardType="number" secure="true" :isEnabled="!processing"/>
				<TextField class="txt-pin" :text="d2"  maxLength="1" returnKeyType="next" keyboardType="number" secure="true" :isEnabled="!processing"/>
				<TextField class="txt-pin" :text="d3"  maxLength="1" returnKeyType="next" keyboardType="number" secure="true" :isEnabled="!processing"/>
                <TextField class="txt-pin" :text="d4"  maxLength="1" returnKeyType="next" keyboardType="number" secure="true" :isEnabled="!processing"/>
                <TextField class="txt-pin" :text="d5"  maxLength="1" returnKeyType="done" keyboardType="number" secure="true" :isEnabled="!processing"/>
			</FlexboxLayout>
            <ActivityIndicator rowSpan="6" :busy="processing"></ActivityIndicator>
			<Button class="btn btn-danger" text="Confirm Pin" @tap="confirmPin" :isEnabled="!processing"/>
		</StackLayout>
	</ScrollView>
    </Page>
</template>

<script lang="ts">
    import { TextField } from "tns-core-modules/ui/text-field";
    import { EventData, PropertyChangeData } from 'tns-core-modules/data/observable';
    import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
    import * as utils from "tns-core-modules/utils/utils"
    import { isIOS, isAndroid } from "tns-core-modules/platform"
    import * as frame from "tns-core-modules/ui/frame"
    import {Feedback, FeedbackType, FeedbackPosition} from "nativescript-feedback";
    import {Color} from "tns-core-modules/color";
    let otpObj = null;
    const feedback = new Feedback();
    let otpType = 1;
    export default {
        data() {
            return {
                message: "This is another page.",
                d0:null,
                d1:null,
                d2:null,
                d3:null,
                d4:null,
                d5:null,
                pin:[],
                processing:false
            };
        },
        created(){
            this.$otpService.currentOTPProcess$.subscribe((obj)=>{
                if(obj){
                    otpObj = obj;
                    otpType = obj.otp_type;
                }
            });
        },
        mounted(){
            this.$activityStateService.setComponentState(this.$routes.otp);
        },
        methods :{
            pageLoaded(args: EventData) {
                let page = <StackLayout>args.object;
                page.getViewById('pinBox').eachChild((child) => {
                    child.on('textChange', this.onPinTextChange);
                    return true;
                });
            },
            onPinTextChange(args: PropertyChangeData) {
                if (args.value.length === 1) {
                    let currentChild = <StackLayout>args.object,
                        parent = <StackLayout>currentChild.parent,
                        currentIndex = parent.getChildIndex(currentChild);
                        this.setPin(args.value,currentIndex);
                    if (currentIndex < 5) {
                        parent.getChildAt(++currentIndex).focus();
                    }
                }
            },
            setPin(val,index){
                if(val !== ""){
                     this.pin[index] = val; 
                    if(this.pin.length >= 6){
                        this.dismissSoftKeybaord();
                    }
                }
               
            },
            onNavBtnTap(){
                this.$otpService.setOTPProcess(null);
                this.$navigateTo(this.$routes.app, {clearHistory: true});
            },
            confirmPin(){
                let me = this;
                this.processing = true;
                let pin = this.pin.join('');
                otpObj.otp = (pin ? pin : '');
                if(pin == ""){
                    this.showFeedbackError("Please input the 6 digit verification code.")
                    this.processing = false;
                }else if(otpType == this.$globals.OTP_TYPE.FORGOT_PASS){
                    this.$apiService.post("/v1/confirm_otp",otpObj).then((res)=>{
                        if(res.success){
                            let obj: any = {};
                            obj.id = res.user_id;
                            this.$otpService.setOTPProcess(obj);
                            me.$navigateTo(me.$routes.forgotPassStep2, {clearHistory: true});
                            // me.returnMain();      
                        }else{
                            me.pin = [];
                            let errmsg = res.message;
                            me.showFeedbackError(errmsg)
                            
                        } 
                        me.processing = false;
                    });
                 }else if(otpType == this.$globals.OTP_TYPE.REGISTRATION){
                    me.successDialog();
                    me.$navigateTo(me.$routes.app, {clearHistory: true});
                    me.processing = false;
                 }
            },
            dismissSoftKeybaord(){ 
                if (isIOS) { frame.topmost().nativeView.endEditing(true); } 
                if (isAndroid) { utils.ad.dismissSoftInput(); } 
            },
           
            showFeedbackMax(title="",message="") {
                feedback.show({
                    title: (title !== "" ? title : "OTP"),
                    titleColor: new Color("#222222"),
                    position: FeedbackPosition.Bottom, // iOS only
                    type: FeedbackType.Custom, // this is the default type, by the way
                    message: (message !== "" ? message : "OTP Verification Successful, returning to main page..."),
                    messageColor: new Color("#333333"),
                    duration: 3000,
                    backgroundColor: new Color("yellowgreen"),
                    icon: "logo", // in App_Resources/platform folders
                // android: {
                //     iconColor: new Color("#222222") // optional, leave out if you don't need it
                // },
                    // onTap: () => ),
                    // onShow: animating => console.log(animating ? "showFeedbackMax animating" : "showFeedbackMax shown"),
                    // onHide: () => this.$navigateTo(this.$routes.main, {clearHistory: true})
                });
            },

            successDialog(){
                feedback.success({
                title: "Registration Successful!",
                message: "",
                duration: 3000,
                icon: "logo" // in App_Resources/platform folders
                });
            },

            showFeedbackError(title='',msg) {
                feedback.error({
                    title: (title !== '' ? title : "Verification Failed 👎"),
                    message: msg,
                    duration: 5000,
                    onTap: () => console.log("showFeedbackError tapped")
                });
            },
            returnMain(){
                let me = this;
                setTimeout(function () {
                    console.log('Returning to main Page...');
                    me.$navigateTo(me.$routes.main, {clearHistory: true});
                },800);
            }
        }
    };
</script>

<style scoped>
    ActionBar {
        background-color: #080f0f;
        color: #ffffff;
    }
    
     .page {
        background-color: #87CEEB;
    }
    .v-center {
        vertical-align: center;
    }

    .h3 {
        color: black;
        font-weight: bold;
    }

    .h4 {
        color: black;
        font-weight: bold;
        white-space: normal;
    }

    .btn {
        height: 60;
        font-weight: bold;
    }

    .pin-box {
        justify-content: center;
    }

    .txt-pin {
        width: 60;
        height: 50;
        margin-right: 10;
        text-align: center;
        color:black;
        border-width: 1;
        background-color: #f3f3f3;
        border-color: black;
    }

    .btn-danger {
        width: 134;
        border-radius: 9;
        color: #ffffff;
        background-color: red;
    }

    .message {
        font-size: 18;
        margin: 16;
        color: #53ba82;
    }
</style>

