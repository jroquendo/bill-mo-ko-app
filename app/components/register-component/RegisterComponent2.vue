<template>
  <Page>
    <ActionBar title="REGISTER">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="onNavBtnTap"/>
    </ActionBar>
    <ScrollView>
      <FlexboxLayout class="page">
        <StackLayout class="form">

          <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto,auto" id="mdlItemsSelect"
            columns="100,*,20" style="margin-top:20;margin-bottom:10;">

            <StackLayout col="0" colSpan="2" row="0" class="hintInputCont">
              <Label class="hint_inputs" text="Store Name" ></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="1" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.store_user_name"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>
            
            <StackLayout col="0" colSpan="2" row="3" class="input-field rec" @tap="showDialog">
              <Image :class="(uploaded_photo?'uploaded_logo':'logo_store')" :src="(uploaded_photo ? uploaded_photo : uploaded_photo_default)"></Image>
              <Label class="uploaded_label" text="Tap to change"></Label>
            </StackLayout>

            <StackLayout col="0" colSpan="2" row="4" class="hintInputCont">
              <Label class="hint_inputs" text="Device Serial ID"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="5" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                ref="serial_id"
                v-model="formParams.serial_id"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

             <StackLayout col="0" colSpan="2" row="6" class="hintInputCont">
              <Label class="hint_inputs" text="Mac Address"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="7" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.macaddress"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>


          <StackLayout col="0" colSpan="2" row="8" class="input-field" @tap="doScanWithBackCamera">
            <Image class="uploaded_logo_scanned" :src="'~/assets/images/scan.png'"></Image>
            <Label class="uploaded_label" text="Tap to Scan device Info"></Label>
          </StackLayout>

          </GridLayout>

          <GridLayout
            id="mdlItemsSelect"
            columns="100,*,20"
            rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,
            auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto"
            style="margin-bottom:15;">
              <StackLayout style="margin-top:-30" col="0" colSpan="2" row="0" class="hintInputCont"/>
              <StackLayout col="0" colSpan="2" row="1" class="hintInputCont"/>
             
             <StackLayout col="0" colSpan="2" row="2" class="hintInputCont">
              <Label class="hint_inputs" text="Name"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="3" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.name"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

            <StackLayout col="0" colSpan="2" row="4" class="hintSurname">
              <Label class="hint_inputs" text="Email Address"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="5" class="input-field">
              <TextField
                class="input"
                keyboardType="email"
                autocorrect="false"
                v-model="formParams.email"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

            <StackLayout col="0" colSpan="2" row="6" class="hintAddress">
              <Label class="hint_inputs" text="Username"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="7" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.username"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

            <StackLayout col="0" colSpan="2" row="8" class="hintInputCont">
              <Label class="hint_inputs" text="Password"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="9" class="input-field">
              <TextField
                class="input"
                secure="true"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.password"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

             <StackLayout col="0" colSpan="2" row="10" class="hintInputCont">
              <Label class="hint_inputs" text="Address"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="11" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.address"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

            <StackLayout col="0" colSpan="2" row="12" class="hintInputCont">
              <Label class="hint_inputs" text="Barangay"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="13" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.barangay"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

            <StackLayout col="0" colSpan="2" row="14" class="hintInputCont">
              <Label class="hint_inputs" text="City"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="15" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.city"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

             <StackLayout col="0" colSpan="2" row="16" class="hintInputCont">
              <Label class="hint_inputs" text="Phone Number"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="17" class="input-field">
              <TextField
                class="input"
                keyboardType="number"
                autocorrect="false"
                v-model="formParams.mobile_number"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>
          </GridLayout>
          <ActivityIndicator rowspan="4" :busy="processing"></ActivityIndicator>
          <StackLayout class="hr space"></StackLayout>
          <Button
            text="SUBMIT"
            class="btn btn-primary m-t-20 submit_button"
            @tap="registration"
            :isEnabled="!processing"
          ></Button>
        </StackLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import {BarcodeScanner} from "nativescript-barcodescanner";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import {Feedback, FeedbackType, FeedbackPosition} from "nativescript-feedback";
import {Color} from "tns-core-modules/color";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as camera from "nativescript-camera";
import * as imagepicker from "nativescript-imagepicker";
import { Image } from "tns-core-modules/ui/image";
import {
  TNSHttpFormData,
  TNSHttpFormDataParam,
  TNSHttpFormDataResponse
} from "nativescript-http-formdata";
const platform = require("platform");
const fs = require("file-system");
let context = imagepicker.create({
  mode: "single" // use "multiple" for multiple selection
});
let imageData: any;
const feedback = new Feedback();
let userProfile = null;

let nstoasts = require("nativescript-toasts");
  
  var options = {
    text: "",
    duration : nstoasts.DURATION.LONG,
    position : nstoasts.POSITION.BOTTOM
  }

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
export default {
  data() {
    return {
      msg: "Hello World!",
      countryConde: "",
      countryDialCode: "",
      phoneNumber: "",
      flagImage: null,
      Items: [],
      type_id: [],
      selectedIndex: 0,
      processing: false,
      uploaded_photo_default: "~/assets/images/upload_store_image.png",
      uploaded_photo: null,
      formParams: {
        name: "",
        email: "",
        username: "",
        password: "",
        serial_id: "",
        macaddress: "",
        address: "",
        barangay:"",
        city:"",
        mobile_number:"",
        store_user_name:"",
        user_id:"",
        role:"1",
        status:"1",
        otp:"1111",
        reg_latitude: "0.0",
        reg_longitude: "0.0"
    
      },
      isLocation : true
    };
  },
   mounted(){
        geolocation.isEnabled().then(function (isEnabled) {
          this.isLocation = isEnabled;
          if (!isEnabled) {
                geolocation.enableLocationRequest().then(function () { }, function (e) {

                    options.text = "Error: " + (e.message || e)+" Location will not be determined";
                    nstoasts.show(options);
                    console.log("Error: " + (e.message || e));
                });
            }
        }, function (e) {
            options.text = "Please enable or update your google play services. Else,location will not be determined";
            nstoasts.show(options);
            console.log("Error: " + (e.message || e));
        });
        this.$userService.currentUser$.subscribe(user_profile => {
            if(user_profile){
                userProfile = user_profile;
                this.formParams.user_id = userProfile.id;
            }
        });

        this.$activityStateService.setComponentState(this.$routes.register);
        if(this.isLocation){this.getCurrentLocation()}
    },
  methods: {
    onNavBtnTap() {
      this.$navigateTo(this.$routes.main, { clearHistory: true });
    },
    async registration() {
      let params = [];
    
      let param: TNSHttpFormDataParam = {
        data: imageData,
        contentType: "image/jpg",
        fileName: "image_upload.jpg",
        parameterName: "picture"
      };

      let param2: TNSHttpFormDataParam = {
        data: this.formParams.name,
        parameterName: "name"
      };

      let param3: TNSHttpFormDataParam = {
        data: this.formParams.email,
        parameterName: "email"
      };

      let param4: TNSHttpFormDataParam = {
        data: this.formParams.username,
        parameterName: "username"
      };

      let param5: TNSHttpFormDataParam = {
        data: this.formParams.password,
        parameterName: "password"
      };

      let param6: TNSHttpFormDataParam = {
        data: this.formParams.serial_id,
        parameterName: "serial_id"
      };

      let param7: TNSHttpFormDataParam = {
        data: this.formParams.macaddress,
        parameterName: "macaddress"
      };

      let param8: TNSHttpFormDataParam = {
        data: this.formParams.address,
        parameterName: "address"
      };

      let param9: TNSHttpFormDataParam = {
        data: this.formParams.barangay,
        parameterName: "barangay"
      };

      let param10: TNSHttpFormDataParam = {
        data: this.formParams.city,
        parameterName: "city"
      };

      let param11: TNSHttpFormDataParam = {
        data: this.formParams.mobile_number,
        parameterName: "mobile_number"
      };

      let param12: TNSHttpFormDataParam = {
        data: this.formParams.store_user_name,
        parameterName: "store_user_name"
      };

      let param13: TNSHttpFormDataParam = {
        data: this.formParams.user_id.toString(),
        parameterName: "user_id"
      };

      let param14: TNSHttpFormDataParam = {
        data: this.formParams.role,
        parameterName: "role"
      };

      let param15: TNSHttpFormDataParam = {
        data: this.formParams.status,
        parameterName: "status"
      };

       let param16: TNSHttpFormDataParam = {
        data: this.formParams.otp,
        parameterName: "otp"
      };

       let param17: TNSHttpFormDataParam = {
        data: this.formParams.reg_latitude,
        parameterName: "reg_latitude"
      };

       let param18: TNSHttpFormDataParam = {
        data: this.formParams.reg_longitude,
        parameterName: "reg_longitude"
      };

      params.push(param);
      params.push(param2);
      params.push(param3);
      params.push(param4);
      params.push(param5);
      params.push(param6);
      params.push(param7);
      params.push(param8);
      params.push(param9);
      params.push(param10);
      params.push(param11);
      params.push(param12);
      params.push(param13);
      params.push(param14);
      params.push(param15);
      params.push(param16);
      params.push(param17);
      params.push(param18);
        if(!this.$globals.isRegistrationObjectEmpty(params)){
            this.processing = true;
            this.$apiService.postFile("/agent/store_registration", params).then(res => {
              console.log(res);
                if(res.success){
                    this.$navigateTo(this.$routes.main, { clearHistory: true });
                    options.text = 'Registration Successful';
                    nstoasts.show(options);
                }else{
                    options.text = 'Registration Unsuccessful. Please Try Again.';
                    nstoasts.show(options);
                }
                this.processing = false;
            });

        }else{
            options.text = 'Please fill in all required fields.';
            nstoasts.show(options);
        }

    },
    getCurrentLocation(){
      let that = this;
      geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 10000
        }).then(function (loc) {
            if (loc) {
                that.formParams.reg_latitude = loc.latitude.toString();
                that.formParams.reg_longitude = loc.longitude.toString();
                console.log(loc.latitude);
                console.log(loc.longitude);
            }
        }, function (e) {
            options.text = "Please enable or update your google play services. Else,location will not be determined";
            nstoasts.show(options);
            console.log("Error: " + (e.message || e));
        });
    },
    dropDownOpened(args: any) {
      console.log("Drop Down opened");
    },
    dropDownClosed(args: any) {
      console.log("Drop Down closed");
      // this.id_type_id = 0;
    },
    dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
      // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`)
    },
    doScanWithBackCamera() {
            this.scan(false);
        },
    doScanWithFrontCamera() {
        this.scan(true);
    },
    scan(front) {
        var me = this;
        new BarcodeScanner().scan({
        cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        preferFrontCamera: front,     // Android only, default false
        showFlipCameraButton: true,   // default false
        showTorchButton: true,        // iOS only, default false
        torchOn: false,               // launch with the flashlight on (default false)
        resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        beepOnScan: true,             // Play or Suppress beep on scan (default true)
        openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
        closeCallback: () => {
            console.log("Scanner closed @ " + new Date().getTime());
        }
        }).then(
            function (result) {
            console.log("--- scanned: " + result.text);
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            setTimeout(function () {
                try{
                    let objResult = JSON.parse(result.text);
                    if(typeof objResult.serial_id !== 'undefined'){
                        me.formParams.serial_id = objResult.serial_id;
                    }
                    if(typeof objResult.macaddress !== 'undefined'){
                        me.formParams.macaddress = objResult.macaddress;
                    }
                }catch(e){
                    console.log(e);
                }


            }, 300);
            },
            function (errorMessage) {
                alert("No scan. " + errorMessage);
                console.log("No scan. " + errorMessage);
            }
        );
    },
    alert(message) {
      return alert({
        title: "Registration",
        okButtonText: "OK",
        message: message
      });
    },
    escapeRegExp(stringToGoIntoTheRegex) {
      try {
        return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      } catch (e) {
        return stringToGoIntoTheRegex;
      }
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
            title: (title !== '' ? title : "Registration Failed 👎"),
            message: msg,
            duration: 5000,
            onTap: () => console.log("showFeedbackError tapped")
        });
    },
    showDialog() {
      let me = this;
      dialogs
        .action({
          message: "Choose Action",
          cancelButtonText: "Cancel",
          actions: ["Capture from camera", "Select from gallery"]
        })
        .then(result => {
          console.log("Dialog result: " + result);
          if (result == "Capture from camera") {
            //Do action1
            console.log("camera");
            me.getPhotoFromCamera();
          } else if (result == "Select from gallery") {
            //Do action2
            console.log("gallery");
            me.getPhotoFromGallery();
          }
        });
    },
   getPhotoFromCamera() {
      let me = this;
      camera
        .takePicture()
        .then(imageAsset => {
          console.log("Result is an image asset instance");
          imageAsset.getImageAsync(async (image, error) => {
            me.imageToByte(image);
            me.uploaded_photo = imageAsset;
          });
        })
        .catch(err => {
          console.log("Error -> " + err.message);
        });
    },
    getPhotoFromGallery() {
      let me = this;
      context
        .authorize()
        .then(() => {
          return context.present();
        })
        .then(selection => {
          let imageAsset = selection.length > 0 ? selection[0] : null;
          if (imageAsset) {
            imageAsset.getImageAsync(async (image, error) => {
              me.imageToByte(image);
              me.getImageFilePath(imageAsset).then(path => {
                console.log(`path: ${path}`);
                this.uploaded_photo = imageAsset;
              });
            });
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    getImageFilePath(imageAsset) {
      return new Promise(resolve => {
        if (platform.isIOS) {
          const options = PHImageRequestOptions.new();
          options.synchronous = true;
          options.version = PHImageRequestOptionsVersion.Current;
          options.deliveryMode =
            PHImageRequestOptionsDeliveryMode.HighQualityFormat;

          PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(
            imageAsset.ios,
            options,
            nsData => {
              // create file from image asset and return its path
              const tempFolderPath = fs.knownFolders
                .temp()
                .getFolder("nsimagepicker").path;
              const tempFilePath = fs.path.join(
                tempFolderPath,
                Date.now() + ".jpg"
              );

              nsData.writeToFileAtomically(tempFilePath, true);
              resolve(tempFilePath);
            }
          );
        } else {
          // return imageAsset.android, since it 's the path of the file
          resolve(imageAsset.android);
        }
      });
    },
    imageToByte(imageAsset: any) {
      let bitmapImage: android.graphics.Bitmap = imageAsset;
      let stream = new java.io.ByteArrayOutputStream();
      bitmapImage.compress(
        android.graphics.Bitmap.CompressFormat.JPEG,
        50,
        stream
      );
      let byteArray = stream.toByteArray();
      bitmapImage.recycle();
      imageData = byteArray;
      console.log("PASOK");
      console.log(imageData);
    },
    resetFormParams(){
        this.formParams = {
            name: "",
            email: "",
            username: "",
            password: "",
            serial_id: "",
            macaddress: "",
            address: "",
            barangay:"",
            cit:"",
            mobile_number:"",
            store_user_name:"",
            user_id:"",
            rolse:"1",
            status:"1",
            otp:"1111"
      }
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #080f0f;
  color: #ffffff;
}

DropDown {
  padding: 15;
}

label {
  color: #080f0f;
}
.page {
  align-items: center;
  flex-direction: column;
  background-color: #87CEEB;
  /* border-color: yellow;
  border-width: 2; */
}

.form {
  margin-left: 15;
  margin-right: 10;
  margin-top: 0;
  flex-grow: 1;
}
.logo_store {
  width: 100;
  height: 100;
  border-radius: 8px;
  margin-bottom: 20;
}
.input-field {
  margin-bottom: 0;
  /* height: 25;
  font-size: 20; */
}

.input {
  font-size: 15;
  color: #000000;
  padding: 0;
  margin-bottom: 0;
}

.hr-light {
  border-width: 0;
  margin-bottom: 10;
}

.hint_inputs,
.hintInputCont{
  margin-bottom: 0;
}
.hintInputCont2{
  margin-bottom: 10;
}

.hint_inputs {
  margin-left: 5;
  color: #080f0f;
  font-family: Muli;
  font-size: 14;
  font-weight: 400;
}
.reg-label {
  color: #080f0f;
  font-family: Muli;
  font-size: 13;
  font-weight: 400;
  text-align: left;
  margin-left: 20;
  margin-right: 13;
}

.submit_button {
  width: 131;
  height: 45;
  background-color: #b3001b;
  color: #ffffff;
  border-radius: 10%;
}
.tip {
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 15;
  opacity: 0.5;
  color: #535454;
  font-family: Muli;
  font-size: 14;
}
.space {
  margin-bottom: 15;
}
.phonenumber {
  font-size: 15;
  /* margin-left:-35; */
}
.flag {
  border-radius: 10;
  width: 30;
}
.country-code {
  margin-left: 3;
  font-size: 16;
}
.country-code-caret {
  color: #999999;
  font-size: 16;
  margin-left: 3;
  vertical-align: center;
}
.rec {
  width: 200;
  height: 200;
  border-color: #b3001b;
  border-style: solid;
  border-width: 3;
  background-color: #FAFAFA;
  margin-bottom: 20;
}
.uploaded_logo {
  width:90%;
  height: 80%;
  margin-bottom: 7;
}

.uploaded_label {
  color: #080f0f;
  font-family: Comfortaa;
  font-size: 17;
  font-weight: 400;
  margin-top: 0;
  text-align: center;
}
.uploaded_logo_scanned{
  width:70;
  height:70;
  margin-bottom:20;
}

</style>