import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageComponent implements OnInit{

  vidOrder ='1';

  constructor(private router : Router,
              private route : ActivatedRoute){
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.vidOrder = params['sort'] === '2' ? params['sort'] : '1'
    })  
  }

  sort(event:Event){
    const { value } = ( event.target as HTMLSelectElement )
    this.router.navigateByUrl(`manage?sort=${value}`)
  }
}
