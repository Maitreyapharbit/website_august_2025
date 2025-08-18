declare global {
  interface Window {
    gsap: {
      timeline: (config?: any) => any;
      to: (target: string | any, config: any) => any;
      fromTo: (target: string | any, from: any, to: any) => any;
      from: (target: string | any, config: any) => any;
      set: (target: string | any, config: any) => any;
      registerPlugin: (plugin: any) => void;
    };
    ScrollTrigger: any;
  }
}

export {};