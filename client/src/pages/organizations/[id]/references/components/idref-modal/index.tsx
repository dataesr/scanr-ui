import {
  Modal,
  ModalTitle,
  ModalContent,
} from "@dataesr/dsfr-plus"
import { useQuery } from "@tanstack/react-query"

import PageSkeleton from "../../../../../../components/skeleton/page-skeleton"

export default function IdrefModal({ acronym, setShowIdrefModal, showIdrefModal }: { acronym: string, setShowIdrefModal: any, showIdrefModal: boolean }) {
  const url = `https://www.idref.fr/Sru/Solr?q=corpname_t:"${acronym}"&sort=esr_s asc&version=2.2&start=0&rows=30&indent=on&fl=id,ppn_z,recordtype_z,affcourt_z&wt=json`
  const { data, isLoading } = useQuery({
    queryKey: ["organizations", "idref", acronym],
    queryFn: async () => {
      if (!acronym) return {}
      const r = await fetch(url)
      return r.json()
    },
  })

  return (
    <Modal isOpen={showIdrefModal} hide={() => setShowIdrefModal(false)}>
      <ModalTitle>Propositions de IdRef pour "{acronym}":</ModalTitle>
      {isLoading ? <PageSkeleton /> : (
        <ModalContent>
          <div className="fr-radio-group">
            {(data?.response?.docs?.slice(0, 5) ?? []).map((item) => (
              <>
                <input type="radio" id={`idref-${item.id}`} name="idref" />
                <label className="fr-label" htmlFor="idref">
                  {item.affcourt_z}
                  {' - '}
                  <a href={`https://www.idref.fr/${item.ppn_z}`} target="_blank">{item.ppn_z}</a>
                </label>
              </>
            ))}
            <input type="radio" id="idref-other" name="idref" />
            <label className="fr-label" htmlFor="idref">
              Autre
              <input type="text" className="fr-input" />
            </label>
          </div>
          <a href="https://www.idref.fr/" target="_blank">Faire ma propre recherche sur idref.fr</a>
        </ModalContent>
      )}
    </Modal>
  )
}