import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: any | null = null;

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  getCustomField(fieldName: string): string | null {
    if (!this.user || !this.user.custom_fields) {
      return null;
    }

    const field = this.user.custom_fields.find((f: any) => f.name === fieldName);
    return field ? field.value : null;
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  }
}
