import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, ViewChildren } from "@angular/core";

//services
import { EmployeeService } from "./employee.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  public employeeData: any;
  public allEmployeeData: any;
  public isAddEmployeePopup: Boolean = false;
  public isEmployeeDetailsPopup: Boolean = false;
  public employeDetails = {};
  @ViewChildren('searchInput') searchInput: any;
  public paginationConfig = {
    itemPerPage: 5,
    offset: 0,
    limit: 5,
    totalRecords: 0
  };
  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.allEmployee(this.paginationConfig.offset, this.paginationConfig.limit);
  }

  allEmployee(_offset: any, _limit: any, _searchData?: any) {
    //code to get data from API
    // let successCallback = data => {
    //   this.employeeData = data;
    // };
    // this.employeeService.getEmployeesData(successCallback);
    if (_searchData) {
      this.allEmployeeData = _searchData;
    } else {
      this.allEmployeeData = this.employeeService.getEmployeesData();
    }

    this.paginationConfig.totalRecords = this.allEmployeeData.length;
    this.employeeData = [];
    this.employeeData = this.allEmployeeData.slice(_offset, _limit);
  }

  showEmployeeDetails(employee) {
    this.isEmployeeDetailsPopup = true;
    this.employeDetails = {};
    this.employeDetails = employee;

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onClickAddEmployeeButton() {
    this.isAddEmployeePopup = true;
  }
  submitEmployeeData(employee) {
    let successCallback = data => {
      this.allEmployee(
        this.paginationConfig.offset,
        this.paginationConfig.limit
      );
      this.isAddEmployeePopup = false;
    };
    const employeePlayload = employee;
    employeePlayload["preferredFullName"] =
      employeePlayload["firstName"] + " " + employeePlayload["lastName"];
    this.employeeService.createEmployeeData(employeePlayload, successCallback);
  }

  prev() {
    if (this.paginationConfig.offset != 0) {
      this.paginationConfig.offset -= this.paginationConfig.itemPerPage;
      this.paginationConfig.limit -= this.paginationConfig.itemPerPage;
      this.allEmployee(
        this.paginationConfig.offset,
        this.paginationConfig.limit
      );
    }
  }
  next() {
    if (this.paginationConfig.limit <= this.paginationConfig.totalRecords) {
      this.paginationConfig.offset += this.paginationConfig.itemPerPage;
      this.paginationConfig.limit += this.paginationConfig.itemPerPage;
      this.allEmployee(
        this.paginationConfig.offset,
        this.paginationConfig.limit
      );
    }
  }

  onSearch(searchParams: any, searchString: any) {
    const _allEmpData = this.employeeService.getEmployeesData();
    this.employeeData = _allEmpData.filter(data =>
      data[searchParams].toLowerCase().includes(searchString.toLowerCase())
    );
    this.allEmployee(
      this.paginationConfig.offset,
      this.paginationConfig.limit,
      this.employeeData
    );
  }

  clearSearch(){
    this.searchInput._results.forEach(element => {
      element.nativeElement.value = '';
    });
    this.allEmployee(this.paginationConfig.offset, this.paginationConfig.limit);
  }
}
