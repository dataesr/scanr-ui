import {
  SideMenu,
  SideMenuItem,
  Link,
  Container,
  Row,
  Col,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { createIntl } from "react-intl";
import { Outlet, useLocation } from "react-router-dom";

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

export default function DocsLayout() {
  const { pathname } = useLocation();
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });

  if (!pathname) return null;

  const is = (str: string): boolean => pathname?.startsWith(`/docs/${str}`);
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <SideMenu title="" sticky fullHeight className="padded-sidemenu">
            <Link current={is("overview")} href="/docs/overview">
              {intl.formatMessage({
                id: "layout.docs.sidemenu.overview",
              })}
            </Link>
            {/* <Link current={is("quick-start")} href="/docs/quick-start">
              Quick start
            </Link> */}
            <SideMenuItem
              defaultExpanded={is("objects")}
              title={intl.formatMessage({
                id: "layout.docs.sidemenu.apimodel",
              })}
            >
              <Link
                current={is("objects/publications")}
                href="/docs/objects/publications"
              >
                {intl.formatMessage({
                  id: "layout.docs.sidemenu.publications",
                })}
              </Link>
              <Link
                current={is("objects/projects")}
                href="/docs/objects/projects"
              >
                {intl.formatMessage({
                  id: "layout.docs.sidemenu.projects",
                })}
              </Link>
              <Link
                current={is("objects/organizations")}
                href="/docs/objects/organizations"
              >
                {intl.formatMessage({
                  id: "layout.docs.sidemenu.organizations",
                })}
              </Link>
              <Link
                current={is("objects/persons")}
                href="/docs/objects/persons"
              >
                {intl.formatMessage({
                  id: "layout.docs.sidemenu.persons",
                })}
              </Link>
            </SideMenuItem>
          </SideMenu>
        </Col>
        <Col xs={12} md={8} className="fr-pt-6w">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
