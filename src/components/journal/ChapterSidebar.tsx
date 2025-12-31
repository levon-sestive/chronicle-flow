import { Plus } from 'lucide-react';
import { Chapter } from '@/types/journal';
import { formatRelativeTime } from '@/lib/dateUtils';
import { useState } from 'react';

interface ChapterSidebarProps {
  chapters: Chapter[];
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
  onCreateChapter: (title: string) => void;
}

export function ChapterSidebar({
  chapters,
  activeChapterId,
  onSelectChapter,
  onCreateChapter,
}: ChapterSidebarProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = () => {
    if (newTitle.trim()) {
      onCreateChapter(newTitle.trim());
      setNewTitle('');
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewTitle('');
    }
  };

  return (
    <aside className="w-[280px] h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-serif text-xl text-foreground tracking-tight">Journal</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={`chapter-item w-full text-left ${
                activeChapterId === chapter.id ? 'active' : ''
              }`}
            >
              <h3 className="text-sm font-medium text-foreground truncate">
                {chapter.title}
              </h3>
              <p className="journal-timestamp mt-1">
                {formatRelativeTime(chapter.updatedAt)}
              </p>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        {isCreating ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!newTitle.trim()) {
                setIsCreating(false);
              }
            }}
            placeholder="Chapter title..."
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Chapter</span>
          </button>
        )}
      </div>
    </aside>
  );
}
