import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appUppercase]'
})
export class UppercaseDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        const input = event.target;
        input.value = input.value.toUpperCase();
    }

}