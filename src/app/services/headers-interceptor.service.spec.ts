import { TestBed, inject } from '@angular/core/testing';

import { HeadersInterceptorService } from './headers-interceptor.service';

describe('HeadersInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadersInterceptorService]
    });
  });

  it('should be created', inject([HeadersInterceptorService], (service: HeadersInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
