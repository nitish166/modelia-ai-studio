import React from 'react';
import type { Generation } from '../services/api';

interface GenerationCardProps {
  generation: Generation;
}

const GenerationCard: React.FC<GenerationCardProps> = ({ generation }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
      {/* Header with Status */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(generation.status)}`}>
          {getStatusIcon(generation.status)} {generation.status.charAt(0).toUpperCase() + generation.status.slice(1)}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(generation.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Prompt */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Prompt:</h3>
        <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
          {generation.prompt}
        </p>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4">
        {/* Original Image */}
        <div>
          <h4 className="text-xs font-medium text-gray-600 mb-2">Original</h4>
          <img
            src={`http://localhost:3000/${generation.imagePath}`}
            alt="Original"
            className="w-full h-24 object-cover rounded-lg border border-gray-200"
          />
        </div>

        {/* Generated Image */}
        <div>
          <h4 className="text-xs font-medium text-gray-600 mb-2">Generated</h4>
          {generation.resultPath ? (
            <img
              src={`http://localhost:3000/${generation.resultPath}`}
              alt="Generated"
              className="w-full h-24 object-cover rounded-lg border border-green-200"
            />
          ) : (
            <div className="w-full h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">
                {generation.status === 'failed' ? 'Failed' : 'Processing...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerationCard;