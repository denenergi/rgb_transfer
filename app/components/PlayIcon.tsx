type PlayIconProps = {
  size?: number;
  className?: string;
};

export default function PlayIcon({ size = 28, className = 'text-white ml-1' }: PlayIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 5V19L19 12L8 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

