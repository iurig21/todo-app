import ReactDom from "react-dom";

function Modal({ children, closeModal }) {
  return ReactDom.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div
        onClick={closeModal}
        className="absolute inset-0 w-full h-full z-[49] cursor-pointer"
        aria-label="Close modal background"
      />
      <div
        className="relative bg-zinc-700 bg-opacity-80 backdrop-blur-md p-12 rounded-xl shadow-xl space-y-8 w-[600px] z-[50]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
