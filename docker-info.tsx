import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const DockerPullInstructions = () => {
  const [copied, setCopied] = useState(false);
  const dockerPullCmd = 'docker pull ghcr.io/username/plex-storage-monitor:latest';
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(dockerPullCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      <h2 className="text-2xl font-bold mb-4">Docker Installation Instructions</h2>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-sm">Docker Pull Command:</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
          {dockerPullCmd}
        </pre>
      </div>

      <Alert>
        <AlertTitle>Volume Mounts Required</AlertTitle>
        <AlertDescription>
          <p className="mb-2">This container requires the following volume mounts:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>/data/movies</li>
            <li>/data/shows</li>
            <li>/data/anime</li>
            <li>/data/audiobooks</li>
            <li>/data/ebooks</li>
            <li>/data/photos</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Example docker-compose.yml</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto whitespace-pre">
{`version: '3'
services:
  plex-storage-monitor:
    image: ghcr.io/username/plex-storage-monitor:latest
    ports:
      - "5000:5000"
    volumes:
      - /path/to/movies:/data/movies
      - /path/to/shows:/data/shows
      - /path/to/anime:/data/anime
      - /path/to/audiobooks:/data/audiobooks
      - /path/to/ebooks:/data/ebooks
      - /path/to/photos:/data/photos
    environment:
      - STORAGE_API_PORT=5000`}
        </pre>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">API Endpoints</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><code className="bg-gray-100 px-2 py-1 rounded">/storage</code> - Storage information with file counts and media type totals</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">/stats</code> - Usage statistics including total files and media counts</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">/debug</code> - Debug information including media counts</li>
        </ul>
      </div>
    </div>
  );
};

export default DockerPullInstructions;