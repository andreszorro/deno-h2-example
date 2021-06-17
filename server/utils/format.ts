export type Asset = {
  path: string;
  rel: "preload" | "prefetch" | "modulepreload";
  as: "style" | "script";
};

export const formatAssetList = (assets: Asset[]): string =>
  assets.map((asset: Asset): string =>
    Object.entries(asset).map(([key, value]): string =>
      key === "path" ? `<${value}>` : `${key}=${value}`
    ).join("; ")
  ).join(", ");
