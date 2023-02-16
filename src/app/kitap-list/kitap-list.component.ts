import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from "@angular/forms";
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { KitapService } from '../kitap.service';
import { Kitap } from './kitap.model';

@Component({
  selector: 'app-kitap-list',
  templateUrl: './kitap-list.component.html',
  styleUrls: ['./kitap-list.component.css']
})
export class KitapListComponent implements OnInit {

  kitaplar:Kitap[]=[];
  pageKitaplar:Kitap[]=[];
  pages:Number[]=[];
  @ViewChild('f') form:NgForm;
  private userSub=Subscription;
  isAuthenticated = false;
  pageSize:number;

  constructor(private kitapService:KitapService,private authService:AuthService) { }

  ngOnInit(): void {
      this.kitapService.getKitaplar().subscribe(books=>{
        this.kitaplar=books;
        let pageSize=Math.trunc(this.kitaplar.length/10);
        this.pageSize=pageSize;
        if(this.kitaplar.length<11) {
          this.pages.push(1);
          this.pageKitaplar=this.kitaplar;
        } else {
            for(let i=0;i<pageSize;i++) 
              this.pages.push(i+1);
            
            let artik=this.kitaplar.length%10;
            console.log("artık"+artik);
            console.log("pagesize"+pageSize);
            

            if(artik>0 && artik<10) {
              artik=artik+pageSize;
              this.pages.push(artik);
            }
              this.pageKitaplar=this.kitaplar.slice(0,10);              

        }
      });

      this.authService.user.subscribe(user=>{
        this.isAuthenticated = !!user;
      });
     
  }

  onDeleteRow(key:string) {
      console.log("sil:"+key);
      this.kitapService.deleteKitap(key).subscribe(()=>{
          let keyy=this.kitaplar.findIndex(k=>k.id==key);
          this.kitaplar.splice(keyy,1);
      })
  }

  kitapAra() {
    this.kitaplar=this.kitaplar.filter(a=>a.adi.includes(this.form.value.kitapAdi));
  }

  onRefresh() {
    this.kitapService.getKitaplar().subscribe(books=>{
      this.kitaplar=books;
    });
    this.form.reset();
  }

  changePage(i:number) {

    if(i===-1)
      i=this.pageSize;

    let baslangicIndex=i*10;
    let bitisIndex=baslangicIndex+10;
    this.pageKitaplar=this.kitaplar.slice(baslangicIndex,bitisIndex);      
    console.log(i);
  }

}
