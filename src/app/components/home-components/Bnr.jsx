import Link from "next/link";

export default function Bnr() {
  return (
    <>
      <div className="w-full h-[450px] bg-white border-b-2 border-black sm:grid-cols-4 grid grid-cols-2 justify-center items-center">
        <div className="border-r-2 border-black col-span-1 h-full text-white font-semibold text-4xl bg-black flex justify-center items-center">
          <Link
            href="/categories/bracelets "
            className="w-full h-full flex items-center justify-center"
          >
            BRACELETS
          </Link>
        </div>

        <div className="border-r-2 border-black col-span-1 h-full text-black font-semibold text-4xl bg-white">
          <Link
            href="/categories/necklaces "
            className="w-full h-full flex items-center justify-center"
          >
            NECKLACES
          </Link>
        </div>
        <div className="border-r-2 border-black col-span-1 h-full bg-black text-white font-semibold text-4xl">
          <Link
            href="/categories/earrings "
            className="w-full h-full flex items-center justify-center"
          >
            EARRINGS
          </Link>
        </div>
        <div className="col-span-1 h-full bg-white text-black font-semibold text-4xl">
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
