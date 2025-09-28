import React from "react";
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

export default CopyButton;