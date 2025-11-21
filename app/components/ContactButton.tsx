import Image from 'next/image';

type ContactButtonProps = {
  language: 'ua' | 'eng';
};

export default function ContactButton({ language }: ContactButtonProps) {
  return (
    <button className="flex items-center gap-2 bg-black/20 border border-[#9a9a9a] rounded-2xl text-white pl-2 transition-colors text-sm font-medium hover:bg-[#4a4a4a] cursor-pointer">
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
  );
}

