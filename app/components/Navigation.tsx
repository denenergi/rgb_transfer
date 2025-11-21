import Link from 'next/link';

type MenuItem = {
  ua: string;
  eng: string;
};

type NavigationProps = {
  items: MenuItem[];
  language: 'ua' | 'eng';
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
};

export default function Navigation({ items, language, variant = 'desktop', onItemClick }: NavigationProps) {
  const isMobile = variant === 'mobile';
  
  const baseClasses = isMobile
    ? 'flex flex-col items-center justify-center px-4 space-y-1'
    : 'flex items-center gap-4 lg:gap-6';
  
  const linkClasses = isMobile
    ? 'text-white text-[20px] font-medium py-2 hover:text-[#ffb380] transition-colors text-center'
    : 'text-[#d0d0d0] hover:text-[#F19E5B] transition-colors text-sm font-medium whitespace-nowrap';

  return (
    <nav className={baseClasses}>
      {items.map((item, index) => (
        <Link
          key={index}
          href="#"
          onClick={onItemClick}
          className={linkClasses}
        >
          {language === 'ua' ? item.ua : item.eng}
        </Link>
      ))}
    </nav>
  );
}

