type OrderButtonProps = {
  language: 'ua' | 'eng';
  variant?: 'desktop' | 'mobile';
  onClick?: () => void;
};

export default function OrderButton({ language, variant = 'desktop', onClick }: OrderButtonProps) {
  const isMobile = variant === 'mobile';
  
  const buttonClasses = isMobile
    ? 'w-full max-w-xs bg-[#ffb380] hover:bg-[#F19E5B] text-black px-6 py-8 rounded-3xl transition-colors text-sm font-bold uppercase max-sm:w-60 cursor-pointer'
    : 'bg-[#EEAF7C] hover:bg-[#F19E5B] text-black px-8 py-8 rounded-3xl transition-colors text-[20px] font-medium uppercase mt-8 max-sm:text-[14px] max-sm:px-4 max-sm:w-60 cursor-pointer';

  return (
    <button onClick={onClick} className={buttonClasses}>
      {language === 'ua' ? 'ЗАМОВИТИ ТРАНСФЕР' : 'ORDER TRANSFER'}
    </button>
  );
}

