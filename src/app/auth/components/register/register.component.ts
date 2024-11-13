import {Component, inject} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {Store, select} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'
import {Observable} from 'rxjs'
import {selectIsSubmitting} from '../../store/selectors'
import {AuthService} from '../../services/auth.service'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder)
  private store = inject(Store)
  private authservice = inject(AuthService)

  isSubmitting$: Observable<boolean> = this.store.pipe(
    select(selectIsSubmitting),
  )

  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid)
    this.store.dispatch(registerAction(this.form.getRawValue()))
    this.authservice
      .register(this.form.value)
      .subscribe((currentUser: CurrentUserInterface) => {
        console.log('currentUser', currentUser)
      })
  }
}
