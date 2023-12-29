import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {
  constructor() { }
  private fontSizeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(16); // Default font size

  getFontSize(): number {
    return this.fontSizeSubject.value;
  }

  increaseFontSize(): void {
    this.fontSizeSubject.next(this.fontSizeSubject.value + 2);
  }

  decreaseFontSize(): void {
    this.fontSizeSubject.next(this.fontSizeSubject.value - 2);
  }
}
