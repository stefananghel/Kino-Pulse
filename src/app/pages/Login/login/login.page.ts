import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData = {
    identifier: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Check if user is already logged in
    const auth = localStorage.getItem('auth');
    if (auth) {
      this.router.navigate(['/tabs']);
    }
  }

  async onSubmit() {
    if (!this.isValidInput()) {
      this.showToast('Enter a valid email address.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Signing in...',
      spinner: 'crescent',
    });
    await loading.present();

    // Replace with real input or dynamically encoded credentials
    const credentials = btoa(`${this.loginData.identifier}:${this.loginData.password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>('https://api.kino.care/my/account.json', { headers }).subscribe({
      next: async (res) => {
        await loading.dismiss();

        if (res && res.user) {
          localStorage.setItem('auth', res.user.api_key);
          localStorage.setItem('user', JSON.stringify(res.user));

          this.showToast('Signed in successfully.');
          this.router.navigate(['/tabs']);
        } else {
          this.showToast('Unexpected server response.');
        }
      },
      error: async (err) => {
        await loading.dismiss();
        console.error('Login failed:', err);
        this.showToast('Login failed. Please check your credentials.');
      }
    });
  }

  isValidInput(): boolean {
    const input = this.loginData.identifier;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{6,}$/;

    return emailRegex.test(input) || phoneRegex.test(input);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}
