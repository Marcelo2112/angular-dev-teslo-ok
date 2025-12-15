import { ProductsService } from '@/products/services/products.service';
import { ProductCard } from '@/products/components/product-card/product-card';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from "@/shared/components/pagination/pagination";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
// import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService)

  // currentPage = toSignal(
  //   ()=> inject(PaginationService).currentPage()
  // )


  // activatedRoute = inject(ActivatedRoute)

  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map(params => (params.get('page') ? +params.get('page')! : 1)),
  //     map(page => (isNaN(page) ? 1 : page))
  //   ), {
  //   initialValue: 1,
  // }
  // )


  productsResorce = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * 9


      });

    }
  });

}
