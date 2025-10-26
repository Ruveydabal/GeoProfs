function BevestigingsVenster({ zichtbaar, tekst, onBevestig, onAnnuleer }) {
  if (!zichtbaar) return null; 
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <p className="mb-6 text-gray-800 font-medium">{tekst}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onAnnuleer}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-[15px] "
          >
            Nee
          </button>
          <button
            onClick={onBevestig}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-[15px] "
          >
            Ja
          </button>
        </div>
      </div>
    </div>
  );
}

export default BevestigingsVenster;