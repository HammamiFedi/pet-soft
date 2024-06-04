type PetDetailsInfoProps = {
  ownerName: string;
  age: number;
};

export default function PetDetailsInfo({
  ownerName,
  age,
}: PetDetailsInfoProps) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{age}</p>
      </div>
    </div>
  );
}
