'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Upload, Smartphone, Tablet, Monitor } from 'lucide-react';

const guides = [
    { id: 'mobile', name: 'Mobile (9:16)', aspect: 'aspect-[9/16]', safeZone: 'inset-[10%_0_20%_0]' },
    { id: 'square', name: 'Square (1:1)', aspect: 'aspect-square', safeZone: 'inset-[5%]' },
    { id: 'landscape', name: 'Landscape (16:9)', aspect: 'aspect-video', safeZone: 'inset-[5%_10%]' },
];

export const VideoSafeZoneChecker = () => {
    const [uploadedFile, setUploadedFile] = useState<string>('');
    const [fileType, setFileType] = useState<'image' | 'video'>('image');
    const [selectedGuide, setSelectedGuide] = useState(guides[0]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileType(file.type.startsWith('video') ? 'video' : 'image');
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedFile(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="p-6 space-y-6 h-fit">
                <div className="space-y-3">
                    <label className="block text-sm font-medium mb-2">Upload Video or Thumbnail</label>
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-900">
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleUpload}
                            className="hidden"
                        />
                        {uploadedFile ? (
                            <div className="text-center">
                                <p className="font-semibold text-green-600">File Uploaded</p>
                                <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground">
                                <Upload className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Upload video or image</p>
                            </div>
                        )}
                    </label>
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium">Select Format</label>
                    <div className="grid grid-cols-3 gap-2">
                        {guides.map((guide) => (
                            <button
                                key={guide.id}
                                onClick={() => setSelectedGuide(guide)}
                                className={`p-3 rounded-lg border-2 transition-all ${selectedGuide.id === guide.id
                                        ? 'border-primary shadow-md'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                    }`}
                            >
                                <div className={`w-full h-8 rounded bg-slate-200 dark:bg-slate-800 mb-2`}></div>
                                <div className="text-xs font-medium">{guide.name}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-semibold mb-1">Why check safe zones?</p>
                    <p>Different devices and platforms overlay buttons (like, comment, share) on top of your content. Keep important text and faces within the safe zone to ensure visibility.</p>
                </div>
            </Card>

            {/* Preview Section */}
            <Card className="p-6 flex flex-col items-center justify-center bg-zinc-950 min-h-[500px]">
                <h3 className="text-white mb-4 font-medium">Safe Zone Preview</h3>

                <div className={`relative w-full max-w-sm ${selectedGuide.aspect} bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800`}>
                    {uploadedFile ? (
                        fileType === 'video' ? (
                            <video src={uploadedFile} controls className="w-full h-full object-cover" />
                        ) : (
                            <img src={uploadedFile} alt="Preview" className="w-full h-full object-cover" />
                        )
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <span className="text-sm">No media uploaded</span>
                        </div>
                    )}

                    {/* Safe Zone Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Darkened/Unsafe Areas */}
                        <div className={`absolute inset-0 bg-red-500/20 border-4 border-red-500/30`}></div>

                        {/* Safe Zone (Clear) */}
                        <div className={`absolute ${selectedGuide.safeZone} border-2 border-green-400 bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]`}>
                            <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                                SAFE ZONE
                            </div>
                        </div>

                        {/* Simulated UI Elements (Overlay) */}
                        {selectedGuide.id === 'mobile' && (
                            <>
                                <div className="absolute bottom-4 right-4 flex flex-col gap-3 items-center opacity-60">
                                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                                </div>
                                <div className="absolute bottom-4 left-4 w-3/4 h-12 bg-white/10 rounded"></div>
                            </>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};
