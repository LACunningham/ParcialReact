// Modal genérico de confirmación, se usa tanto para eliminar como para editar
const ConfirmModal = ({
  isOpen,
  title = 'Confirmar acción',
  message = '¿Estás seguro de que deseas realizar esta acción?',
  confirmLabel = 'Confirmar',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    // Si hacen clic afuera del modal se cierra, pero si hacen clic adentro no se propaga al overlay
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`btn btn-${confirmVariant}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
