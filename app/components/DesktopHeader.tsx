import Logo from './Logo';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import ContactButton from './ContactButton';

type MenuItem = {
  ua: string;
  eng: string;
};

type DesktopHeaderProps = {
  menuItems: MenuItem[];
  language: 'ua' | 'eng';
  onLanguageChange: (lang: 'ua' | 'eng') => void;
};

export default function DesktopHeader({ menuItems, language, onLanguageChange }: DesktopHeaderProps) {
  return (
    <header className="hidden md:flex items-center justify-between px-4 lg:px-8 py-4 absolute top-4 left-4 right-4 z-50">
      <div className="flex items-center gap-8 lg:gap-12 bg-black/10 border border-[#9a9a9a] rounded-3xl pl-6 pr-2 py-3 w-full">
        <Logo width={150} height={40} className="h-10 w-auto" />
        <Navigation items={menuItems} language={language} variant="desktop" />
        <div className="flex items-center gap-4 ml-auto">
          <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} variant="desktop" />
          <ContactButton language={language} />
        </div>
      </div>
    </header>
  );
}

