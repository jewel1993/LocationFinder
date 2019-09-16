import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { SearchService } from '../search.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from "@angular/forms";
import { Subject } from 'rxjs';

import { Address} from './address.model';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;
  public newsearch: string;
  array: any;
  count = 0;
  constructor(public route: ActivatedRoute,private http: HttpClient, public search: SearchService) { }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['SNo', 'street','city','country','state','longitude','latitude'];

  ngOnInit() {
  }

  onSearch(form: NgForm) {
    this.newsearch = form.value.search;
    console.log(this.newsearch);
    const data = this.newsearch;
    this.http.post(BACKEND_URL + 'getAddress' , { "address" : data }).subscribe((data: any) => {
      this.array = data.addresses;
      console.log(data);
      console.log(this.array);
    })
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
