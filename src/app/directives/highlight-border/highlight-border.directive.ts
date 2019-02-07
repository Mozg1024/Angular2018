import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Directive({
  selector: '[appHighlightBorder]'
})
export class HighlightBorderDirective implements OnInit {
  @Input() creationDate: Date;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const days = differenceInDays(Date.now(), this.creationDate);

    if (days <= 0) {
      this.renderer.setStyle(this.element.nativeElement, 'box-shadow', '0 0 10px blue');
    } else if (days <= 14) {
      this.renderer.setStyle(this.element.nativeElement, 'box-shadow', '0 0 10px green');
    }
  }

}
