import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, FormsModule } from '@angular/forms';
import { TestCaseBuilderModel } from '../models/testCaseBuilder.model'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  testCaseBuilder: TestCaseBuilderModel = new TestCaseBuilderModel();
  testCaseBuilderForm: FormGroup;
  items: any = [];
  keys;

  constructor() { }

  ngOnInit() {
    // this.testCaseBuilderForm = this.formBuilder.group({
    //   'jsonDataText': [this.testCaseBuilder.jsonDataText],
    //   'keyName': [this.testCaseBuilder.keyName],
    //   'expectedValue': [this.testCaseBuilder.expectedValue],
    //   'testCaseData': [this.testCaseBuilder.testCaseData],
    //   'testCaseHeading':[this.testCaseBuilder.testCaseHeading],
    // })
  }

  // onBlurMethod(e) {
  //   this.keys = this.getKeys({ jsonData: this.testCaseBuilder.jsonDataText });
  // }

  // getKeys({ jsonData }) {
  //   jsonData = JSON.parse(jsonData);

  //   for (var obj in jsonData) {
  //     if (jsonData.hasOwnProperty(obj)) {
  //       for (var prop in jsonData[obj]) {
  //         if (jsonData[obj].hasOwnProperty(prop)) {
  //           this.items.push(prop);
  //         }
  //       }
  //     }
  //   }
  //   return this.items;
  // }

  // generateTestCase() {
  //   this.testCaseBuilder.testCaseData = `pm.test("${this.testCaseBuilder.testCaseHeading}", function () {
  //   pm.response.to.have.${this.testCaseBuilder.keyName}(${this.testCaseBuilder.expectedValue});
  //   });`;
  // }

}
