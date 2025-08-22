import { Button, Text } from "@dataesr/dsfr-plus";
import useUrl from "../../../hooks/useUrl";
import { useState } from "react";

export default function MinAuthorsParam() {
  const { currentMinAuthors, setMinAuthors } = useUrl()
  const [minAuthorsLocal, setMinAuthorsLocal] = useState(currentMinAuthors)


  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        Nombre de publications minimum pour un auteur
      </Text>
      <Text className="fr-mb-0 fr-text-mention--grey" size="xs">
        Une nombre de publications plus faible peut impacter les performances de la recherche. Réduisez si vous optenez peu d'auteurs ou aucun auteur.
      </Text>
      <Text className="fr-mb-3v fr-text-mention--grey" size="xs">
        Valeur conseillée : 5
      </Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input style={{ width: '250px' }} max={100} min={1} className="fr-input" type="number" value={minAuthorsLocal} onChange={(e) => setMinAuthorsLocal(parseInt(e.target.value))} />
        <Button onClick={() => setMinAuthors(minAuthorsLocal)}>Valider</Button>
      </div>
    </>
  )
}
