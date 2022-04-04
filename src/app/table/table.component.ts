import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { Subvencion } from '../subvencion';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  todo: string[] = [];

  subs: string[][] = [
    [],
    [],
    [],
    [],
    []
  ];

  title1: string = '';
  title2: string = '';
  title3: string = '';
  title4: string = '';
  title5: string = '';

  data: Subvencion[] = [];

  constructor(
    private dataService: DataService,
    private _snackBar: MatSnackBar,
  ) {
    // no-op
  }

  ngOnInit(): void {
    this.data = this.dataService.getRealData();
    console.log(this.data);
    [this.title1, this.title2, this.title3, this.title4, this.title5] = this.data.map(it => it.b);

    let commonList: string[] = [];
    for (const entry of this.data) {
      commonList.push(this.toMoneyString(entry.p));
      commonList.push(entry.c);
    }
    commonList = this.shuffle(commonList);
    this.todo = commonList;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    // Check if it is correct
    if (this.checkCorrect()) {
      let snackBarRef = this._snackBar.open('Lo conseguiste!', 'Probar de nuevo');
      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    }
  }

  private toMoneyString(money: number): string {
    return String(money) + ' €';
  }

  private checkCorrect() {
    for (let i = 0; i < 5; i++) {
      if (!this.isCorrect(i)) return false;
    }
    return true;
  }

  public isCorrect(i: number): boolean {
    return (this.subs[i].length == 2 && this.subs[i].includes(this.data[i].c) && this.subs[i].includes(this.toMoneyString(this.data[i].p)));
  }

  shuffle(array: string[]): string[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
}
