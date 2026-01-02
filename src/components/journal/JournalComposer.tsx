import { useState, useRef, useEffect } from 'react';
import { ImagePlus, Mic } from 'lucide-react';

interface JournalComposerProps {
  onSaveText: (content: string) => void;
  onStartVoice: () => void;
  onStartImage: () => void;
}

export function JournalComposer({ onSaveText, onStartVoice, onStartImage }: JournalComposerProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(80, textarea.scrollHeight)}px`;
    }
  }, [content]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      if (content.trim()) {
        onSaveText(content.trim());
        setContent('');
      }
    }
  };

  return (
    <div className="mt-12">
      <div className="bg-secondary rounded-xl p-4">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Just start..."
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none font-sans text-base leading-relaxed min-h-[80px]"
        />
        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            onClick={onStartImage}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            aria-label="Add image"
          >
            <ImagePlus className="w-5 h-5" />
          </button>
          <button
            onClick={onStartVoice}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            aria-label="Record voice"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
