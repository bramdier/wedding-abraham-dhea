import React from "react";
import { RevealWrapper } from "next-reveal";
import { useState } from "react";

function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // no-op
        }
    };

    return (
        <button
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300/60 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 active:scale-[.99] transition"
            aria-label="Copy account number"
            title="Copy account number"
        >
            <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <rect x="2" y="2" width="13" height="13" rx="2" />
            </svg>
            {copied ? "Copied!" : "Copy"}
        </button>
    );
}

function BankCard({
    bankName,
    accountName,
    accountNumber,
    logoAlt,
    logoSrc,
}: {
    bankName: "Mandiri" | "BCA" | string;
    accountName: string;
    accountNumber: string;
    logoAlt?: string;
    /** Put your logo path in /public/images/, e.g. /images/mandiri.png */
    logoSrc?: string;
}) {
    return (
        <div className="rounded-2xl border border-neutral-200/70 bg-white/80 backdrop-blur-sm p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-4">
                {/* Logo area (replace with your image later) */}
                <div className="h-12 w-12 shrink-0 rounded-xl bg-neutral-100 ring-1 ring-inset ring-neutral-200 flex items-center justify-center overflow-hidden">
                    {logoSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logoSrc} alt={logoAlt ?? `${bankName} logo`} className="h-full w-full object-contain" />
                    ) : (
                        <span className="text-xs text-neutral-500">{bankName}</span>
                    )}
                </div>

                <div className="min-w-0">
                    <p className="text-xs tracking-wide text-neutral-500 uppercase">{bankName}</p>
                    <p className="text-base md:text-lg font-semibold text-neutral-800">{accountName}</p>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 md:items-center md:flex-row md:justify-between">
                <div className="flex items-baseline gap-2">
                    <span className="text-sm text-neutral-500">No. Rekening</span>
                    <span className="font-mono text-lg md:text-xl tracking-wider text-neutral-900 select-all">
                        {accountNumber}
                    </span>
                </div>
                <CopyButton value={accountNumber} />
            </div>
        </div>
    );
}

export function MandiriCard(props: {
    accountName: string;
    accountNumber: string;
    logoSrc?: string;
}) {
    return (
        <BankCard
            bankName="Mandiri"
            logoAlt="Mandiri"
            {...props}
        />
    );
}

export function BCACard(props: {
    accountName: string;
    accountNumber: string;
    logoSrc?: string;
}) {
    return (
        <BankCard
            bankName="BCA"
            logoAlt="BCA"
            {...props}
        />
    );
}

function Transfer() {
    return (
        <section id="transfer" className="max-w-[28.125rem] md:max-w-3xl mx-auto px-4 py-10 md:py-14">
            <div className="text-center mb-6 md:mb-8">
                <p className="text-[0.75rem] tracking-wide text-neutral-500 uppercase">Gift & Transfer</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">Kirim Hadiah</h2>
                <p className="mt-2 text-sm md:text-base text-neutral-600">
                    Terima kasih atas doa dan kehadirannya. Jika berkenan, berikut informasi rekening.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <MandiriCard
                    accountName="Abraham Dier Spiez"
                    accountNumber="1234567890"
                // Put your logo later at /public/images/mandiri.png then uncomment:
                // logoSrc="/images/mandiri.png"
                />
                <BCACard
                    accountName="Dhea Octa Yossaline"
                    accountNumber="0987654321"
                // Put your logo later at /public/images/bca.png then uncomment:
                // logoSrc="/images/bca.png"
                />
            </div>

            {/* Optional note */}
            <p className="mt-6 text-center text-xs text-neutral-500">
                Mohon konfirmasi setelah transfer melalui form ucapan/RSVP.
            </p>
        </section>
    );
}

export default Transfer;
