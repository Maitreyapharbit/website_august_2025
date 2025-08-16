declare global {
  interface Window {
    gsap: {
      timeline: () => any;
      to: (target: string, config: any) => any;
      registerPlugin: (plugin: any) => void;
    };
    ScrollTrigger: any;
  }
}

export {};