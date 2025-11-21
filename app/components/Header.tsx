'use client';

import { useState } from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';

type HeaderProps = {
  language: 'ua' | 'eng';
  onLanguageChange: (lang: 'ua' | 'eng') => void;
};

const menuItems = [
  { ua: 'Про послугу', eng: 'About service' },
  { ua: 'Про нас', eng: 'About us' },
  { ua: 'Автопарк', eng: 'Fleet' },
  { ua: 'Блог', eng: 'Blog' },
  { ua: 'Питання і відповіді', eng: 'FAQ' },
  { ua: 'Контакти', eng: 'Contacts' },
];

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <DesktopHeader 
        menuItems={menuItems}
        language={language}
        onLanguageChange={onLanguageChange}
      />
      <MobileHeader onMenuToggle={toggleMobileMenu} />
      {isMobileMenuOpen && (
        <MobileMenu
          menuItems={menuItems}
          language={language}
          onLanguageChange={onLanguageChange}
          onClose={toggleMobileMenu}
        />
      )}
    </>
  );
}

