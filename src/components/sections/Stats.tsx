"use client";

import React, { useEffect, useRef, useState } from "react";

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 150, suffix: "+", label: "Projects Completed" },
    { number: 50, suffix: "+", label: "Happy Clients" },
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 98, suffix: "%", label: "Success Rate" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []); // Removed isVisible from dependency array

  const Counter: React.FC<{
    end: number;
    suffix: string;
    duration?: number;
  }> = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]); // isVisible is properly used here

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="section bg-gradient-to-r from-purple-900/20 to-pink-900/20"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-xl gradient-text mb-6" data-aos="fade-up">
            Our Impact
          </h2>
          <p
            className="text-lg text-white opacity-90 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Numbers that speak for our commitment to excellence and client
            satisfaction.
          </p>
        </div>

        <div className="grid grid-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center glass-dark p-8 rounded-xl card-hover"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="stat-number mb-4">
                <Counter end={stat.number} suffix={stat.suffix} />
              </div>
              <p className="text-white opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
