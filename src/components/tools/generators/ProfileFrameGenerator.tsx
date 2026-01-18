'use client';
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DownloadButton } from '../shared/DownloadButton';
import { User, Upload } from 'lucide-react';
import html2canvas from 'html2canvas';

const frames = [
    { id: 'ring', name: 'Ring', color: '#3b82f6' },
    { id: 'double', name: 'Double Ring', color: '#8b5cf6' },
    { id: 'gradient', name: 'Gradient', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'badge', name: 'Badge', color: '#10b981' },
    { id: 'glow', name: 'Glow', color: '#f59e0b' },
];

export const ProfileFrameGenerator = () => {
    const [profileImage, setProfileImage] = useState<string>('');
    const [selectedFrame, setSelectedFrame] = useState(frames[0]);
    const [frameText, setFrameText] = useState('');
    const [frameColor, setFrameColor] = useState('#3b82f6');
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadFrame = async () => {
        if (!canvasRef.current) return;

        try {
            const canvas = await html2canvas(canvasRef.current, {
                width: 400,
                height: 400,
                scale: 2,
                backgroundColor: null,
            });

            const link = document.createElement('a');
            link.download = 'linkedin-profile-frame.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Download error:', err);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="p-6 space-y-6 h-fit">
                <div className="space-y-3">
                    <Label>Upload Profile Picture</Label>
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-900">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload image</p>
                    </label>
                </div>

                <div className="space-y-3">
                    <Label>Frame Style</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {frames.map((frame) => (
                            <button
                                key={frame.id}
                                onClick={() => setSelectedFrame(frame)}
                                className={`p-3 rounded-lg border-2 transition-all ${selectedFrame.id === frame.id
                                        ? 'border-primary shadow-md'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                    }`}
                            >
                                <div
                                    className="w-full h-12 rounded-full border-4 mb-2"
                                    style={{ borderColor: typeof frame.color === 'string' && frame.color.startsWith('#') ? frame.color : undefined }}
                                ></div>
                                <div className="text-xs font-medium">{frame.name}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <Label>Frame Text (Optional)</Label>
                    <Input
                        placeholder="e.g., Hiring, Open to Work"
                        value={frameText}
                        onChange={(e) => setFrameText(e.target.value)}
                        className="text-base"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Frame Color</Label>
                    <input
                        type="color"
                        value={frameColor}
                        onChange={(e) => setFrameColor(e.target.value)}
                        className="w-full h-10 rounded border cursor-pointer"
                    />
                </div>

                <DownloadButton
                    onClick={downloadFrame}
                    label="Download Frame"
                    disabled={!profileImage}
                    className="w-full h-12 text-lg font-semibold"
                />
            </Card>

            {/* Output Section */}
            <Card className="p-6 flex flex-col bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Preview (400×400)</h3>
                </div>

                <div className="flex-1 flex items-center justify-center bg-white dark:bg-slate-950 rounded-lg p-8">
                    {profileImage ? (
                        <div
                            ref={canvasRef}
                            className="relative"
                            style={{ width: '400px', height: '400px' }}
                        >
                            {/* Profile Image */}
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Frame */}
                            {selectedFrame.id === 'ring' && (
                                <div
                                    className="absolute inset-0 rounded-full border-8"
                                    style={{ borderColor: frameColor }}
                                ></div>
                            )}

                            {selectedFrame.id === 'double' && (
                                <>
                                    <div
                                        className="absolute inset-0 rounded-full border-6"
                                        style={{ borderColor: frameColor }}
                                    ></div>
                                    <div
                                        className="absolute inset-2 rounded-full border-4"
                                        style={{ borderColor: `${frameColor}80` }}
                                    ></div>
                                </>
                            )}

                            {selectedFrame.id === 'gradient' && (
                                <div
                                    className="absolute inset-0 rounded-full border-8"
                                    style={{
                                        borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
                                    }}
                                ></div>
                            )}

                            {selectedFrame.id === 'badge' && (
                                <div
                                    className="absolute inset-0 rounded-full border-8"
                                    style={{ borderColor: frameColor, boxShadow: `0 0 20px ${frameColor}80` }}
                                ></div>
                            )}

                            {selectedFrame.id === 'glow' && (
                                <div
                                    className="absolute inset-0 rounded-full border-6"
                                    style={{
                                        borderColor: frameColor,
                                        boxShadow: `0 0 30px ${frameColor}, inset 0 0 30px ${frameColor}40`,
                                    }}
                                ></div>
                            )}

                            {/* Frame Text */}
                            {frameText && (
                                <div
                                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white font-bold text-lg shadow-lg"
                                    style={{ backgroundColor: frameColor }}
                                >
                                    {frameText}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground opacity-50">
                            <User className="w-24 h-24 mx-auto mb-4" />
                            <p>Upload a profile picture to see preview</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
