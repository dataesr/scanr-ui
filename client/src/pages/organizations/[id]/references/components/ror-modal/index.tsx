import {
  Modal,
  ModalTitle,
  ModalContent,
  Button,
  ModalFooter,
} from "@dataesr/dsfr-plus"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import PageSkeleton from "../../../../../../components/skeleton/page-skeleton"
import { envoiClient } from "../../formulaire.js"

export default function RorModal({ acronym, setShowRorModal, showRorModal }: { acronym: string, setShowRorModal: any, showRorModal: boolean }) {
  const [ror, setRor] = useState<string>()

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

  const getZones = () => {
    // z008: Type d'autorité ou type de notice
    let zones = 'z008_a:"Tb5"'
    if (ror) zones += `,z035_a_2:"${ror}",z035_2_2:"ROR",z035_C_2:"ROR"`
    // z810: Source consultée avec profit
    zones += ',z810_a:"ROR"'
    return zones
  }

  return (
    <Modal isOpen={showRorModal} hide={() => setShowRorModal(false)}>
      <ModalTitle>5 propositions de ROR pour "{acronym}":</ModalTitle>
      {isLoading && <PageSkeleton />}
      <ModalContent>
        <div className="fr-radio-group">
          {(data?.items?.slice(0, 5) ?? []).map((item) => (
            <>
              <input id={`ror-${item.id}`} name="ror" onChange={() => setRor(item.id)} type="radio" />
              <label className="fr-label" htmlFor={`ror-${item.id}`}>
                {item.names.find((name) => name.types.includes("ror_display")).value}
                {' ('}
                {item.locations[0].geonames_details.name}
                {', '}
                {item.locations[0].geonames_details.country_name}
                {') - '}
                <a href={item.id} target="_blank">{item.id}</a>
              </label>
            </>
          ))}
          {/* <input id="ror-other" name="ror" onChange={() => setRor(item.id)} type="radio" />
          <label className="fr-label" htmlFor="ror-other">
            Autre
            <input type="text" className="fr-input"/>
          </label> */}
        </div>
        {/* <a href={`https://ror.org/search?page=1&query=${acronym}`} target="_blank">Faire ma propre recherche sur ror.org</a> */}
      </ModalContent>
      <ModalFooter>
        <Button disabled={ror === undefined} onClick={() => { setShowRorModal(false); envoiClient('Nom de collectivité', acronym, '', '', 'Type de notice', 'Collectivité', '', '', getZones()) }}>Continuer</Button>
      </ModalFooter>
    </Modal>
  )
}