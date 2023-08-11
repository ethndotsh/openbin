import { Logo } from "@/components/logo";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="relative w-screen md:h-screen md:overflow-y-hidden md:overscroll-y-none">
      <main className="grid h-full w-full px-5 sm:mx-auto sm:max-w-2xl md:max-w-4xl md:grid-cols-1 md:gap-6 lg:max-w-5xl xl:max-w-6xl ">
        <section className="items-center pb-12 pt-36 md:py-106">
          <div>
            <Link href="/">
                <Logo />
            </Link>
            <h1 className="mt-1 text-3xl font-bold lg:text-4xl">
                Privacy Policy
            </h1>
            <p className="mt-4 text-[1.1rem] text-neutral-700">
              Last updated: August 10, 2023
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
