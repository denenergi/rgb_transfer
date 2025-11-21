import Image from 'next/image';

const socialLinks = [
  { src: '/telegram_icon.svg', alt: 'Telegram' },
  { src: '/facebook_icon.svg', alt: 'Facebook' },
  { src: '/instagram_icon.svg', alt: 'Instagram', className: 'w-12 h-12' },
  { src: '/phone_icon.svg', alt: 'phone' },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4 justify-center">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href="#"
          className="rounded-full flex items-center justify-center transition-colors hover:opacity-80"
        >
          <Image
            src={link.src}
            alt={link.alt}
            width={40}
            height={40}
            className={link.className || 'w-10 h-10'}
          />
        </a>
      ))}
    </div>
  );
}

