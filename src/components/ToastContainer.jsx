import ToastComponent from "./ToastComponent";

function ToastContainer({ toasts, verwijderToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end">
      {toasts.map((t) => (
        <ToastComponent
          key={t.id}
          id={t.id}
          bericht={t.bericht}
          duur={t.duur}
          bijSluiten={verwijderToast}
        />
      ))}
    </div>
  );
}

export default ToastContainer;