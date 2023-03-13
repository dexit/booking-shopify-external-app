import { CollectionServiceGetAllReturn } from "@jamalsoueidan/pkg.backend-types";
import { HelperArray } from "@jamalsoueidan/pkg.frontend";
import { AlphaStack } from "@shopify/polaris";
import { memo, useMemo } from "react";
import CollectionItem from "./collection-item";

interface CollectionListProps {
  collections: CollectionServiceGetAllReturn[];
}

export default memo(({ collections }: CollectionListProps) => {
  const sortedCollections = useMemo(() => {
    if (!collections) return [];
    return [...collections].sort(HelperArray.sortByText((d) => d.title));
  }, [collections]);

  return (
    <AlphaStack gap="8">
      {sortedCollections.map((collection) => (
        <CollectionItem key={collection._id} collection={collection} />
      ))}
    </AlphaStack>
  );
});
