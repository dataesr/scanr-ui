import cn from "classnames";
import {
  Col,
  Container,
  Link,
  Row,
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import {
  Footer,
  FooterBody,
  FooterBottom,
  FooterTop,
} from "../../../components/footer";
import { RawIntlProvider, createIntl } from "react-intl";
import SwitchTheme from "../switch-theme";
import useConsent from "../../../hooks/useConsent";
import styles from "./styles.module.scss";

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

const version = import.meta.env.VITE_VERSION;

export default function MainFooter() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const { dialogId } = useConsent();
  return (
    <RawIntlProvider value={intl}>
      <Footer fluid={true}>
        <FooterTop>
          <Container>
            <Row gutters verticalAlign="middle">
              <Col xs={12} lg={4}>
                <Row horizontalAlign="left">
                  <div className={styles["text-left"]}>
                    <Title
                      as="h3"
                      className={cn("fr-footer__top-cat", styles["text-left"])}
                    >
                      {intl.formatMessage({
                        id: "layout.footer.top.about.help",
                      })}
                    </Title>
                    <ul className="fr-footer__top-list">
                      <li>
                        <Link className="fr-footer__top-link" href="/about/FAQ">
                          {intl.formatMessage({
                            id: "layout.footer.top.about.faq",
                          })}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="/about/team"
                        >
                          {intl.formatMessage({
                            id: "layout.footer.top.about.team",
                          })}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="/about/resources"
                        >
                          {intl.formatMessage({
                            id: "layout.footer.top.about.resources",
                          })}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="/docs/overview"
                        >
                          {intl.formatMessage({
                            id: "layout.footer.top.about.docs",
                          })}
                        </Link>
                      </li>
                      {/* <li>
                      <Link
                        className="fr-footer__top-link"
                        href="/about/tutorial"
                      >
                        {intl.formatMessage({
                          id: "layout.footer.top.about.tutorial",
                        })}
                      </Link>
                    </li> */}
                      {/* <li>
                        <Link
                          className="fr-footer__top-link"
                          href="/about/glossary"
                        >
                          {intl.formatMessage({
                            id: "layout.footer.top.about.glossary",
                          })}
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="/about/contact"
                        >
                          {intl.formatMessage({
                            id: "layout.footer.top.about.contact",
                          })}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Row>
              </Col>
              <Col xs={12} lg={4}>
                <Row horizontalAlign="center">
                  <div className={styles["text-center"]}>
                    <Title
                      as="h3"
                      className={cn(
                        "fr-footer__top-cat",
                        styles["text-center"]
                      )}
                    >
                      {intl.formatMessage({
                        id: "layout.footer.top.about.follow",
                      })}
                    </Title>
                    <ul className="fr-footer__top-list">
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://twitter.com/dataESR"
                          target="_blank"
                          icon="twitter-x-fill"
                          iconPosition="left"
                        >
                          X
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://www.linkedin.com/company/enseignementsup-recherche/"
                          target="_blank"
                          icon="linkedin-box-fill"
                          iconPosition="left"
                        >
                          Linkedin
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://www.facebook.com/enseignementsup.recherche"
                          target="_blank"
                          iconPosition="left"
                          icon="facebook-circle-fill"
                        >
                          Facebook
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Row>
              </Col>
              <Col xs={12} lg={4}>
                <Row horizontalAlign="right">
                  <div className={styles["text-right"]}>
                    <Title
                      as="h3"
                      className={cn("fr-footer__top-cat", styles["text-right"])}
                    >
                      {intl.formatMessage({
                        id: "layout.footer.top.about.also",
                      })}
                    </Title>
                    <ul className="fr-footer__top-list">
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://github.com/dataesr"
                          target="_blank"
                        >
                          GitHub
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://curiexplore.enseignementsup-recherche.gouv.fr/"
                          target="_blank"
                        >
                          CurieXplore
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://works-magnet.esr.gouv.fr/"
                          target="_blank"
                        >
                          Works Magnet
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://barometredelascienceouverte.esr.gouv.fr/"
                          target="_blank"
                        >
                          Baromètre de la Science Ouverte
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://data.esr.gouv.fr/FR/"
                          target="_blank"
                        >
                          #dataESR
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="fr-footer__top-link"
                          href="https://data.enseignementsup-recherche.gouv.fr/pages/home/"
                          target="_blank"
                        >
                          Plateforme Open Data
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </FooterTop>
        <FooterBody description={intl.formatMessage({ id: "layout.footer.tagline" })}>
          <Link
            className="fr-footer__content-link"
            target="_blank"
            rel="noreferrer noopener external"
            title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
            href="https://legifrance.gouv.fr"
          >
            legifrance.gouv.fr
          </Link>
          <Link
            className="fr-footer__content-link"
            target="_blank"
            rel="noreferrer noopener external"
            title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
            href="https://gouvernement.fr"
          >
            gouvernement.fr
          </Link>
          <Link
            className="fr-footer__content-link"
            target="_blank"
            rel="noreferrer noopener external"
            title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
            href="https://service-public.fr"
          >
            service-public.fr
          </Link>
          <Link
            className="fr-footer__content-link"
            target="_blank"
            rel="noreferrer noopener external"
            title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
            href="https://data.gouv.fr"
          >
            data.gouv.fr
          </Link>
        </FooterBody>
        <FooterBottom>
          {/* <Link className="fr-footer__bottom-link" href="#">
            {intl.formatMessage({
              id: "layout.footer.legal-notice",
            })}
          </Link>
          <Link className="fr-footer__bottom-link" href="#">
            {intl.formatMessage({
              id: "layout.footer.personal-data",
            })}
          </Link> */}
          <Link className="fr-footer__bottom-link" href="/about/accessibility">
            {intl.formatMessage({
              id: "layout.footer.accessibility",
            })}
          </Link>
          <Link className="fr-footer__bottom-link" href="/about/legal-notices">
            {intl.formatMessage({
              id: "layout.footer.legals",
            })}
          </Link>
          <button
            className="fr-footer__bottom-link"
            data-fr-opened="false"
            aria-controls={dialogId}
          >
            {intl.formatMessage({
              id: "layout.footer.cookies",
            })}
          </button>
          <button
            className="fr-footer__bottom-link fr-icon-theme-fill fr-btn--icon-left"
            aria-controls="fr-theme-modal"
            data-fr-opened="false"
          >
            {intl.formatMessage({
              id: "layout.footer.switch-theme",
            })}
          </button>
          <Link
            target="_blank"
            rel="noreferer noopenner"
            className="fr-footer__bottom-link"
            href={`https://github.com/dataesr/scanr-ui/releases/tag/v${version}`}
          >
            {intl.formatMessage({ id: "layout.footer.version" }, { version })}
          </Link>
        </FooterBottom>
        <SwitchTheme />
      </Footer>
    </RawIntlProvider>
  );
}
