import { Button, Title } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";

export default function OngoingThesis({ value, label, count }: { value: string, label: string, count?: number }) {
  const intl = useIntl();

  const searchFilter = {
    "affiliations.id": { values: [{ value: value, label }], type: "terms" },
    "type": { values: [{ value: "ongoing_thesis", label: "Thèse en cours" }], type: "terms" }
  };
  const publicationsFilterUrl = `/search/publications?filters=${encodeURIComponent(JSON.stringify(searchFilter))}`;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <Title as="h2" className="page-section__title fr-text--lead fr-m-0 fr-icon-pen-nib-line">
          {intl.formatMessage({ id: "organizations.ongoing-thesis.count" }, { count })}
        </Title>
      </div>
      <Button
        as="a"
        variant="text"
        icon="arrow-right-s-line"
        iconPosition="right"
        href={publicationsFilterUrl}
      >
        {intl.formatMessage({ id: "organizations.ongoing-thesis.search" })}
      </Button>
    </div>
  )
}
