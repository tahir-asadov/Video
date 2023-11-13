'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

type TNotificationStatus = {
  message: string;
  status: 'success' | 'info' | 'warning' | 'error';
};

interface NotificationContextData {
  flash: ({ message, status }: TNotificationStatus) => void;
}

export const NotificationContext = React.createContext<NotificationContextData>(
  {
    flash: ({ message, status }: TNotificationStatus) => {
      console.log(message, status);
    },
  }
);

// Create a ThemeProvider component to provide the context value to child components
export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const flashmessage = ({ message, status }: TNotificationStatus) => {
    console.log(message, status);
    if (status == 'success') {
      toast.success(message);
    }
    if (status == 'info') {
      toast.info(message);
    }
    if (status == 'warning') {
      toast.warning(message);
    }
    if (status == 'error') {
      toast.error(message);
    }
  };
  return (
    <NotificationContext.Provider value={{ flash: flashmessage }}>
      {children}
      <ToastContainer autoClose={1000} draggable />
    </NotificationContext.Provider>
  );
};
