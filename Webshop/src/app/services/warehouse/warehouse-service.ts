import { Observable } from "rxjs";

export abstract class WareHouseService {
    abstract getAvailableStock(productId: string): Observable<number>;
}