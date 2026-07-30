"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import type { ThreadProduct } from "@/types";
import {
  THREAD_PALETTE,
  formatThreadPrice,
  getThreadColors,
  getThreadSizes,
} from "@/data/thread";
import { useThreadCart } from "@/components/thread/ThreadCartProvider";
import {
  threadCardStyle,
  threadPrimaryButtonClass,
  threadPrimaryButtonStyle,
} from "@/components/thread/ThreadUI";

const MAX_QUANTITY = 1000;

export function ThreadProductCard({ product }: { product: ThreadProduct }) {
  const { addItem } = useThreadCart();

  const colors = getThreadColors(product.colors);
  const sizes = getThreadSizes(product.sizes);
  const isPackage = product.isPackage === true;

  const [colorId, setColorId] = useState(colors[0]?.id ?? "");
  // Deliberately unset. A defaulted size is the kind of thing someone misses on
  // a 40-piece team order, and a wrong size costs a reprint.
  const [sizeId, setSizeId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const needsSize = !isPackage && !sizeId;

  const handleAdd = () => {
    if (needsSize) return;

    const color = colors.find((option) => option.id === colorId);
    const size = sizes.find((option) => option.id === sizeId);

    addItem({
      productId: product.id,
      productName: product.name,
      colorId: color?.id ?? "",
      colorName: color?.name ?? "—",
      sizeId: size?.id ?? "",
      sizeLabel: size?.label ?? (isPackage ? "Assorted" : "—"),
      quantity,
    });

    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  const adjust = (delta: number) =>
    setQuantity((current) =>
      Math.min(MAX_QUANTITY, Math.max(1, current + delta))
    );

  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg border"
      style={threadCardStyle}
    >
      <div
        className="relative aspect-square w-full"
        style={{ backgroundColor: THREAD_PALETTE.ink }}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3
          className="text-lg font-bold"
          style={{ color: THREAD_PALETTE.bone }}
        >
          {product.name}
        </h3>
        <p
          className="mt-1 text-sm"
          style={{ color: THREAD_PALETTE.champagne }}
        >
          {product.tagline}
        </p>

        <p
          className="mt-4 text-sm leading-relaxed"
          style={{ color: THREAD_PALETTE.muted }}
        >
          {product.description}
        </p>

        <p
          className="mt-4 text-sm font-semibold"
          style={{ color: THREAD_PALETTE.bone }}
        >
          {formatThreadPrice(product)}
        </p>

        {isPackage && product.includes && (
          <ul className="mt-4 space-y-2">
            {product.includes.map((line) => (
              <li
                key={line}
                className="flex gap-2 text-sm"
                style={{ color: THREAD_PALETTE.muted }}
              >
                <Check
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: THREAD_PALETTE.champagne }}
                />
                {line}
              </li>
            ))}
          </ul>
        )}

        {colors.length > 0 && (
          <fieldset className="mt-6">
            <legend
              className="mb-2 text-xs font-semibold uppercase tracking-wider"
              style={{ color: THREAD_PALETTE.muted }}
            >
              Color
            </legend>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => {
                const selected = color.id === colorId;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setColorId(color.id)}
                    title={color.name}
                    aria-label={color.name}
                    aria-pressed={selected}
                    className="h-8 w-8 rounded-full border-2 transition-transform duration-150 hover:scale-110"
                    style={{
                      backgroundColor: color.hex,
                      borderColor: selected
                        ? THREAD_PALETTE.bone
                        : THREAD_PALETTE.border,
                    }}
                  />
                );
              })}
            </div>
          </fieldset>
        )}

        {!isPackage && sizes.length > 0 && (
          <fieldset className="mt-5">
            <legend
              className="mb-2 text-xs font-semibold uppercase tracking-wider"
              style={{ color: THREAD_PALETTE.muted }}
            >
              Size
            </legend>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const selected = size.id === sizeId;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSizeId(size.id)}
                    aria-pressed={selected}
                    className="min-w-11 rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors duration-150"
                    style={{
                      borderColor: selected
                        ? THREAD_PALETTE.bone
                        : THREAD_PALETTE.border,
                      backgroundColor: selected
                        ? THREAD_PALETTE.bone
                        : "transparent",
                      color: selected
                        ? THREAD_PALETTE.ink
                        : THREAD_PALETTE.muted,
                    }}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <div className="mt-5">
          <span
            className="mb-2 block text-xs font-semibold uppercase tracking-wider"
            style={{ color: THREAD_PALETTE.muted }}
          >
            {isPackage ? "Estimated Pieces" : "Quantity"}
          </span>
          <div
            className="inline-flex items-center rounded-md border"
            style={{ borderColor: THREAD_PALETTE.border }}
          >
            <button
              type="button"
              onClick={() => adjust(-1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="px-3 py-2 disabled:opacity-30"
              style={{ color: THREAD_PALETTE.bone }}
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              min={1}
              max={MAX_QUANTITY}
              value={quantity}
              onChange={(event) => {
                const next = Number(event.target.value);
                setQuantity(
                  Number.isFinite(next)
                    ? Math.min(MAX_QUANTITY, Math.max(1, Math.round(next)))
                    : 1
                );
              }}
              aria-label={`Quantity of ${product.name}`}
              className="w-16 bg-transparent py-2 text-center font-semibold focus:outline-none"
              style={{ color: THREAD_PALETTE.bone }}
            />
            <button
              type="button"
              onClick={() => adjust(1)}
              disabled={quantity >= MAX_QUANTITY}
              aria-label="Increase quantity"
              className="px-3 py-2 disabled:opacity-30"
              style={{ color: THREAD_PALETTE.bone }}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex-1" />

        <button
          type="button"
          onClick={handleAdd}
          disabled={needsSize}
          className={`${threadPrimaryButtonClass} w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100`}
          style={threadPrimaryButtonStyle}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added to Request
            </>
          ) : (
            "Add to Request"
          )}
        </button>

        {needsSize && (
          <p
            className="mt-2 text-center text-xs"
            style={{ color: THREAD_PALETTE.muted }}
          >
            Choose a size to continue
          </p>
        )}

        <button
          type="button"
          onClick={() => setShowDetails((open) => !open)}
          aria-expanded={showDetails}
          className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-semibold"
          style={{ color: THREAD_PALETTE.champagne }}
        >
          Product details
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              showDetails ? "rotate-180" : ""
            }`}
          />
        </button>

        {showDetails && (
          <dl
            className="mt-4 space-y-3 border-t pt-4 text-sm"
            style={{ borderColor: THREAD_PALETTE.border }}
          >
            <div>
              <dt
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: THREAD_PALETTE.muted }}
              >
                Fabric
              </dt>
              <dd style={{ color: THREAD_PALETTE.bone }}>{product.fabric}</dd>
            </div>
            <div>
              <dt
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: THREAD_PALETTE.muted }}
              >
                Fit
              </dt>
              <dd style={{ color: THREAD_PALETTE.bone }}>{product.fit}</dd>
            </div>
            <div>
              <dt
                className="mb-1 text-xs font-semibold uppercase tracking-wider"
                style={{ color: THREAD_PALETTE.muted }}
              >
                Details
              </dt>
              <dd>
                <ul className="space-y-1.5">
                  {product.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-2"
                      style={{ color: THREAD_PALETTE.muted }}
                    >
                      <span style={{ color: THREAD_PALETTE.champagne }}>—</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
