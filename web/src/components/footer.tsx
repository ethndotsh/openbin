import Link from "next/link";

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 m-3 text-center text-white md:bottom-4 md:mx-auto">
      {/*<p className="text-sm font-medium text-neutral-600">
        <Link href="/privacy-policy">
          <span className="font-bold">Privacy Policy</span>
        </Link>{" "}
        /{" "}
        <Link href="/fair-use">
          <span className="font-bold">Fair Use</span>
        </Link>{" "}
        /{" "}
        <Link href="https://github.com/ethndotsh/openbin" target="_blank">
          <span className="font-bold">Open Source</span>
        </Link>
      </p>*/}
      <p className="text-sm font-medium text-neutral-600">
        Made with 💚 by{" "}
        <Link href="https://github.com/ethndotsh" target="_blank">
          <span className="font-semibold">Ethan</span>
        </Link>
        ,{" "}
        <Link href="https://github.com/jackmerrill" target="_blank">
          <span className="font-semibold">Jack</span>
        </Link>
        ,{" "}
        <Link href="https://github.com/LavenderFoxxo" target="_blank">
          <span className="font-semibold">Alexander</span>
        </Link>{" "}
        and{" "}
        <Link href="https://github.com/mathislajs" target="_blank">
          <span className="font-semibold">Mathis</span>
        </Link>
      </p>
    </div>
  );
};

export { Footer };
