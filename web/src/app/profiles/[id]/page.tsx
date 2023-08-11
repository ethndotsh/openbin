import { Calendar, Hash, Info, PersonStandingIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
  getPastes,
  getProfile,
  getPublicPastes,
  getSession,
} from "@/utils/supabase";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { redirect } from "next/navigation";
import { Paste } from "types/types";
import { Cog, Trash2, PlusCircle, ClipboardX } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Profile = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();

  const profile = await getProfile(params.id);

  if (!profile) {
    throw new Error("Profile not found");
  }

  let pastes: Paste[] | null;

  if (session && profile.id === session.user.id) {
    pastes = await getPastes(profile.id);
  } else {
    pastes = await getPublicPastes(profile.id);
  }

  return (
    <TooltipProvider>
      <div className="mx-auto grid h-full w-full max-w-5xl grid-cols-2 overflow-hidden px-4 py-8">
        <div className="flex items-center gap-3">
          <Image
            className="z-10 rounded-full"
            src={
              profile?.avatar_url ??
              `/avatar?name=${profile?.username ?? "Untitled User"}`
            }
            alt="avatar"
            draggable="false"
            width={48}
            height={48}
          />
          <h4 className="z-10 text-3xl font-semibold text-black">
            {profile?.username ?? "Untitled User"}
          </h4>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex flex-row gap-2">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex aspect-square h-9 min-w-[2.25rem] cursor-default items-center justify-center rounded-md  border">
                  {pastes?.length}
                </div>
              </TooltipTrigger>
              <TooltipContent>Pastes Count</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex aspect-square h-9 w-9 cursor-default items-center justify-center rounded-md  border">
                  <Calendar className="h-5 w-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                Joined{" "}
                {new Date(
                  profile!.created_at ?? new Date(),
                ).toLocaleDateString()}
              </TooltipContent>
            </Tooltip>

            {session?.user.id === profile?.id && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-neutral-50">
                      <Cog className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Settings</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-neutral-50"
                      href="/auth/delete"
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Delete Account</TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-b" />
      <div className="mx-auto max-w-5xl px-4 py-2">
        <div className="relative"></div>
        <div className="mt-2">
          <div className="mb-4 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <PersonStandingIcon className="h-6 w-6" />
              <p className="text-lg font-semibold">
                {profile.id === session?.user.id && "Your "}Pastes
              </p>
            </div>
            <div className="flex items-center justify-end">
              {session?.user.id === profile?.id && (
                <Link href="/editor">
                  <Button
                    size="sm"
                    className="bg-blue-500 transition-all hover:bg-blue-600"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Paste
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {pastes?.map((paste) => (
              <Link
                className="group w-full rounded-xl border px-4 py-3 transition-colors hover:bg-neutral-100"
                key={paste.id}
                href={`/pastes/${paste.id}`}
              >
                <h2 className="text-md font-semibold ">
                  {paste.title && paste.title.length
                    ? paste.title
                    : "Untitled Paste"}
                  {paste.draft && (
                    <span className="ml-1 text-sm text-red-600">DRAFT</span>
                  )}
                </h2>
                <p className="font-mono text-xs">{paste.language}</p>

                <Separator className="my-2 w-full" />

                <p className="text-sm">
                  {paste.description ?? "No description"}
                </p>
              </Link>
            ))}
          </div>
          {pastes?.length === 0 && (
            <div className="flex h-96 w-full flex-col items-center justify-center space-y-2 rounded-xl border border-gray-200 py-8 text-center">
              <ClipboardX className="h-7 w-7 text-gray-400" />
              <p className="text-md font-semibold">No Pastes</p>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Profile;
