import ConfigService from '../services/config.service'
import UserService from '../services/user.service'
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from "tns-core-modules/connectivity";
import * as _ from 'lodash';

export default class ApiService{

    private apiBaseURL: string = null;
    private result: any;
    private accessToken: string = null;

    constructor(private configService:ConfigService){
        this.apiBaseURL = configService.getBaseApiUrl();
    }

    public async post(path: string , data: object){
        if(this.checkConnection()){
            console.log(this.apiBaseURL+path);
            const postPromise = new Promise<any>((resolve, reject) => {
                try{
                    request({
                        url: this.apiBaseURL+path,
                        method: "POST",
                        headers: this.getHeaders(),
                        content: JSON.stringify(data)
                    }).then((response) => {
                        this.result = response.content.toJSON();
                        resolve(this.result);
                    }, (e) => {
                        console.log(e);
                        resolve(e);
                    });

                }catch (err){
                    console.log(err);
                    resolve(err);
                }
            });

            return postPromise;
        }else{
            return {success:false,message:"Please check internet connection."}
        }
    }

    public async postFile(path: string , data: any){
        if(this.checkConnection()){
            const postPromise = new Promise<any>((resolve, reject) => {
            let fd = new TNSHttpFormData();
            try { 
                fd.post(this.apiBaseURL+path, data, {
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((response)=>{
                    console.log(response);
                    this.result = (response.body ? response.body : {success:false});
                    resolve(this.result);
                },(e) => {
                    console.log(e);
                    resolve(e);
                });
            } catch (e) {
                console.log('---------------app.ts---------------');
                console.log(e);
            }
            });

            return postPromise;
        }else{
            return {success:false,message:"Please check internet connection."}
        }
        
    }

   public async get(path: string , data: object){
        const getPromise = new Promise<any>((resolve, reject) => {
            try{
                request({
                    url: this.apiBaseURL+path,
                    method: "GET"
                }).then((response) => {
                    this.result = response.content.toJSON();
                    resolve(this.result);
                }, (e) => {
                    console.log(e);
                    resolve(e);
                });

            }catch (err){
                console.log(err);
                resolve(err);
            }

        });

        return getPromise;
    }

    private getHeaders() {
        const headers: any = {
          'Content-Type': 'application/json'
        };
        if (this.accessToken) {
          headers.Authorization = this.accessToken;
        }
        return headers;
      }

    private checkConnection(){
        try{
            const myConnectionType = getConnectionType();
            if(myConnectionType == connectionType.none){
                return false;
            }
            return true;
        }catch(e){
            console.log(e);
        }
    
        return false;
    } 
}