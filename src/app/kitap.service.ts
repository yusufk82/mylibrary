import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { exhaustMap, map,take} from 'rxjs/operators';
import { Kitap } from "./kitap-list/kitap.model";
import { AuthService } from "./auth/auth.service";

@Injectable({providedIn:'root'})
export class KitapService implements OnInit{

    kitaplar:Kitap[]=[];

    api:String="https://my-library-4ff1d-default-rtdb.firebaseio.com";

    constructor(private http:HttpClient,private authService:AuthService) {}

    ngOnInit(): void {
        
    }

    kitapKaydet(id,adi,yazar,konu,puan) {
   
      return this.http.post(this.api+'/kitaplarim.json',
        {
            adi : adi,
            yazar : yazar, 
            konu : konu,
            puan : puan
        }).subscribe(responseData=>{
            console.log(responseData);
        });
    }

    onLoadKitaplar() {
        this.getKitaplar();
    }

    getKitaplar() {
       
     return this.http.get<{[key:string]:Kitap}>(this.api+'/kitaplarim.json').pipe
            (map(responseData=>{
            const bookArray:Kitap[]=[];
            console.log(responseData);
            for (const key  in responseData) {
                console.log("key:"+key);
                if(responseData.hasOwnProperty(key)){
                    console.log("responseData[key]:"+responseData[key])
                bookArray.push({...responseData[key],id:key});
                }
            }

            console.log(bookArray[0]);
            
            return bookArray;
        }));
     
          
    }

    deleteKitap(key:string) {
        let deleteUrl:string;
        deleteUrl=""+this.api+"/kitaplarim/"+key+".json"
        return this.http.delete(deleteUrl);
    } 


    getKitapByAdi(kitapAdi:string) {
        return this.http.get<{[key:string]:Kitap}>(this.api+'/kitaplarim.json?adi='+kitapAdi)
             .pipe(map(responseData=>{
                console.log(responseData);
                 const bookArray:Kitap[]=[];
                 for (const key  in responseData) {
                     if(responseData.hasOwnProperty(key)){
                     bookArray.push({...responseData[key],id:key});
                     }
                 }
                 
                 return bookArray;
             }));
     }
 
}