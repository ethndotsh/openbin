import Link from "next/link";

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 ml-3 mr-3 text-center text-white md:bottom-4 md:mx-auto">
      <p className="text-sm font-medium text-neutral-600">
        Made with 💚 by{" "}
        <Link href="https://unnamed.engineering" target="_blank">
          <span className="font-semibold">Unnamed Engineering</span>
        </Link>
      </p>
    </div>
  );
};

export { Footer };
