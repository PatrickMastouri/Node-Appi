import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackEndComponent } from './back-end/back-end.component';
import { FrontEndComponent } from './front-end/front-end.component';
import { HttpRequestInterceptor } from './Domain/Interceptor/Interceptor';
import { SigninComponent } from './account/signin/signin.component';
import { SignupComponent } from './account/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarSigninupComponent } from './components/nav-bar-signinup/nav-bar-signinup.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './back-end/dashboard/dashboard.component';
import { ProfileComponent } from './front-end/profile/profile.component';
import { NodeapiComponent } from './front-end/nodeapi/nodeapi.component';
import { UsersComponent } from './back-end/users/users.component';
import { ForgetpasswordComponent } from './account/forgetpassword/forgetpassword.component';
import { AddCommentComponent } from './front-end/forum/Comments/add-comment/add-comment.component';
import { RepliesComponent } from './front-end/forum/Comments/replies/replies.component';
import { ForumComponent } from './front-end/forum/forum.component';
import { AddForumComponent } from './front-end/forum/Forum/add-forum/add-forum.component';
import { UpdateForumComponent } from './front-end/forum/Forum/update-forum/update-forum.component';
import { AddPostComponent } from './front-end/forum/Post/add-post/add-post.component';
import { PostDetailsComponent } from './front-end/forum/Post/post-details/post-details.component';
import { PostsComponent } from './front-end/forum/Post/posts/posts.component';
import { DragdropComponent } from './front-end/dragdrop/dragdrop.component';
import { BlockchainComponent } from './front-end/payment/blockchain/blockchain.component';

import { BlockViewComponent } from './front-end/payment/blockchain/components/block-view/block-view.component';
import { TransactionsTableComponent } from './front-end/payment/blockchain/components/transactions-table/transactions-table.component';
import { BlockchainViewerComponent } from './front-end/payment/blockchain/pages/blockchain-viewer/blockchain-viewer.component';
import { CreateTransactionComponent } from './front-end/payment/blockchain/pages/create-transaction/create-transaction.component';
import { PendingTransactionsComponent } from './front-end/payment/blockchain/pages/pending-transactions/pending-transactions.component';
import { SettingsComponent } from './front-end/payment/blockchain/pages/settings/settings.component';
import { WalletBalanceComponent } from './front-end/payment/blockchain/pages/wallet-balance/wallet-balance.component';
import { GooglepayComponent } from './front-end/payment/googlepay/googlepay.component';
import { PaymentComponent } from './front-end/payment/payment.component';
import { PaypalComponent } from './front-end/payment/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { ProjectsComponent } from './front-end/projects/projects.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {MatIconModule} from '@angular/material/icon';
import { AddProjectComponent } from './front-end/projects/add-project/add-project.component';
import { MyprojectComponent } from './front-end/payment/myproject/myproject.component';
import { ReclamationComponent } from './front-end/reclamation/reclamation.component';
import { ReclamtionComponent } from './back-end/reclamtion/reclamtion.component';
import { PaymentsComponent } from './back-end/payments/payments.component';
import { ForumBackComponent } from './back-end/forum-back/forum-back.component';
import { PostsBackComponent } from './back-end/posts-back/posts-back.component';
import { ChangepasswordComponent } from './front-end/changepassword/changepassword.component';
import {UpdatePostComponent} from "./front-end/forum/Post/update-post/update-post.component";

@NgModule({
  declarations: [
    AppComponent,
    BackEndComponent,
    FrontEndComponent,
    SigninComponent,
    SignupComponent,
    ForgetpasswordComponent,
    FooterComponent,
    NavBarSigninupComponent,
    NavBarComponent,
    DragdropComponent,
    DashboardComponent,
    NodeapiComponent,
    ProfileComponent,
    UsersComponent,
    PostDetailsComponent,
    PostsComponent,
    AddPostComponent,
    AddForumComponent,
    RepliesComponent,
    ForumComponent,
    UpdatePostComponent,
    UpdateForumComponent,
    AddCommentComponent,
    PaymentComponent,
    BlockchainViewerComponent,
    SettingsComponent,
    TransactionsTableComponent,
    CreateTransactionComponent,
    PendingTransactionsComponent,
    WalletBalanceComponent,
    GooglepayComponent,
    PaypalComponent,
    BlockchainComponent,
    BlockViewComponent,
    BlockchainViewerComponent,
    SettingsComponent,
    TransactionsTableComponent,
    CreateTransactionComponent,
    PendingTransactionsComponent,
    WalletBalanceComponent,
    ProjectsComponent,
    AddProjectComponent,
    MyprojectComponent,
    ReclamationComponent,
    ReclamtionComponent,
    PaymentsComponent,
    ForumBackComponent,
    PostsBackComponent,
    ChangepasswordComponent,
    ForgetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    GooglePayButtonModule,
    NgxPayPalModule,
    FontAwesomeModule,
    MatIconModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
