import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shape } from '../models/shape';

@Injectable({
  providedIn: 'root',
})
export class ShapeServiceService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) {}

  addShape(shape: Shape): Observable<any> {
    return this.http.post(this.url + '/add', shape);
  }

  updateShape(id: string, shape: Shape): Observable<any> {
    return this.http.put(this.url + '/update?id=' + id, shape);
  }

  getAllShapes(): Observable<any> {
    return this.http.get(this.url + '/getAll');
  }

  getByID(id: string): Observable<any> {
    return this.http.get(this.url + '/get?id=' + id);
  }

  delete(id: string) {
    return this.http.delete(this.url + '/delete?id=' + id);
  }
}
