import { Calendar, Hash, Info, PersonStandingIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { getPastes, getProfile, getSession } from "@/utils/supabase";
import Link from "next/link";
import { cn } from "@/utils/cn";

const Profile = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const profile = await getProfile(params.id);

  if (!profile) {
    throw new Error("Profile not found");
  }

  const pastes = await getPastes(profile?.id);

  return (
    <>
      <div className="mx-auto mt-8 max-w-5xl p-2">
        <div className="relative">
          {/* <Image
            className="h-[244px] w-full rounded-xl object-cover"
            src={profile?.avatar_url ?? "/assets/banner-placeholder.png"}
            alt="banner"
            draggable="false"
            width={244}
            height={244}
          /> */}
          <div className="flex h-full w-full flex-col justify-center space-y-1 rounded-xl bg-black/30 py-4">
            <Image
              className="mx-auto h-auto w-32 rounded-full"
              src={profile?.avatar_url ?? "/assets/avatar-placeholder.png"}
              alt="avatar"
              draggable="false"
              width={128}
              height={128}
            />
            <h4 className="pt-3 text-center text-3xl font-semibold text-white">
              {profile?.full_name ?? profile?.username ?? "Untitled User"}
            </h4>
          </div>
        </div>
        <div className="mt-2 grid max-w-4xl grid-cols-8">
          <div className="col-span-3 space-y-2">
            <div className="flex flex-wrap rounded-xl border p-2">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <Info className="hidden h-5 w-5 md:block" />
                <p className="text-lg font-semibold">Information</p>
              </div>
              <Separator className="mb-3 w-full" />
              <div className="space-y-2">
                <div className="mb-1 flex flex-row items-center gap-2">
                  <Calendar className="hidden h-5 w-5 md:block" />
                  <h4 className="text-md font-medium">Join Date:</h4>
                  <p className="text-md font-medium">
                    {new Date(
                      profile!.created_at ?? new Date(),
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-1 flex flex-row items-center gap-2">
                  <Hash className="hidden h-5 w-5 md:block" />
                  <h4 className="text-md font-medium">Uploads:</h4>
                  <p className="text-md font-medium">{pastes?.length}</p>
                </div>
              </div>
            </div>
            {session?.user.id === profile?.id && (
              <div className="flex flex-row gap-2 rounded-xl border p-2">
                <Button className="w-full" variant="default">
                  Settings
                </Button>
                <Link
                  href="/auth/delete"
                  className={cn(
                    buttonVariants({ variant: "destructive" }),
                    "w-full",
                  )}
                >
                  Delete Account
                </Link>
              </div>
            )}
          </div>
          <div className="col-span-5 p-2">
            <div className="mb-1 flex flex-row items-center gap-2">
              <PersonStandingIcon className="h-6 w-6" />
              <p className="text-lg font-semibold">Your Pastes</p>
            </div>

            <div className="flex w-full flex-wrap gap-1">
              {pastes?.map((paste) => (
                <Link
                  className="w-full rounded-xl border-2 px-4 py-3"
                  key={paste.id}
                  href={`/pastes/${paste.id}`}
                >
                  <h2 className="text-md font-semibold">{paste.title}</h2>
                  <p className="font-mono text-xs">{paste.language}</p>

                  <Separator className="my-2 w-full" />

                  <p className="text-sm">{paste.description}</p>
                </Link>
              ))}

              {pastes?.length === 0 && (
                <div className="w-full rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
                  <p className="text-md font-semibold">No Pastes</p>

                  <p className="text-md font-semibold">
                    <Link
                      className="text-blue-500 hover:underline"
                      href="/editor"
                    >
                      Create a Paste
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
