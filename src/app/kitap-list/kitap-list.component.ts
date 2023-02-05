import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from "@angular/forms";
import { KitapService } from '../kitap.service';
import { Kitap } from './kitap.model';

@Component({
  selector: 'app-kitap-list',
  templateUrl: './kitap-list.component.html',
  styleUrls: ['./kitap-list.component.css']
})
export class KitapListComponent implements OnInit {

  kitaplar:Kitap[]=[];
  @ViewChild('f') form:NgForm;

  constructor(private kitapService:KitapService) { }

  ngOnInit(): void {
      this.kitapService.getKitaplar().subscribe(books=>{
        this.kitaplar=books;
      });
     
  }

  onDeleteRow(key:string) {
      console.log("sil:"+key);
      this.kitapService.deleteKitap(key).subscribe(()=>{
          let keyy=this.kitaplar.findIndex(k=>k.id==key);
        //  const index = this.kitaplar.indexOf(keyy);
        console.log(keyy);
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

}
