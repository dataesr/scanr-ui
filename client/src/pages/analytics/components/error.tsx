import { Alert } from "@dataesr/dsfr-plus";

export default function Error({title, description}: {title?: string, description?: string}) {
  return (
    <Alert
      variant="error"
      title={title || "Error"}
      description={description || "Une erreur est survenue."}
      closeMode="disallow"
    />
  )
}