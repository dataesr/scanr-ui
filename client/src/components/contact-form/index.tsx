import {
  Button,
  ButtonGroup,
  Notice,
  TextArea,
  TextInput,
  Select,
  SelectOption,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { createIntl, RawIntlProvider } from "react-intl";

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

type FormState = {
  name?: string;
  email?: string;
  organization?: string;
  fonction?: string;
  message?: string;
  id?: string;
  type?: string;
  fromApplication?: string;
  objectId?: string;
  objectType?: string;
};

const validate = (form: FormState) => {
  const errors: Partial<FormState> = {};
  if (!form.name) {
    errors.name = "Ce champ est obligatoire";
  }
  if (!form.email) {
    errors.email = "Ce champ est obligatoire";
  }
  if (!form.message) {
    errors.message = "Ce champ est obligatoire";
  }
  return errors;
};

type Props = {
  objectId?: string;
  objectType?: string;
};

export default function ContactForm({ objectId, objectType }: Props) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const navigate = useNavigate();
  const location = useLocation();
  const [thanks, setThanks] = useState(false);
  const [api, setApi] = useState("contacts");
  const { isPending, isError, mutate } = useMutation({
    mutationFn: async (data: FormState) => {
      let payload: any = { ...data };

      if (data.organization || data.fonction) {
        payload.extra = {
          ...(data.organization && { organisation: data.organization }),
          ...(data.fonction && { fonction: data.fonction }),
        };

        delete payload.organization;
        delete payload.fonction;
      }

      if (api === "contacts") {
        payload = { ...payload, fromApplication: "scanr" };
      }

      if (api === "contribute") {
        payload = { ...payload, objectId, objectType };
      }

      const resp = await fetch(`/ticket/api/${api}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp.status !== 200) throw new Error("error");
      return resp.json();
    },

    onSuccess: () => {
      setThanks(true);
    },
    onError: (e) => {
      console.error("error", e);
    },
  });

  const { form, updateForm, errors } = useForm<FormState, FormState>(
    {},
    validate
  );

  const handleApiChange = (key: any) => {
    if (key === "contact") setApi("contacts");
    else if (key === "remove") setApi("remove-user");
    else if (key === "nameChange") setApi("update-user-data");
  };

  useEffect(() => {
    if (location.pathname.includes("bugs")) {
      setApi("contribute");
    }
  }, [location]);

  if (thanks) {
    return (
      <RawIntlProvider value={intl}>
        <Notice className="fr-mb-2w" type="success" closeMode="disallow">
          <span>{intl.formatMessage({ id: "contact.thanks.message" })}</span>
          <ButtonGroup className="fr-mt-5w" isInlineFrom="xs">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              {intl.formatMessage({ id: "contact.thanks.return" })}
            </Button>
          </ButtonGroup>
        </Notice>
      </RawIntlProvider>
    );
  }
  if (isError) {
    return (
      <RawIntlProvider value={intl}>
        <Notice className="fr-mb-2w" type="error" closeMode="disallow">
          <span>{intl.formatMessage({ id: "contact.error.message" })}</span>
          <ButtonGroup className="fr-mt-5w" isInlineFrom="xs">
            <Button
              onClick={() => {
                setThanks(false);
              }}
            >
              {intl.formatMessage({ id: "contact.error.retry" })}
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              {intl.formatMessage({ id: "contact.error.return" })}
            </Button>
          </ButtonGroup>
        </Notice>
      </RawIntlProvider>
    );
  }

  return (
    <RawIntlProvider value={intl}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(form);
        }}
      >
        {!location.pathname.includes("bugs") && (
          <Select
            isRequired
            onSelectionChange={(key) => handleApiChange(key)}
            label="Sélectionner le type de requête"
          >
            <SelectOption
              key="contact"
              description="Envoyer un message via le formulaire de contact"
            >
              Formulaire de contact
            </SelectOption>
            <SelectOption
              key="remove"
              description="Supprimer un profil utilisateur"
            >
              Suppression de profil
            </SelectOption>
            <SelectOption
              key="nameChange"
              description="Demander un changement de nom"
            >
              Changement de nom
            </SelectOption>
          </Select>
        )}

        <TextInput
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.name" })}
          required
          type="text"
          message={errors?.name}
          messageType={errors?.name ? "error" : undefined}
          disableAutoValidation
        />
        <TextInput
          value={form.email}
          onChange={(e) => updateForm({ email: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.email" })}
          required
          type="email"
          hint={intl.formatMessage({ id: "contact.form.email.hint" })}
          disableAutoValidation
          message={errors?.email}
          messageType={errors?.email ? "error" : undefined}
        />
        <TextInput
          value={form.organization}
          onChange={(e) => updateForm({ organization: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.organization" })}
          type="text"
          disableAutoValidation
        />
        <TextInput
          value={form.fonction}
          onChange={(e) => updateForm({ fonction: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.fonction" })}
          type="text"
          disableAutoValidation
        />
        <TextArea
          value={form.message}
          onChange={(e) => updateForm({ message: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.message" })}
          required
          rows={10}
          message={errors?.message}
          messageType={errors?.message ? "error" : undefined}
          disableAutoValidation
        />
        <Button disabled={isPending} type="submit">
          Envoyer le message
        </Button>
      </form>
    </RawIntlProvider>
  );
}
