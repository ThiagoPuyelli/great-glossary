import { Component, OnInit } from '@angular/core';
import { GlosariesService } from "../../../services/glosaries.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-glossary',
  templateUrl: './update-glossary.component.html',
  styleUrls: ['./update-glossary.component.css']
})
export class UpdateGlossaryComponent implements OnInit {

  private glossaryID: string = "";

  constructor(
    private glossService: GlosariesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      result => {
        const input: HTMLElement|null = document.querySelector(".inputText");
        if(input && result.title) input.setAttribute("value", result.title);
        if(result.id) this.glossaryID = result.id;
      }
    )
  }

  submitGlossary(){
    event?.preventDefault();
    const titleValue: any = document.querySelector("#titleInput");
    const span: HTMLElement|null = document.querySelector(".msgError");
    if(titleValue && titleValue.value != ""){
      this.glossService.updateGlossary(titleValue.value, this.glossaryID).subscribe(
        (res: any) => {
          if(res.error){
            if(span) span.style.display = "block";
          } else {
            this.router.navigate(["/auth"]);
          }
        },
        err => console.log(err)
      )
    } else {
      if(span) span.style.display = "block";
    }
  }


}
