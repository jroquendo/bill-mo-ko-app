<template>
  <Page>
    <ActionBar title="LOGIN"/>
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/images/rider_icon.png"></Image>
        <Label class="header" text="BillMoKo"></Label>
        
        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              keyboardType="text"
              autocorrect="false"
              returnKeyType="next"
              v-model="formParams.username"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
          <StackLayout row="1" class="hintAccount">
              <Label class="hint_inputs" text="Mobile Number / User Name"></Label>
              <Label class="field-input-under" text="For Mobile Number, use format 639#########"></Label>
          </StackLayout>

          <ActivityIndicator rowspan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>
        <Button
          text="LOG IN"
          class="btn btn-primary m-t-20 log_in_button"
          @tap="login"
          :isEnabled="!processing"
        ></Button>
        <!-- <Label style="margin-top:7;" class="login-label" @tap="forgotPass">
          <FormattedString>
            <Span text="Forgot your Password?"></Span>
            
          </FormattedString>
        </Label> -->
      </StackLayout>
      <Label class="login-label login-label-2 sign-up-label" @tap="register">
        <FormattedString>
          <Span text="Don’t have an account yet?"></Span>
          <Span text=" REGISTER" class="bold reg_label"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script lang="ts">
import routes from "../routes";
import { Telephony } from "nativescript-telephony";
const permissions = require("nativescript-permissions");
import * as dialogs from "tns-core-modules/ui/dialogs";
export default {
  data() {
    return {
      msg: "Hello World!",
      countryCode: "",
      mobileNumber: "",
      formParams: {
        username: "",
        pin: ""
      },
      processing: false
    };
  },
  created() {
    //initiate country code for registration.
    permissions
      .requestPermission(
        android.Manifest.permission.READ_PHONE_STATE,
        "I need these permissions because I'm cool"
      )
      .then(() => {})
      .catch(() => {
        console.log("Uh oh, no permissions - plan B time!");
      });
  },
  mounted() {
      this.$activityStateService.setComponentState(this.$routes.app);
  },
  methods: {
    async initCountryCode() {
      // this.$countryService.selectedCountry({'iso2':'ph','dialCode':'+63'});
      var me = this;
      const postPromise = new Promise<any>((resolve, reject) => {
        Telephony()
          .then(
            function(info) {
              console.log(info);  
              if (info.hasOwnProperty("countryCode")) {
                me.countryCode = info["countryCode"] || "ph";
                me.mobileNumber = info["phoneNumber"] || "";
                me.$countryService.selectedCountry({
                  iso2: me.countryCode,
                  dialCode:
                    "+" +
                    me.$phoneProvider.countries.find(
                      c => c["iso2"] == me.countryCode
                    )["dialCode"],
                  phoneNumber: me.mobileNumber
                });
                resolve({ success: true });
              }
            },
            error => {
              console.log("Unable to retrieve SIM info");
              me.$countryService.selectedCountry({
                iso2: "ph",
                dialCode: "+63",
                phoneNumber: ""
              });
              resolve({ success: false });
            }
          )
          .catch(function(error) {
            console.error("error >", error);
            resolve({ success: false });
          });
      });

      return postPromise;
    },
    register() {
        this.initCountryCode().then(res => {    
            console.log(res);
            this.$navigateTo(this.$routes.register, { clearHistory: true });
        });
        
    },
    login() {
      this.$navigateTo(this.$routes.main, { clearHistory: true });
      // if(!this.$globals.isObjectEmpty(this.formParams)){
      //   this.processing = true;
      //   this.$apiService.post("/login", this.formParams).then(res => {
      //   if (res.success) {
      //     if (!res.profile && !res.organization) {
      //       this.showError("Please check account details.");
      //     } else {
      //       this.$userService.loggedIn(res);
      //       this.$userService.setAccessToken(res.access_token);
      //       this.$navigateTo(this.$routes.main, { clearHistory: true });
      //     }
      //   } else {
      //       let errmsg = res.message;
      //       this.showError(errmsg);
      //   }
      //   this.processing = false;
      // });
      // }else{
      //   this.showError();
      // }
      
    },
    forgotPass() {
      this.initCountryCode().then(res => {
        // this.$navigateTo(this.$routes.forgotPassStep1, { clearHistory: true });
      });
    },

    showError(message){
      dialogs.confirm({
          title: this.$globals.err_header.LOGIN,
          message: (message ? message : this.$globals.err_msg.LOGIN),
          okButtonText: "OK",
      }).then(result => {
          // result argument is boolean
          console.log("Dialog result: " + result);
      });
    },
    alert(message) {
      return alert({
        title: "Oops!",
        okButtonText: "OK",
        message: message
      });
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #f27935;
  color: #ffffff;
}
/* GridLayout{
  border-color: red;
  border-width: 2;
} */
.page {
  align-items: center;
  flex-direction: column;
  background-color: #ffa039;
}

.form {
  margin-left: 10;
  margin-right: 10;
  flex-grow: 2;
  vertical-align: middle;
  /* border-color: blue;
  border-width: 2; */
}

.logo {
  margin-top: 10;
  margin-bottom: 6;
  width: 100;
  height: 100;
  font-weight: bold;
  /* border-color: green;
  border-width: 2; */
}
.logo2 {
    width: 230;
    height: 60;
    /* border-color: green;
    border-width: 2; */
}

.header {
  font-size: 18;
  font-weight: 400;
  margin-bottom: 10;
  margin-top: 0;
  padding-top: 0;
  text-align: center;
  color: #1e824c;
  /* border-color: red;
  border-width: 2; */
}

.note {
  font-size: 14;
  font-weight: 300;
  margin-bottom: 10;
  text-align: center;
  color: #ffffff;
}
.change_account {
  color: #95b7ff79;
  font-size: 13;
  text-align: center;
}
.message {
  vertical-align: center;
  text-align: center;
}
.input-field {
  margin-bottom: 25;
  /* border-color: red;
  border-width: 2; */
}

.input {
  font-size: 18;
}

.hintAccount {
  margin-top: -25;
  margin-left: 10;
  margin-bottom:25;
  
}
.hintPin {
  margin-top: 45;
  margin-left: 10;
}
.hint_inputs {
  font-size: 14;
  color: #ffffff;
  font-family: Oxygen;
  font-weight: 400;
}

.log_in_button {
  background-color: #1e824c;
  color: #fff;
  border-radius: 8%;
  margin-top:15;
}
.login-label {
  color: #ffffff;
  font-size: 15;
  text-align: center;
  font-family: Muli;
}
.login-label-2 {
  margin-bottom: 10;
}
.reg_label {
  color: #1e824c;
  font-weight: 400;
}
.forgot_password_label {
  color: #1e824c;
}

.field-input-under{
        margin-left: 0;
        color: #535454;
        font-family: Comfortaa;
        font-size: 12;
        font-weight: 400;
        font-style: italic;
    }
</style>
