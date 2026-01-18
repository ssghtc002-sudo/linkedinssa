'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DownloadButton } from '../shared/DownloadButton';
import { QrCode } from 'lucide-react';
import QRCode from 'qrcode';

export const QRCodeGenerator = () => {
    const [url, setUrl] = useState('');
    const [size, setSize] = useState('medium');
    const [color, setColor] = useState('#000000');
    const [qrDataUrl, setQrDataUrl] = useState('');

    const sizeMap = {
        small: 200,
        medium: 300,
        large: 400
    };

    const generateQR = async () => {
        if (!url) return;

        try {
            const dataUrl = await QRCode.toDataURL(url, {
                width: sizeMap[size as keyof typeof sizeMap],
                color: {
                    dark: color,
                    light: '#ffffff'
                },
                margin: 2
            });
            setQrDataUrl(dataUrl);
        } catch (err) {
            console.error('QR generation error:', err);
        }
    };

    const downloadQR = () => {
        if (!qrDataUrl) return;

        const link = document.createElement('a');
        link.download = 'linkedin-qr-code.png';
        link.href = qrDataUrl;
        link.click();
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="p-6 space-y-6 h-fit">
                <div className="space-y-3">
                    <Label>LinkedIn Profile URL</Label>
                    <Input
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && generateQR()}
                        className="text-base"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Size</Label>
                        <Select value={size} onValueChange={setSize}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small (200px)</SelectItem>
                                <SelectItem value="medium">Medium (300px)</SelectItem>
                                <SelectItem value="large">Large (400px)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Color</Label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full h-10 rounded border cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <DownloadButton
                    onClick={generateQR}
                    label="Generate QR Code"
                    disabled={!url}
                    className="w-full h-12 text-lg font-semibold"
                />
            </Card>

            {/* Output Section */}
            <Card className="p-6 flex flex-col min-h-[400px] bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">QR Code Preview</h3>
                    {qrDataUrl && (
                        <DownloadButton
                            onClick={downloadQR}
                            label="Download PNG"
                            size="sm"
                        />
                    )}
                </div>

                <div className="flex-1 flex items-center justify-center bg-white dark:bg-slate-950 rounded-lg border p-8">
                    {qrDataUrl ? (
                        <img
                            src={qrDataUrl}
                            alt="QR Code"
                            className="max-w-full h-auto"
                        />
                    ) : (
                        <div className="text-center text-muted-foreground opacity-50">
                            <QrCode className="w-24 h-24 mx-auto mb-4" />
                            <p>Enter your LinkedIn URL and click Generate</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
