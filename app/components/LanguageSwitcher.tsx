type LanguageSwitcherProps = {
  language: 'ua' | 'eng';
  onLanguageChange: (lang: 'ua' | 'eng') => void;
  variant?: 'desktop' | 'mobile';
};

export default function LanguageSwitcher({ language, onLanguageChange, variant = 'desktop' }: LanguageSwitcherProps) {
  const isMobile = variant === 'mobile';
  
  const buttonClasses = isMobile
    ? 'bg-black/20 border border-[#c9a877] rounded-2xl px-4 py-2 text-sm font-medium transition-colors hover:bg-[#4a4a4a] cursor-pointer'
    : 'bg-black/20 border border-[#9a9a9a] rounded-2xl px-4 py-2 text-sm font-medium transition-colors hover:bg-[#4a4a4a] h-[50px] cursor-pointer';
  
  const separatorColor = isMobile ? 'text-[#c9a877]' : 'text-[#9a9a9a]';
  const inactiveColor = isMobile ? 'text-[#c9a877]' : 'text-[#9a9a9a]';

  return (
    <button
      onClick={() => onLanguageChange(language === 'ua' ? 'eng' : 'ua')}
      className={buttonClasses}
    >
      <span className={language === 'ua' ? 'text-white font-bold' : inactiveColor}>UA</span>
      <span className={`${separatorColor} mx-1`}>|</span>
      <span className={language === 'eng' ? 'text-white font-bold' : inactiveColor}>ENG</span>
    </button>
  );
}

