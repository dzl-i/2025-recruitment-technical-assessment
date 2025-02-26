import { Card } from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { Bars3BottomRightIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import data from "../../public/assets/data.json";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <main className="mx-4">
        <div className="hidden sm:block my-4 space-y-4">
          <div className="flex gap-2 border border-gray-400 rounded-lg px-4 py-2 w-full">
            <MagnifyingGlassIcon width={24} height={24} className="text-gray-500" />
            <input placeholder="Search for a building..." className="w-full outline-none" />
          </div>
          
          <div className="flex justify-between w-full">
            <button className="flex gap-2 border-2 border-primary rounded-lg px-6 py-2 text-primary">
              <FunnelIcon width={24} height={24} />
              Filters
            </button>
            
            <button className="flex gap-2 border-2 border-primary rounded-lg px-6 py-2 text-primary">
              <Bars3BottomRightIcon width={24} height={24} />
              Sort
            </button>
          </div>
        </div>
        
        <div className="flex sm:hidden justify-between items-center my-4">
          <button className="flex gap-2 border-2 border-primary rounded-lg px-6 py-2 text-primary">
            <FunnelIcon width={24} height={24} />
            Filters
          </button>

          <div className="flex gap-2 border border-gray-400 rounded-lg px-4 py-2 w-1/2">
            <MagnifyingGlassIcon width={24} height={24} className="text-gray-500" />
            <input placeholder="Search for a building..." className="w-full outline-none" />
          </div>
          
          <button className="flex gap-2 border-2 border-primary rounded-lg px-6 py-2 text-primary">
            <Bars3BottomRightIcon width={24} height={24} />
            Sort
          </button>
        </div>

        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-5 gap-4 mb-4">
          {data.map((building, idx) => (
            <Card key={idx} name={building.name} roomsAvailable={building.rooms_available} buildingPicture={building.building_picture.split("/")[1]} />
          ))}
        </div>
      </main>
    </div>
  );
}
