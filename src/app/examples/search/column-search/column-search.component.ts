import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	GenericTableComponent,
	GtConfig,
	GtOptions
} from '@angular-generic-table/core';

import { Person, PEOPLE } from '../person';

@Component({
	selector: 'app-column-search',
	templateUrl: './column-search.component.html'
})
export class ColumnSearchComponent implements OnInit {
	public configObject: GtConfig<Person>;
	people: Person[] = [];

	public options: GtOptions = {
		highlightSearch: true,
		lazyLoad: true
	};

	constructor(private http: HttpClient) {}

	private getData() {
		this.http
			.get<Person[]>('http://localhost:4200/assets/data/employee.json')
			.subscribe(people => (this.people = people));
	}

	ngOnInit() {
		this.configObject = {
			settings: [
				{
					objectKey: 'id',
					sort: 'asc',
					sortOrder: 1,
					columnOrder: 0,
					searchBox: true
				},
				{
					objectKey: 'name',
					sort: 'asc',
					sortOrder: 0,
					columnOrder: 1,
					searchBox: true
				},
				{
					objectKey: 'lucky_number',
					sort: 'enable',
					columnOrder: 2,
					visible: true,
					searchBox: true
				}
			],
			fields: [
				{
					name: 'Id',
					objectKey: 'id'
				},
				{
					name: 'Name',
					objectKey: 'name'
				},
				{
					name: 'Lucky number',
					objectKey: 'lucky_number',
					stackedHeading: 'Custom heading'
				}
			]
		};

		this.getData();
	}
}
