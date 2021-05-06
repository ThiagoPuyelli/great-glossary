import { Component, OnInit } from '@angular/core';
import { GlosariesService } from "../../../services/glosaries.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-save-glossary',
  templateUrl: './save-glossary.component.html',
  styleUrls: ['./save-glossary.component.css']
})

export class SaveGlossaryComponent implements OnInit {

  constructor(
    private glossService: GlosariesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitGlossary(){
    event?.preventDefault();
    const titleValue: any = document.querySelector("#titleInput");
    if(titleValue && titleValue.value != ""){
      this.glossService.saveGlossary(titleValue.value).subscribe(
        (res: any) => {
          console.log(res)
          this.router.navigate(["/auth"])
        },
        err => console.log(err)
      )
    }
  }

}
