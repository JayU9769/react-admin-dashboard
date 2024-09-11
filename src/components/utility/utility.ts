import {IResponsiveObject, TResponsiveNumberOrString} from "@/interfaces/utility.ts";

export const generateResponsiveClasses = (
  prop: TResponsiveNumberOrString | IResponsiveObject | undefined,
  className: string
): string[] => {
  if (!prop) return [];

  if (typeof prop === "number" || typeof prop === "string") {
    return [`${className}-${prop}`];
  }

  return Object.entries(prop).flatMap(([size, value]) => {
    if (typeof value === "string" || typeof value === "number") {
      return [`${size}:${className}-${value}`];
    } else {
      return Object.entries(value).map(
        ([key, val]) => `${size}:${className}-${key}-${val}`
      );
    }
  });
};

export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
