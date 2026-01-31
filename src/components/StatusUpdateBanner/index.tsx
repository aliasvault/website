"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Toggle this to enable/disable the status update banner
const SHOW_STATUS_UPDATE = true;

const StatusUpdateBanner = () => {
  const t = useTranslations();
  const [timelineOpen, setTimelineOpen] = useState(false);

  if (!SHOW_STATUS_UPDATE) {
    return null;
  }

  const timelineKeys = ['event1', 'event2', 'event3', 'event4', 'event5', 'event6'] as const;
  const platformKeys = ['android', 'ios', 'chrome', 'firefox', 'edge', 'safari'] as const;

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600 rounded-lg py-4 px-6 mb-6 shadow-md">
      <div className="flex items-start gap-3">
        <span className="text-amber-600 dark:text-amber-400 text-2xl flex-shrink-0">⚠️</span>
        <div className="text-sm text-amber-900 dark:text-amber-200 w-full">
          <p className="font-bold text-base mb-2">{t('statusUpdate.title')}</p>
          <p className="mb-3">{t('statusUpdate.summary')}</p>

          {/* Platform Status */}
          <div className="bg-amber-100 dark:bg-amber-900/30 rounded p-3 mt-3">
            <p className="font-semibold mb-2 text-xs">{t('statusUpdate.platformStatus.title')}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {platformKeys.map((key) => {
                const status = t(`statusUpdate.platformStatus.platforms.${key}.status`);
                const isLive = status === 'live';
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></span>
                    <span className="font-medium">{t(`statusUpdate.platformStatus.platforms.${key}.name`)}</span>
                    <span className={`text-xs ${isLive ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                      {isLive ? t('statusUpdate.platformStatus.live') : t('statusUpdate.platformStatus.pending')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline (Collapsible) */}
          <div className="text-xs bg-amber-100 dark:bg-amber-900/30 rounded p-3 mt-3">
            <button
              onClick={() => setTimelineOpen(!timelineOpen)}
              className="flex items-center gap-2 font-semibold w-full text-left"
            >
              <span className={`transition-transform ${timelineOpen ? 'rotate-90' : ''}`}>▶</span>
              {t('statusUpdate.timelineTitle')}
            </button>
            {timelineOpen && (
              <div className="space-y-1 mt-2 pl-4">
                {timelineKeys.map((key) => (
                  <div key={key} className="flex gap-2">
                    <span className="font-mono text-amber-700 dark:text-amber-300 whitespace-nowrap">
                      {t(`statusUpdate.timeline.${key}.time`)}
                    </span>
                    <span>{t(`statusUpdate.timeline.${key}.text`)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="mt-3 text-amber-700 dark:text-amber-300 font-medium">
            {t('statusUpdate.apology')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateBanner;
