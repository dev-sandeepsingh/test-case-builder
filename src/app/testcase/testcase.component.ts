import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, FormsModule } from '@angular/forms';
import { TestCaseBuilderModel } from '../models/testCaseBuilder.model'
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-testcase',
  templateUrl: './testcase.component.html',
  styleUrls: ['./testcase.component.scss']
})
export class TestcaseComponent implements OnInit {

  testCaseBuilder: TestCaseBuilderModel = new TestCaseBuilderModel();
  testCaseBuilderForm: FormGroup;
  items: any = [];
  keys;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.testCaseBuilderForm = this.formBuilder.group({
      'jsonDataText': [this.testCaseBuilder.jsonDataText],
      'keyName': [this.testCaseBuilder.keyName],
    })
  }


  onBlurMethod(e) {

    debugger;
    
    this.keys = this.getKeys({jsonData :this.testCaseBuilder.jsonDataText});

  }

  getKeys({ jsonData }) {
    jsonData = JSON.parse(jsonData);
    
    for (var obj in jsonData) {
      if (jsonData.hasOwnProperty(obj)) {
        for (var prop in jsonData[obj]) {
          if (jsonData[obj].hasOwnProperty(prop)) {
            this.items.push(prop);
          }
        }
      }
    }
    return this.items;
  }

  generateTestCase(){
    debugger;
    alert( `Key neme is ${this.testCaseBuilder.keyName}`);
    alert(`pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
  });`)
    
  }

}
