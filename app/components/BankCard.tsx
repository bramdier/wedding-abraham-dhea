import React from "react";
import { useState } from "react";
import CopyButton from "./CopyButton";

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

export default BankCard;