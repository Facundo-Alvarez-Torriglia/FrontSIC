import { cn } from "@/lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function Typography4xl({ children, className }: TypographyProps) {
  return <h1 className={cn("text-4xl tracking-tight font-semibold", className)}>{children}</h1>;
}

export function Typography2xl({ children, className }: TypographyProps) {
  return <h3 className={cn("font-semibold text-2xl tracking-normal", className)}>{children}</h3>;
}

export function TypographyBody({ children, className }: TypographyProps) {
  return <p className={cn("text-sm leading-6 tracking-normal", className)}>{children}</p>;
}

export function TypographyList({ children, className }: TypographyProps) {
  return <ul className={cn("leading-6", className)}>{children}</ul>;
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return <p className={cn("text-lg font-semibold", className)}>{children}</p>;
}

export function TypographyBase({ children, className }: TypographyProps) {
  return <p className={cn("text-base", className)}>{children}</p>;
}

export function TypographySmall({ children, className }: TypographyProps) {
  return <p className={cn("text-sm ", className)}>{children}</p>;
}

export function TypographyExtraSmall({ children, className }: TypographyProps) {
  return <p className={cn("text-xs", className)}>{children}</p>;
}

export function StyledText({ children, className }: { children: React.ReactNode; className: string }) {
  const text = children?.toString() ?? "";
  const regex = /\[([^\]]+)\]\(#(.*?)\)/g;
  let parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [wholeMatch, matchedText, styleId] = match;
    parts.push(
      <span key={lastIndex} className={`${styleId === "b" && "font-bold text-black"}`}>
        {matchedText}
      </span>
    );
    lastIndex = match.index + wholeMatch.length;
  }
  // Añadir cualquier texto restante después del último match
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  // Devolver los segmentos como un único elemento JSX
  return <div className={className}>{parts}</div>;
}
