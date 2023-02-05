import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from "@angular/forms";

import { KitapService } from '../kitap.service';


@Component({
  selector: 'app-kitap-edit',
  templateUrl: './kitap-edit.component.html',
  styleUrls: ['./kitap-edit.component.css']
})
export class KitapEditComponent implements OnInit {

  @ViewChild('f') form:NgForm;
  show:boolean=false;

  constructor(private kitapService:KitapService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    

     let returnObject=this.kitapService.kitapKaydet(null,this.form.value.adi,this.form.value.yazar,this.form.value.konu,this.form.value.puan);

     if(returnObject != null) {
      console.log("kaydedildi.");
      this.show=true;
      this.form.resetForm();
     }


  }

}
