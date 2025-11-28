import ToastComponent from "./ToastComponent";

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end">
      {toasts.map((t) => (
        <ToastComponent
          key={t.id}
          id={t.id}
          message={t.message}
          duration={t.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}

export default ToastContainer;