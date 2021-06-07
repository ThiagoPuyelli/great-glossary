import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  public email: FormControl = new FormControl('', [Validators.required, Validators.email])

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  changeInput (event: any) {
    const { value } = event.target

    this.email.setValue(value)
  }

  sendEmail () {
    event?.preventDefault()
    if (this.email.status === 'VALID') {
      this.authService.recoverPassword(this.email.value).subscribe(
        (result: any) => {
          const span: HTMLElement|null = document.querySelector('.msgError')
          if (result.code > 200) {
            if (span) {
              span.innerHTML = result.message
              span.style.display = 'block'
            }
          } else {
            if (span) span.style.display = 'none'
            const content: HTMLElement|null = document.querySelector('.content')
            const msgSuccess: HTMLElement|null = document.querySelector('.msgSuccess')  

            if (content) content.style.display = 'none'
            if (msgSuccess) msgSuccess.style.display = 'block'
          }
        },
        err => console.log(err)
      )
    }
  }

}
