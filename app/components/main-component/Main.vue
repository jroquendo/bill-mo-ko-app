<template>
    <Page>
        <ActionBar title="Bill Mo Ko">
            <ActionItem @tap="logout"
                ios.systemIcon="16" ios.position="right"
                text="Log-out" android.position="popup">
            </ActionItem>
             <ActionItem @tap="refresh"
                ios.systemIcon="16" ios.position="right"
                text="Refresh" android.position="popup">
            </ActionItem>
        </ActionBar>
        <GridLayout rows="*, 60">
             <ScrollView style="height:100%"> 
                 <FlexboxLayout class="page">
                    <StackLayout class="input-field" orientation="vertical" horizontalAlignment="center" >
                            <Label class="account_name_label" :text="user.name" horizontalAlignment="left"> </Label>
                    </StackLayout>
                    <StackLayout class="form">
                            
                    </StackLayout>
                     <StackLayout>
                        <StackLayout class="input-field" orientation="horizontal" horizontalAlignment="center">
                                <Image class="logo" src="~/assets/images/menu_icons/map_icon.png" alignItems="center"></Image>
                                <Image class="logo" src="~/assets/images/menu_icons/bank.png" alignItems="center"></Image>
                                <Image class="logo" src="~/assets/images/menu_icons/linkcard.png" alignItems="center"></Image>
                        </StackLayout>
                        <StackLayout class="input-field" orientation="horizontal" horizontalAlignment="center">
                                <Image class="logo" src="~/assets/images/menu_icons/checkbalance.png" alignItems="center"></Image>
                                <Image class="logo" src="~/assets/images/menu_icons/orders.png" alignItems="center" @tap="orderPage"></Image>
                                <Image class="logo" src="~/assets/images/menu_icons/settings.png" alignItems="center"></Image>
                        </StackLayout>
                     </StackLayout>
                 </FlexboxLayout>
             </ScrollView>
             <ActivityIndicator rowspan="3" width=100 height=100 :busy="processing"></ActivityIndicator>
            <StackLayout class="bottom-nav" row="1" orientation="horizontal" horizontalAlignment="center"  verticalAlignment="center">
                <Image class="bot-logo" src="~/assets/images/menu_icons/camera.png" alignItems="center"></Image>
            </StackLayout>  
        </GridLayout>
    </Page>
</template>
<script lang="ts">
    import * as dialogs from "tns-core-modules/ui/dialogs";
    import {Feedback, FeedbackType, FeedbackPosition} from "nativescript-feedback";
    import {Color} from "tns-core-modules/color";
    const feedback = new Feedback();
      export default {
            data() {
                return {
                    msg: 'Hello World!',
                    img:null,
                    user:{
                        name:'Test User',
                        account_number:'',
                        uuid:'',
                        account_type:'Test Rider',
                        balance:'0.00'
                    },
                    formParams:{
                        rider_id: 1
                    },
                    id: null,
                    processing: false
                }
            },
            methods:{
                logout(){
                    this.$navigateTo(this.$routes.app, { clearHistory: true });
                },
                orderPage(){
                    this.$navigateTo(this.$routes.order, { clearHistory: true });
                },
                refresh(){
                    this.processing = true;
                    this.$apiService.post("/get-orders", this.formParams).then(res => {
                      if (res.success) {
                        let data = res.data;
                        if(data.success) {
                            this.showOrder(data)

                        }else {
                            let errmsg = res.msg;
                            this.showError(errmsg);
                        }
                      } else {
                          let errmsg = res.msg;
                          this.showError(errmsg);
                      }
                      this.processing = false;
                    });
                },
                showOrder(orderObject) {
                    let me = this;
                        dialogs
                            .action({
                            message: "Order Recieved",
                            cancelButtonText: "Close",
                            actions: ["View Order"]
                            
                            })
                            .then(result => {
                            if (result == "View Order") {
                               this.$orderService.setOrderProcess(orderObject)
                               this.$navigateTo(this.$routes.order, { clearHistory: true });
                            }else{
                            }
                    });
                },
                 showError(message){
                    dialogs.confirm({
                        title: 'No Orders Found',
                        message: '',
                        okButtonText: "OK",
                    }).then(result => {
                        // result argument is boolean
                        console.log("Dialog result: " + result);
                    });
                },
            }
      }
</script>
<style scoped>

    ActionBar {
        background-color: #f27935;
        color: #ffffff;
    }

    .page {
        flex-direction: column;
        background-color: #ffa039;
        width:100%;
    }

    .input-field {
        margin: 0;
        padding-top:0;
        padding-bottom:0;
        /* border-width: 2;
        border-color: black; */
    }

    
    .account_name_label
    {
        text-align: center;
        margin-top:5;
        margin-bottom:10;
        /* margin-left:10; */
        width:50%;
        font-size: 14;
        font-weight: 500;
        color: #ffffff;
    }
   
    .account_name_label2
    {
        text-align: center;
        font-size: 16;
        font-weight: 500;
        color: #1E824C;
    }

    .form {
        width:100%;
        margin-top: 5;
        margin-bottom: 5;
        margin-left: 2;
        margin-right: 2;
        flex-grow: 2;
        text-align:center;
    }

    .cashier-form{
        flex-grow: 2;
        margin-top:30;
        vertical-align: middle;
    }

    .header{
        height: 40;
        color:  #1E824C;
        font-family: Muli;
        font-size: 33;
        font-weight: 700;
    }
    .currency_label{
        color: #1E824C;
        font-family: Muli;
        font-size: 26px;
        font-weight: 700;
        text-transform: uppercase;
    }
    .balance_label{
        color: #1E824C;
        font-family: Muli;
        font-size: 20;
        font-weight: 400;
        letter-spacing: -1.86;
    }
    .banner{
        width:100%;
        height: 100%;
    }
    .grid{
        text-align:center;
        margin-top:20;
    }
    .space{
        margin-bottom:10;
    }
    .rec{
        width: 107;
        height: 60;
        border-radius: 5;
        border-color: #2cc990;
        border-style: solid;
        border-width: 2;
    }
    .rec2 {
        width: 107;
        height: 60;
        border-radius: 5;
        border-color: #ffd426;
        border-style: solid;
        border-width: 2;
    }
    

    .logo-cashier-purchase{
        background-repeat: no-repeat;
        height: 150;
        width: 150;
        margin-top: 0;
        padding-top: 0; 
    }

    .logo {
        background-repeat: no-repeat;
        height: 84;
        width: 104;
        margin-top: 0;
        padding-top: 0; 
    }

    .bot-logo {
        background-repeat: no-repeat;
        height: 50;
        width: 50;
        margin-top: 0;
        padding-top: 0; 
    }
    .bottom_logo{
        width: 100;
        height: 66;
        vertical-align: bottom;
        padding:10;
        margin-top:10;
        margin-bottom:5;
    }

    .bottom-nav{
        width:100%;
        height: 100%;
        background-color: #f27935;
    }
</style>