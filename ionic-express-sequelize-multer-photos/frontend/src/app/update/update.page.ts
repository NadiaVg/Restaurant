import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DishService } from '../services/dish.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  id: any;
  dishForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(
    private dishService: DishService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router:Router
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchDish(this.id);
    this.dishForm = this.formBuilder.group({
      name: [''],
      category: [''],
      price: ['']
    })
  }
  get errorControl() {
    return this.dishForm.controls;
  }

  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = null;
  }


  fetchDish(id:number) {
    console.log(this.dishService.findOne(id))
    this.dishService.findOne(id).subscribe((data => {
      this.dishForm.setValue({
        name: data['name'],
        category: data['category'],
        price: data['price']
      })
    }))
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.dishForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      console.log(blob)
      this.dishService.updateDish(this.id, this.dishForm.value).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/list-dishes");
      })
    }
  }

}
