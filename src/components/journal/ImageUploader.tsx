import { useState, useRef } from 'react';
import { X, Image as ImageIcon, FileText } from 'lucide-react';

interface ImageUploaderProps {
  onSave: (type: 'image' | 'text', content: string, imageUrl?: string) => void;
  onCancel: () => void;
}

export function ImageUploader({ onSave, onCancel }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAsImage = () => {
    if (selectedImage) {
      onSave('image', '', selectedImage);
    }
  };

  const handleExtractText = () => {
    // Simulated OCR for demo
    const simulatedText = 'Extracted text from image would appear here. This is a demonstration of the OCR feature.';
    onSave('text', simulatedText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dimmed-overlay animate-fade-in">
      <div className="w-full max-w-lg px-8 animate-slide-up">
        <div className="bg-card rounded-xl p-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-foreground">Add Image</h2>
            <button
              onClick={onCancel}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!selectedImage ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-muted-foreground transition-colors"
            >
              <ImageIcon className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Click to select an image</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div>
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full rounded-lg mb-6 max-h-[300px] object-contain bg-muted/30"
              />

              {extractedText && (
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-foreground">{extractedText}</p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSaveAsImage}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  Save as image
                </button>
                <button
                  onClick={handleExtractText}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-muted transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Extract text (OCR)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
