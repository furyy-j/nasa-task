import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import {
    SingleDayPhoto,
    SingleDayPhotos,
} from '../models/mission-manifest.model';
import MissionManifest from "../models/mission-manifest.model";

@Injectable({
    providedIn: 'root',
})
export class MissionService {
    page = 0;
    SingleDayPhotos = new BehaviorSubject<SingleDayPhoto[] | null>(null);
    isLoading = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {}
    httpRequest: string = 'https://api.nasa.gov/mars-photos/api/v1/';
    photosRequest: string = '';
    pageRequest: string = `&page=${this.page}`;

    load(roverInfo: string) {
        let requestBody: string = `manifests/${roverInfo}/?`;
        return this.http
            .get<MissionManifest>(this.httpRequest + requestBody )
            .pipe(
                map((manifest) => {
                    return manifest.photo_manifest;
                })
            );
    }

    createPhotosRequest(
        roverType: string,
        chosenDate: number,
        chosenCamera: string
    ) {
        this.photosRequest = `${this.httpRequest}/rovers/${roverType}/photos?sol=${chosenDate}&camera=${chosenCamera}`;
    }

    loadPhotos() {
        this.page++;
        this.pageRequest = `&page=${this.page}`;
        this.pageRequest = `${this.pageRequest}&`;

        return this.http.get<SingleDayPhotos>(
            this.photosRequest + this.pageRequest
        );
    }
}
