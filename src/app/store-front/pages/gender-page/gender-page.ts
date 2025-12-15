import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Pagination } from "@/shared/components/pagination/pagination";
import { PaginationService } from '@/shared/components/pagination/pagination.service';

@Component({
  selector: 'gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService)



  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));



  productsResorce = rxResource({
    request: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page * 9
      });

    }
  })

}
