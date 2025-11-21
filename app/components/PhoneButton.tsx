import Image from 'next/image';

export default function PhoneButton() {
  return (
    <button className="flex items-center justify-center w-10 h-10 bg-black/20 border border-[#c9a877] rounded-2xl transition-colors hover:bg-[#4a4a4a] cursor-pointer">
      <Image
        src="/phone.svg"
        alt="Phone"
        width={16}
        height={16}
        className="w-4 h-4 brightness-0 invert"
      />
    </button>
  );
}

