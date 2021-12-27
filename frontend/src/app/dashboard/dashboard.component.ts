import { Component, OnInit } from '@angular/core';
import {Renderer2} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(  private renderer: Renderer2 ) { }

  ngOnInit(): void {
    new Promise(resolve => {
      this.loadScript('assets/vendor/chart.js/Chart.min.js').onload = () => {
        this.loadScript('assets/js/demo/chart-area-demo.js').onload = () => {
          this.loadScript('assets/js/demo/chart-pie-demo.js').onload = () => {
          }
        }
      }
    });
  }

  public loadScript(src: string): HTMLScriptElement {
    const node = document.createElement('script');
    node.src = src; 
    node.type = 'text/javascript';
    node.async = true;
    this.renderer.appendChild(document.body, node);
    return node;
  }
  
}
