import { useState, useEffect, useRef } from 'react';

interface WritingModeProps {
  onSave: (content: string) => void;
  onCancel: () => void;
  initialContent?: string;
}

const prompts = [
  'What\'s on your mind?',
  'Begin with what you notice...',
  'Write freely, without judgment...',
  'Let the words find their way...',
];

export function WritingMode({ onSave, onCancel, initialContent = '' }: WritingModeProps) {
  const [content, setContent] = useState(initialContent);
  const [prompt] = useState(() => prompts[Math.floor(Math.random() * prompts.length)]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
    if (e.key === 'Enter' && e.metaKey) {
      if (content.trim()) {
        onSave(content.trim());
      }
    }
  };

  const handleSave = () => {
    if (content.trim()) {
      onSave(content.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dimmed-overlay animate-fade-in">
      <div className="w-full max-w-2xl px-8 animate-slide-up">
        <div className="relative">
          {!content && (
            <p className="writing-prompt absolute top-0 left-0 pointer-events-none select-none">
              {prompt}
            </p>
          )}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent font-serif text-xl leading-relaxed text-foreground resize-none focus:outline-none min-h-[200px]"
            placeholder=""
          />
        </div>

        <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/30">
          <button
            onClick={onCancel}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
