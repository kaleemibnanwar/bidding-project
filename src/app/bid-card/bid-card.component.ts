import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetUser } from '../store/actions/auth.action';
import { BidService } from '../service/bid.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bid-card', 
  templateUrl: './bid-card.component.html',
  styleUrls: ['./bid-card.component.sass']
})
export class BidCardComponent {
  @Input() bid: any = {};
  @Output() success = new EventEmitter<boolean>();
  user$ = this.store.select(state => state.user.currentUser);

  constructor(private bidService: BidService, private store: Store, private router: Router) { 
    this.store.dispatch(new GetUser());
  }

  deleteBid(id: number) { 
    this.bidService.deleteBid(id).subscribe(
      () => {
        this.emitSuccess(true);
      },
      (error: any) => {
      }
    );
  }

  emitSuccess(status: boolean) {
    this.success.emit(status);
  }
}
