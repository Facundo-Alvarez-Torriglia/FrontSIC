import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Component({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex relative h-screen">
      <div className="absolute top-4 md:top-8 left-4 md:left-8 z-[6]">

        {/*
        
        <Image
          src="/icons/logo-white.svg"
          alt="Meetlabs Icon"
          width={36}
          height={41}
          priority={true}
          className="flex md:hidden"
          style={{ height: '41px',  width: '36px' }}
        />
        <Image
          src="/icons/meetlabs-icon.svg"
          alt="Meetlabs Icon"
          width={36}
          height={41}
          priority={true}
          className="hidden md:flex"
          style={{ height: '41px', width: '36px' }}
        />
        */}
        
      </div>
      <div
        className="hidden md:flex w-1/2 bg-gray-900 text-white p-8 flex-col-reverse justify-between relative"
        style={{
          backgroundImage: "url('/images/layout-auth.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 size-full bg-[#0F0F0F] bg-opacity-80"></div>
        <div className="relative z-[5]">
          <p className="leading-7">
            &quot;Reservated&quot;
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full md:max-w-[506px] px-6 md:px-10">{children}</div>
      </div>
    </div>
  );
}