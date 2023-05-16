import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective, GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {
    title = 'angular-kendo-table';
    students: any[] = [];
    gridData: GridDataResult;
    state: State = {
        skip: 0,
        take: 10,
        filter: {
            logic: 'and',
            filters: []
        }
    };

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.post<any>('/api/Student', {}).subscribe(data => {
            this.students = data.students;
            this.gridData = process(this.students, this.state);
        });
    }

    dataStateChange(state: State) {
        this.state = state;
        this.gridData = process(this.students, this.state);
    }

}
