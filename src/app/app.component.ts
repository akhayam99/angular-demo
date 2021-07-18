import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  maxValue: number = 0;
  monthsIndex: number = 0;
  selectActive: boolean = false;
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
  totalAmount: number = 0;
  totalDocument: number = 0;

  formatter: Intl.NumberFormat = Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });


  constructor(private httpClient: HttpClient, public serviceNameService: ServiceNameService) { }

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

  public startActive(month: string, document: string, amount: string) {
    this.selectActive = true;
    this.activeMonths = [month];
    this.totalAmount = parseInt(amount);
    this.totalDocument = parseInt(document);
  }

  public stopActive() {
    this.selectActive = false;
  }

  public setActive(month: string, document: string, amount: string) {
    if (!this.selectActive)
      return;

    if (this.activeMonths.includes(month))
      return;

    this.activeMonths.push(month);
    this.totalAmount += parseInt(amount);
    this.totalDocument += parseInt(document);
  }

  public getPrice(value: number): string {
    return this.formatter.format(value);
  }
}
