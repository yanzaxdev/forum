// useTabs.ts
import { useCallback, useEffect, useState } from "react";
import { type TabItem } from "./_components/types";
import { type CarouselApi } from "~/components/ui/carousel";

export function useTabs(tabs: TabItem[]) {
  const [activeTab, setActiveTab] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (!api) return;

      const hash = window.location.hash.slice(1);
      const tabIndex = tabs.findIndex((tab) => tab.id === hash);
      if (tabIndex !== -1) {
        const distance = Math.abs(tabIndex - activeTab);
        if (distance > 1) {
          setSkipAnimation(true);
          api.scrollTo(tabIndex);
          setTimeout(() => setSkipAnimation(false), 50);
        } else {
          api.scrollTo(tabIndex);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [api, tabs, activeTab]);

  // Handle carousel sync
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setActiveTab(selectedIndex);

      const tabId = tabs[selectedIndex]?.id;
      if (tabId && window.location.hash !== `#${tabId}`) {
        window.history.pushState(null, "", `#${tabId}`);
      }
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, tabs]);

  // Handle tab changes
  const handleTabClick = useCallback(
    (index: number) => {
      if (!api) return;

      const distance = Math.abs(index - activeTab);
      if (distance > 1) {
        setSkipAnimation(true);
        api.scrollTo(index);
        setTimeout(() => setSkipAnimation(false), 50);
      } else {
        api.scrollTo(index);
      }
    },
    [api, activeTab],
  );

  return {
    activeTab,
    setApi,
    skipAnimation,
    handleTabClick,
    api,
  };
}
