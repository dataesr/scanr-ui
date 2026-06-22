import ReactDOM from 'react-dom';
import cn, { Argument } from 'classnames';

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
export type Merge<A, B> = DistributiveOmit<A, keyof B> & React.PropsWithChildren<B>;

type ModalSizes = "sm" | "md" | "lg" | "xl";

type ModalProps = Merge<
  React.HTMLAttributes<HTMLDialogElement>,
  {
    size?: ModalSizes
    id: string
    className?: Argument
    title?: React.ReactNode
    footer?: React.ReactNode
  }
>

export default function Modal({
  children,
  size = "md",
  id: modalId,
  className,
  footer,
  title,
  ...props
}: ModalProps) {
  const colSizes = { sm: 4, lg: 8, md: 6, xl: 10 };
  const colSize = colSizes[size];
  const _classes = cn('fr-modal', className);

  const component = (
    <dialog aria-labelledby={`${modalId}-title`} className={_classes} id={modalId} role="dialog" {...props}>
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center closing-overlay">
          <div className={`fr-col-12 fr-col-md-${colSize}`}>
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button id={`${modalId}-close`} aria-controls={modalId} className="fr-btn--close fr-btn" type="button">
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content fr-mb-0">
                {title && (
                  <h1 className="fr-modal__title" id={`${modalId}-title`}>
                    {title}
                  </h1>
                )}
                {children}
              </div>
              {footer && <div className="fr-modal__footer">{footer}</div>}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
  return (
    ReactDOM.createPortal(
      component,
      document.body,
    )
  );
}
