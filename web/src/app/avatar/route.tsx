import { ImageResponse, NextRequest } from "next/server";
import { murmur2 } from "murmurhash2";
import color from "tinycolor2";

export const runtime = "edge";

function generateGradient(id: string) {
  const c1 = color({ h: murmur2(id, 360) % 360, s: 0.95, l: 0.5 });
  const second = c1.triad()[1].toHexString();

  return {
    fromColor: c1.toHexString(),
    toColor: second,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const gradient = generateGradient(name ?? "default");

  return new ImageResponse(
    (
      <svg
        width={150}
        height={150}
        viewBox={`0 0 ${150} ${150}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gradient.fromColor} />
              <stop offset="100%" stopColor={gradient.toColor} />
            </linearGradient>
          </defs>
          <rect fill="url(#gradient)" x="0" y="0" width={150} height={150} />
        </g>
      </svg>
    ),
    {
      width: 150,
      height: 150,
    },
  );
}
