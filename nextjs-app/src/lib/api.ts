// Data fetching utilities - reads JSON data from src/data directory
import menuListData from '@/data/menuList.json';
import footerData from '@/data/footer.json';
import langListData from '@/data/langList.json';
import homePageInitData from '@/data/homePageInit.json';
import newsListData from '@/data/newsList.json';
import historyData from '@/data/history.json';
import executivesData from '@/data/executives.json';
import boardOfDirectorsData from '@/data/boardOfDirectors.json';
import companyIntroData from '@/data/companyIntro.json';
import inquiryTypesData from '@/data/inquiryTypes.json';
import countryListData from '@/data/countryList.json';
import globalNetworkInitData from '@/data/globalNetworkInit.json';
import globalNetworkAllData from '@/data/globalNetworkAll.json';
import categoryMobilityData from '@/data/categoryMobility.json';
import categoryHomeData from '@/data/categoryHome.json';
import categoryWorkData from '@/data/categoryWork.json';
import categoryIndustrialData from '@/data/categoryIndustrial.json';
import categoryEverywhereData from '@/data/categoryEverywhere.json';
import successCasesData from '@/data/successCases.json';
import technologiesData from '@/data/technologies.json';
import applicationRealmData from '@/data/applicationRealm.json';

/* eslint-disable @typescript-eslint/no-explicit-any */

export function getMenuList(): any {
  return menuListData;
}

export function getFooter(): any {
  return footerData;
}

export function getLangList(): any {
  return langListData;
}

export function getHomePageInit(): any {
  return homePageInitData;
}

export function getNewsList(): any {
  return newsListData;
}

export function getHistory(): any {
  return historyData;
}

export function getExecutives(): any {
  return executivesData;
}

export function getBoardOfDirectors(): any {
  return boardOfDirectorsData;
}

export function getCompanyIntro(): any {
  return companyIntroData;
}

export function getInquiryTypes(): any {
  return inquiryTypesData;
}

export function getCountryList(): any {
  return countryListData;
}

export function getGlobalNetworkInit(): any {
  return globalNetworkInitData;
}

export function getGlobalNetworkAll(): any {
  return globalNetworkAllData;
}

export function getSuccessCases(): any {
  return successCasesData;
}

export function getTechnologies(): any {
  return technologiesData;
}

export function getApplicationRealm(): any {
  return applicationRealmData;
}

const CATEGORY_MAP: Record<string, () => any> = {
  'CSCG000001': () => categoryMobilityData,
  'CSCG000002': () => categoryHomeData,
  'CSCG000003': () => categoryWorkData,
  'CSCG000004': () => categoryIndustrialData,
  'CSCG000005': () => categoryEverywhereData,
};

export function getCategoryData(catCode?: string): any {
  if (catCode && CATEGORY_MAP[catCode]) {
    return CATEGORY_MAP[catCode]();
  }
  return categoryMobilityData;
}

// Process menu list for navigation
export interface MenuItem {
  menuCd: string;
  menuDepth: string;
  uprMenuCd: string | null;
  menuUrl: string;
  menuImgFilePath: string;
  menuImgFileNm: string;
  webMenuNm: string;
  moMenuNm: string;
  menuTarget: string;
  className: string;
  children: MenuItem[];
}

export function getProcessedMenu(lang: string = 'en'): MenuItem[] {
  const data = getMenuList();
  const allMenus = data.menuList;
  const searchLang = ['ko', 'cn', 'de'].includes(lang) ? lang : 'en';

  const depth1 = allMenus.filter((m: any) => m.menuDepth === '1');

  return depth1.map((menu1: any, idx: number) => {
    const webMenuNm = menu1.menuLangList
      ?.filter((l: any) => l.lang === searchLang)
      ?.map((l: any) => l.webMenuNm)[0] || '';
    const moMenuNm = menu1.menuLangList
      ?.filter((l: any) => l.lang === searchLang)
      ?.map((l: any) => l.moMenuNm)[0] || '';

    const depth2 = allMenus.filter((m: any) => m.uprMenuCd === menu1.menuCd && m.menuDepth === '2');

    const children = depth2.map((menu2: any, idx2: number) => {
      const web2 = menu2.menuLangList
        ?.filter((l: any) => l.lang === searchLang)
        ?.map((l: any) => l.webMenuNm)[0] || '';
      const mo2 = menu2.menuLangList
        ?.filter((l: any) => l.lang === searchLang)
        ?.map((l: any) => l.moMenuNm)[0] || '';

      const depth3 = allMenus.filter((m: any) => m.uprMenuCd === menu2.menuCd && m.menuDepth === '3');
      const children3 = depth3.map((menu3: any) => {
        const web3 = menu3.menuLangList
          ?.filter((l: any) => l.lang === searchLang)
          ?.map((l: any) => l.webMenuNm)[0] || '';
        const mo3 = menu3.menuLangList
          ?.filter((l: any) => l.lang === searchLang)
          ?.map((l: any) => l.moMenuNm)[0] || '';

        return {
          menuCd: menu3.menuCd,
          menuDepth: menu3.menuDepth,
          uprMenuCd: menu3.uprMenuCd,
          menuUrl: `/en${menu3.menuUrl}`,
          menuImgFilePath: menu3.menuImgFilePath || '',
          menuImgFileNm: menu3.menuImgFileNm || '',
          webMenuNm: web3,
          moMenuNm: mo3,
          menuTarget: '_self',
          className: '',
          children: [],
        };
      });

      return {
        menuCd: menu2.menuCd,
        menuDepth: menu2.menuDepth,
        uprMenuCd: menu2.uprMenuCd,
        menuUrl: menu2.menuUrl.includes('javascript') ? '#' : `/en${menu2.menuUrl}`,
        menuImgFilePath: menu2.menuImgFilePath || '',
        menuImgFileNm: menu2.menuImgFileNm || '',
        webMenuNm: web2,
        moMenuNm: mo2,
        menuTarget: '_self',
        className: `depth2-${idx2}`,
        children: children3,
      };
    });

    const isExternalLink = menu1.menuCd === 'MENU05';
    return {
      menuCd: menu1.menuCd,
      menuDepth: menu1.menuDepth,
      uprMenuCd: menu1.uprMenuCd,
      menuUrl: isExternalLink ? menu1.menuUrl : `/en${menu1.menuUrl}`,
      menuImgFilePath: menu1.menuImgFilePath || '',
      menuImgFileNm: menu1.menuImgFileNm || '',
      webMenuNm,
      moMenuNm,
      menuTarget: isExternalLink ? '_blank' : '_self',
      className: `depth1-${String(idx + 1).padStart(2, '0')}${children.length === 0 ? ' no-sub' : ''}`,
      children,
    };
  });
}
