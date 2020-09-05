import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

type Props = {
  children?: unknown;
  visible: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function SimpleModal({
  children,
  visible,
  onClose,
  title,
  onSubmit,
}: Props) {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={visible}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <span className="Dialog-title">{title}</span>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          {/* <Button onClick={onClose} color="primary">
            Cancel
          </Button> */}
          <Button
            color="primary"
            type="submit"
            className="theme-gradient text-white mx-4 px-4 py-2"
          >
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
