import {MatSnackBar} from '@angular/material/snack-bar';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {MissionService} from '../shared/services/mission.service';

@Component({
    selector: 'app-mission',
    templateUrl: './mission.component.html',
    styleUrls: ['./mission.component.scss'],
})
export class MissionComponent implements OnInit {
    subscriptions$!: Subscription;
    isLoading: boolean = false;
    loadingSubscription$: Subscription = new Subscription();
    photoSubscription$: Subscription = new Subscription();

    constructor(private mService: MissionService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.loadingSubscription$ = this.mService.isLoading.subscribe(
            (state) => (this.isLoading = state)
        );
    }

    loadPhotos() {
        this.photoSubscription$ = this.mService.loadPhotos().subscribe(
            (singleDayPhotos) => {
                this.mService.SingleDayPhotos.next(singleDayPhotos.photos);
                this.mService.isLoading.next(false);
                this.snackBar.open(
                    'Loading pictures takes a bit longer. Remember, they are loading right from the outer space', '',
                    {
                        duration: 4000,
                        panelClass: ['cyan-snackbar'],
                    }
                );
            },
            () => {
                this.mService.isLoading.next(false);
                this.snackBar.open(
                    'Check your internet connection and try again later',
                    'Ok!',
                    {
                        duration: 4000,
                        panelClass: ['red-snackbar'],
                    }
                );
            }
        );
    }

    ngOnDestroy() {
        this.loadingSubscription$.unsubscribe();
        this.photoSubscription$.unsubscribe();
    }
}
