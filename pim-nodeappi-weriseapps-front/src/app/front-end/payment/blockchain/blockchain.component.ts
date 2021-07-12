import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './services/blockchain.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  public blockchain;
  public showInfoMessage = true;

  
  public blocks = [];
  public selectedBlock = null;

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
      this.blocks = blockchainService.blockchainInstance.chain;
      this.selectedBlock = this.blocks[0];
  }

  ngOnInit() {
  }
  
  getBlockNumber(block) {
    return block.length + 1;
  }

  showTransactions(block) {
    console.log(block);
    this.selectedBlock = block;
    return false;
  }


  thereArePendingTransactions() {
    return this.blockchain.pendingTransactions.length > 0;
  }

  dismissInfoMessage() {
    this.showInfoMessage = false;
  }
  

}
