import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SimpleNgFor } from './simple_ngfor.directive';
import { AppComponent } from './app.component';
import { BoxComponent } from './news-letter.component';
import { UserService } from './userService';

@NgModule({
    declarations: [
        AppComponent,
        BoxComponent,
        SimpleNgFor
    ],
    imports: [
        BrowserModule,
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
