// tslint:disable-next-line:import-destructuring-spacing
import {Directive, Input} from '@angular/core';
// tslint:disable-next-line:import-destructuring-spacing
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'input[type=file]',
    // tslint:disable-next-line:use-host-property-decorator
    host : {
        '(change)' : 'onChange($event.target.files)',
        '(blur)': 'onTouched()'
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessor, multi: true }
    ]
})
// tslint:disable-next-line:directive-class-suffix
export class FileValueAccessor implements ControlValueAccessor {
    value: any;
    onChange = (_) => {};
    onTouched = () => {};

    writeValue(value) {}
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
}