import {
  Row,
  Col,
  Button,
  Tag,
  Text,
} from "@dataesr/dsfr-plus";
import useUrl from "../hooks/useUrl";
import { useId } from "react";

export default function CurrentFilters({ FilterModal }: { FilterModal: React.ComponentType<{ id: string }> }) {
  const id = useId();
  const {
    currentFilters,
    handleFilterChange,
    handleDeleteFilter,
    clearFilters,
    handleRangeFilterChange,
  } = useUrl();
  return (
    <Row className="fr-mb-1w">
      <FilterModal id={id} />
      <Col xs="12">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            <Text bold className="fr-m-0">
              Filtres spécifiques au corpus
            </Text>
          </div>
          <div>
            <Button
              icon="add-circle-line"
              iconPosition="left"
              as="button"
              aria-controls={id}
              data-fr-opened="false"
              variant="text"
              size="sm"
            >
              Ajouter des filtres
            </Button>
          </div>
          {Object.keys(currentFilters)?.length ? (
            <div>
              <Button
                icon="delete-bin-line"
                iconPosition="right"
                onClick={clearFilters}
                disabled={!!currentFilters?.length}
                variant="text"
                size="sm"
                color="pink-macaron"
              >
                Réinitialiser
              </Button>
            </div>
          ) : null}
        </div>
      </Col>
          <Col xs="12" className="fr-py-2w">
            <Row verticalAlign="middle">
              <div className="fr-tags-group">


      {Object.entries(currentFilters)
        ?.filter(([field, filter]) => field && filter?.values?.length)
        ?.map(([field, filter]) => (
          <>
              {filter.type === "range" && (
                <Tag
                  as="button"
                  className="fr-mb-1v custom-dismissible-tag"
                  onClick={() => handleRangeFilterChange({ field })}
                >
                  {filter.values?.[0]?.value} - {filter.values?.[1]?.value}
                </Tag>
              )}
              {filter.type === "bool" && (
                filter.values?.map(({ value, label }) => (
                  <>
                    <Tag
                      as="button"
                      key={value.toString()}
                      className="fr-mb-1v custom-dismissible-tag"
                      onClick={() => handleDeleteFilter({ field })}
                    >
                      {label || value?.toString()}
                    </Tag>
                  </>
                ))
              )}
              {filter.type === "terms" && (
                filter.values?.map(({ value, label }, i) => (
                  <>
                    <Tag
                      as="button"
                      key={value.toString()}
                      className="fr-mb-1v custom-dismissible-tag"
                      onClick={() => handleFilterChange({ field, value })}
                    >
                      {label || value?.toString()}
                    </Tag>
                    {i !== filter.values?.length - 1
                      ? `${filter?.operator === "and" ? " & " : " | "}`
                      : null}
                  </>
                ))
              )}
          </>
        ))}
              </div>
            </Row>
          </Col>

    </Row>
  );
}
