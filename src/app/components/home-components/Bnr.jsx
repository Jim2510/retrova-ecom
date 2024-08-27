export default function Bnr() {
  return (
    <>
      <div className="w-full h-[400px] bg-white border-b-2 border-black sm:grid-cols-4 grid grid-cols-2 justify-center items-center">
        <div className="border-r-2 border-black col-span-1 h-full bg-rose-400"></div>
        <div className="border-r-2 border-black col-span-1 h-full bg-primary"></div>
        <div className="border-r-2 border-black col-span-1 h-full bg-lime-200"></div>
        <div className="col-span-1 h-full bg-teal-400"></div>
      </div>
    </>
  );
}
