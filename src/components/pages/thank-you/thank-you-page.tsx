import Image from "next/image";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ThankYouBackButton } from "./back-button";
import { hotelProfile } from "@/hotel-config";

const COPY = {
  title: "Anfrage erhalten",
  message:
    "Vielen Dank für Ihre Anfrage. Wir haben diese erhalten und melden uns innerhalb von 24 Stunden mit Ihrem persönlichen Angebot. Familie Jäger freut sich auf Sie!",
  showLogoOverlay: false,
};

export function ThankYouPage() {
  const copy = COPY;

  return (
    <section className="bg-primary flex h-screen items-center justify-center">
      <Dialog open={true}>
        <DialogContent
          className="w-full max-w-md overflow-hidden rounded-none border-none bg-white p-0 max-sm:max-w-[calc(100vw-2rem)]"
          showCloseButton={false}
          overlayClassName="bg-primary"
        >
          <div className="flex flex-col">
            {/* Header Image */}
            <div className="relative h-95 p-2.5">
              <div className="relative h-full w-full overflow-hidden rounded-none">
                <Image
                  src="/thumb.jpg"
                  alt={hotelProfile.hotelName}
                  fill
                  className="h-full w-full object-cover"
                />

                {copy.showLogoOverlay && (
                  <>
                    <div className="absolute inset-0 bg-black/40"></div>

                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 p-8">
                      <Image
                        width={147}
                        height={71}
                        unoptimized
                        alt=""
                        src={"/full-logo.png"}
                        className=""
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 p-6">
              <DialogTitle className="font-title text-primary text-[2rem] font-normal">
                {copy.title}
              </DialogTitle>

              <div className="text-foreground flex flex-col gap-2">
                <p className="text-base leading-normal">{copy.message}</p>
              </div>

              <ThankYouBackButton />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
