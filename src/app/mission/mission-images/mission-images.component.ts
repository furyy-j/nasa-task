import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { SingleDayPhoto } from '../../shared/models/mission-manifest.model';
import { MissionService } from '../../shared/services/mission.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-mission-images',
  templateUrl: './mission-images.component.html',
  styleUrls: ['./mission-images.component.scss'],
})
export class MissionImagesComponent implements OnInit, OnDestroy {
  destroySubscriptions$: Subject<boolean> = new Subject<boolean>();
  missionPhotos!: SingleDayPhoto[] | null;
  chosenImg!: string;
  @Output() loadMoreImages = new EventEmitter();

  cols: number = 5;
  gridByBreakpoint = {
    xl: 5,
    lg: 5,
    md: 3,
    sm: 2,
    xs: 1,
  };

  constructor(
      private mService: MissionService,
      private snackBar: MatSnackBar,
      private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
        .observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge,
        ])
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe((result) => {
          if (result.matches) {
            if (result.breakpoints[Breakpoints.XSmall]) {
              this.cols = this.gridByBreakpoint.xs;
            }
            if (result.breakpoints[Breakpoints.Small]) {
              this.cols = this.gridByBreakpoint.sm;
            }
            if (result.breakpoints[Breakpoints.Medium]) {
              this.cols = this.gridByBreakpoint.md;
            }
            if (result.breakpoints[Breakpoints.Large]) {
              this.cols = this.gridByBreakpoint.lg;
            }
            if (result.breakpoints[Breakpoints.XLarge]) {
              this.cols = this.gridByBreakpoint.xl;
            }
          }
        });
  }

  subscribeForImages() {
    this.mService.SingleDayPhotos.pipe(
        takeUntil(this.destroySubscriptions$)
    ).subscribe(
        (photos) => {
          this.missionPhotos = photos;
          console.log(photos)
          this.mService.isLoading.next(false);
        },
        () => {
          this.mService.isLoading.next(false);
          this.snackBar.open(
              'Unexpected error occured! Check your internet connection and try again later',
              'Gpt it!',
              {
                duration: 4000,
                panelClass: ['red-snackbar'],
              }
          );
        },
        () => {
          this.mService.isLoading.next(false);
        }
    );
  }

  loadMore() {
    this.loadMoreImages.emit();
  }

  ngOnInit() {
    this.subscribeForImages();
  }

  ngOnDestroy() {
    this.destroySubscriptions$.next(false);
    this.destroySubscriptions$.unsubscribe();
  }
}
