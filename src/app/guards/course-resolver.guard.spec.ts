import { TestBed, async, inject } from '@angular/core/testing';

import { CourseResolverGuard } from './course-resolver.guard';

describe('CourseResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseResolverGuard]
    });
  });

  it('should ...', inject([CourseResolverGuard], (guard: CourseResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
