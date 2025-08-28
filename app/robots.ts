import { MetadataRoute } from 'next';
import siteMetadata from '@/data/siteMetadata';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // 마지막 슬래시 제거
  const baseUrl = siteMetadata.siteUrl.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    // host는 robots.txt에서 표준이 아니므로 제거
  };
}
