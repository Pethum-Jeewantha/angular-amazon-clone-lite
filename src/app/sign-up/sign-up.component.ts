import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {User} from "../dto/user";

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

  constructor(private titleService: Title, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.toastrService.clear();
    this.titleService.setTitle("Amazon Registration");
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.txtNameElmRef.nativeElement.focus(), 0)
  }

}
