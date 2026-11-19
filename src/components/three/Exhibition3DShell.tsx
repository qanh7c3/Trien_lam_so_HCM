"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "framer-motion";
import Museum3DHud from "./overlay/Museum3DHud";
import ShowcaseSections from "./overlay/ShowcaseSections";
import type {
  Exhibition3DData,
  PointerOffset,
  ScrollTelemetry,
} from "./types";

const ExhibitionStageCanvas = dynamic(
  () => import("./ExhibitionStageCanvas"),
  { ssr: false }
);

interface Exhibition3DShellProps {
  data: Exhibition3DData;
}

export default function Exhibition3DShell({ data }: Exhibition3DShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const telemetryRef = useRef<ScrollTelemetry>({
    progress: 0,
    activeChapter: 0,
    activeStop: 0,
  });
  const pointerRef = useRef<PointerOffset>({ x: 0, y: 0 });

  const [activeChapter, setActiveChapter] = useState(0);
  const [activeStop, setActiveStop] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [enablePostEffects, setEnablePostEffects] = useState(true);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreferences = () => {
      setIsMobile(mobileQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    syncPreferences();
    mobileQuery.addEventListener("change", syncPreferences);
    motionQuery.addEventListener("change", syncPreferences);

    return () => {
      mobileQuery.removeEventListener("change", syncPreferences);
      motionQuery.removeEventListener("change", syncPreferences);
    };
  }, []);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: reducedMotion ? 0 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !reducedMotion,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: reducedMotion ? false : 0.4,
          onUpdate: (self) => {
            telemetryRef.current.progress = self.progress;
            const nextPercent = Math.round(self.progress * 100);
            setScrollPercent((prev) => (prev === nextPercent ? prev : nextPercent));
          },
        });
      }

      const chapterEls = gsap.utils.toArray<HTMLElement>("[data-chapter-index]");
      chapterEls.forEach((el) => {
        const idx = Number(el.dataset.chapterIndex || 0);
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            telemetryRef.current.activeChapter = idx;
            setActiveChapter(idx);
          },
          onEnterBack: () => {
            telemetryRef.current.activeChapter = idx;
            setActiveChapter(idx);
          },
        });
      });

      mm.add("(min-width: 768px)", () => {
        const stopEls = gsap.utils.toArray<HTMLElement>("[data-journey-stop]");
        stopEls.forEach((el) => {
          const stopIdx = Number(el.dataset.journeyStop || 0);
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              telemetryRef.current.activeStop = stopIdx;
              setActiveStop(stopIdx);
            },
            onEnterBack: () => {
              telemetryRef.current.activeStop = stopIdx;
              setActiveStop(stopIdx);
            },
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        const stopEls = gsap.utils.toArray<HTMLElement>("[data-journey-stop]");
        stopEls.forEach((el) => {
          const stopIdx = Number(el.dataset.journeyStop || 0);
          ScrollTrigger.create({
            trigger: el,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: () => {
              telemetryRef.current.activeStop = stopIdx;
              setActiveStop(stopIdx);
            },
            onEnterBack: () => {
              telemetryRef.current.activeStop = stopIdx;
              setActiveStop(stopIdx);
            },
          });
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      mm.revert();
      gsap.ticker.remove(updateTicker);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const handleNavigateAnchor = useCallback(
    (anchorId: string) => {
      const target = document.getElementById(anchorId);
      if (!target) return;
      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(target, { offset: -72, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
    },
    [reducedMotion]
  );

  const handleSelectStop = useCallback((idx: number) => {
    telemetryRef.current.activeStop = idx;
    setActiveStop(idx);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={containerRef}
        className="relative min-h-screen bg-[#12100E] text-[#FAF6F0] overflow-x-clip"
      >
        <ExhibitionStageCanvas
          journey={data.journey}
          telemetryRef={telemetryRef}
          pointerRef={pointerRef}
          activeStop={activeStop}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          enablePostEffects={enablePostEffects}
        />

        <Museum3DHud
          activeChapter={activeChapter}
          scrollPercent={scrollPercent}
          enablePostEffects={enablePostEffects}
          onTogglePostEffects={() => setEnablePostEffects((prev) => !prev)}
          onNavigateAnchor={handleNavigateAnchor}
        />

        <ShowcaseSections
          data={data}
          activeStop={activeStop}
          onSelectStop={handleSelectStop}
          onNavigateAnchor={handleNavigateAnchor}
        />
      </div>
    </MotionConfig>
  );
}
