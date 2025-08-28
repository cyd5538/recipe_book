'use client';

import { usePathname } from 'next/navigation';
import { slug } from 'github-slugger';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import Link from '@/components/Link';
import siteMetadata from '@/data/siteMetadata';
import tagData from 'app/tag-data.json';
import Image from 'next/image';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const lastSegment = segments[segments.length - 1];
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '');
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="mt-16 mb-8">
      <nav className="flex items-center justify-center space-x-6">
        {prevPage ? (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:from-blue-600 dark:to-purple-600"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            이전 페이지
          </Link>
        ) : (
          <button
            className="flex cursor-not-allowed items-center gap-2 rounded-full bg-gray-100 px-6 py-3 font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-500"
            disabled
          >
            <span>←</span>
            이전 페이지
          </button>
        )}
        <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 shadow-md dark:border-blue-700 dark:bg-gray-800">
          <span className="text-lg font-bold text-orange-600 dark:text-blue-400">
            {currentPage}
          </span>
          <span className="text-sm text-gray-400">of</span>
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {totalPages}
          </span>
        </div>

        {nextPage ? (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:from-blue-600 dark:to-purple-600"
          >
            다음 페이지
            <div className="group inline-flex items-center">
              <span className="transition-transform delay-0 group-hover:translate-x-1">
                →
              </span>
              <span className="transition-transform delay-150 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ) : (
          <button
            className="flex cursor-not-allowed items-center gap-2 rounded-full bg-gray-100 px-6 py-3 font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-500"
            disabled
          >
            다음 페이지
            <span>→</span>
          </button>
        )}
      </nav>
    </div>
  );
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname();
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[a] - tagCounts[b]);

  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white dark:from-slate-800 dark:via-gray-800 dark:to-gray-900">
        {/* 배경 패턴 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="mb-6 text-6xl">👨‍🍳</div>
          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-xl opacity-90">
            맛있는 레시피와 요리 이야기를 만나보세요
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-none px-4 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
          {/* 사이드바 */}
          <div className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              {/* 카테고리 카드 */}
              <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-red-400 dark:from-blue-500 dark:to-purple-500">
                    <span className="text-lg text-white">🏷️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    카테고리
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="block">
                    {pathname.startsWith('/recipe') ? (
                      <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-3 font-semibold text-white dark:from-blue-600 dark:to-purple-600">
                        <span className="text-lg">🍽️</span>
                        모든 레시피
                      </div>
                    ) : (
                      <Link
                        href={`/recipe`}
                        className="group flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white dark:bg-gray-700 dark:hover:from-blue-600 dark:hover:to-purple-600"
                      >
                        <span className="text-lg transition-transform group-hover:scale-110">
                          🍽️
                        </span>
                        <span className="font-semibold text-gray-700 group-hover:text-white dark:text-gray-300">
                          모든 레시피
                        </span>
                      </Link>
                    )}
                  </div>

                  {sortedTags.slice(0, 10).map((t) => {
                    const isActive =
                      decodeURI(pathname.split('/tags/')[1]) === slug(t);
                    return (
                      <div key={t} className="block">
                        {isActive ? (
                          <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-3 font-semibold text-white dark:from-blue-600 dark:to-purple-600">
                            <span className="flex items-center gap-2">
                              <span className="text-sm">🏷️</span>
                              {t}
                            </span>
                            <span className="rounded-full bg-white/25 px-2 py-1 text-xs">
                              {tagCounts[t]}
                            </span>
                          </div>
                        ) : (
                          <Link
                            href={`/tags/${slug(t)}`}
                            className="group flex items-center justify-between rounded-xl bg-gray-50 p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white dark:bg-gray-700 dark:hover:from-blue-600 dark:hover:to-purple-600"
                            aria-label={`View posts tagged ${t}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm transition-transform group-hover:scale-110">
                                🏷️
                              </span>
                              <span className="font-medium text-gray-700 group-hover:text-white dark:text-gray-300">
                                {t}
                              </span>
                            </span>
                            <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600 transition-all group-hover:bg-white/25 group-hover:text-white dark:bg-gray-600 dark:text-gray-300">
                              {tagCounts[t]}
                            </span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                  {sortedTags.length > 10 && (
                    <Link
                      href="/tags"
                      className="group flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-orange-300 p-3 transition-all hover:border-orange-500 hover:bg-orange-50 dark:border-blue-600 dark:hover:border-blue-400 dark:hover:bg-blue-900/20"
                    >
                      <span className="text-orange-600 dark:text-blue-400">
                        더 보기
                      </span>
                      <span className="text-orange-600 transition-transform group-hover:translate-x-1 dark:text-blue-400">
                        →
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* 통계 카드 */}
              <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-400 dark:from-indigo-500 dark:to-cyan-500">
                    <span className="text-lg text-white">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    통계
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      전체 레시피
                    </span>
                    <span className="font-bold text-orange-600 dark:text-blue-400">
                      {displayPosts.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      카테고리
                    </span>
                    <span className="font-bold text-red-600 dark:text-purple-400">
                      {tagKeys.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 메인 컨텐츠 */}
          <div className="min-w-0 flex-1">
            <div className="grid gap-8 sm:grid-cols-1 2xl:grid-cols-2">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, image } = post;
                return (
                  <article
                    key={path}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                  >
                    {/* 이미지 */}
                    <div className="relative h-48 overflow-hidden">
                      {image ? (
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 dark:from-slate-700 dark:via-gray-700 dark:to-gray-800">
                          <span className="text-6xl opacity-50">🍽️</span>
                        </div>
                      )}
                      {/* 날짜 오버레이 */}
                      <div className="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-800/95">
                        <time
                          dateTime={date}
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          suppressHydrationWarning
                        >
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </div>
                    </div>

                    {/* 컨텐츠 */}
                    <div className="p-6">
                      {/* 제목 */}
                      <h2 className="mb-3 text-xl leading-tight font-bold">
                        <Link
                          href={`/${path}`}
                          className="line-clamp-2 text-gray-900 transition-colors hover:text-orange-600 dark:text-white dark:hover:text-blue-400"
                        >
                          {title}
                        </Link>
                      </h2>

                      {/* 요약 */}
                      {summary && (
                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                          {summary}
                        </p>
                      )}

                      {/* 태그 */}
                      {tags && tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1 text-xs font-medium text-orange-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-200"
                            >
                              <span className="text-xs">🏷️</span>
                              {tag}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              +{tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 읽기 버튼 */}
                      <Link
                        href={`/${path}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:from-blue-600 dark:to-purple-600"
                      >
                        <span>레시피 보기</span>
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* 페이지네이션 */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
