import { slug } from 'github-slugger';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { allBlogs } from 'contentlayer/generated';
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';
import { Metadata } from 'next';

const POSTS_PER_PAGE = 5;

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag); // decodeURI → decodeURIComponent
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  return tagKeys.map((tag) => ({
    tag: slug(tag), // encodeURI(tag) → slug(tag)로 일관성 유지
  }));
};

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  console.log('=== TagPage START ===');

  const params = await props.params;
  console.log('Raw params:', params);

  // 한글 URL 처리 개선
  const decodedTag = decodeURIComponent(params.tag);
  const sluggedTag = slug(decodedTag);

  console.log('Debug:', {
    'params.tag': params.tag,
    decodedTag: decodedTag,
    sluggedTag: sluggedTag,
    'available tags': Object.keys(tagData),
  });

  // 태그 필터링 - 원본 태그로 비교
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        if (!post.tags) return false;

        // 여러 방식으로 매칭 시도
        const matchesByOriginal = post.tags.includes(decodedTag);
        const matchesBySlug = post.tags
          .map((t) => slug(t))
          .includes(sluggedTag);

        console.log(`Post "${post.title}":`, {
          postTags: post.tags,
          matchesByOriginal,
          matchesBySlug,
        });

        return matchesByOriginal || matchesBySlug;
      })
    )
  );

  console.log('Filtered posts count:', filteredPosts.length);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  };

  // 원본 태그명으로 제목 표시
  const title = decodedTag;

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  );
}
