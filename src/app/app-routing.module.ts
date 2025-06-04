import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/Login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/Login/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/Profile/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'musicp',
    loadChildren: () => import('./pages/Profile/musicp/musicp.module').then( m => m.MusicpPageModule)
  },
  {
    path: 'weight',
    loadChildren: () => import('./pages/Profile/weight/weight.module').then( m => m.WeightPageModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./pages/Profile/progress/progress.module').then( m => m.ProgressPageModule)
  },
  {
    path: 'workr',
    loadChildren: () => import('./pages/Profile/workr/workr.module').then( m => m.WorkrPageModule)
  },
  {
    path: 'myworkout',
    loadChildren: () => import('./pages/Profile/myworkout/myworkout.module').then( m => m.MyworkoutPageModule)
  },
  {
    path: 'accounti',
    loadChildren: () => import('./pages/Profile/accounti/accounti.module').then( m => m.AccountiPageModule)
  },
  {
    path: 'eworkout',
    loadChildren: () => import('./pages/Profile/eworkout/eworkout.module').then( m => m.EworkoutPageModule)
  },
  {
    path: 'cworkout2',
    loadChildren: () => import('./pages/Profile/cworkout2/cworkout2.module').then( m => m.Cworkout2PageModule)
  },
  {
    path: 'cworkout1',
    loadChildren: () => import('./pages/Profile/cworkout1/cworkout1.module').then( m => m.Cworkout1PageModule)
  },
  {
    path: 'ptraining',
    loadChildren: () => import('./pages/Profile/ptraining/ptraining.module').then( m => m.PtrainingPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./pages/Profile/summary/summary.module').then( m => m.SummaryPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/Intro/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'intro1',
    loadChildren: () => import('./pages/Intro/intro1/intro1.module').then( m => m.Intro1PageModule)
  },
  {
    path: 'intro2',
    loadChildren: () => import('./pages/Intro/intro2/intro2.module').then( m => m.Intro2PageModule)
  },
  {
    path: 'pre',
    loadChildren: () => import('./pages/Intro/pre/pre.module').then( m => m.PrePageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./pages/Login/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'st1',
    loadChildren: () => import('./pages/Login/st1/st1.module').then( m => m.St1PageModule)
  },
  {
    path: 'st2',
    loadChildren: () => import('./pages/Login/st2/st2.module').then( m => m.St2PageModule)
  },
  {
    path: 'st3',
    loadChildren: () => import('./pages/Login/st3/st3.module').then( m => m.St3PageModule)
  },
  {
    path: 'st4',
    loadChildren: () => import('./pages/Login/st4/st4.module').then( m => m.St4PageModule)
  },
  {
    path: 'st5',
    loadChildren: () => import('./pages/Login/st5/st5.module').then( m => m.St5PageModule)
  },
  {
    path: 'st6',
    loadChildren: () => import('./pages/Login/st6/st6.module').then( m => m.St6PageModule)
  },
  {
    path: 'st7',
    loadChildren: () => import('./pages/Login/st7/st7.module').then( m => m.St7PageModule)
  },
  {
    path: 'cplan',
    loadChildren: () => import('./pages/Login/cplan/cplan.module').then( m => m.CplanPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/Home/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'aexercise',
    loadChildren: () => import('./pages/Home/aexercise/aexercise.module').then( m => m.AexercisePageModule)
  },
  {
    path: 'wdetail/:programId',
    loadChildren: () => import('./pages/Home/wdetail/wdetail.module').then(m => m.WdetailPageModule)
  },
  {
    path: 'sworkout',
    loadChildren: () => import('./pages/Home/sworkout/sworkout.module').then( m => m.SworkoutPageModule)
  },

  {
    path: 'straining',
    loadChildren: () => import('./pages/Profile/straining/straining.module').then( m => m.StrainingPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
