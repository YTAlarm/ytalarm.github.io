import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemaining',
})
export class TimeRemainingPipe implements PipeTransform {
  second = 1000;
  minute = 60 * this.second;
  hour = 60 * this.minute;

  transform(time: number): string {
    let result = '';
    const hours = this.getHours(time);
    const minutes = this.getMinutes(time);
    const seconds = this.getSeconds(time);

    if (hours) {
      result += this.stringifiedTime(this.getHours(time), 'hour');
    }

    if (minutes) {
      result += ' ' + this.stringifiedTime(this.getMinutes(time), 'min');
    }

    if (seconds && !hours && minutes < 5) {
      result += ' ' + this.stringifiedTime(this.getSeconds(time), 'second');
    }

    return result.trim();
  }

  getHours(time: number): number {
    return Math.floor(time / this.hour);
  }

  getMinutes(time: number): number {
    return Math.floor((time % this.hour) / this.minute);
  }

  getSeconds(time: number): number {
    return Math.floor((time % this.minute) / this.second);
  }

  addPlural(num: number, str: string): string {
    return num > 1 ? str + 's' : str;
  }

  stringifiedTime(num: number, suffix: string): string {
    return `${num} ${this.addPlural(num, suffix)}`;
  }
}
