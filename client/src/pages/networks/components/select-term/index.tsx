import { Button, Container, SegmentedControl, SegmentedElement } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context"
import { useExportQuadrants } from "../../hooks/useExportQuadrants"

export default function NetworkSelectTerm() {
  const {
    search: { n },
    options: { selectedTerm, setSelectedTerm },
  } = useNetworkContext()
  const { isExporting, exportFile } = useExportQuadrants()

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
      <Button
        className="fr-ml-2w"
        variant="text"
        name="export"
        onClick={async () => await exportFile("xlsx")}
        disabled={isExporting}
        icon="download-line"
        iconPosition="right"
      />
    </Container>
  )
}
