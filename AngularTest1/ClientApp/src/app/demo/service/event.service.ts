import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) { }

    getEvents() {
        return this.http.get<any>('assets/demo/data/scheduleevents.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    saveAns(AnsID): Observable<any> {
console.log('ajshdhasdchsd')
        return this.http.post<any>(
          '/SaveAnswer',
          AnsID
        )
      }
}
