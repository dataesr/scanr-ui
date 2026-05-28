import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Error404 from "./components/errors/error-404";
import PublicationIdParser from "./components/publication-id-parser";
import Layout from "./layout";
import Accessibility from "./pages/about/accessibility";
import ContactPage from "./pages/about/contact";
import FAQ from "./pages/about/faq";
import LegalNotices from "./pages/about/legal-notices";
import Resources from "./pages/about/resources";
import ResourcesInformations from "./pages/about/resources/[id]";
import Team from "./pages/about/team";
import Tutorial from "./pages/about/tutorial";
import Analytics from "./pages/analytics";
import Author from "./pages/authors/[id]";
import BugsReport from "./pages/bugs/[api]/[id]";
import ClinicalTrial from "./pages/clinical-trials/[id]";
import { DocsLayout } from "./pages/docs/layout";
import OrganizationsDocs from "./pages/docs/objects/organizations";
import Overview from "./pages/docs/objects/overview";
import PersonsDocs from "./pages/docs/objects/persons";
import ProjectsDocs from "./pages/docs/objects/projects";
import ScanrPublicationsDocs from "./pages/docs/objects/publications";
import Home from "./pages/home";
import Networks from "./pages/networks";
import NetworksGetStarted from "./pages/networks/components/get-started";
import NetworksIntegration from "./pages/networks/integration";
import Organization from "./pages/organizations/[id]";
import Patents from "./pages/patents/[id]";
import Project from "./pages/projects/[id]";
import Publication from "./pages/publications/[id]";
import Search from "./pages/search";
import HEPartners from "./pages/search/he";
import Studio from "./pages/studio";
import Suggest from "./pages/suggest";
import Trends from "./pages/trends";
import TrendsIntegration from "./pages/trends/integration";
// import Glossary from "./pages/about/glossary";

function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
  }, [pathname])
  return null
}

export default function Router() {
  return (
    <>
      <ScrollToTopOnLocationChange />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route path="objects/projects" element={<ProjectsDocs />} />
            <Route path="objects/publications" element={<ScanrPublicationsDocs />} />
            <Route path="objects/organizations" element={<OrganizationsDocs />} />
            <Route path="objects/persons" element={<PersonsDocs />} />
            <Route path="quick-start" element={<div>QuickStart</div>} />
            <Route path="overview/" element={<Overview />} />
          </Route>
          <Route path="/about/legal-notices" element={<LegalNotices />} />
          <Route path="/about/accessibility" element={<Accessibility />} />
          <Route path="/about/faq" element={<FAQ />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/resources" element={<Resources />} />
          <Route path="/about/contact" element={<ContactPage />} />
          <Route path="/about/tutorials" element={<Tutorial />} />
          <Route path="/about/resources/:id" element={<ResourcesInformations />} />
          {/* <Route path="/about/glossary" element={<Glossary />} /> */}
          <Route path="/bugs/:api/:id" element={<BugsReport />} />
          <Route path="/publications/:id" element={<Publication />} />
          <Route path="/publication/:id" element={<PublicationIdParser />} />
          <Route path="/authors/:id" element={<Author />} />
          <Route path="/person/:id" element={<Author />} />
          <Route path="/organizations/:id" element={<Organization />} />
					<Route path="/structures/:id" element={<Organization />} />
					<Route path="/structure/:id" element={<Organization />} />
					<Route path="/entite/:id" element={<Organization />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/patents/:id" element={<Patents />} />
          <Route path="/suggest/:id" element={<Suggest />} />
          <Route path="/clinical-trials/:id" element={<ClinicalTrial />} />
          <Route path="/search">
            <Route path="organizations" element={<Search />} />
            <Route path="authors" element={<Search />} />
            <Route path="projects" element={<Search />} />
            <Route path="publications" element={<Search />} />
            <Route path="patents" element={<Search />} />
            <Route path="clinical-trials" element={<Search />} />
          </Route>
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/networks" element={<Networks />} />
          <Route path="/networks/get-started" element={<NetworksGetStarted />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/trouver-des-partenaires-pour-horizon-europe/:id" element={<HEPartners />} />
          <Route path="*" element={<Error404 error={null} />} />
        </Route>
        <Route path="/networks/integration" element={<NetworksIntegration />} />
        <Route path="/trends/integration" element={<TrendsIntegration />} />
      </Routes>
    </>
  )
}
