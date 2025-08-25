import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { allBlogs } from 'contentlayer/generated';
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';
import { Metadata } from 'next';

const POSTS_PER_PAGE = 5;

// 1️⃣ Metadata 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag); // "%EA%B3%A0%EA%B8%B0" → "고기"

  return genPageMetadata({
    title: decodedTag,
    description: `${siteMetadata.title} ${decodedTag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${encodeURIComponent(decodedTag)}/feed.xml`,
      },
    },
  });
}

// 2️⃣ Static params 생성 (한글 그대로 encodeURI)
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);

  // ❌ encodeURIComponent 제거
  // 👉 App Router는 자체적으로 퍼센트 인코딩해주기 때문에 여기선 원본 한글을 넣는 게 맞음
  return tagKeys.map((tag) => ({
    tag, // "고기"
  }));
};

// 3️⃣ 페이지 컴포넌트
export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag); // 👈 한글로 변환

  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => post.tags && post.tags.includes(decodedTag))
    )
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages,
  };

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={decodedTag}
    />
  );
}
