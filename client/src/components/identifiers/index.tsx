import { ExternalIdsData } from "../../types/commons";
import CopyBadge from "../copy/copy-badge";

export default function Identifiers({ data: externalIds }: { data: ExternalIdsData[] }) {
  if (!externalIds?.length) return null;

  return (
    <div>
      <div className="fr-badge-group">
        {externalIds
          ?.filter((ext) => ext?.type !== 'scanr')
          .map((ext) => <CopyBadge key={ext.id} lowercase size="sm" copyText={ext.id?.replace("idref", "")}>{ext?.type ? `${ext?.type?.toUpperCase()} : ` : ''}{`${ext.id?.replace("idref", "")}`}</CopyBadge>)
        }
      </div>
    </div>
  );
}