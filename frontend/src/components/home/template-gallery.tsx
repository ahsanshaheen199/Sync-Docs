import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useState } from "react";

const templates = [
  {
    id: "blank",
    name: "Blank document",
    imageUrl: "/blank-document.svg",
  },
  {
    id: "business-letter",
    name: "Business Letter",
    imageUrl: "/business-letter.svg",
  },
  {
    id: "cover-letter",
    name: "Cover Letter",
    imageUrl: "/cover-letter.svg",
  },
  {
    id: "letter",
    name: "Letter",
    imageUrl: "/letter.svg",
  },
  {
    id: "project-proposal",
    name: "Project Proposal",
    imageUrl: "/project-proposal.svg",
  },
  {
    id: "resume",
    name: "Resume",
    imageUrl: "/resume.svg",
  },
  {
    id: "software-proposal",
    name: "Software Proposal",
    imageUrl: "/software-proposal.svg",
  },
];

export function TemplateGallery() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-7xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="text-base font-normal">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4"
                key={template.id}
              >
                <div
                  className={cn(
                    "aspect-3/4 flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    className="w-full h-full hover:border-blue-500 border rounded-sm transition flex flex-col items-center justify-center gap-y-4 bg-white"
                    disabled={isCreating}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => {}}
                  />
                  <p className="text-sm font-medium truncate">
                    {template.name}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
