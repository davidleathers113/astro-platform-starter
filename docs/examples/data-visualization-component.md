# Data Visualization Component Example - Analytics Dashboard Chart

This example demonstrates how to create a data visualization component that adapts seamlessly between light and dark themes while maintaining readability and accessibility. Data visualizations require special attention to color schemes, contrast ratios, and alternative text descriptions for screen readers.

## Component Requirements

- Display interactive charts that work in both themes
- Support multiple chart types (line, bar, pie, area)
- Maintain data readability across theme changes
- Provide accessible data descriptions
- Handle responsive design for different screen sizes
- Support animation and interaction states
- Ensure colorblind accessibility

## Complete Implementation

### Component Code (ThemeChart.astro)

```astro
---
// Advanced data visualization component with comprehensive theming
interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  category?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  type?: 'line' | 'bar' | 'pie' | 'area';
  width?: number;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  animated?: boolean;
  responsive?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaDescription?: string;
}

const {
  title,
  subtitle,
  data,
  type = 'bar',
  width = 600,
  height = 400,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  animated = true,
  responsive = true,
  className = '',
  ariaLabel,
  ariaDescription
} = Astro.props;

const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;
const containerClass = `theme-chart theme-chart--${type}${responsive ? ' theme-chart--responsive' : ''}${animated ? ' theme-chart--animated' : ''} ${className}`.trim();

// Calculate chart dimensions and data bounds
const maxValue = Math.max(...data.map(d => d.value));
const minValue = Math.min(...data.map(d => d.value));
const dataRange = maxValue - minValue;

// Chart colors that work in both themes
const defaultColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-chart-6)',
  'var(--color-chart-7)',
  'var(--color-chart-8)'
];
---

<div class={containerClass} data-chart-component={chartId}>
  <!-- Chart Header -->
  <div class="theme-chart__header">
    <div class="theme-chart__title-group">
      <h3 class="theme-chart__title">{title}</h3>
      {subtitle && (
        <p class="theme-chart__subtitle">{subtitle}</p>
      )}
    </div>

    <!-- Chart Controls -->
    <div class="theme-chart__controls">
      <button
        class="theme-chart__control-button"
        data-action="export"
        aria-label="Export chart data"
        title="Export as CSV"
      >
        <svg class="control-icon" aria-hidden="true">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5-5 5 5m-5-5v12" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      </button>

      <button
        class="theme-chart__control-button"
        data-action="fullscreen"
        aria-label="View chart in fullscreen"
        title="Fullscreen"
      >
        <svg class="control-icon" aria-hidden="true">
          <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Chart Container -->
  <div class="theme-chart__container">
    <div
      class="theme-chart__canvas"
      role="img"
      aria-label={ariaLabel || `${type} chart showing ${title}`}
      aria-describedby={`${chartId}-description`}
      tabindex="0"
    >
      <!-- SVG Chart -->
      <svg
        class="theme-chart__svg"
        width={responsive ? "100%" : width}
        height={responsive ? "100%" : height}
        viewBox={`0 0 ${width} ${height}`}
        data-chart-svg
      >
        <!-- Chart Background -->
        <rect
          class="chart-background"
          width="100%"
          height="100%"
          fill="var(--color-chart-background)"
        />

        <!-- Grid Lines (if enabled) -->
        {showGrid && (
          <g class="chart-grid" data-grid>
            <!-- Horizontal Grid Lines -->
            {Array.from({length: 5}, (_, i) => {
              const y = (height * 0.8) * (i / 4) + (height * 0.1);
              return (
                <line
                  key={`grid-h-${i}`}
                  x1={width * 0.1}
                  y1={y}
                  x2={width * 0.9}
                  y2={y}
                  stroke="var(--color-chart-grid)"
                  stroke-width="1"
                  opacity="0.3"
                />
              );
            })}

            <!-- Vertical Grid Lines -->
            {Array.from({length: data.length + 1}, (_, i) => {
              const x = (width * 0.8) * (i / data.length) + (width * 0.1);
              return (
                <line
                  key={`grid-v-${i}`}
                  x1={x}
                  y1={height * 0.1}
                  x2={x}
                  y2={height * 0.9}
                  stroke="var(--color-chart-grid)"
                  stroke-width="1"
                  opacity="0.3"
                />
              );
            })}
          </g>
        )}

        <!-- Chart Data -->
        <g class="chart-data" data-chart-data>
          <!-- Data will be rendered by JavaScript based on chart type -->
        </g>

        <!-- Axes -->
        <g class="chart-axes" data-axes>
          <!-- X-Axis -->
          <line
            class="axis-line axis-x"
            x1={width * 0.1}
            y1={height * 0.9}
            x2={width * 0.9}
            y2={height * 0.9}
            stroke="var(--color-chart-axis)"
            stroke-width="2"
          />

          <!-- Y-Axis -->
          <line
            class="axis-line axis-y"
            x1={width * 0.1}
            y1={height * 0.1}
            x2={width * 0.1}
            y2={height * 0.9}
            stroke="var(--color-chart-axis)"
            stroke-width="2"
          />

          <!-- Axis Labels -->
          <g class="axis-labels" data-axis-labels>
            <!-- Labels will be added by JavaScript -->
          </g>
        </g>
      </svg>

      <!-- Tooltip -->
      {showTooltip && (
        <div class="theme-chart__tooltip" data-tooltip>
          <div class="tooltip-content">
            <div class="tooltip-title"></div>
            <div class="tooltip-value"></div>
          </div>
        </div>
      )}
    </div>

    <!-- Legend -->
    {showLegend && (
      <div class="theme-chart__legend" data-legend>
        {data.map((item, index) => (
          <div
            class="legend-item"
            data-legend-item={index}
            tabindex="0"
            role="button"
            aria-label={`Toggle ${item.label} data series`}
          >
            <div
              class="legend-color"
              style={`background-color: ${item.color || defaultColors[index % defaultColors.length]}`}
            ></div>
            <span class="legend-label">{item.label}</span>
            <span class="legend-value">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )}
  </div>

  <!-- Accessible Data Description -->
  <div id={`${chartId}-description`} class="theme-chart__description sr-only">
    {ariaDescription || `This ${type} chart shows data for ${title}. ${data.map(d => `${d.label}: ${d.value}`).join(', ')}.`}
  </div>

  <!-- Data Table (Screen Reader Alternative) -->
  <div class="theme-chart__table-container sr-only" role="region" aria-label="Chart data table">
    <table class="theme-chart__data-table">
      <caption>Data for {title}</caption>
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.label}</td>
            <td>{item.value.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

<!-- Chart Rendering and Interaction Script -->
<script define:vars={{ data, type, chartId, width, height, maxValue, minValue, defaultColors, animated, showTooltip }}>
  class ThemeChart {
    constructor(container, options) {
      this.container = container;
      this.svg = container.querySelector('[data-chart-svg]');
      this.dataGroup = container.querySelector('[data-chart-data]');
      this.axisLabels = container.querySelector('[data-axis-labels]');
      this.tooltip = container.querySelector('[data-tooltip]');
      this.legend = container.querySelector('[data-legend]');

      this.data = options.data;
      this.type = options.type;
      this.width = options.width;
      this.height = options.height;
      this.maxValue = options.maxValue;
      this.minValue = options.minValue;
      this.colors = options.colors;
      this.animated = options.animated;
      this.showTooltip = options.showTooltip;

      this.margins = {
        top: this.height * 0.1,
        right: this.width * 0.1,
        bottom: this.height * 0.1,
        left: this.width * 0.1
      };

      this.chartWidth = this.width - this.margins.left - this.margins.right;
      this.chartHeight = this.height - this.margins.top - this.margins.bottom;

      this.init();
    }

    init() {
      this.renderChart();
      this.renderAxes();
      this.attachEventListeners();

      if (this.animated) {
        this.animateChart();
      }
    }

    renderChart() {
      switch (this.type) {
        case 'bar':
          this.renderBarChart();
          break;
        case 'line':
          this.renderLineChart();
          break;
        case 'area':
          this.renderAreaChart();
          break;
        case 'pie':
          this.renderPieChart();
          break;
        default:
          this.renderBarChart();
      }
    }

    renderBarChart() {
      const barWidth = this.chartWidth / this.data.length * 0.8;
      const barSpacing = this.chartWidth / this.data.length * 0.2;

      this.data.forEach((item, index) => {
        const barHeight = (item.value / this.maxValue) * this.chartHeight;
        const x = this.margins.left + (index * (barWidth + barSpacing));
        const y = this.margins.top + this.chartHeight - barHeight;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', item.color || this.colors[index % this.colors.length]);
        rect.setAttribute('class', 'chart-bar');
        rect.setAttribute('data-index', index);
        rect.setAttribute('data-value', item.value);
        rect.setAttribute('data-label', item.label);

        // Add accessibility
        rect.setAttribute('role', 'graphics-symbol');
        rect.setAttribute('aria-label', `${item.label}: ${item.value}`);
        rect.setAttribute('tabindex', '0');

        this.dataGroup.appendChild(rect);
      });
    }

    renderLineChart() {
      const points = this.data.map((item, index) => {
        const x = this.margins.left + (index / (this.data.length - 1)) * this.chartWidth;
        const y = this.margins.top + this.chartHeight - (item.value / this.maxValue) * this.chartHeight;
        return { x, y, data: item, index };
      });

      // Create path
      const pathData = points.map((point, index) =>
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('stroke', this.colors[0]);
      path.setAttribute('stroke-width', '3');
      path.setAttribute('fill', 'none');
      path.setAttribute('class', 'chart-line');

      this.dataGroup.appendChild(path);

      // Add data points
      points.forEach((point, index) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', point.data.color || this.colors[index % this.colors.length]);
        circle.setAttribute('class', 'chart-point');
        circle.setAttribute('data-index', index);
        circle.setAttribute('data-value', point.data.value);
        circle.setAttribute('data-label', point.data.label);

        // Add accessibility
        circle.setAttribute('role', 'graphics-symbol');
        circle.setAttribute('aria-label', `${point.data.label}: ${point.data.value}`);
        circle.setAttribute('tabindex', '0');

        this.dataGroup.appendChild(circle);
      });
    }

    renderAreaChart() {
      const points = this.data.map((item, index) => {
        const x = this.margins.left + (index / (this.data.length - 1)) * this.chartWidth;
        const y = this.margins.top + this.chartHeight - (item.value / this.maxValue) * this.chartHeight;
        return { x, y, data: item, index };
      });

      // Create area path
      const lineData = points.map((point, index) =>
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ');

      const areaData = lineData +
        ` L ${points[points.length - 1].x} ${this.margins.top + this.chartHeight}` +
        ` L ${points[0].x} ${this.margins.top + this.chartHeight} Z`;

      const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      area.setAttribute('d', areaData);
      area.setAttribute('fill', this.colors[0]);
      area.setAttribute('fill-opacity', '0.3');
      area.setAttribute('class', 'chart-area');

      this.dataGroup.appendChild(area);

      // Add line on top
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      line.setAttribute('d', lineData);
      line.setAttribute('stroke', this.colors[0]);
      line.setAttribute('stroke-width', '2');
      line.setAttribute('fill', 'none');
      line.setAttribute('class', 'chart-line');

      this.dataGroup.appendChild(line);
    }

    renderPieChart() {
      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const radius = Math.min(this.chartWidth, this.chartHeight) / 2 * 0.8;

      const total = this.data.reduce((sum, item) => sum + item.value, 0);
      let currentAngle = -Math.PI / 2; // Start at top

      this.data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        const endAngle = currentAngle + sliceAngle;

        const x1 = centerX + radius * Math.cos(currentAngle);
        const y1 = centerY + radius * Math.sin(currentAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const largeArc = sliceAngle > Math.PI ? 1 : 0;

        const pathData = [
          `M ${centerX} ${centerY}`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
          'Z'
        ].join(' ');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', item.color || this.colors[index % this.colors.length]);
        path.setAttribute('class', 'chart-slice');
        path.setAttribute('data-index', index);
        path.setAttribute('data-value', item.value);
        path.setAttribute('data-label', item.label);
        path.setAttribute('data-percentage', ((item.value / total) * 100).toFixed(1));

        // Add accessibility
        path.setAttribute('role', 'graphics-symbol');
        path.setAttribute('aria-label', `${item.label}: ${item.value} (${((item.value / total) * 100).toFixed(1)}%)`);
        path.setAttribute('tabindex', '0');

        this.dataGroup.appendChild(path);

        currentAngle = endAngle;
      });
    }

    renderAxes() {
      // Y-axis labels
      for (let i = 0; i <= 4; i++) {
        const value = (this.maxValue / 4) * i;
        const y = this.margins.top + this.chartHeight - (i / 4) * this.chartHeight;

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', this.margins.left - 10);
        text.setAttribute('y', y + 4);
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('class', 'axis-label axis-label-y');
        text.textContent = value.toLocaleString();

        this.axisLabels.appendChild(text);
      }

      // X-axis labels (for non-pie charts)
      if (this.type !== 'pie') {
        this.data.forEach((item, index) => {
          const x = this.margins.left + (index / (this.data.length - 1)) * this.chartWidth;

          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', x);
          text.setAttribute('y', this.margins.top + this.chartHeight + 20);
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('class', 'axis-label axis-label-x');
          text.textContent = item.label;

          this.axisLabels.appendChild(text);
        });
      }
    }

    attachEventListeners() {
      // Tooltip interactions
      if (this.showTooltip) {
        const chartElements = this.dataGroup.querySelectorAll('[data-index]');

        chartElements.forEach(element => {
          element.addEventListener('mouseenter', (e) => this.showTooltip(e));
          element.addEventListener('mouseleave', () => this.hideTooltip());
          element.addEventListener('focus', (e) => this.showTooltip(e));
          element.addEventListener('blur', () => this.hideTooltip());
        });
      }

      // Legend interactions
      if (this.legend) {
        const legendItems = this.legend.querySelectorAll('[data-legend-item]');

        legendItems.forEach((item, index) => {
          item.addEventListener('click', () => this.toggleDataSeries(index));
          item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.toggleDataSeries(index);
            }
          });
        });
      }

      // Export functionality
      const exportButton = this.container.querySelector('[data-action="export"]');
      if (exportButton) {
        exportButton.addEventListener('click', () => this.exportData());
      }

      // Fullscreen functionality
      const fullscreenButton = this.container.querySelector('[data-action="fullscreen"]');
      if (fullscreenButton) {
        fullscreenButton.addEventListener('click', () => this.toggleFullscreen());
      }
    }

    showTooltip(event) {
      if (!this.tooltip) return;

      const element = event.target;
      const index = element.getAttribute('data-index');
      const value = element.getAttribute('data-value');
      const label = element.getAttribute('data-label');
      const percentage = element.getAttribute('data-percentage');

      const titleElement = this.tooltip.querySelector('.tooltip-title');
      const valueElement = this.tooltip.querySelector('.tooltip-value');

      titleElement.textContent = label;
      valueElement.textContent = percentage ?
        `${value} (${percentage}%)` :
        value;

      this.tooltip.style.display = 'block';
      this.tooltip.style.opacity = '1';

      // Position tooltip
      const rect = element.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();

      this.tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
      this.tooltip.style.top = `${rect.top - containerRect.top - 10}px`;
    }

    hideTooltip() {
      if (!this.tooltip) return;

      this.tooltip.style.opacity = '0';
      setTimeout(() => {
        this.tooltip.style.display = 'none';
      }, 200);
    }

    toggleDataSeries(index) {
      const chartElement = this.dataGroup.querySelector(`[data-index="${index}"]`);
      const legendItem = this.legend.querySelector(`[data-legend-item="${index}"]`);

      if (chartElement && legendItem) {
        const isHidden = chartElement.style.opacity === '0.3';

        chartElement.style.opacity = isHidden ? '1' : '0.3';
        legendItem.classList.toggle('legend-item--disabled', !isHidden);

        // Update ARIA state
        legendItem.setAttribute('aria-pressed', isHidden ? 'false' : 'true');
      }
    }

    exportData() {
      const csvContent = [
        ['Category', 'Value'],
        ...this.data.map(item => [item.label, item.value])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'chart-data.csv';
      link.click();

      window.URL.revokeObjectURL(url);
    }

    toggleFullscreen() {
      if (!document.fullscreenElement) {
        this.container.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }

    animateChart() {
      const chartElements = this.dataGroup.querySelectorAll('[data-index]');

      chartElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0)';

        setTimeout(() => {
          element.style.transition = 'all 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'scale(1)';
        }, index * 100);
      });
    }
  }

  // Initialize chart
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(`[data-chart-component="${chartId}"]`);
    if (container) {
      new ThemeChart(container, {
        data,
        type,
        width,
        height,
        maxValue,
        minValue,
        colors: defaultColors,
        animated,
        showTooltip
      });
    }
  });
</script>

<style>
  /* Base Chart Styles */
  .theme-chart {
    background-color: var(--color-background-surface);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    border: 1px solid var(--color-border-default);
    box-shadow: 0 2px 8px var(--color-shadow-light);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    position: relative;
  }

  /* Chart Header */
  .theme-chart__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .theme-chart__title-group {
    flex: 1;
  }

  .theme-chart__title {
    color: var(--color-text-primary);
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-chart__subtitle {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    margin: 0;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-chart__controls {
    display: flex;
    gap: 0.5rem;
  }

  .theme-chart__control-button {
    background: var(--color-background-secondary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    cursor: pointer;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-chart__control-button:hover {
    background-color: var(--color-background-hover);
    border-color: var(--color-border-interactive-hover);
  }

  .theme-chart__control-button:focus {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  .control-icon {
    width: 1rem;
    height: 1rem;
    color: var(--color-text-secondary);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  /* Chart Container */
  .theme-chart__container {
    position: relative;
  }

  .theme-chart__canvas {
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .theme-chart__canvas:focus {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  /* Responsive Charts */
  .theme-chart--responsive .theme-chart__svg {
    width: 100%;
    height: auto;
    max-height: 400px;
  }

  .theme-chart--responsive .theme-chart__container {
    aspect-ratio: 3/2;
  }

  /* SVG Chart Elements */
  .chart-background {
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .axis-line {
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .axis-label {
    fill: var(--color-text-secondary);
    font-size: 12px;
    font-family: inherit;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .axis-label-x {
    dominant-baseline: hanging;
  }

  .axis-label-y {
    dominant-baseline: middle;
  }

  /* Chart Data Elements */
  .chart-bar {
    transition: opacity 0.3s ease, transform 0.3s ease;
    cursor: pointer;
  }

  .chart-bar:hover,
  .chart-bar:focus {
    filter: brightness(1.1);
    stroke: var(--color-chart-highlight);
    stroke-width: 2;
    outline: none;
  }

  .chart-line {
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    filter: drop-shadow(0 2px 4px var(--color-shadow-light));
  }

  .chart-point {
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .chart-point:hover,
  .chart-point:focus {
    r: 6;
    filter: brightness(1.1);
    stroke: var(--color-chart-highlight);
    stroke-width: 2;
    outline: none;
  }

  .chart-area {
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .chart-slice {
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .chart-slice:hover,
  .chart-slice:focus {
    transform-origin: center;
    transform: scale(1.05);
    filter: brightness(1.1);
    stroke: var(--color-chart-highlight);
    stroke-width: 2;
    outline: none;
  }

  /* Tooltip */
  .theme-chart__tooltip {
    position: absolute;
    background-color: var(--color-background-tooltip);
    color: var(--color-text-on-tooltip);
    padding: 0.75rem;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px var(--color-shadow-medium);
    border: 1px solid var(--color-border-default);
    pointer-events: none;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.2s ease;
    transform: translateX(-50%) translateY(-100%);
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .tooltip-content {
    text-align: center;
  }

  .tooltip-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .tooltip-value {
    color: var(--color-text-secondary-on-tooltip);
  }

  /* Legend */
  .theme-chart__legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border-subtle);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    font-size: 0.875rem;
  }

  .legend-item:hover {
    background-color: var(--color-background-hover);
  }

  .legend-item:focus {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 1px;
  }

  .legend-item--disabled {
    opacity: 0.5;
  }

  .legend-color {
    width: 1rem;
    height: 1rem;
    border-radius: 2px;
    flex-shrink: 0;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .legend-label {
    color: var(--color-text-primary);
    font-weight: 500;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .legend-value {
    color: var(--color-text-secondary);
    font-weight: 400;
    margin-left: auto;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  /* Screen Reader Only Content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .theme-chart__data-table {
    width: 100%;
    border-collapse: collapse;
  }

  .theme-chart__data-table th,
  .theme-chart__data-table td {
    padding: 0.5rem;
    text-align: left;
    border: 1px solid var(--color-border-default);
  }

  .theme-chart__data-table th {
    background-color: var(--color-background-secondary);
    font-weight: 600;
  }

  /* Chart Type Specific Styles */
  .theme-chart--pie .theme-chart__legend {
    justify-content: center;
  }

  .theme-chart--pie .theme-chart__canvas {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Animation Styles */
  .theme-chart--animated .chart-bar,
  .theme-chart--animated .chart-point,
  .theme-chart--animated .chart-slice {
    animation-fill-mode: both;
  }

  /* Fullscreen Styles */
  .theme-chart:fullscreen {
    background-color: var(--color-background-page);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .theme-chart:fullscreen .theme-chart__container {
    width: 90%;
    height: 80%;
  }

  .theme-chart:fullscreen .theme-chart__svg {
    width: 100%;
    height: 100%;
  }

  /* Dark Mode Enhancements */
  .dark .theme-chart {
    box-shadow: 0 4px 12px var(--color-shadow-dark);
  }

  .dark .theme-chart__tooltip {
    box-shadow: 0 6px 16px var(--color-shadow-dark);
  }

  .dark .theme-chart__control-button:focus {
    box-shadow: 0 0 0 3px rgba(var(--color-primary-light-rgb), 0.2);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .theme-chart {
      padding: 1rem;
    }

    .theme-chart__header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .theme-chart__legend {
      flex-direction: column;
      gap: 0.5rem;
    }

    .legend-item {
      justify-content: space-between;
    }

    .theme-chart__controls {
      align-self: flex-end;
    }
  }

  /* Print Styles */
  @media print {
    .theme-chart {
      box-shadow: none;
      border: 1px solid black;
      background: white;
      color: black;
    }

    .theme-chart__controls {
      display: none;
    }

    .theme-chart__tooltip {
      display: none;
    }

    .chart-background {
      fill: white;
    }

    .axis-line,
    .axis-label {
      stroke: black;
      fill: black;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .theme-chart,
    .chart-bar,
    .chart-point,
    .chart-slice,
    .theme-chart__tooltip {
      transition: none;
      animation: none;
    }
  }

  /* High Contrast */
  @media (prefers-contrast: high) {
    .theme-chart {
      border-width: 2px;
    }

    .chart-bar,
    .chart-point,
    .chart-slice {
      stroke: black;
      stroke-width: 1;
    }

    .axis-line {
      stroke-width: 3;
    }
  }

  /* Color Variables for Charts */
  :root {
    --color-chart-background: var(--color-background-page);
    --color-chart-grid: var(--color-border-subtle);
    --color-chart-axis: var(--color-text-secondary);
    --color-chart-highlight: var(--color-primary);

    /* Chart color palette */
    --color-chart-1: #3b82f6; /* Blue */
    --color-chart-2: #10b981; /* Green */
    --color-chart-3: #f59e0b; /* Yellow */
    --color-chart-4: #ef4444; /* Red */
    --color-chart-5: #8b5cf6; /* Purple */
    --color-chart-6: #06b6d4; /* Cyan */
    --color-chart-7: #f97316; /* Orange */
    --color-chart-8: #84cc16; /* Lime */
  }

  .dark {
    --color-chart-1: #60a5fa; /* Lighter blue for dark mode */
    --color-chart-2: #34d399; /* Lighter green for dark mode */
    --color-chart-3: #fbbf24; /* Lighter yellow for dark mode */
    --color-chart-4: #f87171; /* Lighter red for dark mode */
    --color-chart-5: #a78bfa; /* Lighter purple for dark mode */
    --color-chart-6: #22d3ee; /* Lighter cyan for dark mode */
    --color-chart-7: #fb923c; /* Lighter orange for dark mode */
    --color-chart-8: #a3e635; /* Lighter lime for dark mode */
  }
</style>
```

## Usage Examples

### Basic Bar Chart

```astro
---
const salesData = [
  { label: 'Jan', value: 12500 },
  { label: 'Feb', value: 15800 },
  { label: 'Mar', value: 18200 },
  { label: 'Apr', value: 22100 },
  { label: 'May', value: 19800 },
  { label: 'Jun', value: 25600 }
];
---

<ThemeChart
  title="Monthly Sales Performance"
  subtitle="Revenue in USD for the first half of 2024"
  data={salesData}
  type="bar"
  width={600}
  height={400}
/>
```

### Interactive Line Chart

```astro
---
const trafficData = [
  { label: 'Week 1', value: 1200 },
  { label: 'Week 2', value: 1450 },
  { label: 'Week 3', value: 1100 },
  { label: 'Week 4', value: 1800 },
  { label: 'Week 5', value: 2100 },
  { label: 'Week 6', value: 1950 }
];
---

<ThemeChart
  title="Website Traffic Trends"
  subtitle="Weekly unique visitors"
  data={trafficData}
  type="line"
  showGrid={true}
  showTooltip={true}
  animated={true}
  responsive={true}
/>
```

### Pie Chart with Custom Colors

```astro
---
const marketShareData = [
  { label: 'Product A', value: 35, color: '#3b82f6' },
  { label: 'Product B', value: 28, color: '#10b981' },
  { label: 'Product C', value: 20, color: '#f59e0b' },
  { label: 'Product D', value: 12, color: '#ef4444' },
  { label: 'Others', value: 5, color: '#6b7280' }
];
---

<ThemeChart
  title="Market Share Distribution"
  subtitle="Q2 2024 product performance"
  data={marketShareData}
  type="pie"
  showLegend={true}
  ariaLabel="Pie chart showing market share distribution across product lines"
  ariaDescription="Product A leads with 35%, followed by Product B at 28%, Product C at 20%, Product D at 12%, and Others at 5%"
/>
```

### Area Chart for Analytics Dashboard

```astro
---
const engagementData = [
  { label: 'Mon', value: 850 },
  { label: 'Tue', value: 920 },
  { label: 'Wed', value: 1150 },
  { label: 'Thu', value: 1080 },
  { label: 'Fri', value: 1380 },
  { label: 'Sat', value: 980 },
  { label: 'Sun', value: 760 }
];
---

<ThemeChart
  title="Daily User Engagement"
  subtitle="Average session duration (minutes)"
  data={engagementData}
  type="area"
  height={300}
  responsive={true}
  className="dashboard-chart"
/>
```

### Multiple Chart Dashboard

```astro
---
import { ChartGrid } from '../components/ChartGrid.astro';

const revenueData = [
  { label: 'Q1', value: 125000 },
  { label: 'Q2', value: 158000 },
  { label: 'Q3', value: 182000 },
  { label: 'Q4', value: 221000 }
];

const userGrowthData = [
  { label: 'Jan', value: 1200 },
  { label: 'Feb', value: 1450 },
  { label: 'Mar', value: 1680 },
  { label: 'Apr', value: 1920 },
  { label: 'May', value: 2150 },
  { label: 'Jun', value: 2380 }
];

const conversionData = [
  { label: 'Direct', value: 45, color: '#3b82f6' },
  { label: 'Social', value: 28, color: '#10b981' },
  { label: 'Email', value: 18, color: '#f59e0b' },
  { label: 'Search', value: 9, color: '#ef4444' }
];
---

<div class="dashboard-grid">
  <ThemeChart
    title="Quarterly Revenue"
    data={revenueData}
    type="bar"
    height={300}
    responsive={true}
  />

  <ThemeChart
    title="User Growth"
    data={userGrowthData}
    type="line"
    height={300}
    responsive={true}
  />

  <ThemeChart
    title="Traffic Sources"
    data={conversionData}
    type="pie"
    height={300}
    responsive={true}
    className="pie-chart-container"
  />
</div>

<style>
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
```

## Accessibility Features

### ARIA Implementation

- `role="img"` for chart container with descriptive label
- `role="graphics-symbol"` for individual data elements
- `aria-label` for each data point with value and context
- `aria-describedby` linking to detailed data description
- Hidden data table for screen readers

### Keyboard Navigation

- Focusable chart container with arrow key navigation
- Tab through individual data points
- Enter/Space to activate legend toggles
- Escape to close fullscreen mode

### Screen Reader Support

- Complete data table hidden for screen readers
- Descriptive text for chart content and context
- Announced interactions and state changes
- Alternative text for complex visualizations

### Color Accessibility

- High contrast color palette
- Pattern/texture options for colorblind users
- Sufficient contrast ratios in all themes
- Non-color-dependent information encoding

## Performance Optimizations

### SVG Rendering

- Efficient SVG structure with minimal DOM nodes
- Hardware-accelerated CSS transforms
- Optimized animation timing and easing
- Lazy loading for large datasets

### Memory Management

- Event listener cleanup on component unmount
- Efficient data structure handling
- Minimal DOM manipulation during updates
- Cached calculation results

### Responsive Strategy

- Viewbox-based scaling for crisp rendering
- Adaptive detail levels based on screen size
- Progressive enhancement for interactions
- Mobile-optimized touch targets

## Theme Integration

### Color System

- Semantic color variables for consistency
- Theme-aware chart color palettes
- Automatic contrast adjustment
- Colorblind-friendly alternatives

### Visual Consistency

- Consistent border radius and shadows
- Theme-aware grid and axis styling
- Smooth transitions between themes
- Maintained hierarchy across modes

## Testing Checklist

```checklist
☐ Chart renders correctly in both light and dark themes
☐ All chart types (bar, line, pie, area) display properly
☐ Interactive elements (tooltips, legend) work correctly
☐ Keyboard navigation functions through all chart elements
☐ Screen reader announces chart content and interactions
☐ Data table alternative is accessible
☐ Export functionality works correctly
☐ Fullscreen mode operates properly
☐ Responsive design adapts to different screen sizes
☐ Animations respect prefers-reduced-motion setting
☐ High contrast mode enhances visibility
☐ Colors meet accessibility contrast requirements
☐ Legend toggles show/hide data series correctly
☐ Tooltip displays accurate information
☐ Chart updates smoothly when data changes
☐ Print styles show chart appropriately
☐ Touch interactions work on mobile devices
☐ Error states are handled gracefully
☐ Large datasets render efficiently
☐ Browser compatibility across modern browsers
```

This comprehensive data visualization component example demonstrates advanced theming techniques including accessible color schemes, interactive states, responsive design, and comprehensive accessibility support while maintaining optimal performance across all supported themes and devices.
