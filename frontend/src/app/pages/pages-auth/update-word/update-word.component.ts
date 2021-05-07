import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WordsService } from "../../../services/words.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-word',
  templateUrl: './update-word.component.html',
  styleUrls: ['./update-word.component.css']
})
export class UpdateWordComponent implements OnInit {

  public dataForm: FormGroup = this.builder.group({
    word: ["", Validators.required],
    definition: ["", Validators.required]
  });

  private glossaryID: string = "";
  private wordID: string = "";
  private word: any;

  constructor(
    private builder: FormBuilder,
    private woService: WordsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.glossaryID = params.id;
        this.wordID = params.wordID;
        this.woService.getWord(this.glossaryID, this.wordID).subscribe(
          word => {
            this.word = word;
            this.setInputs();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  setInputs(){
    this.dataForm.get("word")?.setValue(this.word.word);
    this.dataForm.get("definition")?.setValue(this.word.definition);
  }

  submitForm(){
    const span: HTMLElement|null = document.querySelector(".msgError");
    if(this.dataForm.status == "VALID"){
      const { word, definition } = this.dataForm.value;
      this.woService.updateWord(this.glossaryID, this.wordID, {word, definition}).subscribe(
        (res: any) => {
          if(res.error){
            if(span) span.style.display = "block";
          } else {
            this.router.navigate(["/auth/glossary/" + this.glossaryID + "/a"])
          }
        },
        err => {if(span) span.style.display = "block"}
      )
    } else {
      if(span) span.style.display = "block";
    }
  }

}
