import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
     public retrieve(key: string): any {
        let item = localStorage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(localStorage.getItem(key)!);
        }

        return;
    }
//
    public store(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
