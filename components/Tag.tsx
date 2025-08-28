import Link from 'next/link';
import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const tagColors = [
  { bg: 'from-[#FF7F50] to-[#FFA07A]', text: 'text-white' },
  { bg: 'from-[#FFD700] to-[#FFE680]', text: 'text-black' },
  { bg: 'from-[#32CD32] to-[#98FB98]', text: 'text-black' },
  { bg: 'from-[#FF6347] to-[#FF8266]', text: 'text-white' },
  { bg: 'from-[#8A2BE2] to-[#A583F3]', text: 'text-white' },
  { bg: 'from-[#FFB347] to-[#FFCC33]', text: 'text-black' },
  { bg: 'from-[#00CED1] to-[#20B2AA]', text: 'text-black' },
  { bg: 'from-[#FF69B4] to-[#FF85C0]', text: 'text-white' },
  { bg: 'from-[#ADFF2F] to-[#7FFF00]', text: 'text-black' },
  { bg: 'from-[#FFA07A] to-[#FF8C69]', text: 'text-white' },
  { bg: 'from-[#40E0D0] to-[#48D1CC]', text: 'text-black' },
  { bg: 'from-[#FF4500] to-[#FF6347]', text: 'text-white' },
  { bg: 'from-[#BA55D3] to-[#DA70D6]', text: 'text-white' },
  { bg: 'from-[#20B2AA] to-[#3CB371]', text: 'text-black' },
  { bg: 'from-[#F4A460] to-[#DEB887]', text: 'text-black' },
  { bg: 'from-[#D2691E] to-[#CD853F]', text: 'text-white' },
  { bg: 'from-[#FF7F50] to-[#FF6F61]', text: 'text-white' },
  { bg: 'from-[#7B68EE] to-[#9370DB]', text: 'text-white' },
  { bg: 'from-[#3CB371] to-[#66CDAA]', text: 'text-black' },
  { bg: 'from-[#FF8C00] to-[#FFA500]', text: 'text-black' },
];

const Tag = ({ text }: Props) => {
  const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];

  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${randomColor.bg} ${randomColor.text} px-4 py-2 text-base font-semibold shadow-md transition hover:brightness-110`}
      aria-label={`View posts tagged ${text}`}
    >
      # {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
