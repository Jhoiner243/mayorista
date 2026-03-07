"use client"

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import useFilterStore, { GenderFilter } from "../stores/filterStore";

interface Section {
  title: string;
  slug: GenderFilter;
  url: string;
}

interface SectionsProps {
  onLinkClick?: () => void;
  mobile?: boolean;
}

export default function Sections({ onLinkClick, mobile }: SectionsProps) {
  const searchParams = useSearchParams();
  const currentGender = searchParams.get('gender');
  const { setGender } = useFilterStore();

  const sections: Section[] = [
    { title: "Hombres", slug: "Hombre", url: `/products?gender=Hombre` },
    { title: "Mujeres", slug: "Mujer", url: `/products?gender=Mujer` },
    { title: "Niños", slug: "Niños", url: `/products?gender=Niños` },
    { title: "Parejas", slug: "Parejas", url: `/products?gender=Parejas` },
  ];

  if (mobile) {
    return (
      <nav className="flex flex-col px-3 space-y-1">
        {sections.map((section) => {
          const isActive = currentGender === section.slug;
          return (
            <Link
              key={section.title}
              href={section.url}
              onClick={() => {
                setGender(section.slug as GenderFilter);
                onLinkClick?.();
              }}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                ? "bg-gray-200 font-semibold text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {section.title}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="border-b border-t border-gray-200 w-full">
      <nav
        className="
          flex items-center
          overflow-x-auto scroll-smooth
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          px-4 py-2
          gap-2 sm:gap-4 md:justify-center md:gap-8 lg:gap-16
          max-w-6xl mx-auto
        "
      >
        {sections.map((section) => {
          const isActive = currentGender === section.slug;

          return (
            <Link
              key={section.title}
              href={section.url}
              onClick={() => {
                setGender(section.slug as GenderFilter);
                onLinkClick?.();
              }}
              className={`shrink-0 flex items-center justify-center rounded-md transition-colors px-4 py-2 text-sm font-medium whitespace-nowrap ${isActive
                  ? "bg-gray-200 font-semibold text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {section.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
