type PetDetailsNotesProps = {
  notes: string;
};

export default function PetDetailsNotes({ notes }: PetDetailsNotesProps) {
  return (
    <div className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {notes}
    </div>
  );
}
