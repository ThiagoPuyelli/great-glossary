import { Component, OnInit } from '@angular/core';
import { GlosariesService } from "../../../services/glosaries.service";

@Component({
  selector: 'app-glosaries',
  templateUrl: './glosaries.component.html',
  styleUrls: ['./glosaries.component.css']
})
export class GlosariesComponent implements OnInit {

  public glossaries: Array<any> = [];

  constructor(
    private glosariesService: GlosariesService
  ) { }

  ngOnInit(): void {
    this.getGlosaries();
    setTimeout(() => console.log(this.glossaries), 500)
  }

  getGlosaries(){
    this.glosariesService.getGlosaries().subscribe(
      (glossaries: any) => this.glossaries = glossaries,
      err => console.log(err)
    )
  }

  deleteGlossary(id: string){
    this.glosariesService.deleteGlossary(id).subscribe(
      res => location.reload(),
      err => console.log(err)
    )
  }

}
