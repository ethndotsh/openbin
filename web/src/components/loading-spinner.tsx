import { cn } from "@/utils/cn";
import styles from "./loading-spinner.module.css";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("h-5 w-5", className)}>
      <div className={cn(styles.spinner, "h-5 w-5", className)}>
        {[...Array(12)].map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}
