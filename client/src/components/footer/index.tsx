import React from "react";
import { Container, Link } from "@dataesr/dsfr-plus";
import { IntlProvider } from "react-intl";

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

export function FooterTop({ children }: { children?: React.ReactNode }) {
  return <div className="fr-footer__top">{children}</div>;
}

export function Footer({
  children,
  fluid = false,
}: {
  children?: React.ReactNode;
  fluid?: boolean;
}) {
  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <footer className="fr-footer fr-mt-3w" role="contentinfo" id="footer">
        <Container fluid={fluid}>{children}</Container>
      </footer>
    </IntlProvider>
  );
}

export function FooterBottom({
  children,
  copy,
}: {
  children?: React.ReactNode;
  copy?: React.ReactNode;
}) {
  const childs = React.Children.toArray(children);
  return (
    <div className="fr-container fr-footer__bottom">
      <ul className="fr-footer__bottom-list">
        {childs.map((child, i) => (
          <li key={i} className="fr-footer__bottom-item">
            {child}
          </li>
        ))}
      </ul>
      {copy ? (
        <div className="fr-footer__bottom-copy">
          <p>{copy}</p>
        </div>
      ) : null}
    </div>
  );
}

export function FooterBody({
  children,
  description,
}: {
  children?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const links = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Link
  );

  return (
    <div className="fr-container fr-footer__body">
      <div className="fr-footer__brand fr-enlarge-link">
        <p className="fr-logo">
          Ministère
          <br />
          chargé
          <br />
          de l'enseignement
          <br />
          supérieur
          <br />
          et de la recherche
        </p>
        <a title="Retour à l'accueil du site" href="/" className="fr-footer__brand-link">
          <svg
            aria-hidden="true"
            viewBox="0 0 1167.77 752.85"
            width="100%"
          >
            <use
              className="fr-text-black-white--grey"
              href="logos/sies_logo_signature.svg#sies-logo-text"
            />
            <use
              href="logos/sies_logo_signature.svg#sies-logo-artwork"
            />
          </svg>
        </a>
      </div>
      <div className="fr-footer__content">
        {description ? (
          <p className="fr-footer__content-desc">{description}</p>
        ) : null}
        {links.length ? (
          <ul className="fr-footer__content-list">
            {links.map((link, i) => (
              <li key={i} className="fr-footer__content-item">
                {link}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
