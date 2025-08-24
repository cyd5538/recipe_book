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

export default async function TagPage({
  params,
}: {
  params: { tag: string; page: string };
}) {
  // 한글 URL 처리 후 slug 통일
  const tag = slug(decodeURI(params.tag));
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

  // 제목 처리 (첫 글자 대문자 + 공백 대신 하이픈)
  const title = tag[0].toUpperCase() + tag.slice(1).replace(/\s+/g, '-');

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  );
}
