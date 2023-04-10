import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {

    }

    withoutFilters: boolean = true

    filters: any = {
        gender: false,
        city: false,
        street: false,
        email: false,
        phone: false,

    }

    dataSource: any = []

    getAll(): Observable<any> {
        return this.http.get<any>('https://randomuser.me/api/?results=100&seed=abc')
    }
     
    getByFilters(params: any[]): Observable<any> {
        let paramsToString: string = params.join()
        return this.http.get<any>(`https://randomuser.me/api/?results=100&seed=abc&inc=${paramsToString}`)
    } 
}