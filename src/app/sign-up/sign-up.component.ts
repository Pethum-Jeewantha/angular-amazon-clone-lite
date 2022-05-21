import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {User} from "../dto/user";
import {NgModel} from "@angular/forms";
import {SignupService} from "../service/signup.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

// type a = User & {confirmPassword: string};

export class SignUpComponent implements OnInit, AfterViewInit {

  @ViewChild("txtName")
  private txtNameElmRef!: ElementRef<HTMLInputElement>;
  registrationDetail: User & { confirmPassword: string } = {
    userId: '',
    name: '',
    password: '',
    confirmPassword: ''
  }
  onProgress = false;

  constructor(private titleService: Title, private toastrService: ToastrService, private signupService: SignupService) {
  }

  ngOnInit(): void {
    this.toastrService.clear();
    this.titleService.setTitle("Amazon Registration");
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.txtNameElmRef.nativeElement.focus(), 0)
  }

  getErrorMsg(model: NgModel): string {
    switch (model.name) {
      case 'name':
        if (model.hasError('required')) {
          return "Name can't be empty";
        } else if (model.hasError('pattern')) {
          return 'Name can contain only letters & spaces';
        }
        break;
      case 'user-id':
        if (model.hasError('required')) {
          return "User ID  can't be empty";
        } else if (model.hasError('minLength')) {
          return 'User ID should be at least 5 characters long';
        } else if (model.hasError('pattern')) {
          return "User ID can't be contains the colan (:)";
        }
        break;
      case 'confirm-password':
        if (model.hasError('required')) {
          return "Repeated password can't be empty";
        }
    }
    return '';
  }

  onSubmit() {
    const user: User = {
      userId: this.registrationDetail.userId,
      name: this.registrationDetail.name,
      password: this.registrationDetail.password,
    }

    this.signupService.signupUser(user).subscribe((value) => {
      this.onProgress = false;
      this.toastrService.success("User has been Saved", "Success", {
        positionClass: 'toast-bottom-right',
      });
    }, error => {
      this.onProgress = false;
      this.toastrService.error("Failed to save. Try again!", "Error", {
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
      console.error(error);
    })
  }
}
