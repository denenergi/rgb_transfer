import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({ width = 150, height = 40, className = 'h-10 w-auto' }: LogoProps) {
  return (
    <Link href="/" className="shrink-0 flex items-center">
      <Image
        src="/logo.svg"
        alt="SPACE TRANSFER"
        width={width}
        height={height}
        className={className}
      />
    </Link>
  );
}

