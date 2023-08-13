"use client";

/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { murmur2 } from "murmurhash2";
import color from "tinycolor2";
import { Profile } from "types/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User2, LogOut } from "lucide-react";

function generateGradient(id: string) {
  const c1 = color({ h: murmur2(id, 360) % 360, s: 0.95, l: 0.5 });
  const second = c1.triad()[1].toHexString();

  return {
    fromColor: c1.toHexString(),
    toColor: second,
  };
}

export function Avatar({
  profile,
  dropdown = false,
  size = "sm",
}: {
  profile: Profile | null;
  dropdown?: boolean;
  size?: string;
}) {
  const gradient = generateGradient(profile?.id ?? "");
  const { refresh } = useRouter();

  const sizes = {
    xxs: "h-4 w-4",
    xs: "h-5 w-5",
    sm: "h-6 w-6",
    md: "h-7 w-7",
  }[size];

  async function signOut() {
    await fetch("/auth/signout", {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        refresh();
      }
    });
  }

  return (
    <>
      {dropdown ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.username ?? profile.full_name ?? "Untitled User"}
                className={clsx(sizes, "aspect-square shrink-0 rounded-full")}
              />
            ) : (
              <div
                className={clsx(sizes, "aspect-square shrink-0 rounded-full")}
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${gradient.fromColor}, ${gradient.toColor})`,
                }}
              ></div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32" align="end">
            <DropdownMenuItem>
              <Link
                href={`/profiles/${profile?.id}`}
                className="flex w-full items-center"
              >
                <User2 className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={signOut}
                className="flex w-full items-center text-left"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.username ?? profile.full_name ?? "Untitled User"}
              className={clsx(sizes, "aspect-square shrink-0 rounded-full")}
            />
          ) : (
            <div
              className={clsx(sizes, "aspect-square shrink-0 rounded-full")}
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${gradient.fromColor}, ${gradient.toColor})`,
              }}
            ></div>
          )}
        </>
      )}
    </>
  );
}
