import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PollDetailsComponent} from './poll-details/poll-details.component';
import {CreatePollComponent} from './create-poll/create-poll.component';
import {DiscoverPollsComponent} from './discover-polls/discover-polls.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {AuthGuard} from './auth-guard';
import {CreateUserComponent} from './create-user/create-user.component';

const routes: Route[] = [
        {
            path: 'new-poll',
            component: CreatePollComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'discover',
            component: DiscoverPollsComponent
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'poll/:shortUrl',
            component: PollDetailsComponent
        },
        {
            path: 'profile',
            component: MyProfileComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'register',
            component: CreateUserComponent
        },
        {
            path: '',
            redirectTo: 'discover',
            pathMatch: 'full'
        }
    ]
;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
