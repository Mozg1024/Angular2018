import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public isShown = false;

  constructor(
    private loadingService: LoadingService
  ) {
    this.loadingService.status().subscribe(newStatus => this.onLoadingStatusChanged(newStatus));
  }

  ngOnInit() {
  }

  private onLoadingStatusChanged(newStatus) {
    this.isShown = newStatus;
  }
}
