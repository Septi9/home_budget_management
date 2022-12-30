import {Component, OnInit, ViewChild} from '@angular/core';
import {Plan} from "../plan";
import {PlanService} from "../plan.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  @ViewChild('addForm') addForm: any;

  plan = new Plan();
  plans : Plan[] | undefined;
  msg = '';

  constructor(private _service : PlanService, private _router : Router) { }

  ngOnInit(): void {
    this.getPlans();
  }

  private getPlans() {
    this._service.getPlanList().subscribe(data => {
      this.plans = data;
    },
      error => {
        this.msg = error.error;
        console.log(error)
      })
  }

  public onAddPlan() : void {
    this.plan.user_id = 1;
    this._service.createPlanElement(this.plan).subscribe(data => {
        window.location.reload();
      },
      error => {
        this.msg = "Something went wrong";
      }
    )
  }

//   public format() {
//     this.formatCurrency(`${this.plan.amount}`);
//   }
//
//
//  formatNumber(number: string) {
//   return number.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// }
//
//
//  formatCurrency(input : string) {
//
//   if (input === "") { return; }
//
//   if (input.indexOf(".") >= 0) {
//     let decimal_pos = input.indexOf(".");
//
//     var left_side = input.substring(0, decimal_pos);
//     var right_side = input.substring(decimal_pos);
//
//     left_side = this.formatNumber(left_side);
//
//     right_side = this.formatNumber(right_side);
//
//     right_side = right_side.substring(0, 2);
//
//     input = "$" + left_side + "." + right_side;
//
//   } else {
//     input = this.formatNumber(input);
//     input = "$" + input;
//
//   }
// console.log(input);
//
// }




}
