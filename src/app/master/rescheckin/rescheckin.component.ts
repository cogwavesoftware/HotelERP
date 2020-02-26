

import { Component } from '@angular/core';

enum CheckBoxType { APPLY_FOR_JOB, MODIFY_A_JOB, NONE };
@Component({
  selector: 'app-rescheckin',
  templateUrl: './rescheckin.component.html',
  styleUrls: ['./rescheckin.component.scss']
})
export class RescheckinComponent {

  subText = '';
  mainText = '';
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  answered = false;
  operatorSet = false;

  pressKey(key: string) {
    if (key === '/' || key === 'x' || key === '-' || key === '+') {
      const lastKey = this.mainText[this.mainText.length - 1];
      if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+')  {
        this.operatorSet = true;
      }
      if ((this.operatorSet) || (this.mainText === '')) {
        return;
      }
      this.operand1 = parseFloat(this.mainText);
      this.operator = key;
      this.operatorSet = true;
    }
    if (this.mainText.length === 10) {
      return;
    }
    this.mainText += key;
  }

  allClear() {
    this.mainText = '';
    this.subText = '';
    this.operatorSet = false;
  }

  getAnswer() {
    this.calculationString = this.mainText;
    this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);
    if (this.operator === '/') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 / this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = this.mainText.substr(0, 9);
      }
    } else if (this.operator === 'x') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 * this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = 'ERROR';
        this.subText = 'Range Exceeded';
      }
    } else if (this.operator === '-') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 - this.operand2).toString();
      this.subText = this.calculationString;
    } else if (this.operator === '+') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 + this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = 'ERROR';
        this.subText = 'Range Exceeded';
      }
    } else {
      this.subText = 'ERROR: Invalid Operation';
    }
    this.answered = true;
  }
}