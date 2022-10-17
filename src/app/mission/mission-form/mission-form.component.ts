import {Subscription} from 'rxjs';
import {Component, EventEmitter, Output, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import {MissionService} from '../../shared/services/mission.service';
import {SingleDayInfo} from "../../shared/models/mission-manifest.model";

@Component({
    selector: 'app-mission-form',
    templateUrl: './mission-form.component.html',
    styleUrls: ['./mission-form.component.scss'],
})
export class MissionFormComponent implements OnDestroy {
    constructor(public mService: MissionService, private snackBar: MatSnackBar) {
    }

    initialSub: Subscription = new Subscription();
    roverOptions = ['Curiosity', 'Opportunity', 'Spirit'];
    maxSol: number = 0;

    daysPhotoInfo: SingleDayInfo[] = [];
    cameras: string[] = [];

    @Output() formConfirmation = new EventEmitter();

    roverType = new FormControl();
    chosenDate = new FormControl();
    chosenCamera = new FormControl();

    imageLoadingForm = new FormGroup({
        roverType: this.roverType,
        chosenDate: this.chosenDate,
        chosenCamera: this.chosenCamera,
    });

    getInitialInfo(rover: string) {
        if (this.maxSol > 0) {
            this.reset();
        }
        this.mService.isLoading.next(true);

        this.initialSub = this.mService.load(rover).subscribe(
            (initialResponse) => {
                let {max_sol, photos} = initialResponse;
                this.maxSol = max_sol;
                this.daysPhotoInfo = photos;
                this.mService.isLoading.next(false);
            },
            (error) => {
                this.mService.isLoading.next(false);
                this.snackBar.open(
                    'There is an unexpected issue. Check the connection.',
                    'Ok',
                    {
                        duration: 4000,
                        panelClass: ['red-snackbar'],
                    }
                );
            }
        );
    }

    confirmSol(e?: Event) {
        this.cameras = [];
        this.mService.SingleDayPhotos.next(null);
        this.chosenCamera.reset();
        if (this.chosenDate.value > this.maxSol) {
            this.chosenDate.patchValue(this.maxSol);
            this.snackBar.open(
                'Do not try to exceed the limit. If you want more pictures, you can take them yourself:)',
                'Sorry',
                {
                    duration: 4000,
                    panelClass: ['red-snackbar'],
                }
            );
        }
        let date = this.chosenDate.value;
        let index = this.daysPhotoInfo
            .map((object) => object.sol)
            .indexOf(date, date > 350 ? date - 350 : 0);

        if (index > -1 && this.daysPhotoInfo[index].cameras.length > 0) {
            this.cameras = this.daysPhotoInfo[index].cameras;
            return;
        }

        this.cameras = [];
        this.snackBar.open('No photos taken on that day!', 'Got it', {
            duration: 4000,
            panelClass: ['cyan-snackbar'],
        });

        return;
    }

    reset() {
        this.maxSol = 0;
        this.cameras = [];
        this.chosenDate.reset();
        this.chosenCamera.reset();
        this.mService.SingleDayPhotos.next(null);
    }

    confirmForm() {
        this.mService.isLoading.next(true);
        this.mService.page = 0;
        let {roverType, chosenDate, chosenCamera} = this.imageLoadingForm.value;
        this.mService.createPhotosRequest(roverType, chosenDate, chosenCamera);
        this.formConfirmation.emit();
    }

    ngOnDestroy() {
        this.initialSub.unsubscribe();
    }
}
