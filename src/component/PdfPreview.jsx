import { useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

function PdfPreview({ src }) {
  const wrapperRef = useRef(null);
  const pagesRef = useRef(null);
  const renderTokenRef = useRef(0);

  const [containerWidth, setContainerWidth] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!wrapperRef.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(Math.floor(entry.contentRect.width));
    });

    observer.observe(wrapperRef.current);
    setContainerWidth(wrapperRef.current.clientWidth);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pagesRef.current || !containerWidth) return undefined;

    let isCancelled = false;
    const currentToken = Date.now();
    let loadingTask = null;

    renderTokenRef.current = currentToken;

    async function renderPdf() {
      const pagesHost = pagesRef.current;
      if (!pagesHost) return;

      setIsLoading(true);
      setError("");
      pagesHost.innerHTML = "";

      try {
        loadingTask = getDocument(src);
        const pdf = await loadingTask.promise;

        if (isCancelled || renderTokenRef.current !== currentToken) return;

        setPageCount(pdf.numPages);

        const availableWidth = Math.max(280, Math.min(containerWidth - 48, 980));
        const deviceScale = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);

          if (isCancelled || renderTokenRef.current !== currentToken) return;

          const baseViewport = page.getViewport({ scale: 1 });
          const scale = availableWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });
          const renderViewport = page.getViewport({ scale: scale * deviceScale });

          const pageShell = document.createElement("section");
          pageShell.className = "pdf-page-shell";

          const pageLabel = document.createElement("span");
          pageLabel.className = "pdf-page-label";
          pageLabel.textContent = `Page ${pageNumber}`;

          const watermark = document.createElement("div");
          watermark.className = "pdf-page-watermark";
          watermark.setAttribute("aria-hidden", "true");
          watermark.innerHTML =
            "<span></span><span></span><span></span>";

          const canvas = document.createElement("canvas");
          canvas.className = "pdf-page-canvas";
          canvas.width = renderViewport.width;
          canvas.height = renderViewport.height;
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;

          const context = canvas.getContext("2d", { alpha: false });
          if (!context) {
            throw new Error("Canvas context is unavailable.");
          }

          pageShell.appendChild(pageLabel);
          pageShell.appendChild(canvas);
          pageShell.appendChild(watermark);
          pagesHost.appendChild(pageShell);

          await page.render({
            canvasContext: context,
            viewport: renderViewport,
          }).promise;
        }
      } catch {
        if (!isCancelled) {
          setError("Preview handbook belum bisa dimuat saat ini.");
        }
      } finally {
        if (!isCancelled && renderTokenRef.current === currentToken) {
          setIsLoading(false);
        }
      }
    }

    renderPdf();

    return () => {
      isCancelled = true;
      if (loadingTask?.destroy) {
        loadingTask.destroy();
      }
    };
  }, [containerWidth, src]);

  return (
    <div ref={wrapperRef} className="pdf-preview-stage">
      {isLoading && (
        <div className="pdf-preview-status">
          <div className="pdf-loader"></div>
          <p>Menyiapkan preview handbook...</p>
        </div>
      )}

      {error ? (
        <div className="pdf-preview-status pdf-preview-error">
          <p>{error}</p>
        </div>
      ) : (
        <div ref={pagesRef} className="pdf-pages-stack" />
      )}

      {!isLoading && !error && pageCount > 0 && (
        <div className="pdf-preview-meta">Rendered {pageCount} page(s)</div>
      )}
    </div>
  );
}

export default PdfPreview;
