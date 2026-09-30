import { useEffect } from 'react';
import type { Transaction } from '../types/transaction';
import TransactionForm from './TransactionForm';

type TransactionModalProps = {
  editingTransaction: Transaction | null;
  onClose: () => void;
  onFinishEditing: () => void;
};

function TransactionModal({
  editingTransaction,
  onClose,
  onFinishEditing,
}: TransactionModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="transaction-modal"
      role="dialog"
      aria-modal="true"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="transaction-modal__content">
        <button
          type="button"
          className="transaction-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="transaction-modal__close-icon" aria-hidden="true" />
        </button>

        <TransactionForm
          editingTransaction={editingTransaction}
          onFinishEditing={() => {
            onFinishEditing();
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export default TransactionModal;
