import { Observable, BehaviorSubject } from 'rxjs/Rx';

export default class ActivityStateService {

    public currentComponent$: Observable<any>;
    private currentComponentSource: BehaviorSubject<any>;

    constructor(){
        this.currentComponentSource = new BehaviorSubject<any>(null);
        this.currentComponent$ = this.currentComponentSource.asObservable();
    }


    public setComponentState(component:any){
        if(!component){
            this.currentComponentSource.next(null);
        }else{
            this.currentComponentSource.next(component);
        } 
    }

    public isComponent(){
        return !!this.currentComponentSource.getValue();
    }

    public getComponent(){
        return this.currentComponentSource.getValue();
    }
}