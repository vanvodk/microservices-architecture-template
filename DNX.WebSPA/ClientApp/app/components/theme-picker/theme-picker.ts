import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, PLATFORM_ID } from '@angular/core';
import { StyleManager } from '../style-manager/style-manager';
import { ThemeStorage, DocsSiteTheme } from './theme-storage/theme-storage';
import {
  MdButtonModule, MdGridListModule, MdIconModule, MdMenuModule,
  MdTooltipModule
} from '@angular/material';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'theme-picker',
  templateUrl: './theme-picker.html',
  styleUrls: ['./theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { 'aria-hidden': 'true' },
})
export class ThemePicker {
  currentTheme: DocsSiteTheme;

  // themes = [
  //   {
  //     primary: '#673AB7',
  //     accent: '#FFC107',
  //     href: 'deeppurple-amber.css',
  //     isDark: false,
  //   },
  //   {
  //     primary: '#3F51B5',
  //     accent: '#E91E63',
  //     href: 'indigo-pink.css',
  //     isDark: false,
  //     isDefault: true,
  //   },
  //   {
  //     primary: '#E91E63',
  //     accent: '#607D8B',
  //     href: 'pink-bluegrey.css',
  //     isDark: true,
  //   },
  //   {
  //     primary: '#9C27B0',
  //     accent: '#4CAF50',
  //     href: 'purple-green.css',
  //     isDark: true,
  //   },
  // ];

  themes = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      href: 'deeppurpleAmber.css',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      href: 'indigoPink.css',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      href: 'pinkBluegrey.css',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      href: 'purpleGreen.css',
      isDark: true,
    },
  ];

  constructor(
    public styleManager: StyleManager,
    private _themeStorage: ThemeStorage
  ) {
    const currentTheme = this._themeStorage.getStoredTheme();
    // if (currentTheme && isPlatformBrowser(PLATFORM_ID)) {
    if (currentTheme) {
      this.installTheme(currentTheme);
    }
  }

  installTheme(theme: DocsSiteTheme) {
     this.currentTheme = this._getCurrentThemeFromHref(theme.href);
    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `dist/${theme.href}`);
    }
    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

  private _getCurrentThemeFromHref(href: string): DocsSiteTheme {
    return <DocsSiteTheme>this.themes.find(theme => theme.href === href) ;
  }
}

@NgModule({
  imports: [
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdGridListModule,
    MdTooltipModule,
    CommonModule
  ],
  exports: [ThemePicker],
  declarations: [ThemePicker],
  providers: [StyleManager, ThemeStorage],
})
export class ThemePickerModule { }
