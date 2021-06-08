import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WordsService } from "../../../services/words.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-save-word',
  templateUrl: './save-word.component.html',
  styleUrls: ['./save-word.component.css']
})
export class SaveWordComponent implements OnInit {

  public dataForm: FormGroup = this.builder.group({
    word: ["", Validators.required],
    definition: ["", Validators.required]
  });

  private glossaryID: string = "";

  constructor(
    private builder: FormBuilder,
    private woService: WordsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.glossaryID = params.id,
      err => console.log(err)
    )
  }

  submitForm(){
    const span: HTMLElement|null = document.querySelector(".msgError");
    if(this.dataForm.status == "VALID"){
      const { word, definition } = this.dataForm.value;
      this.woService.saveWord(this.glossaryID, {word, definition}).subscribe(
        (res: any) => {
          if(res.code > 200){
            if(span) span.style.display = "block";
          } else {
            this.router.navigate(["/auth/glossary/" + this.glossaryID + "/A"])
          }
        },
        err => {if(span) span.style.display = "block"; console.log(err)}
      )
    } else {
      if(span) span.style.display = "block";
    }
  }

}
