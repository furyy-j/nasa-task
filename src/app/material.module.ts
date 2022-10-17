import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    imports: [
        MatButtonModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatCommonModule,
        MatSliderModule,
        MatGridListModule,
        MatRadioModule,
        FlexLayoutModule,
        LayoutModule,
    ],
    exports: [
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatCommonModule,
        MatSliderModule,
        MatGridListModule,
        MatRadioModule,
        FlexLayoutModule,
        LayoutModule,
    ],
})
export class MaterialModule {}
