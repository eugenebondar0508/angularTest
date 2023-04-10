import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [UserService]
})

export class UserComponent implements OnInit {
    constructor(public userServices: UserService) {

    }
  
    ngOnInit(): void {
      this.userServices.getAll().subscribe((users) => {
        this.userServices.dataSource = users.results
      })
    }
  
    dataChangeHandler(data: any) {
      
    }
    
  
    selectionChanged(e: any) {
      e.component.collapseAll(-1);
      e.component.expandRow(e.currentSelectedRowKeys[0]);
    }
}