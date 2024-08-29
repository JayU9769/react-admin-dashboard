// Grid.tsx
import React, {memo} from "react";
import {IGridProps, IResponsiveObject} from "@/interfaces/utility.ts";
import {generateResponsiveClasses} from "./utility";
import clsx from "clsx";

const Grid: React.FC<IGridProps> = memo(
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
      order as IResponsiveObject | undefined,
      "order"
    );
    const responsiveWrapClasses: string[] = generateResponsiveClasses(
      wrap as IResponsiveObject | undefined,
      "flex"
    );
    const responsiveAlignClasses: string[] = generateResponsiveClasses(
      align as IResponsiveObject | undefined,
      "items"
    );
    const responsiveJustifyClasses: string[] = generateResponsiveClasses(
      justify as IResponsiveObject | undefined,
      "justify"
    );
    const responsiveDirectionClasses: string[] = generateResponsiveClasses(
      direction as IResponsiveObject | undefined,
      "flex"
    );
    const responsiveAlignSelfClasses: string[] = generateResponsiveClasses(
      alignSelf as IResponsiveObject | undefined,
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
