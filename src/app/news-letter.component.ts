import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    AfterViewInit,
    ViewChild,
    ElementRef
} from '@angular/core';

@Component({
    selector: '[box]',
    template: `
      <svg:rect
        #rect
        [attr.dataId]="box.id"
        [attr.x]="box.x"
        [attr.y]="box.y"
        width="20"
        height="20"
        stroke="black"
        [attr.fill]="selected ? 'red' : 'transparent'"
        strokeWidth="1"></svg:rect>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements AfterViewInit {
    @Input() box;
    @Input() selected;

    @ViewChild('rect')
    set rect(value: ElementRef) {
        if (value) {
            value.nativeElement['BoxComponent'] = this;
        }
    }

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngAfterViewInit() {
        this.changeDetectorRef.detach();
    }

    update() {
        this.changeDetectorRef.detectChanges();
    }
}

