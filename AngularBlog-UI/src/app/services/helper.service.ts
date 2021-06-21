import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiUrl: string = 'https://localhost:44361/api/Helper';
  public loading: boolean = true; //yüklemelerde kullanacağız
  constructor(private apiClient: HttpClient) {}

  sendContactEmail(contact:Contact){
    return this.apiClient.post(`${this.apiUrl}/SendContactEmail`,contact);
  }
}

