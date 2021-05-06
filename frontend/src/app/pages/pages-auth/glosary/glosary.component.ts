import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GlosariesService } from "../../../services/glosaries.service";

@Component({
  selector: 'app-glosary',
  templateUrl: './glosary.component.html',
  styleUrls: ['./glosary.component.css']
})
export class GlosaryComponent implements OnInit {

  public glossary: any;
  public letters: Array<string> = [];
  public letter: string = "";

  constructor(
    private route: ActivatedRoute,
    private glossService: GlosariesService
  ) { }

  ngOnInit(): void {
    this.getGlossary();
    this.addLetters();
    setTimeout(() => console.log(this.glossary), 500)
  }

  getGlossary(){
    this.route.params.subscribe(
      params => {
        this.glossService.getGlossary(params.id, params.letter).subscribe(
          glossary => this.glossary = glossary,
          err => console.log(err)
        )
        this.letter = params.letter;
      },
      err => console.log(err)
    )
  }

  addLetters(){
    var lettersString: string = "abcdefghijklmnñopqrstuvwxyz";
    this.letters = lettersString.split("");
  }

}
