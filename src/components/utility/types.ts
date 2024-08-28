// types.ts
export type ResponsiveNumberOrString = number | string;
export type JustifyContentValue =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around";
export type AlignItemsValue = "start" | "center" | "end" | "stretch";
export type DirectionValue = "row" | "row-reverse" | "col" | "col-reverse";
export type AlignSelfValue = "auto" | "start" | "center" | "end" | "stretch";
export type WrapValue = "nowrap" | "wrap" | "wrap-reverse";

export interface ResponsiveString {
  sm?: ResponsiveNumberOrString;
  md?: ResponsiveNumberOrString;
  lg?: ResponsiveNumberOrString;
  xl?: ResponsiveNumberOrString;
}

export interface ResponsiveObject {
  sm?: { [key: string]: string };
  md?: { [key: string]: string };
  lg?: { [key: string]: string };
  xl?: { [key: string]: string };
}

export interface ColProps {
  children: React.ReactNode;
  span?: number;
  sm?: ResponsiveNumberOrString;
  md?: ResponsiveNumberOrString;
  lg?: ResponsiveNumberOrString;
  xl?: ResponsiveNumberOrString;
  gap?: ResponsiveNumberOrString;
  order?: number | ResponsiveObject;
  className?: string;
}

export interface GridProps {
  children: React.ReactNode;
  cols?: ResponsiveNumberOrString;
  sm?: ResponsiveNumberOrString;
  md?: ResponsiveNumberOrString;
  lg?: ResponsiveNumberOrString;
  xl?: ResponsiveNumberOrString;
  gap?: ResponsiveNumberOrString;
  justify?: JustifyContentValue | ResponsiveObject;
  align?: AlignItemsValue | ResponsiveObject;
  direction?: DirectionValue | ResponsiveObject;
  alignSelf?: AlignSelfValue | ResponsiveObject;
  order?: number | ResponsiveObject;
  wrap?: WrapValue | ResponsiveObject;
  rtl?: boolean;
  className?: string;
}
