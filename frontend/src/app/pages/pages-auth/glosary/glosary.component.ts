import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GlosariesService } from "../../../services/glosaries.service";
import { WordsService } from "../../../services/words.service";

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
    private glossService: GlosariesService,
    private wordsService: WordsService
  ) { }

  ngOnInit(): void {
    this.getGlossary();
    this.addLetters();
  }

  getGlossary(){
    this.route.params.subscribe(
      params => {
        this.glossService.getGlossary(params.id, params.letter).subscribe(
          (response: any) => this.glossary = response.message.glossary,
          err => console.log(err)
        )
        this.letter = params.letter;
      },
      err => console.log(err)
    )
  }

  addLetters(){
    var lettersString: string = ("abcdefghijklmnñopqrstuvwxyz").toUpperCase();
    this.letters = lettersString.split("");
  }

  deleteWord(wordID: string){
    this.wordsService.deleteWord(this.glossary._id, wordID).subscribe(
      res => location.reload(),
      err => console.log(err)
    )
  }

}
