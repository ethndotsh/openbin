import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export default function Login() {
  return (
    <div
      style={{
        background:
          "radial-gradient(114.41% 98.48% at 96.73% 4.89%, rgba(0, 133, 255, 0.20) 0%, rgba(255, 245, 0, 0.00) 100%), #FFF",
      }}
    >
      <main className="flex justify-center xl:gap-6 h-screen w-screen lg:max-w-5xl md:max-w-4xl sm:max-w-2xl xl:max-w-6xl sm:mx-auto px-5 ">
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

        <section className="flex items-center z-10 text-center">
          <div className="space-y-8 my-4 max-w-2xl">
            <h1 className="lg:text-4xl text-3xl font-bold mt-1">
              Welcome to Openbin!
            </h1>
            <p className="text-2xl pt-5">
              Openbin brings the ease of use of Pastebin and Gists to the
              command line, allowing you to edit, publish and share text files
              in a moment.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-5">
              <Button className="bg-black hover:scale-105 transition-all p-5 w-[190px]">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-[20px] w-[20px] mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFFFFF"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Login with GitHub
              </Button>
              <Button className="bg-black hover:scale-105 transition-all p-5 w-[190px]">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-[20px] w-[20px] mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFFFFF"
                >
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Login with Google
              </Button>
              <Button className="bg-black hover:scale-105 transition-all p-5 w-[190px]">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-[20px] w-[20px] mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFFFFF"
                >
                  <title>Gmail</title>
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
                Login with Email
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
