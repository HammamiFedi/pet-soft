import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-pattern lg:flex-row">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={519}
        height={472}
      />

      <div>
        <Logo />
        <h1 className="my-6 max-w-[500px] text-5xl text-black">
          Manage your{" "}
          <span className="font-extrabold text-white">pet daycare</span> with
          ease
        </h1>
        <p className="max-w-[600px] text-2xl font-medium text-white">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
