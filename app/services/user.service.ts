import { Observable, BehaviorSubject } from 'rxjs/Rx';


export default class UserService {

    public currentUser$: Observable<any>;
    private currentUserSource: BehaviorSubject<any>;


    public accessToken$: Observable<string>;
    private accessTokenSource: BehaviorSubject<string>;

    constructor(){

        this.currentUserSource = new BehaviorSubject<any>(null);
        this.currentUser$ = this.currentUserSource.asObservable();

        this.accessTokenSource = new BehaviorSubject<string>(null);
        this.accessToken$ = this.accessTokenSource.asObservable();
    }

    public loggedIn(obj: any){
        if(!obj){
            this.currentUserSource.next(null);
        }else{
            this.currentUserSource.next(obj);
        } 
    }

    public setAccessToken(token: string){
        if(!token){
            this.accessTokenSource.next(null);
        }else{
            this.accessTokenSource.next(token);
        } 
    }

    public userLogout(){
        this.currentUserSource.next(null);
        this.accessTokenSource.next(null);
    }

}