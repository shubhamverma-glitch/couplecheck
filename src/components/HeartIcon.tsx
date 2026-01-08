import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeartIconProps {
  className?: string;
  animated?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  filled?: boolean;
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const HeartIcon = ({ 
  className, 
  animated = false, 
  size = "md",
  filled = true 
}: HeartIconProps) => {
  return (
    <Heart
      className={cn(
        "text-primary",
        sizeMap[size],
        animated && "animate-heartbeat",
        className
      )}
      fill={filled ? "currentColor" : "none"}
      strokeWidth={filled ? 0 : 2}
    />
  );
};

export default HeartIcon;
