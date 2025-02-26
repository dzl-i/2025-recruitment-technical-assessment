interface CardProps {
  name: string;
  roomsAvailable: number;
  buildingPicture: string;
}

export const Card = ({ name, roomsAvailable, buildingPicture }: CardProps) => {
  return (
    <button className="flex flex-col justify-between rounded-xl p-3 bg-cover bg-center w-full sm:h-48 md:h-64 lg:h-80 h-96" style={{ backgroundImage: `url(/assets/${buildingPicture})` }}>
      <div className="flex flex-wrap items-center gap-2 justify-end bg-white px-3 py-[10px] rounded-xl text-xs font-semibold ml-auto">
        <span className="bg-green-600 rounded-full h-3 w-3" />
        <p>{roomsAvailable} rooms available</p>
      </div>
      <p className="bg-primary text-white w-full px-4 py-3 rounded-lg text-left font-semibold sm:text-sm">{name}</p>
    </button>
  );
};