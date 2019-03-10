import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isShown = false;
  private loadingSubject = new ReplaySubject(1);

  constructor() { }

  public show(opt_param = true) {
    this.isShown = opt_param;
    this.loadingSubject.next(opt_param);
  }

  public hide() {
    this.show(false);
  }

  public status() {
    return this.loadingSubject;
  }
}
