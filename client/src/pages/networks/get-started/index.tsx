import { createIntl, RawIntlProvider } from "react-intl"
import { Container, useDSFRConfig } from "@dataesr/dsfr-plus"
import { messages } from "../config/messages"
import { useState } from "react"
import Step0 from "./step-0"
import Step1 from "./step-1"
import Step2 from "./step-2"
import Step3 from "./step-3"
import { FormContext } from "./context"
import Step4 from "./step-4"

export default function NetworksGetStarted() {
  const { locale } = useDSFRConfig()
  const [step, setStep] = useState(0)
  const intl = createIntl({
    locale,
    messages: messages[locale],
  })

  const nextStep = () => setStep(step + 1)

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0 onNext={nextStep} />
      case 1:
        return <Step2 onNext={nextStep} />
      case 2:
        return <Step1 onNext={nextStep} />
      case 3:
        return <Step3 onNext={nextStep} />
      case 4:
        return <Step4 />
      default:
        return null
    }
  }

  return (
    <RawIntlProvider value={intl}>
      <FormContext>
        <Container style={{ height: "600px", display: "flex", alignItems: "center" }}>{renderStep()}</Container>
      </FormContext>
    </RawIntlProvider>
  )
}
