import React, { useState, useEffect, useMemo, useCallback } from 'react';

export interface DaylightCardProps {
  title: string;
  category: 'core' | 'syntax' | 'workbench';
  active?: boolean;
  onSelect: (name: string) => void;
}

export const DaylightWorkspaceCard: React.FC<DaylightCardProps> = ({
  title,
  category,
  active = false,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  const categoryAccent = useMemo(() => {
    switch (category) {
      case 'core':
        return '#5B4BDB';
      case 'syntax':
        return '#1687C8';
      case 'workbench':
        return '#218739';
      default:
        return '#596273';
    }
  }, [category]);

  const handleAction = useCallback(() => {
    setClickCount((count) => count + 1);
    onSelect(title);
  }, [title, onSelect]);

  useEffect(() => {
    if (active) {
      document.title = `Elaris — ${title} Enabled`;
    }
  }, [active, title]);

  return (
    <article
      className={`daylight-card ${active ? 'daylight-card--active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: isHovered || active ? categoryAccent : '#D9DEE7',
      }}
    >
      <header className="daylight-card__header">
        <span className="badge-dot" style={{ backgroundColor: categoryAccent }} />
        <h3 className="card-heading">{title}</h3>
      </header>

      <p className="card-summary">
        Designed for focused daylight coding with open airy surfaces and crisp contrast.
      </p>

      <footer className="daylight-card__footer">
        <button
          type="button"
          onClick={handleAction}
          className="btn-select"
          disabled={active}
        >
          {active ? 'Active Profile' : `Enable ${title}`}
        </button>
        {clickCount > 0 && <span className="counter-label">Toggled {clickCount}x</span>}
      </footer>
    </article>
  );
};
