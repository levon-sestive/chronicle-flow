import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Chapter } from '@/types/journal';
import { ChapterHeader } from './ChapterHeader';
import { EntryBlock } from './EntryBlock';
import { JournalComposer } from './JournalComposer';
import { VoiceRecorder } from './VoiceRecorder';
import { ImageUploader } from './ImageUploader';
import { ReflectDialog } from './ReflectDialog';
import { useToast } from '@/hooks/use-toast';

type Mode = 'reading' | 'voice' | 'image';

interface ChapterViewProps {
  chapter: Chapter;
  onUpdateTitle: (title: string) => void;
  onDeleteChapter: () => void;
  onAddEntry: (entry: { type: 'text' | 'image' | 'voice'; content: string; imageUrl?: string }) => void;
  onUpdateEntry: (entryId: string, content: string) => void;
  onDeleteEntry: (entryId: string) => void;
}

export function ChapterView({
  chapter,
  onUpdateTitle,
  onDeleteChapter,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
}: ChapterViewProps) {
  const [mode, setMode] = useState<Mode>('reading');
  const [showReflectDialog, setShowReflectDialog] = useState(false);
  const { toast } = useToast();

  const handleSaveText = (content: string) => {
    onAddEntry({ type: 'text', content });
  };

  const handleSaveVoice = (transcript: string) => {
    onAddEntry({ type: 'voice', content: transcript });
    setMode('reading');
  };

  const handleSaveImage = (type: 'image' | 'text', content: string, imageUrl?: string) => {
    onAddEntry({ type: type === 'image' ? 'image' : 'text', content, imageUrl });
    setMode('reading');
  };

  const handleStartReflection = () => {
    setShowReflectDialog(false);
    toast({
      title: 'Reflection started',
      description: 'Norm is ready to help you reflect on your entries.',
    });
  };

  return (
    <>
      <main className="flex-1 min-h-screen">
        <div className="max-w-[720px] mx-auto px-8 py-16">
          <ChapterHeader
            chapter={chapter}
            onUpdateTitle={onUpdateTitle}
            onDelete={onDeleteChapter}
          />

          {/* Entries Timeline */}
          <div className="divide-y divide-border/30">
            {chapter.entries.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted-foreground font-serif text-lg">
                  This chapter is empty. Start writing to add your first entry.
                </p>
              </div>
            ) : (
              chapter.entries.map((entry) => (
                <EntryBlock
                  key={entry.id}
                  entry={entry}
                  onEdit={onUpdateEntry}
                  onDelete={onDeleteEntry}
                />
              ))
            )}
          </div>

          {/* Composer */}
          <JournalComposer
            onSaveText={handleSaveText}
            onStartVoice={() => setMode('voice')}
            onStartImage={() => setMode('image')}
          />

          {/* Reflect Action */}
          <div className="mt-8">
            <button
              onClick={() => setShowReflectDialog(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Reflect with Norm
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      {mode === 'voice' && (
        <VoiceRecorder
          onSave={handleSaveVoice}
          onCancel={() => setMode('reading')}
        />
      )}

      {mode === 'image' && (
        <ImageUploader
          onSave={handleSaveImage}
          onCancel={() => setMode('reading')}
        />
      )}

      <ReflectDialog
        open={showReflectDialog}
        onOpenChange={setShowReflectDialog}
        onConfirm={handleStartReflection}
      />
    </>
  );
}
