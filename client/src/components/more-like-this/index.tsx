import { useQuery } from "@tanstack/react-query";
import { createIntl } from "react-intl";
import { Notice, Text, useDSFRConfig } from "@dataesr/dsfr-plus";
import SearchResultListSkeleton from "../skeleton/search-result-list-skeleton";
import { getMoreAuthorsLikeThis } from "../../api/authors/more-like-this";
import { getMoreOrganizationsLikeThis } from "../../api/organizations/more-like-this";
import { getMorePatentsLikeThis } from "../../api/patents/more-like-this";
import { getMoreProjectsLikeThis } from "../../api/projects/more-like-this";
import { getMorePublicationsLikeThis } from "../../api/publications/more-like-this";
import PublicationItem from "../../pages/search/components/publications/publication-item";
import OrganizationItem from "../../pages/search/components/organizations/organization-item";
import AuthorItem from "../../pages/search/components/authors/author-item";
import PatentItem from "../../pages/search/components/patents/patent-item/index.tsx";
import ProjectItem from "../../pages/search/components/projects/project-item";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

const API_MAPPER = {
  organizations: {
    item: OrganizationItem,
    fn: getMoreOrganizationsLikeThis
  },
  publications: {
    item: PublicationItem,
    fn: getMorePublicationsLikeThis
  },
  authors: {
    item: AuthorItem,
    fn: getMoreAuthorsLikeThis
  },
  patents: {
    item: PatentItem,
    fn: getMorePatentsLikeThis
  },
  projects: {
    item: ProjectItem,
    fn: getMoreProjectsLikeThis

  }
}

type API = keyof typeof API_MAPPER;


export default function MoreLikeThis({ id, api, filters = [] }: { id: string, api: API, filters?: any[] }) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const Component = API_MAPPER[api].item;
  const { data: moreLikeThis, isLoading, isError } = useQuery({
    queryKey: ["moreLike", api, id, filters],
    queryFn: () => API_MAPPER[api].fn(id, filters),
  });

  if (isError) return (
    <Notice closeMode="disallow" type="error">
      {intl.formatMessage({ id: "more-like-this.error" })}
    </Notice>
  );
  if (isLoading) return <SearchResultListSkeleton size={3} />;

  return (
    <>
      {moreLikeThis?.length ? (
        <div className="result-list">
          {moreLikeThis?.map((like) => (
            <Component data={like} key={like.id} />
          ))}
        </div>
      ) : <Text className="fr-card__detail fr-text--md">{intl.formatMessage({ id: "more-like-this.empty" })}</Text>}
    </>
  )
}
