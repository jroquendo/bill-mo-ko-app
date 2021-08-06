import { Observable, BehaviorSubject } from 'rxjs/Rx';

export default class OTPService{

  public currentOTPProcess$: Observable<any>;
  private currentOTPProcessSource: BehaviorSubject<any>;

  constructor(){

    this.currentOTPProcessSource = new BehaviorSubject<any>(null);
    this.currentOTPProcess$ = this.currentOTPProcessSource.asObservable();
  }

  public setOTPProcess(otp:any){

    if(!otp){
        this.currentOTPProcessSource.next(null);
    }else{
        this.currentOTPProcessSource.next(otp);
    } 

  }

}