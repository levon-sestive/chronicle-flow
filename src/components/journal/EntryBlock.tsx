import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { JournalEntry } from '@/types/journal';
import { formatEntryTime } from '@/lib/dateUtils';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface EntryBlockProps {
  entry: JournalEntry;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function EntryBlock({ entry, onEdit, onDelete }: EntryBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(entry.content);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      onEdit(entry.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditContent(entry.content);
      setIsEditing(false);
    }
    if (e.key === 'Enter' && e.metaKey) {
      handleSaveEdit();
    }
  };

  return (
    <>
      <article className="entry-block group py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {entry.type === 'image' && entry.imageUrl && (
              <img
                src={entry.imageUrl}
                alt=""
                className="rounded-lg mb-4 max-w-md"
              />
            )}

            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent journal-entry resize-none focus:outline-none min-h-[100px]"
                autoFocus
              />
            ) : (
              <p className="journal-entry whitespace-pre-wrap">{entry.content}</p>
            )}

            <time className="journal-timestamp block mt-3">
              {formatEntryTime(entry.createdAt)}
              {entry.type === 'voice' && ' · voice note'}
            </time>
          </div>

          <div className="entry-action flex items-center gap-1 pt-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              aria-label="Edit entry"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              aria-label="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => onDelete(entry.id)}
        title="Delete entry"
        description="This entry will be permanently deleted. This action cannot be undone."
      />
    </>
  );
}
