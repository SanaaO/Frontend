import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shape } from 'src/app/models/shape';
import { ShapeServiceService } from 'src/app/services/shape-service.service';
import * as THREE from 'three';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  shapes: Shape[] = [];
  shapeSub!: Subscription;
  shape!: Shape;
  selectedID!: string;
  color!: string;

  @ViewChild('canvas') private canvasRef!: ElementRef;

  //camera properrties
  camera!: THREE.PerspectiveCamera;
  fieldOfView: number = 1;
  nearClippingPlane: number = 1;
  farClippingPlane: number = 1000;

  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;

  //3D object properties
  Object_3D!: THREE.Mesh;
  lines!: THREE.LineSegments;
  geometry!: any;
  material!: any;

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

  DisplayObject() {
    //get selected 3D properties
    this.shapeService.getByID(this.selectedID).subscribe((result) => {
      this.shape = result.data;

      switch (this.shape.type) {
        case 'BoxGeometry': {
          this.geometry = new THREE.BoxGeometry(
            this.shape.geometry.width,
            this.shape.geometry.height,
            this.shape.geometry.depth
          );
          break;
        }
        case 'ConeGeometry': {
          this.geometry = new THREE.ConeGeometry(
            this.shape.geometry.radius,
            this.shape.geometry.height,
            this.shape.geometry.radialSegments
          );
          break;
        }
        case 'CylinderGeometry': {
          this.geometry = new THREE.CylinderGeometry(
            this.shape.geometry.radiusTop,
            this.shape.geometry.radiusButtom,
            this.shape.geometry.height,
            this.shape.geometry.radialSegments
          );
          break;
        }
        case 'SphereGeometry': {
          this.geometry = new THREE.SphereGeometry(
            this.shape.geometry.radius,
            this.shape.geometry.widthSegments,
            this.shape.geometry.heightSegments
          );
          break;
        }

        default: {
          break;
        }
      }
      //fix color
      this.material = new THREE.MeshBasicMaterial({ color: this.color });
      //create 3D object (Mesh)
      this.Object_3D = new THREE.Mesh(this.geometry, this.material);

      //add edges lines to 3D object
      const edges = new THREE.EdgesGeometry(this.geometry);
      this.lines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000000 })
      );

      //dislay
      this.createScene();
      this.startRenderingLoop();
    });
  }

  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  //creating a scene
  createScene() {
    //Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#F2F2F2');

    this.scene.add(this.Object_3D, this.lines);
    //Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = 800;
  }

  private animateObject() {
    this.Object_3D.rotation.x += 0.01;
    this.Object_3D.rotation.y += 0.01;

    this.lines.rotation.x += 0.01;
    this.lines.rotation.y += 0.01;
  }

  private startRenderingLoop() {
    //Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: DisplayComponent = this;
    (function animate() {
      requestAnimationFrame(animate);
      component.animateObject();
      component.renderer.render(component.scene, component.camera);
    })();
  }
}
