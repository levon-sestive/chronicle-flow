import { useState, useRef, useEffect } from 'react';
import { Mic, Square, X } from 'lucide-react';

interface VoiceRecorderProps {
  onSave: (transcript: string) => void;
  onCancel: () => void;
}

export function VoiceRecorder({ onSave, onCancel }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulated transcript for demo
    setTranscript(
      'This is a simulated voice transcript. In a real implementation, this would be the transcribed audio from your recording.'
    );
  };

  const handleSave = () => {
    if (transcript.trim()) {
      onSave(transcript.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dimmed-overlay animate-fade-in">
      <div className="w-full max-w-md px-8 animate-slide-up">
        <div className="bg-card rounded-xl p-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-foreground">Voice Note</h2>
            <button
              onClick={onCancel}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!transcript ? (
            <div className="text-center py-8">
              {isRecording ? (
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-destructive rounded-sm animate-pulse-gentle" />
                  </div>
                  <p className="text-2xl font-mono text-foreground mb-6">
                    {formatTime(recordingTime)}
                  </p>
                  <button
                    onClick={handleStopRecording}
                    className="p-4 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    <Square className="w-6 h-6 text-foreground" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleStartRecording}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors"
                  >
                    <Mic className="w-8 h-8 text-primary" />
                  </button>
                  <p className="text-muted-foreground">Tap to start recording</p>
                </>
              )}
            </div>
          ) : (
            <div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="w-full bg-muted/50 rounded-lg p-4 font-serif text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px]"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setTranscript('')}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Re-record
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
