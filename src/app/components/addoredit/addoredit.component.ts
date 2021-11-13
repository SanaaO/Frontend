import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shape } from 'src/app/models/shape';
import { ShapeServiceService } from 'src/app/services/shape-service.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
  styleUrls: ['./addoredit.component.css'],
})
export class AddoreditComponent implements OnInit, OnChanges {
  ModalOpen = true;
  type!: string;
  ShapeForm!: FormGroup;

  @Output() finish = new EventEmitter();
  @Input() selectedShape!: Shape;

  constructor(
    private shapeService: ShapeServiceService,
    private formBuilder: FormBuilder
  ) {
    this.ShapeForm = formBuilder.group({
      type: ['', Validators.required],
      geometry: formBuilder.group({
        height: [],
        width: [],
        depth: [],
        radius: [],
        radiusTop: [],
        radiusButtom: [],
        radialSegments: [],
        widthSegments: [],
        heightSegments: [],
      }),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedShape) {
      this.updateShape(this.selectedShape);
    }
  }

  addShape() {
    var shape: Shape = { ...this.ShapeForm.value };
    var geometry = { ...this.ShapeForm.get('geometry')?.value };

    for (var property in geometry) {
      if (geometry[property] === null || geometry[property] === undefined) {
        delete geometry[property];
      }
    }
    shape.geometry = geometry;
    this.finish.emit(shape);
  }

  updateShape(selectedShape: Shape) {
    console.log(this.selectedShape);
    this.type = this.selectedShape.type;
    this.ShapeForm.patchValue({
      geometry: {
        height: this.selectedShape.geometry.height,
        width: this.selectedShape.geometry.width,
        depth: this.selectedShape.geometry.depth,
        radius: this.selectedShape.geometry.radius,
        radiusTop: this.selectedShape.geometry.radiusTop,
        radiusButtom: this.selectedShape.geometry.radiusButtom,
        radialSegments: this.selectedShape.geometry.radialSegments,
        widthSegments: this.selectedShape.geometry.widthSegments,
        heightSegments: this.selectedShape.geometry.heightSegments,
      },
    });
  }

  cancel() {
    this.finish.emit();
  }
}
