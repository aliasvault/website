import { useEffect, useState } from 'react';
import { FaGithub, FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  assets: GitHubAsset[];
  published_at: string;
}

interface GitHubReleaseProps {
  version?: string;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const GitHubRelease = ({ version = 'latest' }: GitHubReleaseProps) => {
  const t = useTranslations();
  const [release, setRelease] = useState<GitHubRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDownloads, setShowDownloads] = useState(false);

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        const cacheKey = `githubReleaseData-${version}`;
        const timestampKey = `githubReleaseTimestamp-${version}`;

        // Check if we have cached data
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(timestampKey);

        if (cachedData && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setRelease(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        const endpoint = version === 'latest'
          ? 'https://api.github.com/repos/aliasvault/aliasvault/releases/latest'
          : `https://api.github.com/repos/aliasvault/aliasvault/releases/tags/${version}`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch release data');
        }

        const data = await response.json();
        setRelease(data);

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(timestampKey, Date.now().toString());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, [version]);

  if (loading) {
    return <div className="animate-pulse">{t('githubRelease.loading')}</div>;
  }

  if (error) {
    return <div className="text-red-500">{t('githubRelease.error')}: {error}</div>;
  }

  if (!release) {
    return null;
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <FaGithub className="text-3xl text-gray-900 dark:text-white" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {version === 'latest' ? t('githubRelease.latestRelease') : t('githubRelease.release')}: {release.tag_name}
        </h2>
      </div>

      <div className="space-y-4">
        <a
          href={release.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {t('githubRelease.viewReleaseNotes')}
        </a>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>{t('githubRelease.installationInstructions')} <a
            href="https://docs.aliasvault.com/installation/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {t('githubRelease.installationGuide')}
          </a>.</p>
        </div>

        <div className="space-y-2">
          {release.assets.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('githubRelease.downloads')}</h3>
                <button
                  onClick={() => setShowDownloads(!showDownloads)}
                  className="flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {showDownloads ? (
                    <>
                      <span className="mr-2">{t('githubRelease.hideDownloads')}</span>
                      <FaChevronUp />
                    </>
                  ) : (
                    <>
                      <span className="mr-2">{t('githubRelease.showDownloads')}</span>
                      <FaChevronDown />
                    </>
                  )}
                </button>
              </div>

              {showDownloads && (
                <div className="grid gap-4">
                  {release.assets.map((asset) => (
                    <a
                      key={asset.name}
                      href={asset.browser_download_url}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center">
                        <FaDownload className="mr-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{asset.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(asset.size)}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};