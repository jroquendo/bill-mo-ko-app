<template>
  <Page>
    <ActionBar title="REGISTER">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="onNavBtnTap"/>
    </ActionBar>
    <ScrollView>
      <FlexboxLayout class="page">
        <StackLayout class="form">
          <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto">
            <StackLayout row="0" class="hintFname">
              <Label class="hint_inputs" text="First Name"></Label>
            </StackLayout>
            <StackLayout row="1" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.firstname"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>


            <StackLayout row="2" class="hintMname">
              <Label class="hint_inputs" text="Middle Name"></Label>
            </StackLayout>
            <StackLayout row="3" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.middlename"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

            <StackLayout row="4" class="hintLname">
              <Label class="hint_inputs" text="Last Name"></Label>
            </StackLayout>
            <StackLayout row="5" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.lastname"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

            <StackLayout row="6" class="hintLname">
              <Label class="hint_inputs" text="Date of Birth"></Label>
            </StackLayout>
            <StackLayout row="7" class="input-field">
              <DatePickerField @dateChange="onDateTimeChange1" :date="pickedDate" hint="select date"></DatePickerField>
            </StackLayout>
            
            <StackLayout row="8" class="hintAddress">
              <Label class="hint_inputs" text="House no./Street"></Label>
            </StackLayout>
            <StackLayout row="9" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.street"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

             <StackLayout row="10" class="hintAddress">
              <Label class="hint_inputs" text="Barangay"></Label>
            </StackLayout>
            <StackLayout row="11" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.barangay"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

             <StackLayout row="12" class="hintAddress">
              <Label class="hint_inputs" text="City/Municipality"></Label>
            </StackLayout>
            <StackLayout row="13" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.city_municipality"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

            <StackLayout row="14" class="hintAddress">
              <Label class="hint_inputs" text="Province"></Label>
            </StackLayout>
            <StackLayout row="15" class="input-field">
              <TextField
                class="input"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.province"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>

          </GridLayout>

          <GridLayout
            id="mdlItemsSelect"
            columns="100,*,20"
            rows="auto,auto,auto,auto,auto,auto,auto,auto"
            style="margin-bottom:25;"
          >
            <StackLayout col="0" row="0" colSpan="2" class="hintMobile">
              <Label class="hint_inputs" text="Mobile Number"></Label>
            </StackLayout>
            <StackLayout
              orientation="horizontal"
              row="1"
              col="0"
              @tap="showCountryCodeModal"
              style="vertical-align:center;"
            >
              <Image v-if="flagImage" :src="'data:image/png;base64,'+flagImage" class="flag"></Image>
              <Label :text="countryDialCode" class="country-code"></Label>
            </StackLayout>
            <StackLayout style="margin-left:-20;margin-top:10;" row="1" col="1" class="input-field">
              <TextField
                class="phonenumber"
                keyboardType="number"
                v-model="formParams.contactnumber"
              ></TextField>
              <Label class="field-input-under" text="Use format 0927#######"></Label>
            </StackLayout>

            <!-- <StackLayout col="0" colSpan="2" row="2" class="hintPassword">
              <Label class="hint_inputs" text="Password"></Label>
            </StackLayout>
            <StackLayout col="0" colSpan="2" row="3" class="input-field">
              <TextField
                class="input"
                secure="true"
                keyboardType="number"
                autocorrect="false"
                v-model="formParams.pin"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout> -->

            <StackLayout col="0" row="4" colSpan="2" class="hintCardType">
              <Label class="hint_inputs" text="Identification Card Type"></Label>
            </StackLayout>
             <StackLayout col="0" row="5" colSpan="2" class="input-field">
              <TextField
                class="input"
                secure="false"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.id_type_id"
              ></TextField>
              <Label class="field-input-under" text="passport/license/etc.."></Label>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>
            <!-- <StackLayout col="0" row="5" colSpan="2" class="input-field">
              <DropDown
                :items="Items"
                @selectedIndex="selectedIndex"
                @opened="dropDownOpened"
                @closed="dropDownClosed"
                @selectedIndexChanged="dropDownSelectedIndexChanged"
                v-model="formParams.id_type_id"
              />
            </StackLayout> -->

            <StackLayout col="0" row="6" colSpan="2" class="hintCardNumber">
              <Label class="hint_inputs" text="ID Card Number"></Label>
            </StackLayout>
            <StackLayout col="0" row="7" colSpan="2" class="input-field">
              <TextField
                class="input"
                secure="false"
                keyboardType="text"
                autocorrect="false"
                v-model="formParams.idnumber"
              ></TextField>
              <StackLayout class="hr-light"></StackLayout>
            </StackLayout>
          </GridLayout>
          <Label
            class="tip"
            text="Tip: Make sure it's clear and the whole card is seen in the shot. Make sure this ID is not expired."
            textWrap="true"
          ></Label>
          <Image
            v-if="!uploaded_photo"
            class="logo_camera"
            :src="uploaded_photo_default"
            @tap="showDialog"
          ></Image>
          <StackLayout v-if="uploaded_photo" class="input-field rec" @tap="showDialog">
            <Image class="uploaded_logo" :src="uploaded_photo"></Image>
            <Label class="uploaded_label" text="Tap to change"></Label>
          </StackLayout>
           <StackLayout class="input-field agreement">
                <DockLayout style="margin-left:-35;" width="70%" stretchLastChild="true">
                  <CheckBox style="text-align:right;margin-left:30;" :checked="isChecked" @checkedChange="checkAll"  dock="left"/>
                  <Label class="agreement" style="margin-top:7;margin-left:-10" dock="right" @tap="openAgreement"> 
                    <FormattedString>
                      <Span text="I Agree to Terms and Conditions" underline="true" fontAttributes="Bold"></Span>
                    </FormattedString>
                  </Label>    
                </DockLayout>
           </StackLayout>
          <!-- <Label text="Additional information will be required in order to finish your registration."
                    class="reg-label" textWrap="true"></Label>
                    <StackLayout class="hr space"></StackLayout>
                    <Label text="Please prepare one (1) Governmennt Identification Card before pressing continue."
          class="reg-label" textWrap="true"></Label>-->
          <StackLayout class="hr space"></StackLayout>
          <Button
            text="SUBMIT"
            :class="!processing && isChecked ? 'btn btn-primary m-t-20 submit_button' : 'btn btn-primary m-t-20 submit_button_disabled'"
            @tap="registration"
            :isEnabled="!processing && isChecked"
          ></Button>
          <ActivityIndicator rowspan="8" :busy="processing"></ActivityIndicator>
        </StackLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import CountryCodeModal from "./CountryCodeModal.vue";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { ValueList } from "nativescript-drop-down";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as camera from "nativescript-camera";
import * as imagepicker from "nativescript-imagepicker";
import { Image } from "tns-core-modules/ui/image";
import * as utils from "tns-core-modules/utils/utils"
import {
  TNSHttpFormData,
  TNSHttpFormDataParam,
  TNSHttpFormDataResponse
} from "nativescript-http-formdata";
import {Feedback, FeedbackType, FeedbackPosition} from "nativescript-feedback";
import {Color} from "tns-core-modules/color";
import { DateTimePicker } from "nativescript-datetimepicker";
import { EventData } from "tns-core-modules/data/observable";
  const feedback = new Feedback();
const platform = require("platform");
const fs = require("file-system");
let context = imagepicker.create({
  mode: "single" // use "multiple" for multiple selection
});
let imageData: any;
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
      uploaded_photo_default: "~/assets/images/camera.png",
      uploaded_photo: null,
      country_code: '',
      formParams: {
        firstname: "",
        middlename:"",
        lastname: "",
        street: "",
        barangay: "",
        city_municipality: "",
        province: "",
        // pin: "",
        contactnumber: "",
        id_type_id: "",
        idnumber: ""
      },
      isChecked : false,
      pickedDate : new Date()
    };
  },
  created() {
    this.$countryService.currentCountry$.subscribe(country => {
      this.countryCode = country.iso2;
      this.countryDialCode = country.dialCode;
      this.country_code = country.dialCode.replace('+','');
      this.formParams.contactnumber = country.phoneNumber.replace(
        new RegExp(this.escapeRegExp(this.countryDialCode), "g"),
        ""
      );
      this.setFlagImage();
    });

    // this.$apiService.get("/get_id_types", {}).then(res => {
    //   if (res.success) {
    //     let id_types = res.id_types;
    //     if (id_types.length > 0) {
    //       id_types.forEach((item, index) => {
    //         this.Items.push(item.idtype);
    //         this.type_id.push(item.id);
    //       });
    //     }
    //   }
    // });

    camera.requestPermissions().then(
      function success() {
        console.log("camera permission accepted");
      },
      function failure() {}
    );
  },
  methods: {
    onDateTimeChange1: function(args) {
        this.pickedDate = args.value;
        console.log(this.$globals.getFormattedDate(this.pickedDate));
    },
    setFlagImage() {
      let country = this.$phoneProvider.countries.find(c => {
        return c.iso2 == this.countryCode;
      });
      this.flagImage =
        country && country.hasOwnProperty("flag") && country.flag !== null
          ? country.flag
          : null;
    },
    showCountryCodeModal() {
      // this.$showModal(CountryCodeModal);
    },
    onNavBtnTap() {
      this.$navigateTo(this.$routes.app, { clearHistory: true });
    },
    async registration() {
      let params = [];
      let param: TNSHttpFormDataParam = {
        data: imageData,
        contentType: "image/jpg",
        fileName: "image_upload.jpg",
        parameterName: "id_photo"
      };

      let param2: TNSHttpFormDataParam = {
        data: this.formParams.firstname,
        parameterName: "firstname"
      };

      let param3: TNSHttpFormDataParam = {
        data: this.formParams.lastname,
        parameterName: "lastname"
      };

      let param4: TNSHttpFormDataParam = {
        data: this.formParams.street,
        parameterName: "street"
      };
      
      let param5: TNSHttpFormDataParam = {
        data: this.formParams.barangay,
        parameterName: "barangay"
      };

      let param6: TNSHttpFormDataParam = {
        data: this.formParams.city_municipality,
        parameterName: "city_municipality"
      };

      let param7: TNSHttpFormDataParam = {
        data: this.formParams.province,
        parameterName: "province"
      };

    //   let param8: TNSHttpFormDataParam = {
    //     data: this.formParams.pin,
    //     parameterName: "pin"
    //   };

      let param9: TNSHttpFormDataParam = {
        data: this.country_code+this.formParams.contactnumber,
        parameterName: "contactnumber"
      };

      let param10: TNSHttpFormDataParam = {
        data: this.formParams.id_type_id.toString(),
        parameterName: "id_type_id"
      };

      let param11: TNSHttpFormDataParam = {
        data: this.formParams.idnumber,
        parameterName: "idnumber"
      };

      let param12: TNSHttpFormDataParam = {
        data: this.formParams.middlename,
        parameterName: "middlename"
      };

      params.push(param);//photo
      params.push(param2);//firstname
      params.push(param3);//lastname
      params.push(param4);//street
      params.push(param5);//barangay
      params.push(param6);//city_municipality
      params.push(param7);//province
    //   params.push(param8);
      params.push(param9);
      params.push(param10);
      params.push(param11);
      params.push(param12);

      if(!this.$globals.isObjectEmpty(this.formParams)){
          this.processing = true;
          this.$apiService.post("/save-rider", this.formParams).then(res => {
            
            var response = res.data;
            if (response.success) {
                // this.successDialog();
                let obj: any = {};
                obj.otp_type = this.$globals.OTP_TYPE.REGISTRATION;
                obj.params = this.formParams;
                this.$otpService.setOTPProcess(obj);
                this.$navigateTo(this.$routes.otp, {clearHistory: true});
                // this.$navigateTo(this.$routes.app, { clearHistory: true });
            } else {
              if(typeof response.msg !== 'undefined'){
                this.showError(response.msg);
              }else{
                // let errmsg = response.msg
                this.showError("Something went wrong please try again.");
              } 
            }
            this.processing = false;
          });
      }else{
        this.showError('Please fill-in required fields.')
      }
    },
    sendOTP(){
      let paramMobile : any = {}
      paramMobile.contactnumber = this.formParams.contactnumber
      let params = [];
      let param: TNSHttpFormDataParam = {
        data: imageData,
        contentType: "image/jpg",
        fileName: "image_upload.jpg",
        parameterName: "id_photo"
      };

      let param2: TNSHttpFormDataParam = {
        data: this.formParams.firstname,
        parameterName: "firstname"
      };

      let param3: TNSHttpFormDataParam = {
        data: this.formParams.lastname,
        parameterName: "lastname"
      };

      let param4: TNSHttpFormDataParam = {
        data: this.formParams.street,
        parameterName: "street"
      };
      
      let param5: TNSHttpFormDataParam = {
        data: this.formParams.barangay,
        parameterName: "barangay"
      };

      let param6: TNSHttpFormDataParam = {
        data: this.formParams.city_municipality,
        parameterName: "city_municipality"
      };

      let param7: TNSHttpFormDataParam = {
        data: this.formParams.province,
        parameterName: "province"
      };

    //   let param8: TNSHttpFormDataParam = {
    //     data: this.formParams.pin,
    //     parameterName: "pin"
    //   };

      let param9: TNSHttpFormDataParam = {
        data: this.country_code+this.formParams.contactnumber,
        parameterName: "contactnumber"
      };

      let param10: TNSHttpFormDataParam = {
        data: this.formParams.id_type_id.toString(),
        parameterName: "id_type_id"
      };

      let param11: TNSHttpFormDataParam = {
        data: this.formParams.idnumber,
        parameterName: "idnumber"
      };

      let param12: TNSHttpFormDataParam = {
        data: this.formParams.middlename,
        parameterName: "middlename"
      };

      let param13: TNSHttpFormDataParam = {
        data : this.$globals.getFormattedDate(this.pickedDate),
        parameterName : "birthday"
      }

      params.push(param);//photo
      params.push(param2);//firstname
      params.push(param3);//lastname
      params.push(param4);//street
      params.push(param5);//barangay
      params.push(param6);//city_minicipaloty
      params.push(param7);//province
    //   params.push(param8);//pin
      params.push(param9);//contactnumber
      params.push(param10);//id_type_id
      params.push(param11);//idnumber
      params.push(param12);//middlename
      params.push(param13);//birthday
      

      this.processing = true;
      let obj: any = {};
      obj.otp_type = this.$globals.OTP_TYPE.REGISTRATION;
      obj.params = params;
      obj.registration_type = this.$globals.REGISTRATION_TYPE.DEFAULT;
      this.$otpService.setOTPProcess(obj);
      this.$navigateTo(this.$routes.otp, {clearHistory: true});
      this.processing = false;

      // if(!this.$globals.isRegistrationObjectEmpty(params)){
      //   this.processing = true;
      //   let obj: any = {};
      //   obj.otp_type = this.$globals.OTP_TYPE.REGISTRATION;
      //   obj.params = params;
      //   obj.registration_type = this.$globals.REGISTRATION_TYPE.DEFAULT;
      //   this.$otpService.setOTPProcess(obj);
      //   this.$navigateTo(this.$routes.otp, {clearHistory: true});
      //   this.processing = false;
      //   // this.$apiService.post("/v2/confirm_mobile_number",paramMobile).then((res)=>{
      //   //   console.log(res);
      //   //   if(res.success){
      //   //     let obj: any = {};
      //   //     obj = res.result;
      //   //     obj.otp_type = this.$globals.OTP_TYPE.REGISTRATION;
      //   //     obj.params = params;
      //   //     obj.registration_type = this.$globals.REGISTRATION_TYPE.DEFAULT;
      //   //     this.$otpService.setOTPProcess(obj);
      //   //     this.$navigateTo(this.$routes.otp, {clearHistory: true});
      //   //   }else{
      //   //     let errmsg = res.error
      //   //     this.showError(errmsg.msg);
      //   //   }
      //   //   this.processing = false;
      //   // });
      // }else{
      //    this.showError('Please fill-in required fields.')
      // }
    },

    dropDownOpened(args: any) {
      console.log("Drop Down opened");
    },
    dropDownClosed(args: any) {
      console.log("Drop Down closed");
      // this.id_type_id = 0;
    },
    dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
      // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
      this.formParams.id_type_id = this.type_id[args.newIndex];
      console.log(this.formParams.id_type_id);
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
    showError(message){
      dialogs.confirm({
          title: this.$globals.err_header.REGISTRATION,
          message: (message ? message : this.$globals.err_msg.REGISTRATION),
          okButtonText: "OK",
      }).then(result => {
          // result argument is boolean
          console.log("Dialog result: " + result);
      });
    },
    checkAll(args){
      this.isChecked = args.value;
    },
    openAgreement(){
      utils.openUrl(this.$globals.DEFAULTS.AGREEMENT_URL)
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #f27935;
  color: #ffffff;
}

datepickerfield{
  background-color: #ffffff;
  margin-bottom: 10;
}
/* #mdlItemsSelect {
  border-color: #000000;
  border-width: 2;
} */

/* Stacklayout {
  border-color: #000000;
  border-width: 2;
} */

DropDown {
  padding: 15;
}

label {
  color: #ffffff;
}
.page {
  align-items: center;
  flex-direction: column;
  background-color: #ffa039;
  /* border-color: yellow;
  border-width: 2; */
}

.form {
  margin-left: 15;
  margin-right: 10;
  margin-top: 5;
  flex-grow: 1;
  vertical-align: middle;
}
.logo_camera {
  width: 70;
  height: 70;
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
  padding: 10;
 
  margin-bottom: 0;
}

.hr-light {
  border-width: 0;
  margin-bottom: 5;
}

.hintFname{
  margin-top: 10;
}
.hintMobile,
.hintCardNumber {
  margin-bottom: 10;
}
.hint_inputs {
  margin-left: 5;
  color: #ffffff;
  font-family: Muli;
  font-size: 14;
  font-weight: 400;
  margin-bottom: 10;
}
.reg-label {
  color: #ffffff;
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
  background-color: #1e824c;
  color: #fff;
  border-radius: 10%;
  margin-top:-20;
}

.submit_button_disabled {
  width: 131;
  height: 45;
  background-color: #999999;
  color: #fff;
  border-radius: 10%;
  margin-top:-20;
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
  width: 300;
  height: 270;
  border-color: #f89406;
  border-style: solid;
  border-width: 3;
  background-color: #ffffff;
}
.uploaded_logo {
  width: 260;
  height: 255;
}

.uploaded_label {
  color: #f89406;
  font-family: Comfortaa;
  font-size: 17;
  font-weight: 400;
  margin-top: -25;
  text-align: center;
}
.agreement{
  margin-top:-5;
  text-align: center;
  font-family: Muli;
  font-size: 14;
  font-weight: bold;
  text-decoration: underline;
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