import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class MultiDomainTranslateHttpLoader implements TranslateLoader {
    constructor(
        private http: HttpClient,
        private domains: string[] = ['common', 'warehouse', 'location', 'township', 'region']
    ) {}


    public getTranslation(lang: string): Observable<any> {
        const requests = this.domains.map((domain) =>
            this.http.get(`./assets/i18n/${lang}/${domain}.json`).pipe(
                catchError((err) => {
                    console.warn(`[i18n] Missing domain file: assets/i18n/${lang}/${domain}.json`, err);
                    return of({});
                })
            )
        );

        return forkJoin(requests).pipe(
            map((responseArray) => {
                return responseArray.reduce((acc: Record<string, any>, curr) => {
                    return { ...acc, ...(curr as Record<string, any>) };
                }, {});
            })
        );
    }
}
