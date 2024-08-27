export default function Bnr() {
  return (
    <>
      <div className="w-full h-[450px] bg-white border-b-2 border-black sm:grid-cols-4 grid grid-cols-2 justify-center items-center">
        <div className="border-r-2 border-black col-span-1 h-full bg-black"></div>
        <div className="border-r-2 border-black col-span-1 h-full bg-white order-2 sm:order-3"></div>
        <div className="border-r-2 border-black col-span-1 h-full bg-black order-3 sm:order-2"></div>
        <div className="col-span-1 h-full bg-white"></div>
      </div>
    </>
  );
}
