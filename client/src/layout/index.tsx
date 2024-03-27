import { Outlet } from 'react-router-dom';
import { Container } from '@dataesr/dsfr-plus';
import Header from './components/header';
import MainFooter from './components/footer';
import Consent from './components/consent';
import ErrorBoundary from '../components/errors/error-boundary';
import APIDeprecationBanner from '../components/api-deprecation-banner';

export default function Layout() {
  return (
    <>
      <Consent />
      <Header />
      <APIDeprecationBanner />
      <Container as="main" role="main" fluid>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Container>
      <MainFooter />
    </>
  );
}
