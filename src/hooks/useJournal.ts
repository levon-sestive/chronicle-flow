import { useState, useCallback } from 'react';
import { Chapter, JournalEntry } from '@/types/journal';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialChapters: Chapter[] = [
  {
    id: '1',
    title: 'Morning Reflections',
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(),
    entries: [
      {
        id: 'e1',
        type: 'text',
        content: 'The morning light filtered through the curtains, casting long shadows across the room. I found myself thinking about the nature of time—how it moves so slowly in moments of anticipation, yet rushes past when we least expect it.',
        createdAt: new Date(Date.now() - 3600000 * 2),
      },
      {
        id: 'e2',
        type: 'text',
        content: 'There\'s something profound about the quiet hours before the world fully wakes. In this stillness, thoughts feel more authentic, less filtered by the expectations of the day.',
        createdAt: new Date(Date.now() - 3600000),
      },
    ],
  },
  {
    id: '2',
    title: 'Creative Projects',
    createdAt: new Date(Date.now() - 86400000 * 5),
    updatedAt: new Date(Date.now() - 86400000),
    entries: [
      {
        id: 'e3',
        type: 'text',
        content: 'Started sketching ideas for the new project today. The initial concepts feel rough, unformed—but that\'s always how it begins. Trust the process.',
        createdAt: new Date(Date.now() - 86400000),
      },
    ],
  },
  {
    id: '3',
    title: 'Travel Notes',
    createdAt: new Date(Date.now() - 86400000 * 14),
    updatedAt: new Date(Date.now() - 86400000 * 7),
    entries: [],
  },
];

export function useJournal() {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0].id);

  const activeChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];

  const createChapter = useCallback((title: string) => {
    const newChapter: Chapter = {
      id: generateId(),
      title,
      entries: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChapters((prev) => [newChapter, ...prev]);
    setActiveChapterId(newChapter.id);
  }, []);

  const updateChapterTitle = useCallback((chapterId: string, title: string) => {
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId ? { ...c, title, updatedAt: new Date() } : c
      )
    );
  }, []);

  const deleteChapter = useCallback((chapterId: string) => {
    setChapters((prev) => {
      const filtered = prev.filter((c) => c.id !== chapterId);
      if (activeChapterId === chapterId && filtered.length > 0) {
        setActiveChapterId(filtered[0].id);
      }
      return filtered;
    });
  }, [activeChapterId]);

  const addEntry = useCallback(
    (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
      const newEntry: JournalEntry = {
        ...entry,
        id: generateId(),
        createdAt: new Date(),
      };
      setChapters((prev) =>
        prev.map((c) =>
          c.id === activeChapterId
            ? { ...c, entries: [...c.entries, newEntry], updatedAt: new Date() }
            : c
        )
      );
    },
    [activeChapterId]
  );

  const updateEntry = useCallback(
    (entryId: string, content: string) => {
      setChapters((prev) =>
        prev.map((c) =>
          c.id === activeChapterId
            ? {
                ...c,
                entries: c.entries.map((e) =>
                  e.id === entryId ? { ...e, content } : e
                ),
                updatedAt: new Date(),
              }
            : c
        )
      );
    },
    [activeChapterId]
  );

  const deleteEntry = useCallback(
    (entryId: string) => {
      setChapters((prev) =>
        prev.map((c) =>
          c.id === activeChapterId
            ? {
                ...c,
                entries: c.entries.filter((e) => e.id !== entryId),
                updatedAt: new Date(),
              }
            : c
        )
      );
    },
    [activeChapterId]
  );

  return {
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
  };
}
