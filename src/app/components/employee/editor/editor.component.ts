import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EditorComponent)
    },
  ]
})
export class EditorComponent implements OnInit, ControlValueAccessor {

  private onTouched: (_: any) => void;
  private onChange: (data: any) => void;
  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {
    this.employeeForm = this.formBuilder.group({
      name: [''],
      personnelNumber: ['', [Validators.min(10000), Validators.max(999999)]],
    });
  }

  ngOnInit() {
    this.employeeForm.valueChanges.subscribe((employee) => {
      if (this.onChange) {
        this.onChange(employee);
      }
    });
  }


  writeValue(obj: any): void {
    this.employeeForm.patchValue(obj);
    this.changeDetectorRef.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}