import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DiscoverPollsComponent} from './discover-polls/discover-polls.component';
import {HttpClientModule} from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import {LatestPollsComponent} from './latest-polls/latest-polls.component';
import {TrendingPollsComponent} from './trending-polls/trending-polls.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { LoginComponent } from './login/login.component';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ShowResultsComponent } from './show-results/show-results.component';

@NgModule({
    declarations: [
        AppComponent,
        DiscoverPollsComponent,
        CreateUserComponent,
        LatestPollsComponent,
        TrendingPollsComponent,
        CreatePollComponent,
        LoginComponent,
        PollDetailsComponent,
        MyProfileComponent,
        ShowResultsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
