import { Injectable } from "@angular/core";
import { apiUrls } from "src/app/backend/urls";

//services
import { ConfigService } from "src/app/services/config.service";
import { UiService } from "src/app/services/ui.service";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor(
    private configService: ConfigService,
    private uiService: UiService
  ) {}

  getEmployeesData(successFn?: any) {
    //code to get employee from API
    // this.configService.get(apiUrls.getEmployees).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     successFn(response[0]);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    return this.uiService.mannualEmployeeData;
  }

  getEmployeeDataById(_employeeId: any, successFn?: any) {
    let url = apiUrls.getEmployee;
    url = url.concat(_employeeId);
    this.configService.get(url).subscribe(
      response => {
        successFn(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  createEmployeeData(_employeePayload: any, successFn?: any) {
    this.configService
      .post(apiUrls.createNewEmployee, _employeePayload)
      .subscribe(
        response => {
          console.log("reponse => " + response);
          successFn(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  editEmployeeData() {
    this.configService.get(apiUrls.getEmployees).subscribe(
      response => {
        console.log("reponse => " + response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
