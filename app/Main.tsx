import Link from '@/components/Link';
import siteMetadata from '@/data/siteMetadata';
import { formatDate } from 'pliny/utils/formatDate';
import Image from 'next/image';

const MAX_DISPLAY = 4;

// 태그 색상 + 글자색 배열
const tagColors = [
  { bg: 'from-[#FF7F50] to-[#FFA07A]', text: 'text-white' }, // 코랄 → 살몬
  { bg: 'from-[#FFD700] to-[#FFE680]', text: 'text-black' }, // 골드 → 연한 노랑
  { bg: 'from-[#32CD32] to-[#98FB98]', text: 'text-black' }, // 라임그린 → 연두
  { bg: 'from-[#FF6347] to-[#FF8266]', text: 'text-white' }, // 토마토 → 연토마토
  { bg: 'from-[#8A2BE2] to-[#A583F3]', text: 'text-white' }, // 블루베리
  { bg: 'from-[#FFB347] to-[#FFCC33]', text: 'text-black' }, // 오렌지 → 노랑
  { bg: 'from-[#00CED1] to-[#20B2AA]', text: 'text-black' }, // 다크터쿼이즈 → 라이트터쿼이즈
  { bg: 'from-[#FF69B4] to-[#FF85C0]', text: 'text-white' }, // 핑크 → 라이트 핑크
  { bg: 'from-[#ADFF2F] to-[#7FFF00]', text: 'text-black' }, // 그린옐로 → 라임
  { bg: 'from-[#FFA07A] to-[#FF8C69]', text: 'text-white' }, // 라이트살몬 → 살몬
];

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            최신순
          </h1>
          <p className="text-lg text-gray-900 dark:text-gray-400">
            새로 올라온 레시피부터 만나보세요
          </p>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, image } = post;
            return (
              <li key={slug} className="py-6">
                <article>
                  <div className="grid gap-6 xl:grid-cols-4 xl:items-start">
                    {/* 왼쪽: 이미지 */}
                    <div className="xl:col-span-1">
                      {image && (
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl drop-shadow-lg">
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 240px"
                          />
                        </div>
                      )}
                    </div>

                    {/* 오른쪽: 제목, 날짜, 태그, 요약, 링크 */}
                    <div className="space-y-4 xl:col-span-3">
                      <h2 className="text-2xl font-bold tracking-tight">
                        <Link
                          href={`/recipe/${slug}`}
                          className="text-gray-900 hover:underline dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h2>

                      {/* 날짜 (제목 아래) */}
                      <div className="text-base font-medium text-black dark:text-gray-400">
                        <time dateTime={date}>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </div>

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-2">
                        {tags?.map((tag) => {
                          const randomColor =
                            tagColors[
                              Math.floor(Math.random() * tagColors.length)
                            ];
                          return (
                            <Link
                              key={tag}
                              href={`/tags/${encodeURIComponent(tag)}`}
                              className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${randomColor.bg} ${randomColor.text} px-4 py-2 text-base font-semibold shadow-md transition hover:brightness-110`}
                            >
                              <span>#{tag}</span>
                              <span
                                className={`rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium ${randomColor.text}`}
                              >
                                {1 /* 필요시 tagCounts[tag]로 변경 */}
                              </span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* 요약 */}
                      <p className="prose max-w-none text-black dark:text-white">
                        {summary}
                      </p>

                      {/* 더 읽어보기 */}
                      <div>
                        <Link
                          href={`/recipe/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                          aria-label={`Read more: "${title}"`}
                        >
                          더 읽어보기 →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 모든 레시피 버튼 */}
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-6 text-base font-medium">
          <Link
            href="/recipe"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            모든 레시피 →
          </Link>
        </div>
      )}
    </>
  );
}
