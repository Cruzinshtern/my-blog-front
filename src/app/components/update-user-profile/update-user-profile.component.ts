import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService, User} from '../../services/authentication.service';
import {UserService} from '../../services/user-service.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]]
    });

    this.authService.getUserId().pipe(
      switchMap((id: number) => this.userService.findOne(id).pipe(
        tap((user: User) => {
          this.form.patchValue({
            id: user.id,
            name: user.name,
            username: user.username
          });
        })
      ))
    ).subscribe();
  }

  update() {
    const userToUpdate = this.form.getRawValue();
    this.userService.updateOne(userToUpdate).subscribe();
  }

}
