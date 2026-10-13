import cn from "classnames";
import { Button, Col, Row, Text } from "@dataesr/dsfr-plus";
import styles from "./styles.module.scss";
import { useState } from "react";

interface SchemaProperty {
  type?: string;
  description?: string;
  enum?: string[];
  properties?: Record<string, SchemaProperty>;
  items?: SchemaProperty;
  example?: string;
  $ref?: string;
  required?: string[];
}

interface SchemaDefinitions {
  [key: string]: SchemaProperty;
}

export interface SchemaDocumentationProps {
  schema: {
    type: string;
    required?: string[];
    properties: Record<string, SchemaProperty>;
    definitions?: SchemaDefinitions;
  };
}

type renderPropertyProps = {
  definitions: SchemaDefinitions;
  propertyName: string;
  propertySchema: SchemaProperty;
  isNested?: boolean;
  required?: boolean;
};

const RenderProperty = ({
  definitions,
  propertyName,
  propertySchema,
  isNested,
  required = false,
}: renderPropertyProps) => {
  if (propertySchema.$ref) {
    const refName = propertySchema.$ref.replace("#/definitions/", "");
    propertySchema = definitions[refName];
  }
  const {
    type,
    description,
    enum: enumeration,
    example,
    properties,
    items,
    required: requiredFields = [],
  } = propertySchema;
  const [extended, setExtended] = useState(false);

  const hasObjectProperties = type === "object" && properties;
  const itemDefinitions =
    (items?.$ref && definitions[items.$ref.replace("#/definitions/", "")]) ||
    items;
  const hasArrayProperties = type === "array" && itemDefinitions?.properties;

  return (
    <>
      <Col xs={12}>
        <Row verticalAlign="middle">
          <Text size="lg" className="fr-mb-0 fr-mr-1w" bold>
            {propertyName}
            {required && <span className="fr-text-default--warning"> *</span>}
          </Text>
          {(hasObjectProperties || hasArrayProperties) && (
            <Button
              size="sm"
              aria-label="Toggle extended description"
              aria-expanded={extended}
              iconPosition="right"
              icon={extended ? "arrow-up-s-line" : "arrow-down-s-line"}
              variant="text"
              onClick={() => setExtended((prev) => !prev)}
            />
          )}
        </Row>
        <Text size="sm" className="fr-text-mention--grey fr-mb-1w">
          {type} {type === "array" && `of ${itemDefinitions?.type}`}
          <br />
          {enumeration && `enum : ${enumeration.join(" | ")}`}
        </Text>
        {example && (
          <Text size="sm" className="fr-text-mention--grey fr-mb-1w">
            Example: {example}
          </Text>
        )}
        <Text size="md" className="fr-mb-0">
          {description}
        </Text>
        {extended && (
          <>
            {hasObjectProperties && (
              <Row
                gutters
                className={cn(styles.vr, {
                  "fr-m-3w": !isNested,
                  "fr-mt-1w": isNested,
                  "fr-mx-3w": isNested,
                })}
              >
                {Object.entries(properties)?.map(([subfield, subdoc], i) => {
                  return (
                    <RenderProperty
                      key={i}
                      required={requiredFields.includes(subfield)}
                      definitions={definitions}
                      propertyName={subfield}
                      propertySchema={subdoc}
                      isNested={i !== (Object.keys(properties).length || 0)}
                    />
                  );
                })}
              </Row>
            )}
            {hasArrayProperties && (
              <Row
                gutters
                className={cn(styles.vr, {
                  "fr-m-3w": !isNested,
                  "fr-mt-1w": isNested,
                  "fr-mx-3w": isNested,
                })}
              >
                {Object.entries(itemDefinitions.properties)?.map(
                  ([subfield, subdoc], i) => (
                    <RenderProperty
                      key={i}
                      required={itemDefinitions?.required?.includes(subfield)}
                      definitions={definitions}
                      propertyName={subfield}
                      propertySchema={subdoc}
                      isNested={
                        i !==
                        (Object.keys(itemDefinitions.properties)?.length || 0)
                      }
                    />
                  )
                )}
              </Row>
            )}
          </>
        )}
      </Col>
    </>
  );
};

const SchemaDocumentation = ({
  schema: { required, properties, definitions = {} },
}: SchemaDocumentationProps) => {
  return Object.entries(properties).map(([subfield, subdoc], i) => (
    <Row gutters className="fr-my-2w">
      <RenderProperty
        key={i}
        required={Array.isArray(required) ? required.includes(subfield) : false}
        definitions={definitions}
        propertyName={subfield}
        propertySchema={subdoc}
        isNested={i !== Object.entries(properties).length}
      />
    </Row>
  ))
};

export default SchemaDocumentation;
