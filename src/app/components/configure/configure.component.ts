import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shape } from 'src/app/models/shape';
import { ShapeServiceService } from 'src/app/services/shape-service.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css'],
})
export class ConfigureComponent implements OnInit, OnDestroy {
  shapeSub!: Subscription;
  shapes: Shape[] = [];

  constructor(private shapeService: ShapeServiceService) {}

  ngOnInit(): void {
    this.shapeSub = this.shapeService.getAllShapes().subscribe(
      (result) => {
        this.shapes = result.data;
      },
      (error) => {
        console.log('Error message : ' + error.error);
      }
    );
  }

  ngOnDestroy() {
    this.shapeSub.unsubscribe();
  }
}
