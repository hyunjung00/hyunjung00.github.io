import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ProfilePhotoSize = "sm" | "md" | "lg" | number;

interface ProfilePhotoProps {
  src?: string;
  alt?: string;
  name?: string; // used for initials fallback
  size?: ProfilePhotoSize; // tailwind sizes for sm/md/lg, or a raw pixel number
  className?: string;
  rounded?: boolean; // circle vs rounded-md
  border?: boolean; // show subtle border
}

const sizeToClasses = (size: ProfilePhotoSize) => {
  if (typeof size === "number") return `w-[${size}px] h-[${size}px]`;
  switch (size) {
    case "sm":
      return "w-12 h-12"; // 48px
    case "lg":
      return "w-32 h-32"; // 128px
    case "md":
    default:
      return "w-24 h-24"; // 96px
  }
};

const initialsFromName = (name?: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
  return (first + last).toUpperCase();
};

export function ProfilePhoto({
  src,
  alt,
  name,
  size = "md",
  className,
  rounded = true,
  border = true,
}: ProfilePhotoProps) {
  const shape = rounded ? "rounded-full" : "rounded-md";
  const borderCls = border ? "border-2 border-primary/20" : "";
  const sizeCls = sizeToClasses(size);

  return (
    <Avatar className={cn(shape, sizeCls, borderCls, "bg-card", className)}>
      <AvatarImage src={src} alt={alt || name || "Profile photo"} className={cn(shape, "object-cover")} />
      <AvatarFallback className={cn(shape, "text-sm font-medium bg-muted text-foreground")}> 
        {initialsFromName(name)}
      </AvatarFallback>
    </Avatar>
  );
}

export default ProfilePhoto;

