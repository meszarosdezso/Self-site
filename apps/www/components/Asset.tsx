import { SanityAsset } from "@sanity/image-url/lib/types/types";

export function Asset({
  asset,
  className,
  alt,
}: {
  asset: SanityAsset;
  className?: string;
  alt?: string;
}) {
  if (asset.extension === "webm") {
    return (
      <video loop muted autoPlay playsInline className={className}>
        <source src={asset.url} />
      </video>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={asset.url} alt={alt} />;
}
