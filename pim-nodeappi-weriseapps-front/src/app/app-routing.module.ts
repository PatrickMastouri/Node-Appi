import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from './account/forgetpassword/forgetpassword.component';
import { SigninComponent } from './account/signin/signin.component';
import { SignupComponent } from './account/signup/signup.component';
import { BackEndComponent } from './back-end/back-end.component';
import { DashboardComponent } from './back-end/dashboard/dashboard.component';
import { UsersComponent } from './back-end/users/users.component';
import { AuthGuard } from './Domain/Guard/AuthGuard';
import { RepliesComponent } from './front-end/forum/Comments/replies/replies.component';
import { ForumComponent } from './front-end/forum/forum.component';
import { AddForumComponent } from './front-end/forum/Forum/add-forum/add-forum.component';
import { UpdateForumComponent } from './front-end/forum/Forum/update-forum/update-forum.component';
import { AddPostComponent } from './front-end/forum/Post/add-post/add-post.component';
import { PostDetailsComponent } from './front-end/forum/Post/post-details/post-details.component';
import { PostsComponent } from './front-end/forum/Post/posts/posts.component';
import { FrontEndComponent } from './front-end/front-end.component';
import { HomeComponent } from './front-end/home/home.component';
import { NodeapiComponent } from './front-end/nodeapi/nodeapi.component';
import { ProfileComponent } from './front-end/profile/profile.component';
import {DragdropComponent} from './front-end/dragdrop/dragdrop.component';
import { BlockchainComponent } from './front-end/payment/blockchain/blockchain.component';
import { BlockchainViewerComponent } from './front-end/payment/blockchain/pages/blockchain-viewer/blockchain-viewer.component';
import { CreateTransactionComponent } from './front-end/payment/blockchain/pages/create-transaction/create-transaction.component';
import { PendingTransactionsComponent } from './front-end/payment/blockchain/pages/pending-transactions/pending-transactions.component';
import { SettingsComponent } from './front-end/payment/blockchain/pages/settings/settings.component';
import { WalletBalanceComponent } from './front-end/payment/blockchain/pages/wallet-balance/wallet-balance.component';
import { GooglepayComponent } from './front-end/payment/googlepay/googlepay.component';
import { PaymentComponent } from './front-end/payment/payment.component';
import { PaypalComponent } from './front-end/payment/paypal/paypal.component';
import { MyprojectComponent } from './front-end/payment/myproject/myproject.component';
import { ProjectsComponent } from './front-end/projects/projects.component';
import { AddProjectComponent } from './front-end/projects/add-project/add-project.component';
import { ReclamationComponent } from './front-end/reclamation/reclamation.component';
import { ReclamtionComponent } from './back-end/reclamtion/reclamtion.component';
import { PaymentsComponent } from './back-end/payments/payments.component';
import { ForumBackComponent } from './back-end/forum-back/forum-back.component';
import { PostsBackComponent } from './back-end/posts-back/posts-back.component';
import { ChangepasswordComponent } from './front-end/changepassword/changepassword.component';
import {UpdatePostComponent} from "./front-end/forum/Post/update-post/update-post.component";

const routes: Routes = [

  {path: '', redirectTo: '/front/home', pathMatch: 'full' },
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgetpassword', component: ForgetpasswordComponent},

  {path: 'front', component: FrontEndComponent,
  children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          { path: 'payment',
    children: [
      { path: '', component: PaymentComponent , canActivate: [AuthGuard]},
      { path: 'blockchain',
      children:[
        {path: '', component: BlockchainViewerComponent },
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'transaction', component: CreateTransactionComponent, canActivate: [AuthGuard] },
  {path: 'pending', component: PendingTransactionsComponent, canActivate: [AuthGuard] },
  {path: 'wallet/:address', component: WalletBalanceComponent, canActivate: [AuthGuard] },
      ], component: BlockchainComponent , canActivate: [AuthGuard]},
      { path: 'googlepay', component: GooglepayComponent , canActivate: [AuthGuard]},
      { path: 'paypal', component: PaypalComponent , canActivate: [AuthGuard]},
      { path: 'myproject', component: MyprojectComponent , canActivate: [AuthGuard]}
    ]
  },
          {path: 'profile',  component: ProfileComponent  , canActivate: [AuthGuard]},
          {path: 'nodeapi',  component: NodeapiComponent  , canActivate: [AuthGuard]},
          {path: 'home',  component: HomeComponent },
          { path: 'Forum',
          children: [
            { path: '', component: ForumComponent , canActivate: [AuthGuard]},
            {path: 'posts/:idforum', component: PostsComponent, canActivate: [AuthGuard]},
            {path: 'posts/:subject/Addpost', component: AddPostComponent, canActivate: [AuthGuard]},
            {path: 'posts/:subject/updatePost/:id', component: UpdatePostComponent, canActivate: [AuthGuard]},

            {path: 'posts/:subject/:id', component: PostDetailsComponent, canActivate: [AuthGuard]},
            {path: 'posts/:subject/Comments/:id', component: RepliesComponent, canActivate: [AuthGuard]},
            { path: 'addforum', component: AddForumComponent, canActivate: [AuthGuard]},
            { path: 'updateforum/:id', component: UpdateForumComponent, canActivate: [AuthGuard]},
          ]
          },
    {path: 'dragdrop', component: DragdropComponent, canActivate: [AuthGuard] },
    {path: 'projects',  component: ProjectsComponent  ,canActivate: [AuthGuard]},
    {path: 'addproject',  component: AddProjectComponent  ,canActivate: [AuthGuard]},
    {path: 'Reclamation',  component: ReclamationComponent, canActivate: [AuthGuard]},
    {path: 'changepassword',  component: ChangepasswordComponent  ,canActivate: [AuthGuard]},

  ]},


  {path: 'back', component: BackEndComponent,
  children: [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'dashboard', component:  DashboardComponent , canActivate: [AuthGuard]},
    { path: 'users', component:  UsersComponent , canActivate: [AuthGuard]},
    { path: 'Reclamation', component:  ReclamtionComponent , canActivate: [AuthGuard]},
    { path: 'Payments', component:  PaymentsComponent , canActivate: [AuthGuard]},
    { path: 'ForumBack', component:  ForumBackComponent , canActivate: [AuthGuard]},
    { path: 'PostsBack', component:  PostsBackComponent , canActivate: [AuthGuard]}

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
