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
import { postHeadersTicketOffice } from "../../../../../../config/api"

const { VITE_ABES_CONTACT } = import.meta.env

export default function RorModal({ acronym, idref, setShowRorModal, showRorModal }: { acronym: string, idref: string, setShowRorModal: any, showRorModal: boolean }) {
  const [otherRor, setOtherRor] = useState<string>('')
  const [ror, setRor] = useState<string>('')

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

  const sendEmail = async () => {
    const email = VITE_ABES_CONTACT.replace(/4[@u/t_i]{0,5}2/gi, '')
    const payload = { message: `IdRef : ${idref} - ROR:  ${ror} // ${otherRor}`, subject: "[scanR] Alignement IdRef - ROR", name: email, to: email }
    const resp = await fetch(`/ticket/api/send-email`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        ...postHeadersTicketOffice,
      },
    })

    if (resp.status !== 200) throw new Error("error")
    return resp.json()
  }

  const getInputValidationClass = () => {
    if (otherRor !== '') {
      const rorRegex = /^https:\/\/ror\.org\/0\w{8}$/gm;
      return rorRegex.test(otherRor) ? 'fr-input-group--valid' : 'fr-input-group--error'
    }
    return ''
  }

  return (
    <Modal isOpen={showRorModal} hide={() => { setShowRorModal(false); setOtherRor(''); setRor(''); }}>
      <ModalTitle>Top 5 propositions de ROR pour "{acronym}"</ModalTitle>
      {isLoading && <PageSkeleton />}
      <ModalContent>
        <div className="fr-radio-group">
          {(data?.items?.slice(0, 5) ?? []).map((item) => (
            <>
              <input checked={ror === item.id} id={`ror-${item.id}`} name="ror" onChange={() => setRor(item.id)} type="radio" value={item.id} />
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
          <input checked={ror === "other"} id="ror-other" name="ror" onChange={() => setRor("other")} type="radio" value="other" />
          <label className="fr-label" htmlFor="ror-other">
            <span className="fr-mb-1w">Autre <i><a href={`https://ror.org/search?query=${acronym}`} target="_blank">(Rechercher sur ror.org)</a></i></span>
            <span className="fr-hint-text">Format attendu: https://ror.org/04vfs2w97</span>
            <div className={`fr-input-group ${getInputValidationClass()}`}>
              <input className="fr-input" type="text" value={otherRor} onChange={(e) => setOtherRor(e.target.value)} />
            </div>
          </label>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button disabled={(ror === '' && otherRor === '') || (ror === 'other' && getInputValidationClass() !== 'fr-input-group--valid')} onClick={() => { setShowRorModal(false); sendEmail() }}>Continuer</Button>
      </ModalFooter>
    </Modal>
  )
}