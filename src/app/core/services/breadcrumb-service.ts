import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // Expose breadcrumbs as a Signal
  breadcrumbs = signal<MenuItem[]>([]);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.activatedRoute.root;
        const crumbs = this.createBreadcrumbs(root);
        this.breadcrumbs.set(crumbs);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({
          label,
          routerLink: url
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  // Optional: method to dynamically update the current breadcrumb (e.g. for dynamic IDs)
  setLabel(index: number, newLabel: string) {
    this.breadcrumbs.update(crumbs => {
      if (crumbs[index]) {
        crumbs[index].label = newLabel;
      }
      return [...crumbs];
    });
  }
}