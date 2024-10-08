import { Injectable } from '@angular/core';
import { WareHouseService } from './warehouse-service';
import { StockProduct } from './models/stock-product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyWarehouseService extends WareHouseService{
  private dummyData: StockProduct[] = [];

  constructor() { 
    super();
  }

  override getAvailableStock(productId: string): Observable<number> {
    var stock = 0;
    const stockProduct = this.dummyData.find(x => x.productId === productId);
    if(stockProduct)
      stock = stockProduct.currentStock;

    return of(stock);
  }
}
