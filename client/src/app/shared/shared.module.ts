import { NgModule } from '@angular/core';
import { StatusEnumPipe } from './pipes/status-enum.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ StatusEnumPipe ],
    providers: [],
    exports: [ CommonModule, StatusEnumPipe ]
})

export class SharedModule { }
