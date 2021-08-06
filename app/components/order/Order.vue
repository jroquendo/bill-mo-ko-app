<template>
    <Page>
        <ActionBar title="Order Details">
            <NavigationButton android.systemIcon="ic_menu_back" @tap="onNavBtnTap"/>
        </ActionBar>
    
    <FlexboxLayout class="page">
           <GridLayout rows="*">
               <!-- v-if="userBankData.length > 0" -->
               <ScrollView v-if="!processing" orientation="vertical" style="height:100%; width: 100%;">
                    <StackLayout class="form">
                        <CardView v-for="(item,index) in orders" :key="index"  class="cardCont" ripple="true" elevation="50" padding="5" margin="5" shadowRadius="5" height="85%"  @tap="viewDetails(item.orders)">
                            <StackLayout>
                            <Label class="info" horizontalAlignment="left" verticalAlignment="center" textWrap="true">
                                <FormattedString>
                                    <Span :text="'Order Instructions: '+item.order_instructions+'\r\n'"/>
                                    <Span :text="'Order Address: '+item.delivery_address+'\r\n'"/>
                                </FormattedString>
                            </Label>  
                            </StackLayout>
                        </CardView>
                    </StackLayout> 
                    </ScrollView>
                    <ActivityIndicator v-if="processing" width="100" height="100" :busy="processing"></ActivityIndicator>
                    <!-- <fab
                        @tap="fabTap"
                        row="1"
                        icon="res://bankadd"
                        rippleColor="#f1f1f1"
                        class="fab-button">
                    </fab> -->
            </GridLayout>
        
        
    </FlexboxLayout>
  </Page>
</template>

<script lang="ts">
import * as dialogs from "tns-core-modules/ui/dialogs";
export default {
    data(){
        return {
            message : 'Test Card View',
            orders : [],
            order_d : [],
            processing : false,
            formParams : {
                rider_id : 1
            }
        }
    },
    created(){
       this.$orderService.currentOrderProcess$.subscribe(order=>{
           this.processing = true;
           this.orders = [];
           if(order) {
               order.orders = (this.IsJsonString(order.orders) ? JSON.parse(order.orders) : order.orders);
               this.orders.push(order)
               this.processing = false;
           } else {
                this.$apiService.post("/get-orders", this.formParams).then(res => {
                        if (res.success) {
                        let data = res.data;
                            if(data.success) {
                                this.$orderService.setOrderProcess(data)
                            }
                        }
                this.processing = false;
                });
           }
       });
    },
    methods:{
        onNavBtnTap(){
            this.$orderService.setOrderProcess(null)
            this.$navigateTo(this.$routes.main, {clearHistory: true});
        },
        viewDetails(order) {

            let message = "";
            order.forEach(item => {
                message+="Description:"+item.desc+"\r\n";
                message+="QTY:"+item.qty+"\r\n";
                message+="\r\n";
            });

            return alert({
                title: "Order Info",
                okButtonText: "Close",
                message: message
            });
        },
        IsJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
    }

};
</script>

<style scoped>
    ActionBar {
        background-color: #f27935;
        color: #ffffff;
    }

    GridLayout{
        width: 100%;
        /* margin-bottom: 20; */
    }

    .page {
        flex-direction: column;
        background-color: #ffa039;
        width:100%;
        height: 100%;
        vertical-align: top;
    }

    .form {
        margin-top:15;
        margin-left: 10;
        margin-right: 10;
        flex-grow: 2;
    }

    .form2 {
        vertical-align: center;
        text-align: center;
    }

    .logo {
        width: 240;
        height: 132;
    }

    .grid_logo{
        margin-top:10;
        margin-right:20; 
        
    }

    .input-field {
        margin-bottom:5;
    }

    .input {
        font-size: 18;
    }


     .rec{
        padding: 3;
        background-color: #ffffff;
        margin-left: 0;
    }

    .cardCont2{
        background-color:#0068B3;
        margin-bottom : 10;
    }
    .cardCont{
        background-color:#f27935;
        margin-bottom : 10;
    }
    
    .info{
        margin : 10;
        padding: 10;
        color: #faf6f6;
        font-family: Comfortaa;
        font-size: 15;
        font-weight: 700;
    }

    .fab-button {
        height: 70;
        width: 70; 
        margin: 15;
        background-color: #ffffff;
        horizontal-align: right;
        vertical-align: bottom;
    }
</style>
