import { Component } from '@angular/core';
import { BidService } from '../service/bid.service'; 
import { Store } from '@ngxs/store';
import { GetUser } from '../store/actions/auth.action';

@Component({
  selector: 'app-my-proposals', 
  templateUrl: './my-proposals.component.html', 
  styleUrls: ['./my-proposals.component.sass']
})
export class MyProposalsComponent { 
  proposals: any[] = []; 
  user: any = {};

  constructor(private store: Store, private bidService: BidService) { 
    this.store.dispatch(new GetUser());
  }

  ngOnInit(): void {
    this.loadProposals();
  }

  loadProposals() { 
    this.bidService.getMyBids().subscribe( 
      (response: any) => {
        this.proposals = response; 
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
