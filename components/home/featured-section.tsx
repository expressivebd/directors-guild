"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { fetchFeaturedWorks, testContentfulConnection } from "@/lib/contentful";
import type { FeaturedWork } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function FeaturedSection() {
  const [projects, setProjects] = useState<FeaturedWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🎭 Featured section: Starting to fetch data...');
        
        // Test Contentful connection first
        await testContentfulConnection();
        
        const data = await fetchFeaturedWorks();
        console.log('🎭 Featured section: Received data:', data);
        setProjects(data);
      } catch (err) {
        console.error('🎭 Featured section: Error:', err);
        setError("Failed to load featured projects");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );

      // Calculate active index based on scroll position
      const cardWidth = 320; // width of each card
      const currentIndex = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(currentIndex);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, [projects]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320;
    const scrollAmount = cardWidth * 2;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320;
    const targetScroll = index * cardWidth;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="py-12 bg-black w-full">
        <div className="px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold mb-8 text-white">Featured Works</h2>
        </div>
        <div className="flex space-x-4 px-4 md:px-8 lg:px-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-[480px] h-[270px] bg-gray-800 rounded-md animate-pulse flex-shrink-0"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-black w-full">
        <div className="px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold mb-8 text-white">Featured Works</h2>
          <div className="bg-red-900/20 border border-red-900 text-red-100 p-4 rounded-md">
            {error}
          </div>
        </div>
      </section>
    );
  }

  const totalDots = Math.ceil(projects.length / 3);

  return (
    <section className="py-12 bg-black w-full relative overflow-hidden">
      {/* Full-width carousel container */}
      <div className="relative group w-full">
        {/* Left Navigation Arrow */}
        <button
          onClick={() => scroll("left")}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 rounded-full p-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg",
            !canScrollLeft && "hidden"
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Container - Full Width */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "flex-shrink-0 w-[480px] h-[270px] snap-start relative group/card overflow-hidden rounded-lg", // 16:9 aspect ratio
                index === 0 ? "ml-4" : "ml-3",
                index === projects.length - 1 ? "mr-4" : ""
              )}
              style={{ scrollSnapAlign: "start" }}
            >
              <Link
                href={project.redirectURL || "#"}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_0_20px_rgba(74,222,128,0.4)] group-hover/card:-translate-y-2">
                  {/* Poster Image */}
                  <Image
                    src={
                      project.image || "/placeholder.svg?height=450&width=300"
                    }
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    sizes="300px"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                  {/* Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500/90 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover/card:opacity-100 transition-all duration-300 scale-75 group-hover/card:scale-100">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>

                  {/* Title and Info - Slides up from bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-300 mb-3">
                      <span>{project.year}</span>
                      {project.genre && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{project.genre}</span>
                        </>
                      )}
                    </div>
                    {project.tags && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags
                          .slice(0, 3)
                          .map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 rounded-full p-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg",
              !canScrollRight && "hidden"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Navigation Dots - with container padding */}
        <div className="flex justify-center mt-8 space-x-2 px-4 md:px-8 lg:px-16">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index * 3)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                Math.floor(activeIndex / 3) === index
                  ? "bg-green-500 w-6"
                  : "bg-gray-600 hover:bg-gray-500"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hide scrollbar */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
