import ContentBlock from "@/components/content-block";
import PetButton from "@/components/pet-button";
import PetDialog from "@/features/dashboard/pet-dialog";
import SearchForm from "@/components/search-form";
import Branding from "@/features/dashboard/branding";
import PetDetails from "@/features/dashboard/pet-details";
import PetList from "@/features/dashboard/pet-list";
import Stats from "@/features/dashboard/stats";

export default async function DashboardPage() {
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />
        <Stats />
      </div>

      <div className="grid grid-rows-[45px_300px_500px] gap-4 md:h-[470px] md:grid-cols-3 md:grid-rows-[45px_1fr]">
        <div className="md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1">
          <SearchForm />
        </div>

        <div className="relative md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-2">
          <ContentBlock>
            <PetList />
            <PetDialog actionType="add">
              <div className="absolute bottom-4 right-4">
                <PetButton actionType="add" />
              </div>
            </PetDialog>
          </ContentBlock>
        </div>

        <div className="md:col-span-full md:col-start-2 md:row-span-full md:row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}