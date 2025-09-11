import React, { useState } from 'react';
import { icons } from '../../utils/icons';
import { mockResources } from '../../data/mockData';

const ResourceHub = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Anxiety', 'Sleep', 'Academic Stress', 'Burnout', 'Social Isolation', 'Stress'];

  const filteredResources =
    filter === 'All'
      ? mockResources
      : mockResources.filter((r) => r.category === filter);

  const getIcon = (type) => {
    if (type === 'video') return icons.video;
    if (type === 'audio') return icons.audio;
    return icons.guide;
  };

  // helper to convert youtube links to embed URL
  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Psychoeducational Resources
      </h1>
      <p className="text-gray-600 mb-6">
        A curated collection of guides, videos, and audios to support your mental
        wellness.
      </p>

      {/* category filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              filter === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* resource cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isVideo = res.type === 'video';
          const ytEmbed = isVideo ? getYouTubeEmbedUrl(res.url) : null;

          return (
            <div
              key={res.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex items-center text-indigo-600 mb-3">
                  <span className="mr-2">{getIcon(res.type)}</span>
                  <span className="uppercase text-sm font-semibold tracking-wider">
                    {res.type}
                  </span>
                  {res.duration && (
                    <span className="ml-auto text-sm text-gray-500">
                      {res.duration}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {res.title}
                </h3>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-100">
                  {res.category}
                </span>

                {/* video or audio preview */}
                {isVideo && (
                  <div className="mt-4">
                    {ytEmbed ? (
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={ytEmbed}
                          title={res.title}
                          className="w-full h-56 rounded"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <video
                        src={res.url}
                        controls
                        className="w-full h-56 rounded"
                      />
                    )}
                  </div>
                )}

                {res.type === 'audio' && res.url && (
                  <audio controls className="mt-4 w-full">
                    <source src={res.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>

              {/* fallback Access link if not a playable media */}
              {res.type === 'guide' && (
                <a
                  href={res.url}
                  className="block bg-gray-50 px-6 py-3 text-center font-medium text-indigo-600 hover:bg-indigo-100"
                >
                  Access Now
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceHub;
