import { Observable, BehaviorSubject } from 'rxjs/Rx';

export default class CountryService {

    public currentCountry$: Observable<any>;
    private currentCountrySource: BehaviorSubject<any>;

    public currentPoneNumber$: Observable<any>;
    private currentPoneNumberSource: BehaviorSubject<any>;

    constructor(){
        this.currentCountrySource = new BehaviorSubject<any>(null);
        this.currentCountry$ = this.currentCountrySource.asObservable();

        this.currentPoneNumberSource = new BehaviorSubject<any>(null);
        this.currentPoneNumber$ = this.currentPoneNumberSource.asObservable();
    }

    public selectedCountry(obj:any){
        if(typeof obj.phoneNumber !== 'undefined'){
            this.currentPoneNumberSource.next(obj.phoneNumber);
        }else{
            obj.phoneNumber = this.currentPoneNumberSource.getValue();
        }
        this.currentCountrySource.next(obj);    
    }
    
}
