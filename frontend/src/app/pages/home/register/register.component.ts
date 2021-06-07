import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public dataForm: FormGroup = this.builder.group({
    name: ["", [Validators.required, Validators.maxLength(30)]],
    lastname: ["", [Validators.required, Validators.maxLength(30)]],
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private builder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  verifyLength(){
    const span: HTMLElement|null = document.querySelector(".msgError.password");
    if(this.dataForm.value.password.length < 6){
      if(span) span.style.display = "block";
    } else {
      if(span) span.style.display = "none";
    }
  }

  submitForm(){
    const span: HTMLElement|null = document.querySelector(".msgError.text");
    if(this.dataForm.status == "VALID"){
      this.authService.register({ ...this.dataForm.value }).subscribe(
        (result: any) => {
            if(result.code === 200){
              sessionStorage.setItem("x-access-token", result.token);
              location.reload();
          } else {
            if(span) span.innerHTML = result.message;
            if(span) span.style.display = "block";
          }
        },
        err => {
          console.log(err)
          if(span) span.style.display = "block";
        }
      )
    } else {
      if(span) span.style.display = "block";
      if(span) span.innerHTML = "Email or Password is failed";
    }
  }

}
