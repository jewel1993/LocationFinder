import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  SNo:number;
  street: string;
  city: string;
  state: string;
  country: string;
  longitude: number;
  latitude:number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {SNo:1,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:2,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:3,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:4,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:5,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:6,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:7,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:8,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:9,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:10,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude:5.1},
  {SNo:11,street: 'Parasrampuria', city: 'Jaipur',state:'Rajasthan',country:'India',longitude: 2.3,latitude: 5.1},

];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'SNo': return compare(a.SNo, b.SNo, isAsc);
        case 'street': return compare(a.street, b.street, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        case 'state': return compare(a.state, b.state, isAsc);
        case 'country': return compare(a.country, b.country, isAsc);
        case 'longitude': return compare(+a.longitude, +b.longitude, isAsc);
        case 'latitude': return compare(+a.latitude, +b.latitude, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
