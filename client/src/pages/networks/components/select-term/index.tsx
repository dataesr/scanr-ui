import { Container, SegmentedControl, SegmentedElement } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context"

export default function NetworkSelectTerm() {
  const {
    search: { n },
    options: { setSelectedTerm },
  } = useNetworkContext()

  if (n === 0) return "no terms"

  return (
    <Container>
      <SegmentedControl
        name="select-network"
        label="Sélection du réseau"
        legendInline
        onChangeValue={(value) => setSelectedTerm(Number(value))}
      >
        {/* {Array.from({ length: n }, (_, index: number) => (
          <SegmentedElement label={`Réseau ${index}`} value={String(index)} />
        ))} */}
        <SegmentedElement label={`Général`} value={String(0)} />
        <SegmentedElement label={`2017 - 2023`} value={String(1)} />
        <SegmentedElement label={`2020 - 2026`} value={String(2)} />
      </SegmentedControl>
    </Container>
  )
}
