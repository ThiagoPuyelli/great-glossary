import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  private code: string = "";
  public dataForm: FormGroup = this.builder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(4)]]
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.codeParam()
  }

  submitForm(){
    if (this.dataForm.status === 'VALID') {
      this.authService.changePassword({ ...this.dataForm.value, code: this.code }).subscribe(
        result => this.router.navigate(['/login']),
        err => console.log(err)
      )
    } else {
      const span: HTMLElement | null = document.querySelector('.msgError')

      if (span) span.style.display = 'block'
    }
  }

  codeParam(){
    this.route.params.subscribe(
      params => this.code = params.code,
      err => console.log(err)
    )
  }

}
