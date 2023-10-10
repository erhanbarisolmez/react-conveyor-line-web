import MuiAlert from '@mui/material/Alert'; // Import Material-UI's Alert component
import React from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  children?: React.ReactNode;
}

export default function CustomAlert(props: AlertProps) {
  const { type, message, severity } = props;
  return (
    <div className={`alert alert-${type}`}>
      <MuiAlert  severity={severity}>{message}</MuiAlert>
    </div>
  );
}
