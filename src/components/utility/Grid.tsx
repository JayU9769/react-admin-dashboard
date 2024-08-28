// Grid.tsx
import React, {memo} from "react";
import {GridProps, ResponsiveObject} from "@/interfaces/utility.ts";
import {generateResponsiveClasses} from "./utility";
import clsx from "clsx";

const Grid: React.FC<GridProps> = memo(
  (
    {
      children,
      cols = 12,
      sm,
      md,
      lg,
      xl,
      gap = 4,
      justify = "start",
      align = "start",
      direction = "column",
      alignSelf = "auto",
      order,
      wrap = "wrap",
      rtl = false,
      className = "",
    }
  ) => {
    const gapClass = typeof gap === "number" ? `gap-${gap}` : gap;

    const responsiveClasses: string[] = [
      {size: "sm", span: sm},
      {size: "md", span: md},
      {size: "lg", span: lg},
      {size: "xl", span: xl},
    ].map(({size, span}) => {
      if (typeof span === "string") {
        return `${size}:grid-cols-${span}`;
      } else if (span) {
        return `${size}:grid-cols-${span}`;
      } else {
        return "";
      }
    });

    const responsiveOrderClasses: string[] = generateResponsiveClasses(
      order as ResponsiveObject | undefined,
      "order"
    );
    const responsiveWrapClasses: string[] = generateResponsiveClasses(
      wrap as ResponsiveObject | undefined,
      "flex"
    );
    const responsiveAlignClasses: string[] = generateResponsiveClasses(
      align as ResponsiveObject | undefined,
      "items"
    );
    const responsiveJustifyClasses: string[] = generateResponsiveClasses(
      justify as ResponsiveObject | undefined,
      "justify"
    );
    const responsiveDirectionClasses: string[] = generateResponsiveClasses(
      direction as ResponsiveObject | undefined,
      "flex"
    );
    const responsiveAlignSelfClasses: string[] = generateResponsiveClasses(
      alignSelf as ResponsiveObject | undefined,
      "self"
    );

    const directionClass = rtl ? "rtl" : "ltr";

    return (
      <div
        className={clsx(
          "grid",
          `grid-cols-${cols}`,
          responsiveClasses,
          gapClass,
          responsiveJustifyClasses,
          responsiveAlignClasses,
          responsiveDirectionClasses,
          directionClass,
          responsiveOrderClasses,
          responsiveWrapClasses,
          responsiveAlignSelfClasses,
          className
        )}
      >
        {children}
      </div>
    );
  }
);

export default Grid;
