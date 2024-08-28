// Col.tsx
import React from "react";
import { ColProps, ResponsiveObject } from "../../interfaces/utility.ts";
import { generateResponsiveClasses } from "./utility";
import clsx from "clsx";

const Col: React.FC<ColProps> = ({
  span = 12,
  sm,
  md,
  lg,
  xl,
  order,
  children,
  className = "",
}) => {
  const responsiveClasses: string[] = [
    { size: "sm", span: sm },
    { size: "md", span: md },
    { size: "lg", span: lg },
    { size: "xl", span: xl },
  ].map(({ size, span }) => {
    if (typeof span === "string") {
      return `${size}:col-span-${span}`;
    } else if (span) {
      return `${size}:col-span-${span}`;
    } else {
      return "";
    }
  });

  const responsiveOrderClasses: string[] = generateResponsiveClasses(
    order as ResponsiveObject | undefined,
    "order"
  );

  const spanClass = span ? `col-span-${span}` : "col-auto";

  return (
    <div
      className={clsx(
        spanClass,
        responsiveClasses.join(" "),
        responsiveOrderClasses.join(" "),
        className
      )}
    >
      {children}
    </div>
  );
};

export default Col;
