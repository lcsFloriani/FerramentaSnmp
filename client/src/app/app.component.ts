import { Component } from '@angular/core';

import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/throw';
import 'rxjs-compat/add/observable/empty';
import 'rxjs-compat/add/operator/takeUntil';
import 'rxjs-compat/add/operator/catch';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/filter';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/delay';
import 'rxjs-compat/add/operator/take';
import 'rxjs-compat/add/operator/do';
import 'rxjs-compat/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SnmpTool';
}
