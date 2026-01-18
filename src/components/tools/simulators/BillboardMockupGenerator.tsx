'use client';
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { DownloadButton } from '../shared/DownloadButton';
import { Upload, Image as ImageIcon, Type as TypeIcon, Palette } from 'lucide-react';
import html2canvas from 'html2canvas';

// In a real app, these would be high-res professionally masked images.
// We are using reliable Unsplash images as backgrounds and CSS transforms for the mockup placement.
const scenes = [
    {
        id: 'city',
        name: 'Times Square',
        bg: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',
        perspective: 'rotateY(-15deg) rotateX(5deg) scale(0.9)',
        containerStyle: 'top-[15%] left-[20%] w-[60%] shadow-2xl skew-x-1',
        frame: 'border-[8px] border-zinc-900 bg-zinc-900 rounded-sm',
        overlay: 'bg-gradient-to-tr from-blue-900/10 to-transparent mix-blend-overlay'
    },
    {
        id: 'subway',
        name: 'Subway',
        bg: 'https://images.unsplash.com/photo-1518606326460-64ecfcd81033?auto=format&fit=crop&w=1200&q=80',
        perspective: 'rotateY(25deg) rotateX(2deg) scale(0.9)',
        containerStyle: 'top-[22%] left-[10%] w-[50%] shadow-xl',
        frame: 'border-0 border-neutral-200 bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)]',
        overlay: 'bg-gradient-to-br from-black/40 to-transparent mix-blend-multiply'
    },
    {
        id: 'minimal',
        name: 'Art Gallery',
        bg: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
        perspective: 'rotateY(0deg) scale(0.85)',
        containerStyle: 'top-[15%] left-[20%] w-[60%] shadow-2xl',
        frame: 'border-[12px] border-white shadow-xl',
        overlay: 'bg-gradient-to-b from-white/10 to-transparent'
    },
    {
        id: 'neon',
        name: 'Cyberpunk',
        bg: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80',
        perspective: 'rotateX(10deg) scale(0.9)',
        containerStyle: 'top-[20%] left-[20%] w-[60%] shadow-[0_0_50px_rgba(59,130,246,0.5)]',
        frame: 'border-4 border-blue-500/50 bg-black box-shadow-[0_0_20px_rgba(0,255,255,0.5)]',
        overlay: 'bg-gradient-to-t from-purple-500/20 to-blue-500/20 mix-blend-color-dodge'
    },
    {
        id: 'bus_stop',
        name: 'Bus Stop',
        bg: 'https://images.unsplash.com/photo-1542345759-35d259c25255?auto=format&fit=crop&w=1200&q=80',
        perspective: 'rotateY(5deg) scale(0.85)',
        containerStyle: 'top-[18%] left-[25%] w-[50%] shadow-xl',
        frame: 'border-[16px] border-zinc-800 bg-zinc-800 rounded-lg',
        overlay: 'bg-gradient-to-tr from-white/20 to-transparent mix-blend-soft-light'
    },
    {
        id: 'airport',
        name: 'Airport',
        bg: 'https://images.unsplash.com/photo-1530519967699-c4391629d665?auto=format&fit=crop&w=1200&q=80',
        perspective: 'rotateX(-2deg) scale(0.9)',
        containerStyle: 'top-[15%] left-[15%] w-[70%]',
        frame: 'border-b-[4px] border-t-[4px] border-zinc-900 bg-black',
        overlay: 'bg-gradient-to-b from-blue-500/10 to-transparent mix-blend-overlay'
    },
    {
        id: 'sidewalk',
        name: 'Sidewalk Display',
        bg: '/images/mockups/billboard-vertical.jpg',
        perspective: 'rotateY(5deg) scale(0.9)',
        containerStyle: 'top-[20%] left-[35%] w-[30%] aspect-[9/16] shadow-2xl',
        frame: 'border-[12px] border-zinc-800 bg-zinc-900',
        overlay: 'bg-gradient-to-tr from-white/10 to-transparent mix-blend-soft-light'
    },
    {
        id: 'rooftop',
        name: 'Rooftop',
        bg: '/images/mockups/billboard-roof.png',
        perspective: 'rotateX(15deg) rotateY(-2deg) scale(0.9)',
        containerStyle: 'top-[25%] left-[20%] w-[60%] aspect-[3/1] shadow-xl',
        frame: 'border-b-[8px] border-t-[2px] border-zinc-800 bg-zinc-900',
        overlay: 'bg-gradient-to-b from-blue-500/10 to-transparent mix-blend-overlay'
    }
];

export const BillboardMockupGenerator = () => {
    const [contentType, setContentType] = useState<'image' | 'text'>('image');
    const [uploadedImage, setUploadedImage] = useState<string>('');
    const [textContent, setTextContent] = useState({
        text: 'YOUR AD HERE',
        color: '#000000',
        bgColor: '#ffffff',
        fontSize: 100,
        fontFamily: 'font-sans'
    });

    const [selectedScene, setSelectedScene] = useState(scenes[0]);
    const [controls, setControls] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        opacity: 95,
        blur: 0
    });
    const [showTexture, setShowTexture] = useState(true);
    const [activeTab, setActiveTab] = useState<'scenes' | 'content' | 'adjust'>('scenes');
    const previewRef = useRef<HTMLDivElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
                setContentType('image');
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadMockup = async () => {
        if (!previewRef.current) return;
        try {
            const canvas = await html2canvas(previewRef.current, {
                scale: 2,
                backgroundColor: null,
                useCORS: true,
                allowTaint: true,
            });
            const link = document.createElement('a');
            link.download = `billboard-mockup-${selectedScene.id}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Download error:', err);
        }
    };

    return (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Controls Section - 4 Columns */}
            <Card className="lg:col-span-4 p-6 space-y-6 lg:sticky lg:top-8 max-h-[calc(100vh-100px)] overflow-y-auto">
                <div className="space-y-4">
                    <div className="flex bg-muted p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('scenes')}
                            className={`flex-1 text-xs font-medium py-2 rounded-md transition-all ${activeTab === 'scenes' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Scenes
                        </button>
                        <button
                            onClick={() => setActiveTab('content')}
                            className={`flex-1 text-xs font-medium py-2 rounded-md transition-all ${activeTab === 'content' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Content
                        </button>
                        <button
                            onClick={() => setActiveTab('adjust')}
                            className={`flex-1 text-xs font-medium py-2 rounded-md transition-all ${activeTab === 'adjust' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Adjust
                        </button>
                    </div>

                    {activeTab === 'scenes' && (
                        <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {scenes.map((scene) => (
                                <button
                                    key={scene.id}
                                    onClick={() => setSelectedScene(scene)}
                                    className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all group ${selectedScene.id === scene.id
                                        ? 'border-primary shadow-md ring-2 ring-primary/20'
                                        : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                                        }`}
                                >
                                    <img
                                        src={scene.bg}
                                        alt={scene.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-2 ${selectedScene.id === scene.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                        <span className="text-white font-medium text-xs text-center drop-shadow-md">{scene.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex bg-muted p-1 rounded-lg">
                                <button
                                    onClick={() => setContentType('image')}
                                    className={`flex-1 text-sm font-medium py-2 rounded-md transition-all flex items-center justify-center gap-2 ${contentType === 'image' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                                >
                                    <ImageIcon className="w-4 h-4" /> Upload
                                </button>
                                <button
                                    onClick={() => setContentType('text')}
                                    className={`flex-1 text-sm font-medium py-2 rounded-md transition-all flex items-center justify-center gap-2 ${contentType === 'text' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                                >
                                    <TypeIcon className="w-4 h-4" /> Text Ad
                                </button>
                            </div>

                            {contentType === 'image' ? (
                                <div className="space-y-4">
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-900 group relative overflow-hidden">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        {uploadedImage ? (
                                            <img src={uploadedImage} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-2" />
                                        ) : (
                                            <div className="text-center text-muted-foreground relative z-10">
                                                <Upload className="w-8 h-8 mx-auto mb-2 opacity-50 block" />
                                                <span className="text-xs font-medium">Click to upload image</span>
                                            </div>
                                        )}
                                    </label>
                                    <p className="text-xs text-muted-foreground text-center">Your image will automatically update across all scenes.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium">Message</label>
                                        <textarea
                                            value={textContent.text}
                                            onChange={(e) => setTextContent({ ...textContent, text: e.target.value })}
                                            className="w-full h-24 p-3 rounded-md border bg-background text-sm resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Enter your ad text..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium flex items-center gap-2"><Palette className="w-3 h-3" /> Text Color</label>
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    type="color"
                                                    value={textContent.color}
                                                    onChange={(e) => setTextContent({ ...textContent, color: e.target.value })}
                                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                                />
                                                <span className="text-xs text-muted-foreground uppercase">{textContent.color}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium flex items-center gap-2"><Palette className="w-3 h-3" /> Background</label>
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    type="color"
                                                    value={textContent.bgColor}
                                                    onChange={(e) => setTextContent({ ...textContent, bgColor: e.target.value })}
                                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                                />
                                                <span className="text-xs text-muted-foreground uppercase">{textContent.bgColor}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium">Font Size</label>
                                            <span className="text-xs text-muted-foreground">{textContent.fontSize}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="20"
                                            max="400"
                                            value={textContent.fontSize}
                                            onChange={(e) => setTextContent({ ...textContent, fontSize: Number(e.target.value) })}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'adjust' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium">Screen Texture</label>
                                    <button
                                        onClick={() => setShowTexture(!showTexture)}
                                        className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${showTexture ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${showTexture ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground">Adds a realistic LED pixel grid overlay to the screen.</p>
                            </div>

                            <div className="space-y-4 pt-2 border-t">
                                {[
                                    { label: 'Brightness', key: 'brightness', min: 50, max: 150 },
                                    { label: 'Contrast', key: 'contrast', min: 50, max: 150 },
                                    { label: 'Saturation', key: 'saturation', min: 0, max: 200 },
                                    { label: 'Opacity', key: 'opacity', min: 50, max: 100 },
                                    { label: 'Blur', key: 'blur', min: 0, max: 2, step: 0.1 },
                                ].map((control) => (
                                    <div key={control.key} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span>{control.label}</span>
                                            <span className="text-muted-foreground">{controls[control.key as keyof typeof controls]}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={control.min}
                                            max={control.max}
                                            step={control.step || 1}
                                            value={controls[control.key as keyof typeof controls]}
                                            onChange={(e) => setControls(c => ({
                                                ...c,
                                                [control.key]: Number(e.target.value)
                                            }))}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-2">
                    <DownloadButton
                        onClick={downloadMockup}
                        label="Download Mockup"
                        disabled={contentType === 'image' && !uploadedImage}
                        className="w-full h-12 text-lg font-semibold shadow-lg"
                    />
                </div>
            </Card>

            {/* Preview Section - 8 Columns */}
            <Card className="lg:col-span-8 p-0 overflow-hidden bg-zinc-950 flex items-center justify-center min-h-[500px] border-0 shadow-2xl relative group rounded-xl ring-1 ring-white/10">
                <div
                    ref={previewRef}
                    className="w-full max-w-[1200px] aspect-[16/10] relative overflow-hidden bg-black"
                >
                    {/* Scene Background */}
                    <img
                        src={selectedScene.bg}
                        alt="Background"
                        crossOrigin="anonymous"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Container for the 3D Transformed Screen */}
                    <div
                        className="absolute inset-0 preserve-3d"
                        style={{
                            perspective: '2000px' // Global perspective container
                        }}
                    >
                        <div
                            className={`absolute flex items-center justify-center transition-all duration-700 ease-in-out ${selectedScene.containerStyle}`}
                            /* Individual scene perspective transform is applied here */
                            style={{
                                transform: selectedScene.perspective,
                                transformOrigin: 'center center',
                            }}
                        >
                            {/* The Screen Itself */}
                            <div
                                className={`w-full h-full relative overflow-hidden flex items-center justify-center ${selectedScene.frame}`}
                                style={{ backgroundColor: contentType === 'text' ? textContent.bgColor : '#000000' }}
                            >
                                {/* User Content (Image OR Text) */}
                                <div
                                    className="w-full h-full relative flex items-center justify-center overflow-hidden"
                                    style={{
                                        filter: `brightness(${controls.brightness}%) contrast(${controls.contrast}%) saturate(${controls.saturation}%) blur(${controls.blur}px)`,
                                        opacity: controls.opacity / 100,
                                    }}
                                >
                                    {contentType === 'image' ? (
                                        uploadedImage ? (
                                            <img
                                                src={uploadedImage}
                                                alt="Billboard Content"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-white/50">
                                                <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                                                <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50">No Image Selected</p>
                                            </div>
                                        )
                                    ) : (
                                        <div
                                            className="p-4 text-center break-words w-full h-full flex items-center justify-center"
                                            style={{
                                                color: textContent.color,
                                                fontSize: `${textContent.fontSize}px`,
                                                lineHeight: 1.1,
                                                fontWeight: 'bold',
                                                fontFamily: 'system-ui, sans-serif'
                                            }}
                                        >
                                            {textContent.text}
                                        </div>
                                    )}
                                </div>

                                {/* "Screen Texture" (Scanlines/Pixels) */}
                                {showTexture && (
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-10"
                                        style={{
                                            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                                            backgroundSize: '100% 2px, 3px 100%',
                                        }}
                                    />
                                )}

                                {/* Glass Reflection / Glare */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60 pointer-events-none z-20" />

                                {/* Inner Shadow for Depth */}
                                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none z-30" />
                            </div>
                        </div>
                    </div>

                    {/* Environmental Lighting Overlay (Global) */}
                    <div className={`absolute inset-0 pointer-events-none ${selectedScene.overlay} mix-blend-overlay`} />

                    {/* Branding Watermark */}
                    <div className="absolute bottom-6 right-6 text-white/40 text-[10px] uppercase tracking-widest font-bold z-50 drop-shadow-md">
                        CarouselAI • Billboard Mockup
                    </div>
                </div>
            </Card>
        </div>
    );
};
