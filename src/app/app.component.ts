import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public genders = ['Male', 'Female', 'Other'];
  public signupForm: FormGroup;
  public forbiddenUsernames = ['Superuser', 'Admin'];
  public submitted = false;

  public ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('Male', Validators.required),
      'hobbies': new FormArray([]),
    });
  }

  public onSubmit() {
    this.submitted = true;
  }

  public onAddHobby() {
    const newControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(newControl);
  }

  public getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  public forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }

  public forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => { // fake async as if there is an api call
        if (control.value === 'test@test.com') {
          resolve({'emailsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

  public clearForm() {
    this.signupForm.reset();
  }

}
