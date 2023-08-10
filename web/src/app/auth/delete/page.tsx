import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function DeletePage() {
  return (
    <div className="flex flex-col py-24">
      <div className="flex-1 ">
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Delete Account</h1>
          <p className="text-lg font-medium">
            Are you sure you want to delete your account?
          </p>
          <p className="text-lg font-medium">
            This action is irreversible. All of your pastes will be deleted.
            Remixed pastes made by other users will be unaffected.
          </p>
          <div className="flex w-full max-w-xl flex-row gap-2 rounded-xl border p-2">
            <Link
              href="/me"
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              Cancel
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
