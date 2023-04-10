import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserService } from "src/app/services/user.service";


@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
})

export class CheckboxComponent implements OnInit {

    @Output() dataChanged: EventEmitter<
    any
  > = new EventEmitter<any>()

    constructor(public userServices: UserService) {

    }

    checkboxArray: any = [
        {
            id: 1,
            type: "checkbox",
            name: "gender",
            checked: false
        },
        {
            id: 2,
            type: "checkbox",
            name: "city",
            checked: false
        },
        {
            id: 3,
            type: "checkbox",
            name: "street",
            checked: false
        },
        {
            id: 4,
            type: "checkbox",
            name: "email",
            checked: false
        },
        {
            id: 5,
            type: "checkbox",
            name: "phone",
            checked: false
        },
    ]

    dataSource: any = []


    ngOnInit(): void {
        if(localStorage.getItem('token')) {
            let res:any = localStorage.getItem('token')
            this.userServices.filters = JSON.parse(res)
            for(let i = 0; i < this.checkboxArray.length; i++) {
                this.checkboxArray[i].checked = this.userServices.filters[this.checkboxArray[i].name]
                
       if(this.userServices.filters.email || this.userServices.filters.street || this.userServices.filters.phone || this.userServices.filters.city || this.userServices.filters.gender) {
        this.userServices.withoutFilters = false
        let params: any = [];
        for(let filter in this.userServices.filters) {
          if(this.userServices.filters[filter]) {
            if(filter === 'city' || filter === 'street') {
              filter = 'location'
            }
            params.push(filter)
          }
        }
        this.userServices.getByFilters(params).subscribe((result) => {
            this.userServices.dataSource = result.results
        })
       }
            }
        }

    }




    onChange(event: any) {
        this.dataChanged.emit(
            this.userServices
        )
       if(event.target.value === 'gender') {
        this.userServices.filters.gender = !this.userServices.filters.gender
        localStorage.setItem('token', JSON.stringify(this.userServices.filters))
       }
       if(event.target.value === 'city') {
        this.userServices.filters.city = !this.userServices.filters.city
        localStorage.setItem('token', JSON.stringify(this.userServices.filters))
       }
       if(event.target.value === 'phone') {
        this.userServices.filters.phone = !this.userServices.filters.phone
        localStorage.setItem('token', JSON.stringify(this.userServices.filters))
       }
       if(event.target.value === 'street') {
        this.userServices.filters.street = !this.userServices.filters.street
        localStorage.setItem('token', JSON.stringify(this.userServices.filters))
       }
       if(event.target.value === 'email') {
        this.userServices.filters.email = !this.userServices.filters.email
        localStorage.setItem('token', JSON.stringify(this.userServices.filters))
       }

       if(this.userServices.filters.email || this.userServices.filters.street || this.userServices.filters.phone || this.userServices.filters.city || this.userServices.filters.gender) {
        this.userServices.withoutFilters = false
        let params: any = [];
        for(let filter in this.userServices.filters) {
          if(this.userServices.filters[filter]) {
            if(filter === 'city' || filter === 'street') {
              filter = 'location'
            }
            params.push(filter)
          }
        }
        this.userServices.getByFilters(params).subscribe((result) => {
            this.userServices.dataSource = result.results
        })
       } else if(this.userServices.filters.email === false && this.userServices.filters.street === false && this.userServices.filters.phone === false && this.userServices.filters.city === false && this.userServices.filters.gender === false) {
        this.userServices.withoutFilters = true
        this.userServices.getAll().subscribe((users) => {
            this.userServices.dataSource = users.results
        })
       }
    }

}