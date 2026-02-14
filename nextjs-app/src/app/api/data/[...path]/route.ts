import { NextRequest, NextResponse } from 'next/server';
import {
  getMenuList, getFooter, getLangList, getHomePageInit,
  getNewsList, getHistory, getExecutives, getBoardOfDirectors,
  getCompanyIntro, getInquiryTypes, getCountryList,
  getGlobalNetworkInit, getGlobalNetworkAll, getCategoryData,
  getSuccessCases, getTechnologies, getApplicationRealm,
} from '@/lib/api';

/* eslint-disable @typescript-eslint/no-explicit-any */

const ROUTE_MAP: Record<string, () => any> = {
  'menu-list': getMenuList,
  'footer': getFooter,
  'lang-list': getLangList,
  'home-page-init': getHomePageInit,
  'news-list': getNewsList,
  'history': getHistory,
  'executives': getExecutives,
  'board-of-directors': getBoardOfDirectors,
  'company-intro': getCompanyIntro,
  'inquiry-types': getInquiryTypes,
  'country-list': getCountryList,
  'global-network-init': getGlobalNetworkInit,
  'global-network-all': getGlobalNetworkAll,
  'success-cases': getSuccessCases,
  'technologies': getTechnologies,
  'application-realm': getApplicationRealm,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const route = path.join('/');

  if (route === 'category') {
    const catCode = request.nextUrl.searchParams.get('catCode') || 'CSCG000001';
    return NextResponse.json(getCategoryData(catCode));
  }

  const handler = ROUTE_MAP[route];
  if (handler) {
    return NextResponse.json(handler());
  }

  return NextResponse.json({ code: '000', message: 'success' });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const route = path.join('/');

  const handler = ROUTE_MAP[route];
  if (handler) {
    return NextResponse.json(handler());
  }

  return NextResponse.json({ code: '000', message: 'success' });
}
