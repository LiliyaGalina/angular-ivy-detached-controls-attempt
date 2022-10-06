import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormArray } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  form: FormGroup;

  get arrayItems(): AbstractControl[] {
    return (this.form.controls.array as UntypedFormArray).controls;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      array: this.formBuilder.array([]),
    });
   this.reset();
  }

  public reset(): void {
    const arr = this.form.get('array') as UntypedFormArray;
    arr.clear();
    for (let i = 0; i < 1000; i++) {
      arr.push(this.formBuilder.group({
        someValue: [i]
      }))
    }
  }
}
