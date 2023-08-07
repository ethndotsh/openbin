import { Logo } from "@/components/logo";
import { SupabaseLogo } from "@/components/supabase-logo";
import { Button } from "@/components/ui/button";
import { Balancer } from "react-wrap-balancer";
import { Terminal } from "@/components/terminal";

export default function Home() {
  return (
    <div
      style={{
        background:
          "radial-gradient(114.41% 98.48% at 96.73% 4.89%, rgba(0, 133, 255, 0.20) 0%, rgba(255, 245, 0, 0.00) 100%), #FFF",
      }}
    >
      <main className="grid md:grid-cols-2 xl:gap-6 h-screen w-screen lg:max-w-5xl md:max-w-4xl sm:max-w-2xl xl:max-w-6xl sm:mx-auto px-5 ">
        <div className="absolute h-screen w-screen top-0 left-0 flex items-center justify-center z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full"
            viewBox="0 0 1059 982"
            fill="none"
          >
            <mask
              id="mask0_99_154"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="-67"
              width="1059"
              height="1059"
            >
              <rect
                y="-67"
                width="1059"
                height="1059"
                fill="url(#paint0_radial_99_154)"
              />
            </mask>
            <g mask="url(#mask0_99_154)">
              <circle cx="529.5" cy="462.5" r="66" stroke="#CACACA" />
              <circle cx="529.5" cy="462.5" r="124" stroke="#CACACA" />
              <circle cx="529.5" cy="462.5" r="182" stroke="#CACACA" />
              <circle cx="529.5" cy="462.5" r="239" stroke="#CACACA" />
              <circle cx="529.5" cy="462.5" r="297" stroke="#CACACA" />
              <circle cx="529.5" cy="462.5" r="356" stroke="#CACACA" />
              <circle cx="529.5" cy="462.5" r="414" stroke="#CACACA" />
              <circle cx="529.5" cy="462.5" r="471" stroke="#CACACA" />
              <circle cx="529.5" cy="462.5" r="529" stroke="#CACACA" />
            </g>
            <defs>
              <radialGradient
                id="paint0_radial_99_154"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(529.5 462.5) rotate(90) scale(529.5)"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <section className="flex items-center z-10 py-56">
          <div>
            <Logo />

            <div className="flex items-center space-x-2 my-4">
              <SupabaseLogo className="h-4" />
              <span className="text-neutral-600 text-sm font-medium">
                Supabase LW8 Hackathon Submission
              </span>
            </div>
            <h1 className="lg:text-4xl text-3xl font-bold mt-1">
              <Balancer>
                Code and notes sharing built for command line warriors.
              </Balancer>
            </h1>
            <p className="text-neutral-700 mt-4 text-[1.1rem]">
              Openbin brings the ease of use of Pastebin and Gists to your
              terminal, allowing you to draft, publish and share text files in
              seconds.
            </p>
            <div className="flex flex-row gap-3 items-center mt-4">
              <Button className="bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all">
                Open web editor
              </Button>
              <Button
                variant="ghost"
                className="flex items-center hover:scale-105 transition-all"
              >
                <svg
                  role="img"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Read documentation
              </Button>
            </div>
          </div>
        </section>
        <aside className="flex items-center z-10">
          <div className="w-full shadow-lg border rounded-md">
            <div className="h-9 bg-neutral-50 rounded-t-md relative">
              <div className="absolute left-0 h-full top-0 flex flex-row gap-1 items-center pl-3">
                <div className="h-3.5 w-3.5 bg-red-500 rounded-full" />
                <div className="h-3.5 w-3.5 bg-yellow-500 rounded-full" />
                <div className="h-3.5 w-3.5 bg-green-500 rounded-full" />
              </div>
              <div className="absolute left-0 top-0 h-full w-full flex items-center justify-center">
                <p className="font-medium text-sm">kiwi@copple — 80 x 36</p>
              </div>
            </div>
            <Terminal />
          </div>
        </aside>
      </main>
    </div>
  );
}
