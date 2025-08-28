import Link from 'next/link';
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
});

// 배경 + 글자색 배열
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
  { bg: 'from-[#40E0D0] to-[#48D1CC]', text: 'text-black' }, // 터쿼이즈
  { bg: 'from-[#FF4500] to-[#FF6347]', text: 'text-white' }, // 오렌지레드 → 토마토
  { bg: 'from-[#BA55D3] to-[#DA70D6]', text: 'text-white' }, // 미디엄 오키드 → 오키드
  { bg: 'from-[#20B2AA] to-[#3CB371]', text: 'text-black' }, // 라이트시안 → 미디엄시그린
  { bg: 'from-[#F4A460] to-[#DEB887]', text: 'text-black' }, // 샌디브라운 → 버클리우드
  { bg: 'from-[#D2691E] to-[#CD853F]', text: 'text-white' }, // 초콜릿 → 페퍼브라운
  { bg: 'from-[#FF7F50] to-[#FF6F61]', text: 'text-white' }, // 코랄 → 살짝 다크
  { bg: 'from-[#7B68EE] to-[#9370DB]', text: 'text-white' }, // 미디엄슬레이트블루 → 미디엄퍼플
  { bg: 'from-[#3CB371] to-[#66CDAA]', text: 'text-black' }, // 미디엄시그린 → 아쿠아
  { bg: 'from-[#FF8C00] to-[#FFA500]', text: 'text-black' }, // 다크오렌지 → 오렌지
];

export default async function Page() {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 md:px-0">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
        Tags
      </h1>

      {tagKeys.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
      )}

      <div className="flex flex-wrap gap-3">
        {sortedTags.map((t) => {
          const randomColor =
            tagColors[Math.floor(Math.random() * tagColors.length)];
          return (
            <Link
              key={t}
              href={`/tags/${encodeURIComponent(t)}`}
              className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${randomColor.bg} ${randomColor.text} px-4 py-2 text-base font-semibold shadow-md transition hover:brightness-110`}
              aria-label={`View posts tagged ${t}`}
            >
              <span>#{t}</span>
              <span
                className={`rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium ${randomColor.text}`}
              >
                {tagCounts[t]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
