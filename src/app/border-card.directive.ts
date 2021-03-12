import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[articleBorderCard]' 
})
export class BorderCardDirective {

    initialBorderColor: string = '#f5f5f5';
    initialBackgroundColor: string = '#fafafa';
    defaultBorderColor: string = '#f5f5f5';
    defaultBackgroundColor: string = '#ffffff';
    defaultHeight: number = 220;

	constructor(private el: ElementRef) {
		this.setBorder(this.initialBorderColor);
		this.setHeight(this.defaultHeight);
		this.setBackground(this.initialBackgroundColor);
	}
    @Input('articleBorderCard') borderColor: string;
    @Input('articleBackgroundCard') backgroundColor: string;

    @HostListener('mouseenter') onMouseEnter(){
        this.setBorder(this.borderColor || this.defaultBorderColor);
		this.setBackground(this.backgroundColor || this.defaultBackgroundColor);
    }

    @HostListener('mouseleave') onMouseLeave(){
        this.setBorder(this.initialBorderColor);
		this.setBackground(this.initialBackgroundColor);
    }


	private setBorder(color: string) {
		let border = 'solid 4px ' + color;
		this.el.nativeElement.style.border = border;
	}

	private setHeight(height: number) { 
		this.el.nativeElement.style.height = height + 'px';
    }

    private setBackground(color: string) {
		let background = color;
		this.el.nativeElement.style.background = background;
	}
}