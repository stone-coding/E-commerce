import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  constructor(private router:Router){}


  ngOnInit(){

  }

  //route the data to the search route, it will be handled by the ProductListComponent
  doSearch(value: String){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`)
    
  }

}
