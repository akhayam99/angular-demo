import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceNameService } from './http-error.service';

@Component({
  selector: 'angular-demo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  activeMonths: string[] = [];
  dataJson$!: Observable<any[]>;
  dataUrl: string = "http://staccah.fattureincloud.it/testfrontend/data.json";
  formatter: Intl.NumberFormat = Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  maxValue: number = 0;
  months: string[] = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
  ];
  monthsIndex: number = 0;
  selectActive: boolean = false;
  totalAmount: number = 0;
  totalDocument: number = 0;

  constructor(private httpClient: HttpClient, public serviceNameService: ServiceNameService) {
    window.addEventListener('mouseup', e => {
      if (!e.ctrlKey)
        this.selectActive = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataJson$ = this.httpClient.get<any[]>(this.dataUrl);
  }

  public setBackground(month: string, value: number): void {
    var green: number = (value / this.maxValue) * 100;
    document.getElementById(month)?.setAttribute("style", `background: linear-gradient(0deg, #D4EFDF ${green}%, white 0%);`)
  }

  public setMaxValue(months_values: any[]): void {
    months_values.forEach(item => {
      if (item["importo"] > this.maxValue)
        this.maxValue = item["importo"];
    });
  }

  public startActive(month: string, document: string, amount: string, event: MouseEvent) {
    if (event.ctrlKey)
      return this.addToActiveMonths(month, amount, document);

    this.selectActive = true;
    this.activeMonths = [month];
    this.totalAmount = parseInt(amount);
    this.totalDocument = parseInt(document);
  }

  public setActive(month: string, document: string, amount: string, event: MouseEvent) {
    if (!this.selectActive)
      return;

    if (this.activeMonths.includes(month))
      return;
    
    if (event.ctrlKey)
      return;

    var firstId: number = this.months.indexOf(this.activeMonths[0]);
    var activeId: number = this.months.indexOf(month);

    if (firstId < activeId)
      return this.checkRightSide(firstId, activeId, amount, document);

    this.checkLeftSide(firstId, activeId, amount, document)
  }

  private checkRightSide(firstId: number, activeId: number, amount: string, document: string) {
    while (firstId <= activeId) {
      if (!this.activeMonths.includes(this.months[firstId]))
        this.addToActiveMonths(this.months[firstId], amount, document);
      firstId++;
    }
  }

  private checkLeftSide(firstId: number, activeId: number, amount: string, document: string) {
    while (firstId >= activeId) {
      if (!this.activeMonths.includes(this.months[firstId]))
        this.addToActiveMonths(this.months[firstId], amount, document);
      firstId--;
    }
  }

  private addToActiveMonths(month: string, amount: string, document: string) {
    this.activeMonths.push(month);
    this.totalAmount += parseInt(amount);
    this.totalDocument += parseInt(document);
  }

  public getPrice(value: number): string {
    return this.formatter.format(value);
  }
}
