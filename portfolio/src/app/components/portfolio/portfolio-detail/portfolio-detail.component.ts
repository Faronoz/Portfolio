import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PortfolioDetail} from '../../../model/portfolio-detail';
import {PortfolioDetailService} from '../../../service/portfolio-detail.service';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit {

  portfolioItemId: number;
  portfolioItemDetail: PortfolioDetail;

  hasMoreTechnologies: boolean;
  partOneTechnologies: any[];
  partTwoTechnologies: any[];

  @ViewChild('modal') modal: ElementRef; // Get The Image Modal
  @ViewChild('modalImg') modalImg: ElementRef; // Get The Image Modal

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioDetailService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.portfolioItemId = +params.id;
      this.portfolioItemDetail = this.portfolioService.portfolioItems[this.portfolioItemId];

      // If the Technologies used is more then 4 split the Technologies Array
      const lengthTechnologiesArray = this.portfolioItemDetail.technologies.length;
      if (lengthTechnologiesArray > 4) {
        this.hasMoreTechnologies = true;
        this.partOneTechnologies = this.portfolioItemDetail.technologies.slice(0, 4);
        this.partTwoTechnologies = this.portfolioItemDetail.technologies.slice(4, lengthTechnologiesArray);
      } else {
        this.hasMoreTechnologies = false;
        this.partOneTechnologies = this.portfolioItemDetail.technologies;
      }
    });
  }

  /** Show Image in A Modal */
  showImageOne(event): any {
    console.log(event.srcElement.currentSrc);
    this.modal.nativeElement.style.display = 'block';
    this.modalImg.nativeElement.setAttribute('src', event.srcElement.currentSrc);
  }

  /** Close the Modal */
  closeModal(): any {
    this.modal.nativeElement.style.display = 'none';
  }


}
