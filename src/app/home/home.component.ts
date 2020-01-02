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
  jsonKeys: any = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.testCaseBuilderForm = this.formBuilder.group({
      'jsonDataText': [this.testCaseBuilder.jsonDataText],
      'keyName': [this.testCaseBuilder.keyName],
      'expectedValue': [this.testCaseBuilder.expectedValue],
      'testCaseData': [this.testCaseBuilder.testCaseData],
      'testCaseHeading': [this.testCaseBuilder.testCaseHeading],
      'operator': [this.testCaseBuilder.operator]
    })
  }

  onBlurMethod() {
    this.keys = this.getKeys({ jsonData: this.testCaseBuilder.jsonDataText });
  }

  getKeys({ jsonData }) {

    jsonData = JSON.parse(jsonData);
    this.jsonKeys = [];

    for (var obj in jsonData) {
      if (jsonData.hasOwnProperty(obj)) {
        this.jsonKeys.push({ text: obj, value: obj })
        if (!(typeof jsonData[obj] === 'string' || jsonData[obj] instanceof String)) {
          for (var prop in jsonData[obj]) {
            if (jsonData[obj].hasOwnProperty(prop)) {
              this.jsonKeys.push({ text: `${obj} --> ${prop}`, value: `${obj}.${prop}` });
            }
          }
        }
      }
    }
    return this.jsonKeys;
  }

  generateTestCase() {
  
    const expectedValue = typeof  this.testCaseBuilder.expectedValue === 'string' ? `'${this.testCaseBuilder.expectedValue}'` : this.testCaseBuilder.expectedValue;
    const testBody = this.testCaseBuilder.keyName === 'status' ? `pm.response.to.have.${this.testCaseBuilder.keyName}(${expectedValue});` : `pm.expect(pm.response.json().${this.keys.find( ({ text}) => text === this.testCaseBuilder.keyName ).value}).to.eql(${expectedValue});`

    this.testCaseBuilder.testCaseData = `pm.test("${this.testCaseBuilder.testCaseHeading}", function () {
    ${testBody}
    });`;
  }
}