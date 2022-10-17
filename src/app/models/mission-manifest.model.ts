export interface SingleDayPhoto {
    camera: {
        full_name: string;
    };
    earth_date: string;
    id: string;
    img_src: string;
}

export interface SingleDayPhotos {
    photos: SingleDayPhoto[];
}

export interface SingleDayInfo {
    cameras: string[];
    total_photos: number;
    sol: number;
}

export default interface MissionManifest {
    photo_manifest: {
        status: string;
        max_sol: number;
        photos: SingleDayInfo[];
    };
}
