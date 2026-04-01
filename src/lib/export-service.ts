import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';

export type ExportFormat = 'png' | 'jpg' | 'pdf';
export type ExportResolution = 1 | 2 | 4; // 1080p, 2160p (4k), 4320p (8k)

export class ExportService {
  /**
   * Captures a single slide as a data URL using modern html-to-image
   */
  static async captureSlide(slideIndex: number, scale: ExportResolution = 2): Promise<string> {
    const element = document.getElementById(`slide-canvas-${slideIndex}`);
    if (!element) throw new Error(`Slide element slide-canvas-${slideIndex} not found`);

    // html-to-image is much better at modern CSS (oklch, mask-image, etc)
    const dataUrl = await htmlToImage.toPng(element, {
      pixelRatio: scale,
      skipAutoScale: true,
      cacheBust: true,
      backgroundColor: '#ffffff', // Ensure clean background
      style: {
        borderRadius: '0', // Ensure corners are captured correctly if needed
        transform: 'none',
      }
    });

    return dataUrl;
  }

  /**
   * Downloads all slides as a ZIP of PNGs
   */
  static async downloadAsZip(slideCount: number, scale: ExportResolution = 2, onProgress?: (current: number, total: number) => void) {
    const zip = new JSZip();
    
    for (let i = 0; i < slideCount; i++) {
        if (onProgress) onProgress(i + 1, slideCount);
        const dataUrl = await this.captureSlide(i, scale);
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
        zip.file(`slide-${i + 1}.png`, base64Data, { base64: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `carousel-gem-export-${new Date().getTime()}.zip`;
    link.click();
  }

  /**
   * Downloads all slides as a multi-page PDF
   */
  static async downloadAsPdf(slideCount: number, scale: ExportResolution = 2, onProgress?: (current: number, total: number) => void) {
    const firstElement = document.getElementById('slide-canvas-0');
    if (!firstElement) return;
    
    const width = firstElement.offsetWidth;
    const height = firstElement.offsetHeight;
    const orientation = width > height ? 'l' : 'p';

    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'px',
      format: [width, height],
      hotfixes: ["px_scaling"]
    });

    for (let i = 0; i < slideCount; i++) {
        if (onProgress) onProgress(i + 1, slideCount);
        const dataUrl = await this.captureSlide(i, scale);
        
        if (i > 0) pdf.addPage([width, height], orientation);
        // Use high-quality PDF rendering
        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'SLOW');
    }

    pdf.save(`carousel-gem-${new Date().getTime()}.pdf`);
  }
}
