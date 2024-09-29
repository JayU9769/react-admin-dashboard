// utility.ts
import React from "react";

export type TResponsiveNumberOrString = number | string;
export type TJustifyContentValue = "start" | "center" | "end" | "between" | "around";
export type TAlignItemsValue = "start" | "center" | "end" | "stretch";
export type TDirectionValue = "row" | "row-reverse" | "col" | "col-reverse";
export type TAlignSelfValue = "auto" | "start" | "center" | "end" | "stretch";
export type TWrapValue = "nowrap" | "wrap" | "wrap-reverse";

export interface ResponsiveString {
  sm?: TResponsiveNumberOrString;
  md?: TResponsiveNumberOrString;
  lg?: TResponsiveNumberOrString;
  xl?: TResponsiveNumberOrString;
}

export interface IResponsiveObject {
  sm?: { [key: string]: string };
  md?: { [key: string]: string };
  lg?: { [key: string]: string };
  xl?: { [key: string]: string };
}

export interface IColProps {
  children: React.ReactNode;
  span?: number;
  sm?: TResponsiveNumberOrString;
  md?: TResponsiveNumberOrString;
  lg?: TResponsiveNumberOrString;
  xl?: TResponsiveNumberOrString;
  gap?: TResponsiveNumberOrString;
  order?: number | IResponsiveObject;
  className?: string;
}

export interface IGridProps {
  children: React.ReactNode;
  cols?: TResponsiveNumberOrString;
  sm?: TResponsiveNumberOrString;
  md?: TResponsiveNumberOrString;
  lg?: TResponsiveNumberOrString;
  xl?: TResponsiveNumberOrString;
  gap?: TResponsiveNumberOrString;
  justify?: TJustifyContentValue | IResponsiveObject;
  align?: TAlignItemsValue | IResponsiveObject;
  direction?: TDirectionValue | IResponsiveObject;
  alignSelf?: TAlignSelfValue | IResponsiveObject;
  order?: number | IResponsiveObject;
  wrap?: TWrapValue | IResponsiveObject;
  rtl?: boolean;
  className?: string;
}
