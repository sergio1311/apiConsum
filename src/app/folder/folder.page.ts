import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiFunctionsService } from '../services/api-functions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  Food: any = [];
  public pages: number;
  pageFind:any ='';
  fcdidSearch:any ='';
  actualPage:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiFunctionsService: ApiFunctionsService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.folder);
    if(this.folder == "Search")
    {
      this.getFoods(1);

    }
  }

  getFoods(page:any)
  {
    try{
      this.actualPage=page;
      this.apiFunctionsService.getInfo(page).subscribe((response)=>{
        this.Food = response["foods"];
        this.pages = response["totalPages"];
        console.log(response["foods"]);
      })
      
    }
    catch(e)
    {
      console.log(e);
    }

    
  }

  getUniqueFood(id:any)
  {
    try{
      this.actualPage=1;
      this.apiFunctionsService.getFood(id).subscribe((response)=>{
        this.Food =[];
        this.Food[0] = response;
        // console.log(response["foodNutrients"][15]);
      })
      

    }catch(e)
    {
      console.log(e);
    }
  }
  
  generateReport(id:any)
  {
    console.log(this.Food[0].foodNutrients[15]);
    
    this.getUniqueFood(id);
    const food = {
      sodium: this.Food[0].foodNutrients[15].nutrientName+" "+this.Food[0].foodNutrients[15].unitName,
      protein: '',
      energy: '',
      sugars: '',
      fiber:'',
    }
  }



  

}
