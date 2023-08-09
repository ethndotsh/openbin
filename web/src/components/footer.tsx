import Link from "next/link";

const Footer = () => {
  return (
    <div className="absolute ml-3 mr-3 bottom-0 text-center md:bottom-4 z-50 text-white md:ml-auto md:mr-auto left-0 right-0">
      <p className="text-sm text-neutral-600 font-medium">
        Made with 💚 by{" "}
        <Link href="https://github.com/ethndotsh" target="blank">
          <span className="font-bold">Ethan</span>
        </Link>
        ,{" "}
        <Link href="https://github.com/jackmerrill" target="blank">
          <span className="font-bold">
            Jack
          </span>
        </Link>
        ,{" "}
        <Link href="https://github.com/LavenderFoxxo" target="blank">
          <span className="font-bold">Alexander</span>
        </Link>{" "}
        and{" "}
        <Link href="https://github.com/mathislajs" target="blank">
          <span className="font-bold">Mathis</span>
        </Link>
      </p>
    </div>
  );
};

export { Footer };
