import {
  Modal,
  ModalTitle,
  ModalContent,
  Radio,
} from "@dataesr/dsfr-plus"
import { useQuery } from "@tanstack/react-query"

import PageSkeleton from "../../../../../../components/skeleton/page-skeleton"
import { useEffect } from "react"

export default function RorModal({ acronym, setShowRorModal, showRorModal } : { acronym: string, setShowRorModal: any, showRorModal: boolean }) {
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

  useEffect(() => console.log(showRorModal), [showRorModal])
  return (
    <Modal isOpen={showRorModal} hide={() => setShowRorModal(false)}>
      <ModalTitle>Ajoute ton ROR</ModalTitle>
      {isLoading && <PageSkeleton />}
      <ModalContent>
        <div>Réponses :</div>
        <div className="fr-radio-group">
          {(data?.items ?? []).map((item) => (
            <Radio id={`ror-${item.id}`} label={item.names[0].value} name={item.id} />
          ))}
        </div>
      </ModalContent>
    </Modal>
  )
}