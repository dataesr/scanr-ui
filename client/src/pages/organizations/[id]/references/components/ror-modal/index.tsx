import {
  Modal,
  ModalTitle,
  ModalContent,
} from "@dataesr/dsfr-plus"
import { useQuery } from "@tanstack/react-query"

import PageSkeleton from "../../../../../../components/skeleton/page-skeleton"

export default function RorModal({ acronym, setShowRorModal, showRorModal }: { acronym: string, setShowRorModal: any, showRorModal: boolean }) {
  const url = `https://api.ror.org/v2/organizations?query.advanced=types:facility%20AND%20locations.geonames_details.country_code:FR%20AND%20names.value:${acronym}%20AND%20status:active`
  const { data, isLoading } = useQuery({
    queryKey: ["organizations", "ror", acronym],
    queryFn: async () => {
      if (!acronym) return {}
      const r = await fetch(url)
      return r.json()
    },
    throwOnError: true,
  })

  return (
    <Modal isOpen={showRorModal} hide={() => setShowRorModal(false)}>
      <ModalTitle>Propositions de ROR pour "{acronym}":</ModalTitle>
      {isLoading && <PageSkeleton />}
      <ModalContent>
        <div className="fr-radio-group">
          {(data?.items?.slice(0, 5) ?? []).map((item) => (
            <>
              <input type="radio" id={`ror-${item.id}`} name="ror" />
              <label className="fr-label" htmlFor="ror">
                {item.names.find((name) => name.types.includes("ror_display")).value}
                {' '}
                {item.locations[0].geonames_details.name}
                {', '}
                {item.locations[0].geonames_details.country_name}
                {') - '}
                <a href={item.id} target="_blank">{item.id}</a>
              </label>
            </>
          ))}
          <input type="radio" id="ror-other" name="ror" />
          <label className="fr-label" htmlFor="ror">
            Autre
            <input type="text" className="fr-input" />
          </label>
        </div>
        <a href={`https://ror.org/search?page=1&query=${acronym}`} target="_blank">Faire ma propre recherche sur ror.org</a>
      </ModalContent>
    </Modal>
  )
}