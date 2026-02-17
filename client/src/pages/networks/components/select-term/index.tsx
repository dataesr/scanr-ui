import { Container, SegmentedControl, SegmentedElement } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context"

export default function NetworkSelectTerm() {
  const {
    search: { n },
    options: { selectedTerm, setSelectedTerm },
  } = useNetworkContext()

  if (n < 2) return null

  return (
    <Container>
      <SegmentedControl
        name="select-network"
        label="Sélection du réseau"
        onChangeValue={(value) => setSelectedTerm(Number(value))}
      >
        {/* {Array.from({ length: n }, (_, index: number) => (
          <SegmentedElement label={`Réseau ${index}`} value={String(index)} />
        ))} */}
        <SegmentedElement label={`Général`} value={String(0)} checked={selectedTerm === 0} />
        <SegmentedElement label={`2017 - 2023`} value={String(1)} checked={selectedTerm === 1} />
        <SegmentedElement label={`2020 - 2026`} value={String(2)} checked={selectedTerm === 2} />
      </SegmentedControl>
    </Container>
  )
}
