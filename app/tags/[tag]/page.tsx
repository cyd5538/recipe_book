import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { allBlogs } from 'contentlayer/generated';
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';
import { Metadata } from 'next';

const POSTS_PER_PAGE = 5;

// 1️⃣ Metadata 생성
export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const tag = decodeURI(params.tag); // URL에서 들어온 태그를 디코딩
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${encodeURI(tag)}/feed.xml`,
      },
    },
  });
}

// 2️⃣ Static params 생성 (한글 그대로 encodeURI)
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);

  return tagKeys.map((tag) => ({
    tag: encodeURI(tag), // URL에서 한글 안전하게 변환
  }));
};

// 3️⃣ 페이지 컴포넌트
export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const tag = decodeURI(params.tag); // URL 디코딩

  // 필터링: post.tags 배열에 decode된 tag가 포함되어 있는지 확인
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.includes(tag)))
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  };

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={tag}
    />
  );
}
