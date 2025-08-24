import { slug } from 'github-slugger';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { allBlogs } from 'contentlayer/generated';
import tagData from 'app/tag-data.json';
import { notFound } from 'next/navigation';

const POSTS_PER_PAGE = 5;

// 배포에서도 동작하도록 generateStaticParams에서 slug 사용
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag];
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE));
    const sluggedTag = slug(tag); // slug로 URL 생성
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: sluggedTag,
      page: (i + 1).toString(),
    }));
  });
};

interface TagPageProps {
  params: {
    tag: string;
    page: string;
  };
}

export default async function TagPage({ params }: TagPageProps) {
  // 한글 URL 처리: decodeURIComponent 사용하고 slug로 통일
  const decodedTag = decodeURIComponent(params.tag);
  const tag = slug(decodedTag);
  const pageNumber = parseInt(params.page);

  // 태그 필터링
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)
      )
    )
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // 페이지 번호가 잘못되었으면 404
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound();
  }

  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );

  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  };

  // 원본 태그명 찾기 (한글 표시용)
  const tagCounts = tagData as Record<string, number>;
  const originalTag =
    Object.keys(tagCounts).find((t) => slug(t) === tag) || decodedTag;

  // 제목은 원본 태그명으로 표시
  const title = originalTag;

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  );
}
