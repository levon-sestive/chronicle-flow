import { ChapterSidebar } from '@/components/journal/ChapterSidebar';
import { ChapterView } from '@/components/journal/ChapterView';
import { useJournal } from '@/hooks/useJournal';

const Index = () => {
  const {
    chapters,
    activeChapter,
    activeChapterId,
    setActiveChapterId,
    createChapter,
    updateChapterTitle,
    deleteChapter,
    addEntry,
    updateEntry,
    deleteEntry,
  } = useJournal();

  return (
    <div className="flex min-h-screen bg-background">
      <ChapterSidebar
        chapters={chapters}
        activeChapterId={activeChapterId}
        onSelectChapter={setActiveChapterId}
        onCreateChapter={createChapter}
      />

      <ChapterView
        chapter={activeChapter}
        onUpdateTitle={(title) => updateChapterTitle(activeChapterId, title)}
        onDeleteChapter={() => deleteChapter(activeChapterId)}
        onAddEntry={addEntry}
        onUpdateEntry={updateEntry}
        onDeleteEntry={deleteEntry}
      />

      {/* Right column - intentionally empty */}
      <div className="hidden lg:block w-[200px] flex-shrink-0" />
    </div>
  );
};

export default Index;
