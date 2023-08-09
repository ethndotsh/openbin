import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { Circles } from "@/components/svg/circles";
import { LoginComponent } from "@/components/login";

export default function Login() {
  return (
    <div>
      <main className="flex h-screen w-screen justify-center px-5 sm:mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        <Circles />
        <div className="z-10">
          <section className="z-10 flex items-center text-center">
            <div className="my-4 space-y-8">
              <div className="flex w-full justify-center pt-8">
                <Logo className="h-6 text-neutral-800" />
              </div>

              <div className="pt-36">
                <h1 className="mt-1 text-3xl font-bold lg:text-4xl">Login</h1>

                <div className="w-72 pt-8">
                  <LoginComponent />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
