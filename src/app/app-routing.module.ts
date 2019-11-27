import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

//component
import { EmployeeComponent } from "./scenes/employee/employee.component";

const routes: Routes = [
  { path: "", redirectTo: "/employee", pathMatch: "full" },
  { path: "employee", component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
