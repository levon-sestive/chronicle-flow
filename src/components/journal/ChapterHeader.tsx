import { useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Chapter } from '@/types/journal';
import { formatChapterDate } from '@/lib/dateUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface ChapterHeaderProps {
  chapter: Chapter;
  onUpdateTitle: (title: string) => void;
  onDelete: () => void;
}

export function ChapterHeader({ chapter, onUpdateTitle, onDelete }: ChapterHeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(chapter.title);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSaveTitle = () => {
    if (title.trim() && title !== chapter.title) {
      onUpdateTitle(title.trim());
    } else {
      setTitle(chapter.title);
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setTitle(chapter.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <>
      <header className="mb-12">
        <div className="flex items-start justify-between gap-4">
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent font-serif text-3xl font-medium text-foreground focus:outline-none border-b border-primary pb-1"
              autoFocus
            />
          ) : (
            <h1
              className="font-serif text-3xl font-medium text-foreground cursor-text"
              onClick={() => setIsEditingTitle(true)}
            >
              {chapter.title}
            </h1>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
              <DropdownMenuItem
                onClick={() => setIsEditingTitle(true)}
                className="text-foreground focus:bg-muted focus:text-foreground"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-foreground focus:bg-muted focus:text-foreground"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="journal-timestamp mt-3">
          {formatChapterDate(chapter.createdAt)}
        </p>
      </header>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={onDelete}
        title="Delete chapter"
        description="This will permanently delete this chapter and all its entries. This action cannot be undone."
      />
    </>
  );
}
