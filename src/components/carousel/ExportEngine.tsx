'use client';
import React from 'react';
import { Slide, DesignSettings, ASPECT_RATIOS, FONT_PAIRS } from '@/lib/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { toast } from 'sonner';

interface ExportEngineProps {
    slides: Slide[];
    settings: DesignSettings;
}

export class ExportEngine {
    private slides: Slide[];
    private settings: DesignSettings;
    private width: number;
    private height: number;

    constructor(slides: Slide[], settings: DesignSettings) {
        this.slides = slides;
        this.settings = settings;
        const dimensions = ASPECT_RATIOS[settings.aspectRatio];
        this.width = dimensions.width;
        this.height = dimensions.height;
    }

    private createSlideElement(slide: Slide, index: number): HTMLDivElement {
        const container = document.createElement('div');
        container.style.width = `${this.width}px`;
        container.style.height = `${this.height}px`;
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.backgroundColor = this.settings.backgroundColor;
        container.style.color = this.settings.textColor;
        container.style.fontFamily = FONT_PAIRS[this.settings.fontPair].body;
        container.style.padding = `${this.settings.padding * 3.5}px`;
        container.style.boxSizing = 'border-box';
        container.style.overflow = 'hidden';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.justifyContent = 'center';

        // Apply background
        if (this.settings.backgroundType === 'gradient' && this.settings.gradientSettings) {
            const { fromColor, toColor, angle } = this.settings.gradientSettings;
            container.style.backgroundImage = `linear-gradient(${angle}deg, ${fromColor}, ${toColor})`;
        } else if (this.settings.backgroundType === 'image' && this.settings.backgroundImage) {
            container.style.backgroundImage = `url(${this.settings.backgroundImage})`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
        }

        // Add theme decorations
        this.addThemeDecorations(container);

        // Add content
        const contentWrapper = document.createElement('div');
        contentWrapper.style.flex = '1';
        contentWrapper.style.display = 'flex';
        contentWrapper.style.flexDirection = 'column';
        contentWrapper.style.justifyContent = 'center';
        contentWrapper.style.position = 'relative';
        contentWrapper.style.zIndex = '10';

        if (slide.layout === 'center') {
            contentWrapper.style.alignItems = 'center';
            contentWrapper.style.textAlign = 'center';
        } else {
            contentWrapper.style.alignItems = 'flex-start';
            contentWrapper.style.textAlign = 'left';
        }

        // Add title
        if (slide.layout !== 'quote' && slide.title) {
            const title = document.createElement('h2');
            title.textContent = slide.title;
            title.style.fontFamily = FONT_PAIRS[this.settings.fontPair].heading;
            title.style.color = this.settings.accentColor;
            title.style.fontWeight = 'bold';
            title.style.lineHeight = '1.2';
            title.style.marginBottom = '1.5rem';

            const fontSize = this.settings.fontSize === 'small' ? 36 :
                this.settings.fontSize === 'large' ? 60 : 48;
            title.style.fontSize = `${fontSize}px`;

            contentWrapper.appendChild(title);
        }

        // Add content
        const content = document.createElement('p');
        content.textContent = slide.content;
        content.style.color = this.settings.textColor;
        content.style.opacity = '0.9';
        content.style.whiteSpace = 'pre-wrap';
        content.style.lineHeight = String(this.settings.lineHeight || 1.5);

        const bodyFontSize = this.settings.fontSize === 'small' ? 20 :
            this.settings.fontSize === 'large' ? 30 : 25;
        content.style.fontSize = `${bodyFontSize}px`;

        const fontWeight = this.settings.fontWeight === 'normal' ? 400 :
            this.settings.fontWeight === 'medium' ? 500 :
                this.settings.fontWeight === 'bold' ? 700 : 800;
        content.style.fontWeight = String(fontWeight);

        contentWrapper.appendChild(content);
        container.appendChild(contentWrapper);

        // Add footer
        const footer = document.createElement('div');
        footer.style.display = 'flex';
        footer.style.justifyContent = 'space-between';
        footer.style.alignItems = 'flex-end';
        footer.style.borderTop = '1px solid rgba(0,0,0,0.1)';
        footer.style.paddingTop = '1rem';
        footer.style.marginTop = '2rem';
        footer.style.opacity = '0.6';

        if (this.settings.showWatermark) {
            const author = document.createElement('div');
            const authorName = document.createElement('div');
            authorName.textContent = this.settings.authorName;
            authorName.style.fontWeight = 'bold';
            authorName.style.fontSize = '14px';
            authorName.style.textTransform = 'uppercase';

            const authorHandle = document.createElement('div');
            authorHandle.textContent = this.settings.authorHandle;
            authorHandle.style.fontSize = '12px';
            authorHandle.style.opacity = '0.7';

            author.appendChild(authorName);
            author.appendChild(authorHandle);
            footer.appendChild(author);
        }

        const pageNumber = document.createElement('div');
        pageNumber.textContent = `${index + 1} / ${this.slides.length}`;
        pageNumber.style.fontFamily = 'monospace';
        pageNumber.style.fontWeight = 'bold';
        pageNumber.style.fontSize = '14px';
        footer.appendChild(pageNumber);

        container.appendChild(footer);

        return container;
    }

    private addThemeDecorations(container: HTMLDivElement): void {
        if (this.settings.theme === 'modern') {
            const blob1 = document.createElement('div');
            blob1.style.position = 'absolute';
            blob1.style.top = '-20%';
            blob1.style.left = '-20%';
            blob1.style.width = '60%';
            blob1.style.height = '60%';
            blob1.style.borderRadius = '50%';
            blob1.style.backgroundColor = this.settings.accentColor;
            blob1.style.opacity = '0.1';
            blob1.style.filter = 'blur(60px)';
            container.appendChild(blob1);

            const blob2 = document.createElement('div');
            blob2.style.position = 'absolute';
            blob2.style.bottom = '-10%';
            blob2.style.right = '-10%';
            blob2.style.width = '40%';
            blob2.style.height = '40%';
            blob2.style.borderRadius = '50%';
            blob2.style.backgroundColor = this.settings.textColor;
            blob2.style.opacity = '0.1';
            blob2.style.filter = 'blur(40px)';
            container.appendChild(blob2);
        } else if (this.settings.theme === 'bold') {
            const shape1 = document.createElement('div');
            shape1.style.position = 'absolute';
            shape1.style.top = '0';
            shape1.style.right = '0';
            shape1.style.width = '160px';
            shape1.style.height = '160px';
            shape1.style.backgroundColor = this.settings.accentColor;
            shape1.style.opacity = '0.2';
            shape1.style.transform = 'rotate(12deg) translate(40px, -40px)';
            container.appendChild(shape1);
        } else if (this.settings.theme === 'minimal') {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.top = '0';
            line.style.left = '32px';
            line.style.right = '32px';
            line.style.height = '4px';
            line.style.backgroundColor = this.settings.accentColor;
            line.style.opacity = '0.2';
            container.appendChild(line);
        }
    }

    async exportPNGs(): Promise<void> {
        toast.info('Preparing high-resolution PNGs...');

        try {
            const zip = new JSZip();

            for (let i = 0; i < this.slides.length; i++) {
                const slideElement = this.createSlideElement(this.slides[i], i);
                document.body.appendChild(slideElement);

                // Wait for fonts and rendering
                await new Promise(resolve => setTimeout(resolve, 100));

                const canvas = await html2canvas(slideElement, {
                    width: this.width,
                    height: this.height,
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: this.settings.backgroundColor,
                    logging: false,
                });

                document.body.removeChild(slideElement);

                const blob = await new Promise<Blob | null>(resolve =>
                    canvas.toBlob(resolve, 'image/png', 1.0)
                );

                if (blob) {
                    zip.file(`slide-${i + 1}.png`, blob);
                }
            }

            const content = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(content);

            const link = document.createElement('a');
            link.href = url;
            link.download = `carousel-${this.settings.aspectRatio}-${Date.now()}.zip`;
            link.click();

            URL.revokeObjectURL(url);
            toast.success('PNGs exported successfully!');
        } catch (error) {
            console.error('PNG export failed:', error);
            toast.error('Export failed. Please try again.');
        }
    }

    async exportPDF(): Promise<void> {
        toast.info('Generating high-resolution PDF...');

        try {
            const pdf = new jsPDF({
                orientation: this.width > this.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [this.width, this.height],
                compress: true,
            });

            for (let i = 0; i < this.slides.length; i++) {
                const slideElement = this.createSlideElement(this.slides[i], i);
                document.body.appendChild(slideElement);

                // Wait for fonts and rendering
                await new Promise(resolve => setTimeout(resolve, 100));

                const canvas = await html2canvas(slideElement, {
                    width: this.width,
                    height: this.height,
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: this.settings.backgroundColor,
                    logging: false,
                });

                document.body.removeChild(slideElement);

                const imgData = canvas.toDataURL('image/jpeg', 0.95);

                if (i > 0) {
                    pdf.addPage([this.width, this.height]);
                }

                pdf.addImage(imgData, 'JPEG', 0, 0, this.width, this.height, undefined, 'FAST');
            }

            pdf.save(`carousel-${this.settings.aspectRatio}-${Date.now()}.pdf`);
            toast.success('PDF exported successfully!');
        } catch (error) {
            console.error('PDF export failed:', error);
            toast.error('Export failed. Please try again.');
        }
    }
}

// React hook for using the export engine
export function useExportEngine(slides: Slide[], settings: DesignSettings) {
    const exportPNGs = async () => {
        const engine = new ExportEngine(slides, settings);
        await engine.exportPNGs();
    };

    const exportPDF = async () => {
        const engine = new ExportEngine(slides, settings);
        await engine.exportPDF();
    };

    return { exportPNGs, exportPDF };
}
