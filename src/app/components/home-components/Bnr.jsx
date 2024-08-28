import Link from "next/link";

export default function Bnr() {
  return (
    <>
      <div className="w-full h-[450px] bg-white border-y-2 border-black sm:grid-cols-4 text-sm sm:text-4xl grid grid-cols-2 justify-center items-center">
        <div className="sm:order-1 border-r-2 border-black col-span-1 h-full text-white font-semibold bg-black flex justify-center items-center">
          <Link
            href="/categories/bracelets "
            className="w-full h-full flex items-center justify-center"
          >
            BRACELETS
          </Link>
        </div>

        <div className="sm:order-2 order-3 border-r-2 border-black col-span-1 h-full text-black font-semibold bg-white">
          <Link
            href="/categories/necklaces "
            className="w-full h-full flex items-center justify-center"
          >
            NECKLACES
          </Link>
        </div>
        <div className="sm:order-3 order-4 border-r-2 border-black col-span-1 h-full bg-black text-white font-semibold">
          <Link
            href="/categories/earrings "
            className="w-full h-full flex items-center justify-center"
          >
            EARRINGS
          </Link>
        </div>
        <div className="sm:order-4 col-span-1 h-full bg-white text-black font-semibold">
          <Link
            href="/categories/rings "
            className="w-full h-full flex items-center justify-center"
          >
            RINGS
          </Link>
        </div>
      </div>
    </>
  );
}
