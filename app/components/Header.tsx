'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="hidden md:flex items-center justify-between px-4 lg:px-8 py-4 absolute top-4 left-4 right-4 z-50">
        <div className="flex items-center gap-8 lg:gap-12 bg-black/10 border border-[#9a9a9a] rounded-3xl pl-6 pr-2 py-3 w-full">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="SPACE TRANSFER"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-4 lg:gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-[#d0d0d0] hover:text-[#F19E5B] transition-colors text-sm font-medium whitespace-nowrap"
              >
                {language === 'ua' ? item.ua : item.eng}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => onLanguageChange(language === 'ua' ? 'eng' : 'ua')}
              className="bg-black/20 border border-[#9a9a9a] rounded-2xl px-4 py-2 text-sm font-medium transition-colors hover:bg-[#4a4a4a] h-[50px]"
            >
              <span className={language === 'ua' ? 'text-white font-bold' : 'text-[#9a9a9a]'}>UA</span>
              <span className="text-[#9a9a9a] mx-1">|</span>
              <span className={language === 'eng' ? 'text-white font-bold' : 'text-[#9a9a9a]'}>ENG</span>
            </button>
            <button className="flex items-center gap-2 bg-black/20 border border-[#9a9a9a] rounded-2xl text-white pl-2 transition-colors text-sm font-medium hover:bg-[#4a4a4a]">
              <span>{language === 'ua' ? 'ЗВ\'ЯЗАТИСЯ' : 'CONTACT US'}</span>
              <div className="bg-[#ffb380] rounded-[14px] p-1.5 flex items-center justify-center w-[46px] h-[46px]">
                <Image
                  src="/phone.svg"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="w-4 h-4 brightness-0"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <header className="md:hidden flex items-center justify-center px-4 py-4 absolute top-4 left-4 right-4 z-50">
        <div className="flex items-center justify-between gap-3 bg-black/10 border border-[#c9a877] rounded-3xl px-4 py-3 w-full">
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/logo.svg"
              alt="SPACE TRANSFER"
              width={60}
              height={24}
              className="h-6 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 bg-black/20 border border-[#c9a877] rounded-2xl transition-colors hover:bg-[#4a4a4a]">
              <Image
                src="/phone.svg"
                alt="Phone"
                width={16}
                height={16}
                className="w-4 h-4 brightness-0 invert"
              />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-10 h-10 bg-black/20 border border-[#c9a877] rounded-2xl transition-colors hover:bg-[#4a4a4a]"
              aria-label="Toggle menu"
            >
              <Image
                src="/mobile_menu.svg"
                alt="Menu"
                width={18}
                height={18}
                className="w-[18px] h-[18px] brightness-0 invert"
              />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/bg_mobile_menu.png)' }}
          />
          <div className="absolute inset-0 bg-black/80" />
          
          <div className="relative z-10 flex flex-col h-full justify-between py-6">
            <div className="flex items-center justify-center px-4">
              <div className="flex items-center justify-between gap-3 bg-black/10 border border-[#c9a877] rounded-3xl px-4 py-3 w-full">
                <Link href="/" className="shrink-0 flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="SPACE TRANSFER"
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                  />
                </Link>
                
                <div className="flex items-center gap-2">
                  <button className="flex items-center justify-center w-10 h-10 bg-black/20 border border-[#c9a877] rounded-2xl transition-colors hover:bg-[#4a4a4a]">
                    <Image
                      src="/phone.svg"
                      alt="Phone"
                      width={16}
                      height={16}
                      className="w-4 h-4 brightness-0 invert"
                    />
                  </button>
                  <button
                    onClick={toggleMobileMenu}
                    className="flex items-center justify-center w-10 h-10 bg-black/20 border border-[#c9a877] rounded-2xl transition-colors hover:bg-[#4a4a4a]"
                    aria-label="Close menu"
                  >
                    <Image
                      src="/mobile_menu.svg"
                      alt="Menu"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] brightness-0 invert"
                    />
                  </button>
                </div>
              </div>
            </div>

            <nav className="flex flex-col items-center justify-center px-4 space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  onClick={toggleMobileMenu}
                  className="text-white text-[20px] font-medium py-2 hover:text-[#ffb380] transition-colors text-center"
                >
                  {language === 'ua' ? item.ua : item.eng}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-center px-4">
              <button className="w-full max-w-xs bg-[#ffb380] hover:bg-[#F19E5B] text-black px-6 py-8 rounded-3xl transition-colors text-sm font-bold uppercase max-sm:w-60">
                {language === 'ua' ? 'ЗАМОВИТИ ТРАНСФЕР' : 'ORDER TRANSFER'}
              </button>
            </div>

            <div className="flex items-center justify-center px-4">
              <button
                onClick={() => onLanguageChange(language === 'ua' ? 'eng' : 'ua')}
                className="bg-black/20 border border-[#c9a877] rounded-2xl px-4 py-2 text-sm font-medium transition-colors hover:bg-[#4a4a4a]"
              >
                <span className={language === 'ua' ? 'text-white font-bold' : 'text-[#c9a877]'}>UA</span>
                <span className="text-[#c9a877] mx-1">|</span>
                <span className={language === 'eng' ? 'text-white font-bold' : 'text-[#c9a877]'}>ENG</span>
              </button>
            </div>

            <div className="flex items-center justify-center px-4 pb-6">
              <div className="flex items-center gap-4 justify-center">
                <a href="#" className="rounded-full flex items-center justify-center hover:bg-[#ff9d5c] transition-colors hover:opacity-80">
                  <Image
                    src="/telegram_icon.svg"
                    alt="Telegram"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </a>
                <a href="#" className="rounded-full flex items-center justify-center hover:bg-[#ff9d5c] transition-colors hover:opacity-80">
                  <Image
                    src="/facebook_icon.svg"
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </a>
                <a href="#" className="rounded-full flex items-center justify-center hover:bg-[#ff9d5c] transition-colors hover:opacity-80">
                  <Image
                    src="/instagram_icon.svg"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="w-12 h-12"
                  />
                </a>
                <a href="#" className="rounded-full flex items-center justify-center hover:bg-[#ff9d5c] transition-colors hover:opacity-80">
                  <Image
                    src="/phone_icon.svg"
                    alt="phone"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

