import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { User } from './user';
import { BoxComponent } from './news-letter.component';
import { UserService } from './userService';

@Component({
    selector: 'app-root',
    template: `
      <svg width="550" height="550" (mousedown)="mouseDown($event)"
           (mouseup)="mouseUp($event)"
           (mousemove)="mouseMove($event)">
  
        <svg:g box *simpleNgFor="let box of boxes" [box]="box"  [selected]="box.id == currentId">
        </svg:g>
  
      </svg>
    `
})
export class AppComponent implements OnInit, AfterViewInit {

    currentBoxComponent: BoxComponent = null;
    boxes = [];
    offsetX;
    offsetY;

    constructor(private cdr: ChangeDetectorRef) { }

    ngAfterViewInit() {
        this.cdr.detach();
    }

    ngOnInit() {
        for (let index = 0; index < 30000; index++) {
            this.boxes.push({
                x: Math.floor(Math.random() * 500) + 1,
                y: Math.floor(Math.random() * 500) + 1,
                id: index
            });
        }
    }
    mouseDown(event) {
        const boxComponent = event.target['BoxComponent'];
        if (boxComponent) {
            const box = boxComponent.box;
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            this.offsetX = box.x - mouseX;
            this.offsetY = box.y - mouseY;

            this.currentBoxComponent = boxComponent;

            boxComponent.selected = true;
            boxComponent.update();
        }
    }

    mouseMove(event) {
        event.preventDefault();
        if (this.currentBoxComponent !== null) {
            this.updateBox(this.currentBoxComponent, event.clientX + this.offsetX, event.clientY + this.offsetY);
        }
    }

    mouseUp($event) {
        if (this.currentBoxComponent) {
            this.currentBoxComponent.selected = false;
            this.currentBoxComponent.update();
        }
        this.currentBoxComponent = null;
    }

    updateBox(boxComponent, x, y) {
        boxComponent.box.x = x;
        boxComponent.box.y = y;
        boxComponent.update();
    }
}

// @Component({
//     selector: 'app-root',
//     template: `
//     <newsletter [user$]="userService.user$" (subscribe)="subscribe($event)"></newsletter>
//     <button (click)="changeUserName()">Change User Name</button>
// `})
// export class AppComponent {

//     constructor(private userService: UserService) {

//     }

//     subscribe(email: string) {
//         // this.newsletterService.subscribe(email);
//     }

//     changeUserName() {
//         this.userService.loadUser({ firstName: 'Bob', lastName: 'Smith' });
//     }
// }
