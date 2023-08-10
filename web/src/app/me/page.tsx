import { Calendar, Hash, Info, PersonStandingIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getSession } from "@/utils/supabase";

const Me = async () => {
  const session = await getSession();

  return (
    <>
      <div className="l mx-auto mt-8 max-w-5xl p-2">
        <div className="relative">
          <Image
            className="h-[244px] w-full rounded-xl object-cover"
            src="/assets/profile-bg.png"
            alt="banner"
            draggable="false"
          />
          <div className="absolute left-0 top-0 h-full w-full select-none rounded-xl bg-black/30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] space-y-1">
            <Image
              className="mx-auto h-auto w-32 rounded-full"
              src="/assets/pfp-placeholder.png"
              alt="avatar"
              draggable="false"
            />
            <h4 className="pt-3 text-3xl font-semibold text-white">
              Alexander
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
                </div>
                <div className="mb-1 flex flex-row items-center gap-2">
                  <Hash className="hidden h-5 w-5 md:block" />
                  <h4 className="text-md font-medium">Uploads:</h4>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 rounded-xl border p-2">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Settings
              </Button>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Delete Account
              </Button>
            </div>
          </div>
          <div className="col-span-5 p-2">
            <div className="mb-1 flex flex-row items-center gap-2">
              <PersonStandingIcon className="h-6 w-6" />
              <p className="text-lg font-semibold">Your Pastes</p>
            </div>

            <div className="flex w-full flex-wrap gap-1">
              <div className="rounded-xl border-2 p-2 text-center">
                <p className="text-md font-semibold">This is a upload</p>
              </div>
              <div className="rounded-xl border-2 p-2 text-center">
                <p className="text-md font-semibold">This is another upload</p>
              </div>
              <div className="rounded-xl border-2 p-2 text-center">
                <p className="text-md font-semibold">This is another upload</p>
              </div>
              <div className="rounded-xl border-2 p-2 text-center">
                <p className="text-md font-semibold">This is another upload</p>
              </div>
              <div className="rounded-xl border-2 p-2 text-center">
                <p className="text-md font-semibold">This is another upload</p>
              </div>
              <div className="rounded-xl border-2 p-2 text-center">
                <p className="text-md font-semibold">
                  This is another another upload
                </p>
              </div>
              <div className="rounded-xl border-2 p-2 text-center">
                <p className="text-md font-semibold">Random shit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Me;
