import { Injectable } from '@angular/core';

import { SvgIconRegistryService } from 'angular-svg-icon';
import { retry } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})

export class IconsService {

  icons = [
    { url: './assets/images/icons/search.svg', name: 'search' },
  ];

  constructor(
    private iconReg: SvgIconRegistryService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {

  }

  loadSvgIcons(): Promise<any> {

    return new Promise<any | void>(resolve => {
      const icons = this.icons.map(icon => {
        return this.iconReg.loadSvg(icon.url, icon.name)?.pipe(retry(3));
      });
      resolve(icons);
    });
  }

  loadMaterialsIcons(): Promise<any> {

    return new Promise<any | void>(resolve => {
      const icons = this.icons.map(icon => {
        return this.iconRegistry.addSvgIcon(icon.name, this.sanitizer.bypassSecurityTrustResourceUrl(icon.url))
      });
      resolve(icons);
    });
  }

}
