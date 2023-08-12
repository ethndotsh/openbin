import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { getSession } from "@/utils/supabase";
import Link from "next/link";

export default async function DeletePage() {
  const session = await getSession();
  return (
    <div className="flex flex-col py-24">
      <div className="flex-1 ">
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Delete Account</h1>
          <p className="font-medium text-neutral-700">
            Are you sure you want to delete your account?
          </p>
          <p className="max-w-xl text-center font-medium text-neutral-700">
            This action is irreversible. All of your pastes will be deleted.
            Remixed pastes made by other users will be unaffected.
          </p>
          <div className="flex w-full max-w-lg flex-col gap-2 p-2">
            <Link href={`/profiles/${session?.user.id}`}>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <form
              action="/auth/delete/confirm"
              method="post"
              className="w-full"
            >
              <Button
                className={cn(
                  buttonVariants({ variant: "destructive" }),
                  "w-full",
                )}
              >
                Delete Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
