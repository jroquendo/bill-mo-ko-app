
export default class Global {
    
    public err_header : any = {
        LOGIN : "Login Failed",
        REGISTRATION : "Registration Failed"
    }

    public OTP_TYPE: any = {
        REGISTRATION : 0,
        FORGOT_PASS : 1
    }

    public REGISTRATION_TYPE : any = {
        DEFAULT : 0,
        MERCHANT : 1,
        CASHIER : 2
    }

    public addComma(value:any)
    {
    
        return Number(value).toLocaleString('en');
    }

    public getDecimal(value:any){
        value = value.toString().replace(new RegExp(',', "g"),'');
        if(value){
            value = parseFloat(value);
            if((value) % 1 == 0)
            {
                value = this.addComma(value);
                value+=".00";
            }
            else
            {
                value = parseFloat(value).toFixed(2);
                value=this.addComma(value);
                var dec = value.toString().split(".")[1];

                if(dec)
                {
                    if(dec.length <= 1)
                    {
                        value+="0";
                    }
                }
                else
                {
                    value+=".00";
                }

            }
        }else{
            value = "0.00";
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    }

    public isObjectEmpty(obj:any){
        let emptyCount = 0;
        let isEmpty = true;
        for(let keys in obj){
            if(!obj[keys] || obj[keys] == '' || typeof obj[keys] == 'undefined'){
                console.log(keys+' - empty');
                emptyCount++;
            } 
        }
        if(emptyCount <= 0){
            isEmpty = false;
        }

        return isEmpty;
    }

    public isRegistrationObjectEmpty(obj:any){
        let emptyCount = 0;
        let isEmpty = true;
        obj.forEach((item, index) => {
            if(!item.data || item.data == '' || typeof item.data == 'undefined'){
                emptyCount++;
            } 
        });
        if(emptyCount <= 0){
            isEmpty = false;
        }
        return isEmpty;
    }

    public getFormattedDate(date:Date) {
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        return y+'-'+(m < 10 ? '0' : '') + m+'-'+(d < 10 ? '0' : '') + d;
    }
}