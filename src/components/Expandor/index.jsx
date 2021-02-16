import React, { useEffect, useState } from 'react';

function Expandor({ isSectionExpanded, heading, children, onToggle, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isSectionExpanded !== isExpanded) {
      setIsExpanded(isSectionExpanded);
    }
  }, [isSectionExpanded]);

  function toggleSection() {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(!isExpanded);
    }
  }

  return (
    <section className={isExpanded ? 'expandor expanded' : 'expandor'}>
      <div
        className="section-header"
        onClick={toggleSection}
        onKeyDown={toggleSection}
        role="menuitem"
        tabIndex={index}
      >
        <h3>{heading}</h3>
        <img src="/images/arrow.svg" width="20" alt="toggle section" />
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}

export default Expandor;
