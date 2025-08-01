import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
  autoScroll = false,
  autoScrollSpeed = 0.5,
  autoScrollPause = 2000,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const autoScrollIntervalRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);
  const isAutoScrollingRef = useRef(false);
  const autoScrollDirectionRef = useRef(1); // 1 for down, -1 for up

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].offsetTop;
          const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform || 
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner'),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientationHandler: true,
      normalizeWheel: true,
      wheelMultiplier: 1,
      touchInertiaMultiplier: 35,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertia: 0.6,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  // Auto scroll functionality - ultra smooth version without jitter
  const startAutoScroll = useCallback(() => {
    if (!autoScroll) {
      console.log('Auto scroll disabled');
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) {
      console.log('No scroller element found');
      return;
    }

    console.log('Starting ultra smooth auto scroll...');
    isAutoScrollingRef.current = true;
    let currentPosition = scroller.scrollTop;
    let targetPosition = scroller.scrollTop;
    let scrollDirection = autoScrollDirectionRef.current;

    const performSmoothAutoScroll = () => {
      if (!isAutoScrollingRef.current) return;

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      
      // Calculate target position
      targetPosition += (autoScrollSpeed * 0.5 * scrollDirection);
      
      // Check boundaries and reverse direction if needed
      if (targetPosition >= maxScroll) {
        targetPosition = maxScroll;
        scrollDirection = -1;
        autoScrollDirectionRef.current = -1;
        console.log('Reached bottom, reversing direction');
        // Pause at bottom
        setTimeout(() => {
          if (isAutoScrollingRef.current) {
            autoScrollIntervalRef.current = requestAnimationFrame(performSmoothAutoScroll);
          }
        }, autoScrollPause);
        return;
      } else if (targetPosition <= 0) {
        targetPosition = 0;
        scrollDirection = 1;
        autoScrollDirectionRef.current = 1;
        console.log('Reached top, reversing direction');
        // Pause at top
        setTimeout(() => {
          if (isAutoScrollingRef.current) {
            autoScrollIntervalRef.current = requestAnimationFrame(performSmoothAutoScroll);
          }
        }, autoScrollPause);
        return;
      }

      // Smooth interpolation to prevent jitter
      currentPosition += (targetPosition - currentPosition) * 0.08; // Very gentle easing
      
      // Apply scroll using Lenis if available, otherwise direct
      if (lenisRef.current) {
        lenisRef.current.scrollTo(currentPosition, { immediate: true });
      } else {
        scroller.scrollTop = currentPosition;
      }
      
      // Continue animation
      autoScrollIntervalRef.current = requestAnimationFrame(performSmoothAutoScroll);
    };

    // Start auto scroll after initial delay
    autoScrollTimeoutRef.current = setTimeout(() => {
      console.log('Starting ultra smooth auto scroll animation');
      performSmoothAutoScroll();
    }, 2000);
  }, [autoScroll, autoScrollSpeed, autoScrollPause]);

  const stopAutoScroll = useCallback(() => {
    isAutoScrollingRef.current = false;
    if (autoScrollIntervalRef.current) {
      cancelAnimationFrame(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = null;
    }
  }, []);

  // Handle user interaction
  const handleUserInteraction = useCallback(() => {
    if (autoScroll) {
      stopAutoScroll();
      // Resume auto scroll after user stops interacting
      clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = setTimeout(() => {
        startAutoScroll();
      }, 3000); // Resume after 3 seconds of inactivity
    }
  }, [autoScroll, stopAutoScroll, startAutoScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    setupLenis();
    updateCardTransforms();

    // Add event listeners for user interaction
    const handleWheel = () => handleUserInteraction();
    const handleTouchStart = () => handleUserInteraction();
    const handleMouseDown = () => handleUserInteraction();

    scroller.addEventListener('wheel', handleWheel, { passive: true });
    scroller.addEventListener('touchstart', handleTouchStart, { passive: true });
    scroller.addEventListener('mousedown', handleMouseDown);

    // Start auto scroll if enabled
    if (autoScroll) {
      // Wait a bit longer for Lenis to be fully initialized
      setTimeout(() => {
        console.log('Attempting to start auto scroll, Lenis ready:', !!lenisRef.current);
        startAutoScroll();
      }, 2000);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stopAutoScroll();
      
      scroller.removeEventListener('wheel', handleWheel);
      scroller.removeEventListener('touchstart', handleTouchStart);
      scroller.removeEventListener('mousedown', handleMouseDown);
      
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
    autoScroll,
    autoScrollSpeed,
    autoScrollPause,
    setupLenis,
    updateCardTransforms,
    startAutoScroll,
    stopAutoScroll,
    handleUserInteraction,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
