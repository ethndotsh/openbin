import { cn } from "@/utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-10", className)}
        fill="none"
        viewBox="0 0 193 46"
      >
        <path
          fill="#000"
          d="M21 31.5V35H7v-3.5H3.5V28H0v-7h3.5v-7H7v-3.5h14V14h3.5v3.5H28v7h-3.5v7H21Zm-10.5 0h7V14h-7v17.5ZM42 45.5H31.5v-35h7V14H42v-3.5h14v21h-3.5V35h-14v7H42v3.5Zm-3.5-14H49V14h-7v3.5h-3.5v14ZM84 21h-7v-7H66.5v10.5H70v7h10.5V35h-14v-3.5H63V28h-3.5V17.5H63V14h3.5v-3.5h14V14H84v7Zm-14 3.5V21h7v3.5h-7ZM98 31.5V35H87.5V14H84v-3.5h10.5V14H98v-3.5h10.5V14h3.5v21h-10.5v-3.5h3.5V14h-7v3.5h-3.5v14H98ZM136.5 31.5V14h-7v-3.5H140V14h3.5v17.5H140V35h-21V0h7v31.5h10.5ZM154 7V0h7v7h-7Zm7 3.5V35h-10.5v-3.5h3.5v-14h-3.5v-7H161ZM178.5 31.5V35H168V14h-3.5v-3.5H175V14h3.5v-3.5H189V14h3.5v21H182v-3.5h3.5V14h-7v3.5H175v14h3.5Z"
        />
      </svg>
    </div>
  );
}
