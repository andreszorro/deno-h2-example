import { Response } from "oak/mod.ts";
import { Asset, formatAssetList } from "./format.ts";

export const pushResources = (response: Response, resources: Asset[]): void => {
  response.headers.set(
    "Link",
    formatAssetList(resources),
  );
};
