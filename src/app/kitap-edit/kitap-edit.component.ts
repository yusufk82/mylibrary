import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from "@angular/forms";
import { Router } from '@angular/router';

import { KitapService } from '../kitap.service';


@Component({
  selector: 'app-kitap-edit',
  templateUrl: './kitap-edit.component.html',
  styleUrls: ['./kitap-edit.component.css']
})
export class KitapEditComponent implements OnInit {

  @ViewChild('f') form:NgForm;
  show:boolean=false;

  constructor(private kitapService:KitapService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {

    let kitapAdi=this.form.value.adi;
    let yazarAdi=this.form.value.yazarAdi;
    let konu=this.form.value.konu;
    let puan=this.form.value.puan;

    this.kitapService.getKitaplar().subscribe(books=>{
 
      const filteredBooks= books.filter(t=>t.adi==kitapAdi);
      if(filteredBooks.length>0) {
          this.show=true;
      } else {
        this.kitapKaydet(kitapAdi,yazarAdi,konu,puan);
      }
    });
  }

  kitapKaydet(kitapAdi:string,yazar:string,konu:string,puan:number) {
    let returnObject=this.kitapService.kitapKaydet(null,kitapAdi,yazar,konu,puan);
    if(returnObject != null) {
      console.log("kaydedildi.");
      this.form.resetForm();
      this.router.navigate(['/kitaplar']);
    }
  }

}
