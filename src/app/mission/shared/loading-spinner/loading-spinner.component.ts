import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-spinner',
    template: `
    <div>
      <mat-spinner color="primary"></mat-spinner>
      <h2>The loading may take a while...</h2>
    </div>
  `,
    styles: [
        `
      div {
        position: fixed;
        min-width: 100%;
        min-height: 100%;
        z-index: 100;
        background-color: black;
        opacity: 0.7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
      h2 {
        color: cyan;
      }
    `,
    ],
})
export class LoadingSpinnerComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
