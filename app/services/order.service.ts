import { Observable, BehaviorSubject } from 'rxjs/Rx';

export default class OrderService{

    public currentOrderProcess$: Observable<any>;
    private currentOrderSource: BehaviorSubject<any>;
  
    constructor(){
  
      this.currentOrderSource = new BehaviorSubject<any>(null);
      this.currentOrderProcess$ = this.currentOrderSource.asObservable();
    }
    

    public setOrderProcess(order:any){
        if(!order){
            this.currentOrderSource.next(null);
        }else{
            this.currentOrderSource.next(order);
        } 
    }
    
    public getOrders(){
        return this.currentOrderSource.getValue();
    }
  
  }