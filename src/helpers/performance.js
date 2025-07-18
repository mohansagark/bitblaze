/**
 * Performance monitoring and optimization utilities
 */

import React from 'react';

// Performance metrics tracker

import { isFeatureEnabled, isDevelopment } from './environment';
import { PERFORMANCE } from './constants';

/**
 * Performance monitor class for tracking render times and memory usage
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.enabled = isFeatureEnabled('performance_monitoring');
  }

  /**
   * Start measuring performance for a component
   * @param {string} componentName - Name of the component
   * @returns {function} Function to end measurement
   */
  measureRender(componentName) {
    if (!this.enabled) return () => {};

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      this.recordMetric(componentName, 'renderTime', renderTime);

      if (renderTime > PERFORMANCE.SLOW_RENDER_THRESHOLD && isDevelopment()) {
        // Slow render detection disabled
      }
    };
  }

  /**
   * Record a custom metric
   * @param {string} category - Metric category
   * @param {string} name - Metric name
   * @param {number} value - Metric value
   */
  recordMetric(category, name, value) {
    if (!this.enabled) return;

    const key = `${category}.${name}`;
    if (!this.metrics.has(key)) {
      this.metrics.set(key, []);
    }

    this.metrics.get(key).push({
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Get performance metrics for a category
   * @param {string} category - Metric category
   * @returns {object} Metrics summary
   */
  getMetrics(category) {
    const categoryMetrics = {};

    for (const [key, values] of this.metrics) {
      if (key.startsWith(category)) {
        const metricName = key.split('.')[1];
        categoryMetrics[metricName] = {
          count: values.length,
          average: values.reduce((sum, m) => sum + m.value, 0) / values.length,
          min: Math.min(...values.map(m => m.value)),
          max: Math.max(...values.map(m => m.value)),
          latest: values[values.length - 1]?.value,
        };
      }
    }

    return categoryMetrics;
  }

  /**
   * Monitor memory usage
   * @returns {object} Memory usage information
   */
  getMemoryUsage() {
    if (!this.enabled || !performance.memory) return null;

    const memory = performance.memory;
    const usage = {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    };

    if (usage.used > PERFORMANCE.MEMORY_THRESHOLD && isDevelopment()) {
      // High memory usage detected, disabled logging
    }
    return usage;
  }

  /**
   * Monitor Core Web Vitals
   */
  measureWebVitals() {
    if (!this.enabled || typeof window === 'undefined') return;

    // LCP (Largest Contentful Paint)
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('webVitals', 'LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        this.recordMetric('webVitals', 'FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.recordMetric('webVitals', 'CLS', clsValue);
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  /**
   * Generate performance report
   * @returns {object} Complete performance report
   */
  generateReport() {
    if (!this.enabled) return null;

    return {
      components: this.getMetrics('component'),
      games: this.getMetrics('game'),
      webVitals: this.getMetrics('webVitals'),
      memory: this.getMemoryUsage(),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics.clear();
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for performance monitoring
 * @param {string} componentName - Name of the component to monitor
 * @returns {object} Performance monitoring utilities
 */
export const usePerformanceMonitor = componentName => {
  const measureRender = () => performanceMonitor.measureRender(componentName);

  const recordCustomMetric = (name, value) => {
    performanceMonitor.recordMetric(componentName, name, value);
  };

  return {
    measureRender,
    recordCustomMetric,
    getMetrics: () => performanceMonitor.getMetrics(componentName),
  };
};

/**
 * Higher-order component for automatic performance monitoring
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {string} componentName - Name for monitoring
 * @returns {React.Component} Wrapped component with performance monitoring
 */
export const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  return function PerformanceMonitoredComponent(props) {
    const endMeasurement = performanceMonitor.measureRender(componentName || WrappedComponent.name);

    React.useEffect(() => {
      endMeasurement();
    });

    return React.createElement(WrappedComponent, props);
  };
};

/**
 * Decorator for measuring function execution time
 * @param {function} fn - Function to measure
 * @param {string} name - Name for the measurement
 * @returns {function} Wrapped function with timing
 */
export const measureExecutionTime = (fn, name) => {
  return function (...args) {
    const startTime = performance.now();
    const result = fn.apply(this, args);
    const endTime = performance.now();

    performanceMonitor.recordMetric('functions', name, endTime - startTime);

    return result;
  };
};

/**
 * Initialize performance monitoring
 */
export const initializePerformanceMonitoring = () => {
  if (performanceMonitor.enabled) {
    performanceMonitor.measureWebVitals();
  }
};

export default performanceMonitor;
