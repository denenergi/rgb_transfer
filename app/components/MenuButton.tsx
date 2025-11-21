import Image from 'next/image';

type MenuButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

export default function MenuButton({ onClick, ariaLabel = 'Toggle menu' }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 bg-black/20 border border-[#c9a877] rounded-2xl transition-colors hover:bg-[#4a4a4a] cursor-pointer"
      aria-label={ariaLabel}
    >
      <Image
        src="/mobile_menu.svg"
        alt="Menu"
        width={18}
        height={18}
        className="w-[18px] h-[18px] brightness-0 invert"
      />
    </button>
  );
}

