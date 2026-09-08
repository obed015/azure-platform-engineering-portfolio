"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const bootItems = [
  "IDENTITY",
  "NETWORK",
  "SECURITY",
  "AUTOMATION",
  "OBSERVABILITY",
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({
  onComplete,
}: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [completedItems, setCompletedItems] =
    useState<number>(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      const timer = window.setTimeout(() => {
        setCompletedItems(bootItems.length);
        onComplete();
      }, 150);

      return () => window.clearTimeout(timer);
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete,
      });

      timeline
        .from(".boot-brand", {
          opacity: 0,
          y: 10,
          duration: 0.35,
          ease: "power2.out",
        })
        .from(
          ".boot-title",
          {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.15"
        );

      bootItems.forEach((_, index) => {
        timeline.call(() => {
          setCompletedItems(index + 1);
        });

        timeline.to(
          ".boot-progress-bar",
          {
            width: `${((index + 1) / bootItems.length) * 100}%`,
            duration: 0.22,
            ease: "power1.out",
          },
          "+=0.08"
        );
      });

      timeline
        .to(".boot-ready", {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        })
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "+=0.25"
        );
    }, containerRef);

    return () => context.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="boot-sequence"
      role="status"
      aria-live="polite"
    >
      <div className="boot-sequence-inner">
        <p className="boot-brand">
          OBED://CLOUD_PLATFORM
        </p>

        <h1 className="boot-title">
          INITIALIZING PLATFORM
        </h1>

        <div className="boot-items">
          {bootItems.map((item, index) => {
            const complete = index < completedItems;

            return (
              <div
                key={item}
                className="boot-item"
              >
                <span
                  className={
                    complete
                      ? "boot-check boot-check-complete"
                      : "boot-check"
                  }
                >
                  {complete ? "✓" : "·"}
                </span>

                <span>{item}</span>
              </div>
            );
          })}
        </div>

        <div className="boot-progress">
          <div className="boot-progress-track">
            <div className="boot-progress-bar" />
          </div>

          <span className="boot-progress-value">
            {Math.round(
              (completedItems / bootItems.length) * 100
            )}
            %
          </span>
        </div>

        <p className="boot-ready">
          PLATFORM READY
        </p>
      </div>
    </div>
  );
}