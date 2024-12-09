import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import NetworkGetStartedPage from "../get-started/template"
import useGetStarted from "../../hooks/useGetStarted"

export default function NetworkSelectSourceGetStarted() {
  const intl = useIntl()
  const { navigateToNextPage } = useGetStarted()

  return (
    <NetworkGetStartedPage title={"Quelle source voulez-vous utiliser ?"}>
      <Text>{"Choississez la source de documents à analyser."}</Text>
      <Listbox selectedKeys={["publications"]} selectionMode="single" onSelectionChange={() => navigateToNextPage()}>
        <ListboxItem
          key={"publications"}
          startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-article-line`} />}
          description="Corpus de publications scanR"
        >
          {intl.formatMessage({ id: "networks.select-source.publications" })}
        </ListboxItem>
      </Listbox>
    </NetworkGetStartedPage>
  )
}
