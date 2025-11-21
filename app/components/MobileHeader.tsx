import Logo from './Logo';
import PhoneButton from './PhoneButton';
import MenuButton from './MenuButton';

type MobileHeaderProps = {
  onMenuToggle: () => void;
  variant?: 'default' | 'menu';
  logoSize?: { width: number; height: number; className: string };
  ariaLabel?: string;
};

export default function MobileHeader({ 
  onMenuToggle, 
  variant = 'default',
  logoSize,
  ariaLabel
}: MobileHeaderProps) {

  const headerClasses = variant === 'menu' 
    ? 'md:hidden flex items-center justify-center px-4'
    : 'md:hidden flex items-center justify-center px-4 py-4 absolute top-4 left-4 right-4 z-50';
  const label = ariaLabel || (variant === 'menu' ? 'Close menu' : 'Toggle menu');

  return (
    <header className={headerClasses}>
      <div className="flex items-center justify-between gap-3 bg-black/10 border border-[#c9a877] rounded-3xl px-4 py-3 w-full">
        <Logo width={150} height={40} className={"h-10 w-auto"} />
        <div className="flex items-center gap-2">
          <PhoneButton />
          <MenuButton onClick={onMenuToggle} ariaLabel={label} />
        </div>
      </div>
    </header>
  );
}

