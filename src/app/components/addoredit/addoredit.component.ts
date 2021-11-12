import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shape } from 'src/app/models/shape';
import { ShapeServiceService } from 'src/app/services/shape-service.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
  styleUrls: ['./addoredit.component.css'],
})
export class AddoreditComponent implements OnInit {
  ModalOpen = true;
  type!: string;
  ShapeForm!: FormGroup;

  @Output() finish = new EventEmitter();

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

  cancel() {
    this.finish.emit();
  }
  addShape() {
    var shape: Shape = { ...this.ShapeForm.value };
    var geometry = { ...this.ShapeForm.get('geometry')?.value };

    shape.geometry = geometry;
    this.finish.emit(shape);
  }
}
