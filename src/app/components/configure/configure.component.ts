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

  addoreditModalOpen = false;
  deleteModalOpen = false;
  selectedShape!: Shape;

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

  create3Dobject() {
    this.addoreditModalOpen = true;
  }

  storeShape(shape: Shape) {
    if (shape) {
      if (this.selectedShape) {
        this.shapeService
          .updateShape(this.selectedShape._id, shape)
          .subscribe((result) => {
            const index = this.shapes.findIndex(
              (s) => s._id == this.selectedShape._id
            );
            this.shapes[index] = result.data;
          });
      } else {
        this.shapeService.addShape(shape).subscribe((result) => {
          this.shapes.push(result.data);
        });
      }
    }
    this.addoreditModalOpen = false;
  }

  update3DObject(shape: Shape) {
    this.selectedShape = shape;
    this.addoreditModalOpen = true;
  }

  Delete3DObject(shape: Shape) {
    this.selectedShape = shape;
    this.deleteModalOpen = true;
  }

  confirmDelete() {
    this.shapeService.delete(this.selectedShape._id).subscribe((result) => {
      const index = this.shapes.findIndex(
        (s) => s._id == this.selectedShape._id
      );
      this.shapes.splice(index, 1);
    });
    this.deleteModalOpen = false;
  }

  ngOnDestroy() {
    this.shapeSub.unsubscribe();
  }
}
