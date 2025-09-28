import React from "react";
import { RevealWrapper } from "next-reveal";
import { MandiriCard, BCACard } from "./BankCard";

function Bank() {
    return (
        <section id="bank-section">
            <div className="bg-[url('/images/anNur/bg.png')] rounded-t-[1.25rem] bg-center bg-no-repeat bg-cover p-12 flex flex-col items-center text-center gap-8 -mt-8 z-20 relative font-light">
                <RevealWrapper duration={1500} origin="top">
                    <div className="grid grid-cols-1 gap-4 md:gap-6">
                        <MandiriCard
                            accountName="Abraham Dier Spiez"
                            accountNumber="1270013716111"
                            logoSrc="/images/Bank/mandiri.png"
                        />
                        <BCACard
                            accountName="Dhea Octa Yossaline"
                            accountNumber="0760237779"
                            logoSrc="/images/Bank/bca.png"
                        />
                    </div>
                </RevealWrapper>
            </div>
        </section>
    );
}

export default Bank;
