import Link from "next/link";
import { SquareActivity } from "lucide-react";

const Homepage = () => {
  return (
    <div className="p-6 grid place-items-center place-content-center">
      <Link
        href="/"
        className="text-2xl font-bold flex flex-row justify-start items-center gap-1 mb-6 "
      >
        <SquareActivity strokeWidth={2.25} className="text-[#137cf1]" />
        <span>
          <span className="text-black">Med</span>
          <span className="text-[#137cf1]">Go</span>
        </span>
      </Link>

      <Link href="/dashboard/bookings" className="underline">
        Go to bookings
      </Link>
    </div>
  );
};

export default Homepage;
