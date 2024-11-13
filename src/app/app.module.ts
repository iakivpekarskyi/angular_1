import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {AuthModule} from './auth/auth.module'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {AuthService} from './auth/services/auth.service'
import {provideHttpClient, withInterceptors} from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}), // регистрируем редьюсеры
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Опционально: сохранять последние 25 состояний
      // Включаем logOnly режим в продакшене
    }),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([]), // Здесь можно добавить интерсепторы, если они нужны
    ),
    AuthService, // Убедитесь, что сервис предоставляется здесь
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
