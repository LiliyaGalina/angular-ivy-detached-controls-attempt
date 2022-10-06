import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  UntypedFormArray,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  form: FormGroup;
  resetCount = 0;

  get arrayItems(): AbstractControl[] {
    return (this.form.controls.array as UntypedFormArray).controls;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      array: this.formBuilder.array([]),
    });
    this.reset();
  }

  public reset(): void {
    this.resetCount += 1;
    const arr = this.form.get('array') as UntypedFormArray;
    arr.clear();
    for (let i = 0; i < 10000; i++) {
      arr.push(
        this.formBuilder.group({
          someValue: [this.resetCount * i + i],
        })
      );
    }
    console.log('reset');
  }
}
