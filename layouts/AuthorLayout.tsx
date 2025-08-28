'use client';

import { ReactNode } from 'react';
import { slug } from 'github-slugger';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Authors } from 'contentlayer/generated';
import SocialIcon from '@/components/social-icons';
import Image from '@/components/Image';

interface Props {
  children: ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children, content }: Props) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    youtube,
    instagram,
    tiktok,
  } = content;

  console.log(tiktok, content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 헤로 섹션 */}
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
            About Me
          </h1>
          <p className="mx-auto max-w-2xl text-xl opacity-90">
            안녕하세요! 맛있는 요리와 레시피를 공유하는 블로거입니다
          </p>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* 프로필 카드 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
              {/* 카드 헤더 */}
              <div className="h-32 bg-gradient-to-r from-orange-400 to-red-400 dark:from-blue-500 dark:to-purple-600"></div>

              {/* 프로필 이미지 */}
              <div className="relative px-6">
                <div className="relative -mt-16 mb-4 flex justify-center">
                  {avatar ? (
                    <div className="overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-gray-800">
                      <Image
                        src={avatar}
                        alt="avatar"
                        width={128}
                        height={128}
                        className="h-32 w-32 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-orange-200 to-red-200 shadow-xl dark:border-gray-800 dark:from-blue-200 dark:to-purple-200">
                      <span className="text-4xl">👨‍🍳</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 프로필 정보 */}
              <div className="px-6 pb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {name}
                </h3>

                {occupation && (
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800 dark:bg-blue-900/30 dark:text-blue-200">
                    <span className="text-xs">👨‍💼</span>
                    {occupation}
                  </div>
                )}

                {company && (
                  <div className="mb-4 text-gray-600 dark:text-gray-300">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <span className="text-xs">🏢</span>
                      {company}
                    </span>
                  </div>
                )}

                {/* 소셜 링크 */}
                <div className="mt-6">
                  <h4 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    소셜 미디어
                  </h4>
                  <div className="flex justify-center space-x-4">
                    {email && (
                      <div className="group relative">
                        <SocialIcon
                          kind="mail"
                          href={`mailto:${email}`}
                          size={8}
                        />
                        <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-lg bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-200 dark:text-gray-800">
                          이메일
                        </div>
                      </div>
                    )}
                    {youtube && (
                      <div className="group relative">
                        <SocialIcon kind="youtube" href={youtube} size={8} />
                        <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-lg bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-200 dark:text-gray-800">
                          유튜브
                        </div>
                      </div>
                    )}
                    {instagram && (
                      <div className="group relative">
                        <SocialIcon
                          kind="instagram"
                          href={instagram}
                          size={8}
                        />
                        <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-lg bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-200 dark:text-gray-800">
                          인스타그램
                        </div>
                      </div>
                    )}
                    {tiktok && (
                      <div className="group relative">
                        <SocialIcon kind="tiktok" href={tiktok} size={8} />
                        <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-lg bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-200 dark:text-gray-800">
                          틱톡
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 장식 요소 */}
                <div className="mt-8 flex items-center justify-center space-x-2 text-2xl">
                  <span>🍳</span>
                  <span>✨</span>
                  <span>🍽️</span>
                  <span>✨</span>
                  <span>❤️</span>
                </div>
              </div>
            </div>
          </div>

          {/* 콘텐츠 섹션 */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* 소개 카드 */}
              <div className="rounded-2xl border border-orange-100 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-red-400 dark:from-blue-500 dark:to-purple-500">
                    <span className="text-xl text-white">📖</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Story
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {children}
                </div>
              </div>

              {/* 요리 철학 카드 */}
              <div className="rounded-2xl border border-orange-100 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-teal-400 dark:from-indigo-500 dark:to-cyan-500">
                    <span className="text-xl text-white">💭</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    요리 철학
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl bg-orange-50 p-6 dark:bg-gray-700/50">
                    <div className="mb-3 text-3xl">🌱</div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      신선한 재료
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      최고의 요리는 최고의 재료에서 시작됩니다
                    </p>
                  </div>

                  <div className="rounded-xl bg-red-50 p-6 dark:bg-gray-700/50">
                    <div className="mb-3 text-3xl">❤️</div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      사랑으로 요리
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      음식에 마음을 담아 정성스럽게 만듭니다
                    </p>
                  </div>

                  <div className="rounded-xl bg-yellow-50 p-6 dark:bg-gray-700/50">
                    <div className="mb-3 text-3xl">🎨</div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      창의적 요리
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      전통과 현대를 조화롭게 결합한 레시피
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-50 p-6 dark:bg-gray-700/50">
                    <div className="mb-3 text-3xl">🍽️</div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      공유의 즐거움
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      맛있는 음식은 나눌 때 더욱 맛있어집니다
                    </p>
                  </div>
                </div>
              </div>

              {/* 연락처 카드 */}
              <div className="rounded-2xl border border-orange-100 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-rose-400 dark:from-purple-500 dark:to-pink-500">
                    <span className="text-xl text-white">📞</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Let's Connect!
                  </h2>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-orange-100 to-red-100 p-6 dark:from-blue-900/20 dark:to-purple-900/20">
                  <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
                    요리에 대한 궁금한 점이나 레시피 문의가 있으시면 언제든지
                    연락해주세요! 🍳
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:from-blue-600 dark:to-purple-600"
                      >
                        <span className="text-lg">📧</span>
                        <span>이메일 보내기</span>
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    )}

                    {instagram && (
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-full border-2 border-orange-300 bg-white px-6 py-3 font-medium text-orange-600 transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 dark:border-blue-600 dark:bg-gray-800 dark:text-blue-400 dark:hover:border-blue-400 dark:hover:bg-blue-900/20"
                      >
                        <span className="text-lg">📸</span>
                        <span>인스타그램</span>
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드 정보 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* 프로필 하이라이트 */}
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="bg-gradient-to-r from-orange-400 to-red-400 px-6 py-4 dark:from-blue-500 dark:to-purple-600">
                  <h3 className="font-bold text-white">
                    🌟 Profile Highlights
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {occupation && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-blue-900/30">
                          <span className="text-lg">👨‍🍳</span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            직업
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {occupation}
                          </div>
                        </div>
                      </div>
                    )}

                    {company && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-purple-900/30">
                          <span className="text-lg">🏢</span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            소속
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {company}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 소셜 미디어 */}
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="bg-gradient-to-r from-pink-400 to-rose-400 px-6 py-4 dark:from-purple-500 dark:to-pink-500">
                  <h3 className="font-bold text-white">🔗 Follow Me</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {email && (
                      <div className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 transition-all hover:border-orange-300 hover:bg-orange-50 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-blue-900/20">
                        <SocialIcon
                          kind="mail"
                          href={`mailto:${email}`}
                          size={6}
                        />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          Email
                        </span>
                      </div>
                    )}
                    {youtube && (
                      <div className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 transition-all hover:border-red-300 hover:bg-red-50 dark:border-gray-600 dark:hover:border-purple-500 dark:hover:bg-purple-900/20">
                        <SocialIcon size={6} href={youtube} kind="youtube" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          YouTube
                        </span>
                      </div>
                    )}
                    {instagram && (
                      <div className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 transition-all hover:border-pink-300 hover:bg-pink-50 dark:border-gray-600 dark:hover:border-pink-500 dark:hover:bg-pink-900/20">
                        <SocialIcon
                          kind="instagram"
                          href={instagram}
                          size={6}
                        />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          Instagram
                        </span>
                      </div>
                    )}
                    {tiktok && (
                      <div className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-400 dark:hover:bg-gray-700">
                        <SocialIcon kind="tiktok" href={tiktok} size={6} />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          TikTok
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 응원 메시지 */}
              <div className="rounded-2xl bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 p-6 shadow-lg dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20">
                <div className="text-center">
                  <div className="mb-3 text-3xl">🎉</div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                    함께 요리해요!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    맛있는 요리로 행복한 순간을
                    <br />
                    함께 만들어가요 ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
