import * as pdfjsLib from 'pdfjs-dist';

// Configure worker (Use CDN)
try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
} catch (e) {
    console.warn("Could not set PDF worker source", e);
}

export const extractTextFromUrl = async (fileUrl, fileType) => {
    try {
        if (!fileType) return { text: "" };
        const type = fileType.toLowerCase();

        if (type.includes('pdf')) {
            return await extractTextFromPdf(fileUrl);
        } else if (type.includes('txt') || type.includes('md') || type.includes('json') || type.includes('csv')) {
            const txt = await fetchText(fileUrl);
            return { text: txt };
        }
        return { text: "" };
    } catch (error) {
        console.error("Error extracting text:", error);
        return { text: "", error: error.message };
    }
};

const fetchText = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch text file");
    return await response.text();
};

const extractTextFromPdf = async (url) => {
    try {
        console.log("Downloading PDF...", url);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch PDF data: ${response.statusText}`);
        const arrayBuffer = await response.arrayBuffer();

        console.log("Parsing PDF structure...");
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        let fullText = "";

        const numPages = pdf.numPages;
        console.log(`PDF Loaded. Pages: ${numPages}`);
        const processPages = Math.min(numPages, 15); // limit to 15 pages for text

        for (let i = 1; i <= processPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `\n--- Page ${i} ---\n${pageText}`;
        }

        // Detect if Scanned
        // If we have 5 pages but only 100 chars, it's definitely a scan.
        // Threshold: Average 50 chars per page is extremely low for text.
        const charCount = fullText.length;
        const isScanned = charCount < (processPages * 50);

        return { text: fullText, pdfDoc: pdf, isScanned };

    } catch (error) {
        console.error("PDF Parse Error:", error);
        return { text: "", error: error.message };
    }
};

// Convert PDF pages to Base64 Images for Vision AI
export const pdfToImagePayload = async (pdfDoc) => {
    try {
        const images = [];
        const numPages = Math.min(pdfDoc.numPages, 5); // Limit to 5 pages for Vision

        for (let i = 1; i <= numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 }); // Good resolution

            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext('2d');

            // Render logic
            await page.render({ canvasContext: context, viewport: viewport }).promise;

            // Convert to base64
            const base64 = canvas.toDataURL('image/jpeg', 0.8);
            images.push(base64);
        }
        return images;
    } catch (e) {
        console.error("PDF to Image conversion failed", e);
        return [];
    }
}
