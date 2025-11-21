import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileHeader from './MobileHeader';
import SocialLinks from './SocialLinks';
import OrderButton from './OrderButton';

type MenuItem = {
  ua: string;
  eng: string;
};

type MobileMenuProps = {
  menuItems: MenuItem[];
  language: 'ua' | 'eng';
  onLanguageChange: (lang: 'ua' | 'eng') => void;
  onClose: () => void;
};

export default function MobileMenu({ menuItems, language, onLanguageChange, onClose }: MobileMenuProps) {
  return (
    <div className="md:hidden fixed inset-0 z-50 flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/bg_mobile_menu.png)' }}
      />
      <div className="absolute inset-0 bg-black/80" />
      
      <div className="relative z-10 flex flex-col h-full justify-between py-6">
        <MobileHeader onMenuToggle={onClose} variant="menu" />

        <Navigation items={menuItems} language={language} variant="mobile" onItemClick={onClose} />

        <div className="flex items-center justify-center px-4">
          <OrderButton language={language} variant="mobile" />
        </div>

        <div className="flex items-center justify-center px-4">
          <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} variant="mobile" />
        </div>

        <div className="flex items-center justify-center px-4 pb-6">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

