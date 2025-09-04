// TODO: SearchBar is volontarly commented out, as it is not yet implemented but should be back in the future
import { useLocation } from 'react-router-dom';
import {
  Header as HeaderWrapper,
  Logo,
  Service,
  NavItem,
  Link,
  Nav,
  FastAccess,
  Button,
  useDSFRConfig,
  // Autocomplete,
  // AutocompleteItem,
  // useAutocompleteList,
  // useDSFRConfig,
} from '@dataesr/dsfr-plus';

import { createIntl } from 'react-intl';
import SwitchLanguage from '../../../components/switch-language';
import { isInProduction } from "../../../utils/helpers"
// import { autocompleteOrganizations } from '../api/organizations/autocomplete';
// import { LightOrganization } from '../types/organization';
// import getLangFieldValue from '../utils/lang';

const modules = import.meta.glob("./locales/*.json", { eager: true, import: "default" })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1]
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc
}, {})

const languages = [
  { shortName: "FR", fullName: "Français", key: "fr" },
  { shortName: "EN", fullName: "English", key: "en" },
  // TODO: Uncomment when translations are available
  // { shortName: 'DE', fullName: 'Deutsch', key: 'de' },
  // { shortName: 'ES', fullName: 'Español', key: 'es' },
]

export default function Header() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({ locale, messages: messages[locale] })
  const { pathname } = useLocation()

  // const authorsAutocompletedList = useAutocompleteList<LightOrganization>({
  //   async load({ filterText }) {
  //     if (!filterText) {
  //       return { items: [] };
  //     }
  //     const res = await autocompleteOrganizations({ query: filterText })
  //     return { items: res.data?.map((org) => org._source) };
  //   }
  // });

  return (
    <HeaderWrapper>
      <Logo splitCharacter="|" text="Ministère|chargé|de l'enseignement|supérieur|et de la recherche" />
      <Service name="scanR" tagline={intl.formatMessage({ id: "layout.header.tagline" })} />
      <FastAccess>
        <Button className="fr-btn fr-icon-theme-fill" aria-controls="fr-theme-modal" data-fr-opened="false">
          {intl.formatMessage({ id: "layout.header.switch-theme" })}
        </Button>
        <SwitchLanguage languages={languages} />
      </FastAccess>
      {/* <Autocomplete
        label="Rechercher des structures"
        items={authorsAutocompletedList.items}
        inputValue={authorsAutocompletedList.filterText}
        onInputChange={authorsAutocompletedList.setFilterText}
        loadingState={authorsAutocompletedList.loadingState}
        placeholder="Recherche rapide"
        menuTrigger='input'
        size="md"
      >
        {(item) => (
          <AutocompleteItem
            startContent={<span className="fr-mr-3v fr-icon--md fr-icon-building-line" />}
            description={item.address?.find((a) => a.main).city}
            key={item.id}
            href={`/organizations/${item.id}`}
          >
            <span className="fr-text--sm">
              {getLangFieldValue(locale)(item.label)}
            </span>
          </AutocompleteItem>
        )}
      </Autocomplete> */}
      <Nav>
        <Link current={pathname === "/"} href="/">
          {intl.formatMessage({ id: "layout.header.nav.home" })}
        </Link>
        <NavItem
          current={pathname.split("/").includes("search")}
          title={intl.formatMessage({ id: "layout.header.nav.search" })}
        >
          <Link current={pathname.split("/").includes("organizations")} href="/search/organizations">
            {intl.formatMessage({ id: "layout.header.nav.search.organizations" })}
          </Link>
          <Link current={pathname.split("/").includes("authors")} href="/search/authors">
            {intl.formatMessage({ id: "layout.header.nav.search.authors" })}
          </Link>
          <Link current={pathname.split("/").includes("projects")} href="/search/projects">
            {intl.formatMessage({ id: "layout.header.nav.search.projects" })}
          </Link>
          <Link current={pathname.split("/").includes("publications")} href="/search/publications">
            {intl.formatMessage({ id: "layout.header.nav.search.publications" })}
          </Link>
          <Link current={pathname.split("/").includes("patents")} href="/search/patents">
            {intl.formatMessage({ id: "layout.header.nav.search.patents" })}
          </Link>
        </NavItem>
        <NavItem
          current={pathname.split("/").includes("networks") || pathname.split("/").includes("trends")}
          title={intl.formatMessage({ id: "layout.header.nav.analyze" })}
        >
          <Link current={pathname.split("/").includes("networks")} href="/networks/get-started">
            {intl.formatMessage({ id: "layout.header.nav.analyze.networks" })}
          </Link>
          {!isInProduction() && (
            <Link current={pathname.split("/").includes("trends")} href="/trends">
              {intl.formatMessage({ id: "layout.header.nav.analyze.trends" })}
            </Link>
          )}
          {!isInProduction() && (
            <Link current={pathname.split("/").includes("analytics")} href="/analytics">
              {intl.formatMessage({ id: "layout.header.nav.analyze.analytics" })}
            </Link>
          )}
          <Link current={pathname.split("/").includes("studio")} href="/studio">
            {intl.formatMessage({ id: "layout.header.nav.analyze.studio" })}
          </Link>
        </NavItem>
      </Nav>
    </HeaderWrapper>
  )
}
