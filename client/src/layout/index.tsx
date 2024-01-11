import { Outlet } from 'react-router-dom';
import { Container, useDSFRConfig } from '@dataesr/dsfr-plus';
import Header from './Header';
import MainFooter from './Footer';
import { IntlProvider } from 'react-intl';
import Consent from './consent';

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

export default function Layout() {
  const { locale } = useDSFRConfig();
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Consent />
      <Header />
      <Container as="main" role="main" fluid>
        <Outlet />
      </Container>
      <MainFooter />
    </IntlProvider>
  );
}
