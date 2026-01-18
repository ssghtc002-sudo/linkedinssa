'use client';
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DownloadButton } from '../shared/DownloadButton';
import { Upload, Play, Pause, Video, FileImage } from 'lucide-react';
import html2canvas from 'html2canvas';

export const CarouselToVideoConverter = () => {
    const [slides, setSlides] = useState<string[]>([]);
    const [duration, setDuration] = useState(2); // seconds per slide
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newSlides = files.map(file => URL.createObjectURL(file));
            setSlides(prev => [...prev, ...newSlides]);
        }
    };

    // Playback logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && slides.length > 0) {
            interval = setInterval(() => {
                setCurrentSlideIndex(prev => (prev + 1) % slides.length);
            }, duration * 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, duration, slides.length]);

    // Recording logic
    const startRecording = async () => {
        if (slides.length === 0 || !canvasRef.current) return;

        setIsRecording(true);
        setIsPlaying(true);
        setCurrentSlideIndex(0);
        chunksRef.current = [];

        const stream = canvasRef.current.captureStream(30); // 30 FPS
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'carousel-video.webm';
            a.click();
            setIsRecording(false);
            setIsPlaying(false);
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();

        // Draw frames to canvas
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        let frame = 0;
        const totalFrames = slides.length * duration * 30; // Total duration * fps (approx)

        const drawLoop = async () => {
            if (frame >= totalFrames) {
                mediaRecorder.stop();
                return;
            }

            // Calculate current slide based on time
            const slideIndex = Math.floor(frame / (duration * 30));
            if (slideIndex < slides.length) {
                const img = new Image();
                img.src = slides[slideIndex];
                await new Promise(r => { if (img.complete) r(null); else img.onload = () => r(null); });

                // Draw to canvas
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

                // Draw image containing aspect ratio
                const scale = Math.min(
                    canvasRef.current!.width / img.width,
                    canvasRef.current!.height / img.height
                );
                const x = (canvasRef.current!.width - img.width * scale) / 2;
                const y = (canvasRef.current!.height - img.height * scale) / 2;

                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }

            frame++;
            if (mediaRecorder.state === 'recording') {
                requestAnimationFrame(drawLoop);
            }
        };

        drawLoop();
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 space-y-6 h-fit">
                <div className="space-y-4">
                    <Label>1. Upload Carousel Slides (Images)</Label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-900">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Upload Images (PNG/JPG)</p>
                    </label>
                    {slides.length > 0 && (
                        <p className="text-sm text-green-600 font-medium">{slides.length} slides loaded</p>
                    )}
                </div>

                <div className="space-y-4">
                    <Label>2. Settings</Label>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Duration per slide</span>
                            <span>{duration}s</span>
                        </div>
                        <Slider
                            value={[duration]}
                            onValueChange={(v) => setDuration(v[0])}
                            min={1}
                            max={10}
                            step={0.5}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>3. Convert</Label>
                    <DownloadButton
                        onClick={startRecording}
                        label={isRecording ? 'Recording...' : 'Convert to Video'}
                        disabled={slides.length === 0 || isRecording}
                        className="w-full h-12 text-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                        Note: This records the playback in real-time. Please wait for the process to finish.
                    </p>
                </div>
            </Card>

            <Card className="p-6 flex flex-col items-center justify-center bg-zinc-950 min-h-[400px]">
                {/* Hidden canvas for recording */}
                <canvas
                    ref={canvasRef}
                    width={1080}
                    height={1080}
                    className="hidden"
                />

                <div className="relative w-full max-w-md aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                    {slides.length > 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <img
                                src={slides[currentSlideIndex]}
                                alt={`Slide ${currentSlideIndex + 1}`}
                                className="w-full h-full object-contain transition-opacity duration-300"
                            />

                            {/* Playback Controls */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </Button>
                            </div>

                            {/* Progress Indicator */}
                            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                Slide {currentSlideIndex + 1} / {slides.length}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700">
                            <Video className="w-16 h-16 mb-4 opacity-20" />
                            <p>Preview will appear here</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
