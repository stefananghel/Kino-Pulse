import { Component, OnInit } from '@angular/core';
import { NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onOtpChange(event: any) {
    console.log(event);
  }

  otpConfig: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    placeholder: '',
    inputStyles: {
      display: 'flex',
      width: '60px',
      height: '60px',
      borderRadius: '10px',
      borderColor: "#E5E9EF",
      borderWidth:'1px',
      color: 'var(--ion-color-txt)',
      fontSize:'25px',
      fontFamily:'Poppins-SemiBold',
      backgroundColor:'var(--ion-color-bg)',
    },
    containerStyles: {
      display: 'flex',
    },
    // inputClass: 'each_input',
    // containerClass:'all_input'
  };

}
