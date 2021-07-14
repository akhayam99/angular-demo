import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceNameService } from './http-error.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  dataJson$!: Observable<any[]>;
  dataUrl: string = "http://staccah.fattureincloud.it/testfrontend/data.json";
  maxValue: number = 0;
  monthsIndex: number = 0;
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
  ]

  constructor(private httpClient: HttpClient, public serviceNameService: ServiceNameService) { }

  ngAfterViewInit(): void {
    this.dataJson$ = this.httpClient.get<any[]>(this.dataUrl);
  }

  public setBackground(month: string, value: number): void {
    var green: number = (value / this.maxValue) * 100;
    var white: number = 100 - green;
    document.getElementById(month)?.setAttribute("style", `background: linear-gradient(0deg, #D4EFDF ${green}%, white ${white}%);`)
    // background: linear-gradient(0deg, #D4EFDF 90%, white 10%);

    console.log(month, green);
  }

  public setMaxValue(months_values: any[]): void {
    months_values.forEach(item => {
        if (item["importo"] > this.maxValue)
          this.maxValue = item["importo"];
    });
  }

}
