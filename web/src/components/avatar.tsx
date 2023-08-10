import clsx from "clsx";
import { murmur2 } from "murmurhash2";
import color from "tinycolor2";

function generateGradient(id: string) {
  const c1 = color({ h: murmur2(id, 360) % 360, s: 0.95, l: 0.5 });
  const second = c1.triad()[1].toHexString();

  return {
    fromColor: c1.toHexString(),
    toColor: second,
  };
}

export function Avatar({ id, size = "sm" }: { id: string; size?: string }) {
  const gradient = generateGradient(id);

  const sizes = {
    xs: "h-5 w-5",
    sm: "h-6 w-6",
    md: "h-7 w-7",
  }[size];

  return (
    <div
      className={clsx(sizes, "aspect-square shrink-0 rounded-full")}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${gradient.fromColor}, ${gradient.toColor})`,
      }}
    ></div>
  );
}
