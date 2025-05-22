# Form Component Example - Multi-State Contact Form

This example demonstrates how to create a comprehensive form component that handles multiple states (default, focus, error, success, loading, disabled) while maintaining consistent theming. Forms are critical UI components that require careful attention to accessibility, validation feedback, and state management across both light and dark themes.

## Component Requirements

- Support various input types (text, email, textarea, select, checkbox)
- Handle multiple states: default, focus, error, success, loading, disabled
- Provide real-time validation feedback
- Maintain accessibility with proper labels and ARIA attributes
- Support form submission with loading states
- Ensure consistent theming across all states and input types

## Complete Implementation

### Component Code (ThemeContactForm.astro)

```astro
---
// Comprehensive form component with all states and theming
interface Props {
  title?: string;
  subtitle?: string;
  submitText?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  action?: string;
  method?: string;
  onSubmit?: string; // JavaScript function name for custom handling
}

const {
  title = 'Contact Us',
  subtitle = 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
  submitText = 'Send Message',
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  action = '/api/contact',
  method = 'POST',
  onSubmit
} = Astro.props;

const formId = `contact-form-${Math.random().toString(36).substr(2, 9)}`;
const baseClass = 'theme-form';
const variantClass = `theme-form--${variant}`;
const sizeClass = `theme-form--${size}`;
const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();
---

<form
  id={formId}
  class={classes}
  action={action}
  method={method}
  data-form-component
  novalidate
>
  <!-- Form Header -->
  <div class="theme-form__header">
    <h2 class="theme-form__title">{title}</h2>
    {subtitle && (
      <p class="theme-form__subtitle">{subtitle}</p>
    )}
  </div>

  <!-- Form Fields -->
  <div class="theme-form__fields">

    <!-- Name Input Group -->
    <div class="theme-form__row">
      <div class="theme-form__field">
        <label for={`${formId}-first-name`} class="theme-form__label">
          First Name
          <span class="theme-form__required" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id={`${formId}-first-name`}
          name="firstName"
          class="theme-form__input"
          required
          aria-describedby={`${formId}-first-name-error`}
          data-validate="name"
        />
        <div id={`${formId}-first-name-error`} class="theme-form__error" role="alert"></div>
      </div>

      <div class="theme-form__field">
        <label for={`${formId}-last-name`} class="theme-form__label">
          Last Name
          <span class="theme-form__required" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id={`${formId}-last-name`}
          name="lastName"
          class="theme-form__input"
          required
          aria-describedby={`${formId}-last-name-error`}
          data-validate="name"
        />
        <div id={`${formId}-last-name-error`} class="theme-form__error" role="alert"></div>
      </div>
    </div>

    <!-- Email Input -->
    <div class="theme-form__field">
      <label for={`${formId}-email`} class="theme-form__label">
        Email Address
        <span class="theme-form__required" aria-label="required">*</span>
      </label>
      <input
        type="email"
        id={`${formId}-email`}
        name="email"
        class="theme-form__input"
        required
        aria-describedby={`${formId}-email-error ${formId}-email-hint`}
        data-validate="email"
      />
      <div id={`${formId}-email-hint`} class="theme-form__hint">
        We'll never share your email with anyone else.
      </div>
      <div id={`${formId}-email-error`} class="theme-form__error" role="alert"></div>
    </div>

    <!-- Phone Input -->
    <div class="theme-form__field">
      <label for={`${formId}-phone`} class="theme-form__label">
        Phone Number
        <span class="theme-form__optional">(optional)</span>
      </label>
      <input
        type="tel"
        id={`${formId}-phone`}
        name="phone"
        class="theme-form__input"
        aria-describedby={`${formId}-phone-error`}
        data-validate="phone"
        placeholder="(555) 123-4567"
      />
      <div id={`${formId}-phone-error`} class="theme-form__error" role="alert"></div>
    </div>

    <!-- Subject Select -->
    <div class="theme-form__field">
      <label for={`${formId}-subject`} class="theme-form__label">
        Subject
        <span class="theme-form__required" aria-label="required">*</span>
      </label>
      <select
        id={`${formId}-subject`}
        name="subject"
        class="theme-form__select"
        required
        aria-describedby={`${formId}-subject-error`}
      >
        <option value="">Please select a subject...</option>
        <option value="general">General Inquiry</option>
        <option value="support">Technical Support</option>
        <option value="sales">Sales Question</option>
        <option value="partnership">Partnership Opportunity</option>
        <option value="other">Other</option>
      </select>
      <div id={`${formId}-subject-error`} class="theme-form__error" role="alert"></div>
    </div>

    <!-- Priority Checkbox Group -->
    <fieldset class="theme-form__fieldset">
      <legend class="theme-form__legend">Priority Level</legend>
      <div class="theme-form__checkbox-group">
        <div class="theme-form__checkbox-item">
          <input
            type="radio"
            id={`${formId}-priority-low`}
            name="priority"
            value="low"
            class="theme-form__radio"
            checked
          />
          <label for={`${formId}-priority-low`} class="theme-form__checkbox-label">
            Low - Response within 3-5 business days
          </label>
        </div>
        <div class="theme-form__checkbox-item">
          <input
            type="radio"
            id={`${formId}-priority-medium`}
            name="priority"
            value="medium"
            class="theme-form__radio"
          />
          <label for={`${formId}-priority-medium`} class="theme-form__checkbox-label">
            Medium - Response within 1-2 business days
          </label>
        </div>
        <div class="theme-form__checkbox-item">
          <input
            type="radio"
            id={`${formId}-priority-high`}
            name="priority"
            value="high"
            class="theme-form__radio"
          />
          <label for={`${formId}-priority-high`} class="theme-form__checkbox-label">
            High - Response within 24 hours
          </label>
        </div>
      </div>
    </fieldset>

    <!-- Message Textarea -->
    <div class="theme-form__field">
      <label for={`${formId}-message`} class="theme-form__label">
        Message
        <span class="theme-form__required" aria-label="required">*</span>
      </label>
      <textarea
        id={`${formId}-message`}
        name="message"
        class="theme-form__textarea"
        rows="5"
        required
        aria-describedby={`${formId}-message-error ${formId}-message-counter`}
        data-validate="message"
        data-max-length="1000"
      ></textarea>
      <div class="theme-form__meta">
        <div id={`${formId}-message-counter`} class="theme-form__counter">
          <span class="character-count">0</span> / 1000 characters
        </div>
      </div>
      <div id={`${formId}-message-error`} class="theme-form__error" role="alert"></div>
    </div>

    <!-- Agreement Checkbox -->
    <div class="theme-form__field">
      <div class="theme-form__checkbox-item theme-form__checkbox-item--agreement">
        <input
          type="checkbox"
          id={`${formId}-agreement`}
          name="agreement"
          class="theme-form__checkbox"
          required
          aria-describedby={`${formId}-agreement-error`}
        />
        <label for={`${formId}-agreement`} class="theme-form__checkbox-label">
          I agree to the <a href="/terms" class="theme-form__link">Terms of Service</a> and
          <a href="/privacy" class="theme-form__link">Privacy Policy</a>
          <span class="theme-form__required" aria-label="required">*</span>
        </label>
      </div>
      <div id={`${formId}-agreement-error`} class="theme-form__error" role="alert"></div>
    </div>

  </div>

  <!-- Form Actions -->
  <div class="theme-form__actions">
    <button
      type="submit"
      class="theme-form__submit"
      disabled={disabled}
      data-submit-button
    >
      <span class="submit-text">{submitText}</span>
      <span class="loading-text" style="display: none;">Sending...</span>
      <svg class="loading-spinner" style="display: none;" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="62.83" stroke-dashoffset="62.83">
          <animate attributeName="stroke-dasharray" dur="2s" values="0 62.83;15.71 47.12;0 62.83" repeatCount="indefinite"/>
          <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.71;-62.83" repeatCount="indefinite"/>
        </circle>
      </svg>
    </button>

    <button type="reset" class="theme-form__reset">
      Clear Form
    </button>
  </div>

  <!-- Success Message -->
  <div class="theme-form__success" role="alert" style="display: none;">
    <svg class="success-icon" aria-hidden="true">
      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>
    <div class="success-content">
      <h3>Message Sent Successfully!</h3>
      <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
    </div>
  </div>

</form>

<!-- Form Validation and Interaction Script -->
<script>
  class ThemeContactForm {
    constructor(form) {
      this.form = form;
      this.submitButton = form.querySelector('[data-submit-button]');
      this.fields = form.querySelectorAll('[data-validate]');
      this.isSubmitting = false;

      this.validators = {
        name: (value) => {
          if (!value.trim()) return 'This field is required';
          if (value.trim().length < 2) return 'Name must be at least 2 characters';
          if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name can only contain letters, spaces, apostrophes, and hyphens';
          return null;
        },

        email: (value) => {
          if (!value.trim()) return 'Email address is required';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return 'Please enter a valid email address';
          return null;
        },

        phone: (value) => {
          if (!value.trim()) return null; // Optional field
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          const cleanPhone = value.replace(/[\s\-\(\)\.]/g, '');
          if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid phone number';
          return null;
        },

        message: (value) => {
          if (!value.trim()) return 'Message is required';
          if (value.trim().length < 10) return 'Message must be at least 10 characters';
          if (value.length > 1000) return 'Message must be 1000 characters or less';
          return null;
        }
      };

      this.init();
    }

    init() {
      // Real-time validation
      this.fields.forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => {
          this.clearFieldError(field);
          if (field.dataset.validate === 'message') {
            this.updateCharacterCounter(field);
          }
        });
      });

      // Character counter for textarea
      const messageField = this.form.querySelector('[data-validate="message"]');
      if (messageField) {
        this.updateCharacterCounter(messageField);
      }

      // Form submission
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));

      // Reset button
      const resetButton = this.form.querySelector('.theme-form__reset');
      if (resetButton) {
        resetButton.addEventListener('click', () => this.resetForm());
      }
    }

    validateField(field) {
      const validatorType = field.dataset.validate;
      const validator = this.validators[validatorType];

      if (!validator) return true;

      const error = validator(field.value);

      if (error) {
        this.showFieldError(field, error);
        return false;
      } else {
        this.clearFieldError(field);
        this.showFieldSuccess(field);
        return true;
      }
    }

    showFieldError(field, message) {
      const errorElement = document.getElementById(field.getAttribute('aria-describedby').split(' ')[0] || field.getAttribute('aria-describedby'));
      const fieldContainer = field.closest('.theme-form__field');

      field.classList.add('theme-form__input--error');
      field.classList.remove('theme-form__input--success');

      if (fieldContainer) {
        fieldContainer.classList.add('theme-form__field--error');
        fieldContainer.classList.remove('theme-form__field--success');
      }

      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      }
    }

    showFieldSuccess(field) {
      const fieldContainer = field.closest('.theme-form__field');

      field.classList.add('theme-form__input--success');
      field.classList.remove('theme-form__input--error');

      if (fieldContainer) {
        fieldContainer.classList.add('theme-form__field--success');
        fieldContainer.classList.remove('theme-form__field--error');
      }
    }

    clearFieldError(field) {
      const errorElement = document.getElementById(field.getAttribute('aria-describedby').split(' ')[0] || field.getAttribute('aria-describedby'));
      const fieldContainer = field.closest('.theme-form__field');

      field.classList.remove('theme-form__input--error', 'theme-form__input--success');

      if (fieldContainer) {
        fieldContainer.classList.remove('theme-form__field--error', 'theme-form__field--success');
      }

      if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }
    }

    updateCharacterCounter(field) {
      const maxLength = parseInt(field.dataset.maxLength || '1000');
      const currentLength = field.value.length;
      const counter = this.form.querySelector('.character-count');

      if (counter) {
        counter.textContent = currentLength;

        // Update counter color based on usage
        const counterContainer = counter.closest('.theme-form__counter');
        if (currentLength > maxLength * 0.9) {
          counterContainer.classList.add('theme-form__counter--warning');
        } else {
          counterContainer.classList.remove('theme-form__counter--warning');
        }

        if (currentLength > maxLength) {
          counterContainer.classList.add('theme-form__counter--error');
          field.classList.add('theme-form__input--error');
        } else {
          counterContainer.classList.remove('theme-form__counter--error');
          field.classList.remove('theme-form__input--error');
        }
      }
    }

    async handleSubmit(e) {
      e.preventDefault();

      if (this.isSubmitting) return;

      // Validate all fields
      let isValid = true;
      this.fields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });

      // Check required checkboxes
      const requiredCheckboxes = this.form.querySelectorAll('input[type="checkbox"][required]');
      requiredCheckboxes.forEach(checkbox => {
        if (!checkbox.checked) {
          isValid = false;
          this.showFieldError(checkbox, 'This field is required');
        }
      });

      // Check required selects
      const requiredSelects = this.form.querySelectorAll('select[required]');
      requiredSelects.forEach(select => {
        if (!select.value) {
          isValid = false;
          this.showFieldError(select, 'Please select an option');
        }
      });

      if (!isValid) {
        // Focus first error field
        const firstErrorField = this.form.querySelector('.theme-form__input--error');
        if (firstErrorField) {
          firstErrorField.focus();
        }
        return;
      }

      // Start loading state
      this.setLoadingState(true);

      try {
        // Simulate form submission (replace with actual submission logic)
        await this.submitForm();
        this.showSuccessMessage();
      } catch (error) {
        this.showSubmissionError(error.message);
      } finally {
        this.setLoadingState(false);
      }
    }

    async submitForm() {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      if (Math.random() > 0.8) {
        throw new Error('Network error. Please try again.');
      }

      return { success: true };
    }

    setLoadingState(loading) {
      this.isSubmitting = loading;

      const submitText = this.submitButton.querySelector('.submit-text');
      const loadingText = this.submitButton.querySelector('.loading-text');
      const loadingSpinner = this.submitButton.querySelector('.loading-spinner');

      this.submitButton.disabled = loading;

      if (loading) {
        submitText.style.display = 'none';
        loadingText.style.display = 'inline';
        loadingSpinner.style.display = 'inline-block';
        this.submitButton.classList.add('theme-form__submit--loading');
      } else {
        submitText.style.display = 'inline';
        loadingText.style.display = 'none';
        loadingSpinner.style.display = 'none';
        this.submitButton.classList.remove('theme-form__submit--loading');
      }
    }

    showSuccessMessage() {
      const successMessage = this.form.querySelector('.theme-form__success');
      const formFields = this.form.querySelector('.theme-form__fields');
      const formActions = this.form.querySelector('.theme-form__actions');

      formFields.style.display = 'none';
      formActions.style.display = 'none';
      successMessage.style.display = 'flex';

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Focus for screen readers
      successMessage.focus();
    }

    showSubmissionError(message) {
      // Create or show error message at form level
      let errorContainer = this.form.querySelector('.theme-form__submission-error');

      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'theme-form__submission-error';
        errorContainer.setAttribute('role', 'alert');
        this.form.insertBefore(errorContainer, this.form.querySelector('.theme-form__actions'));
      }

      errorContainer.innerHTML = `
        <svg class="error-icon" aria-hidden="true">
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
        <div class="error-content">
          <h3>Submission Failed</h3>
          <p>${message}</p>
        </div>
      `;

      errorContainer.style.display = 'flex';
      errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    resetForm() {
      // Clear all field states
      this.fields.forEach(field => {
        this.clearFieldError(field);
      });

      // Reset character counter
      const messageField = this.form.querySelector('[data-validate="message"]');
      if (messageField) {
        this.updateCharacterCounter(messageField);
      }

      // Hide any submission errors
      const errorContainer = this.form.querySelector('.theme-form__submission-error');
      if (errorContainer) {
        errorContainer.style.display = 'none';
      }

      // Show form fields if hidden
      const formFields = this.form.querySelector('.theme-form__fields');
      const formActions = this.form.querySelector('.theme-form__actions');
      const successMessage = this.form.querySelector('.theme-form__success');

      formFields.style.display = 'block';
      formActions.style.display = 'flex';
      successMessage.style.display = 'none';
    }
  }

  // Initialize all forms
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-form-component]').forEach(form => {
      new ThemeContactForm(form);
    });
  });
</script>

<style>
  /* Base Form Styles */
  .theme-form {
    background-color: var(--color-background-surface);
    border-radius: var(--border-radius-lg);
    padding: 2rem;
    border: 1px solid var(--color-border-default);
    box-shadow: 0 2px 8px var(--color-shadow-light);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    max-width: 600px;
    margin: 0 auto;
  }

  /* Form Header */
  .theme-form__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .theme-form__title {
    color: var(--color-text-primary);
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-form__subtitle {
    color: var(--color-text-secondary);
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  /* Form Fields Container */
  .theme-form__fields {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  /* Form Row for Side-by-Side Fields */
  .theme-form__row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .theme-form__row {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Individual Field Container */
  .theme-form__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Field Labels */
  .theme-form__label {
    color: var(--color-text-primary);
    font-weight: 600;
    font-size: 0.875rem;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-form__required {
    color: var(--color-error);
    margin-left: 0.25rem;
  }

  .theme-form__optional {
    color: var(--color-text-muted);
    font-weight: 400;
    font-style: italic;
    margin-left: 0.25rem;
  }

  /* Input Styles */
  .theme-form__input,
  .theme-form__select,
  .theme-form__textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    background-color: var(--color-background-input);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius);
    font-size: 1rem;
    line-height: 1.5;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    font-family: inherit;
  }

  .theme-form__input::placeholder,
  .theme-form__textarea::placeholder {
    color: var(--color-text-placeholder);
  }

  .theme-form__input:hover:not(:disabled),
  .theme-form__select:hover:not(:disabled),
  .theme-form__textarea:hover:not(:disabled) {
    border-color: var(--color-border-interactive-hover);
    background-color: var(--color-background-hover);
  }

  .theme-form__input:focus,
  .theme-form__select:focus,
  .theme-form__textarea:focus {
    outline: none;
    border-color: var(--color-border-focus);
    background-color: var(--color-background-input);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  .theme-form__input:disabled,
  .theme-form__select:disabled,
  .theme-form__textarea:disabled {
    background-color: var(--color-background-input-disabled);
    color: var(--color-text-disabled);
    border-color: var(--color-border-subtle);
    cursor: not-allowed;
  }

  /* Textarea Specific */
  .theme-form__textarea {
    resize: vertical;
    min-height: 120px;
  }

  /* Select Specific */
  .theme-form__select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M7 10l5 5 5-5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.25rem;
    padding-right: 3rem;
  }

  /* Field States */
  .theme-form__input--error,
  .theme-form__select--error,
  .theme-form__textarea--error {
    border-color: var(--color-error);
    background-color: var(--color-background-error);
  }

  .theme-form__input--error:focus,
  .theme-form__select--error:focus,
  .theme-form__textarea--error:focus {
    box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
  }

  .theme-form__input--success,
  .theme-form__select--success,
  .theme-form__textarea--success {
    border-color: var(--color-success);
    background-color: var(--color-background-success);
  }

  .theme-form__input--success:focus,
  .theme-form__select--success:focus,
  .theme-form__textarea--success:focus {
    box-shadow: 0 0 0 3px rgba(var(--color-success-rgb), 0.1);
  }

  /* Hint Text */
  .theme-form__hint {
    color: var(--color-text-muted);
    font-size: 0.875rem;
    line-height: 1.4;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  /* Error Messages */
  .theme-form__error {
    color: var(--color-text-error);
    font-size: 0.875rem;
    font-weight: 500;
    display: none;
    line-height: 1.4;
  }

  .theme-form__field--error .theme-form__error {
    display: block;
  }

  /* Meta Information */
  .theme-form__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .theme-form__counter {
    color: var(--color-text-muted);
    font-size: 0.75rem;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-form__counter--warning {
    color: var(--color-warning);
  }

  .theme-form__counter--error {
    color: var(--color-error);
  }

  /* Fieldset and Legend */
  .theme-form__fieldset {
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin: 0;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-form__legend {
    color: var(--color-text-primary);
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0 0.5rem;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  /* Checkbox and Radio Groups */
  .theme-form__checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .theme-form__checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .theme-form__checkbox-item--agreement {
    align-items: flex-start;
    padding: 1rem;
    background-color: var(--color-background-secondary);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border-subtle);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-form__checkbox,
  .theme-form__radio {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    margin: 0;
    margin-top: 0.125rem;
    accent-color: var(--color-primary);
  }

  .theme-form__checkbox-label {
    color: var(--color-text-primary);
    font-size: 0.875rem;
    line-height: 1.5;
    cursor: pointer;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-form__link {
    color: var(--color-primary);
    text-decoration: underline;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-form__link:hover {
    color: var(--color-primary-dark);
  }

  /* Form Actions */
  .theme-form__actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  @media (min-width: 640px) {
    .theme-form__actions {
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .theme-form__submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border: none;
    border-radius: var(--border-radius);
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    min-height: 3rem;
  }

  .theme-form__submit:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px var(--color-shadow-medium);
  }

  .theme-form__submit:active:not(:disabled) {
    transform: translateY(0);
  }

  .theme-form__submit:disabled {
    background-color: var(--color-background-input-disabled);
    color: var(--color-text-disabled);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .theme-form__submit--loading {
    cursor: not-allowed;
  }

  .loading-spinner {
    width: 1.25rem;
    height: 1.25rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .theme-form__reset {
    background: transparent;
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius);
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .theme-form__reset:hover {
    background-color: var(--color-background-hover);
    color: var(--color-text-primary);
    border-color: var(--color-border-interactive-hover);
  }

  /* Success Message */
  .theme-form__success {
    display: none;
    align-items: flex-start;
    gap: 1rem;
    padding: 2rem;
    background-color: var(--color-background-success);
    border: 1px solid var(--color-success);
    border-radius: var(--border-radius-lg);
    color: var(--color-text-success);
  }

  .success-icon {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    color: var(--color-success);
    margin-top: 0.25rem;
  }

  .success-content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-success);
  }

  .success-content p {
    margin: 0;
    line-height: 1.6;
  }

  /* Submission Error */
  .theme-form__submission-error {
    display: none;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    background-color: var(--color-background-error);
    border: 1px solid var(--color-error);
    border-radius: var(--border-radius-lg);
    color: var(--color-text-error);
  }

  .error-icon {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    color: var(--color-error);
    margin-top: 0.125rem;
  }

  .error-content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-error);
  }

  .error-content p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  /* Form Variants */
  .theme-form--bordered {
    border-width: 2px;
    box-shadow: none;
  }

  .theme-form--elevated {
    box-shadow: 0 8px 16px var(--color-shadow-medium);
  }

  /* Size Variants */
  .theme-form--sm {
    padding: 1.5rem;
    max-width: 480px;
  }

  .theme-form--sm .theme-form__input,
  .theme-form--sm .theme-form__select,
  .theme-form--sm .theme-form__textarea {
    padding: 0.75rem;
    font-size: 0.875rem;
  }

  .theme-form--sm .theme-form__submit,
  .theme-form--sm .theme-form__reset {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }

  .theme-form--lg {
    padding: 3rem;
    max-width: 720px;
  }

  .theme-form--lg .theme-form__input,
  .theme-form--lg .theme-form__select,
  .theme-form--lg .theme-form__textarea {
    padding: 1rem 1.25rem;
    font-size: 1.125rem;
  }

  .theme-form--lg .theme-form__submit,
  .theme-form--lg .theme-form__reset {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  /* Dark Mode Enhancements */
  .dark .theme-form {
    box-shadow: 0 4px 12px var(--color-shadow-dark);
  }

  .dark .theme-form--elevated {
    box-shadow: 0 12px 24px var(--color-shadow-dark);
  }

  .dark .theme-form__input:focus,
  .dark .theme-form__select:focus,
  .dark .theme-form__textarea:focus {
    box-shadow: 0 0 0 3px rgba(var(--color-primary-light-rgb), 0.2);
  }

  .dark .theme-form__submit:hover:not(:disabled) {
    box-shadow: 0 6px 12px var(--color-shadow-dark);
  }

  /* Print Styles */
  @media print {
    .theme-form__submit,
    .theme-form__reset,
    .loading-spinner {
      display: none;
    }

    .theme-form {
      box-shadow: none;
      border: 1px solid black;
    }

    .theme-form__input,
    .theme-form__select,
    .theme-form__textarea {
      border: 1px solid black;
      background: white;
      color: black;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .theme-form,
    .theme-form__input,
    .theme-form__select,
    .theme-form__textarea,
    .theme-form__submit,
    .theme-form__reset,
    .loading-spinner {
      transition: none;
      animation: none;
    }
  }

  /* High Contrast */
  @media (prefers-contrast: high) {
    .theme-form__input,
    .theme-form__select,
    .theme-form__textarea,
    .theme-form__fieldset {
      border-width: 2px;
    }

    .theme-form__submit {
      border: 2px solid var(--color-primary);
    }
  }
</style>
```

## Usage Examples

### Basic Contact Form

```astro
<ThemeContactForm
  title="Get in Touch"
  subtitle="We'd love to hear from you!"
/>
```

### Compact Support Form

```astro
<ThemeContactForm
  title="Support Request"
  subtitle="Describe your issue and we'll help you resolve it."
  submitText="Submit Request"
  size="sm"
  variant="bordered"
/>
```

### Large Registration Form

```astro
<ThemeContactForm
  title="Join Our Community"
  subtitle="Fill out this form to get started with your free account."
  submitText="Create Account"
  size="lg"
  variant="elevated"
/>
```

### Custom Form with Handler

```astro
<ThemeContactForm
  title="Custom Form"
  action="/api/custom-endpoint"
  method="POST"
  onSubmit="handleCustomSubmission"
/>

<script>
  function handleCustomSubmission(event) {
    // Custom form handling logic
    console.log('Custom form submitted', event);
  }
</script>
```

## Form States and Validation

### Field States

- **Default**: Clean, neutral appearance with subtle borders
- **Focus**: Enhanced border color and subtle glow
- **Hover**: Slightly highlighted background
- **Success**: Green border and background tint
- **Error**: Red border and background tint
- **Disabled**: Muted colors and disabled cursor

### Validation Features

- **Real-time validation**: Validates fields on blur and input
- **Custom validators**: Extensible validation system
- **Accessible errors**: ARIA announcements and proper associations
- **Character counting**: Live character count for textarea fields
- **Form-level validation**: Checks all fields before submission

### Loading States

- **Submit button**: Shows spinner and loading text
- **Form disable**: Prevents interaction during submission
- **Progress feedback**: Visual indication of submission status

## Accessibility Features

### ARIA Implementation

- `role="alert"` for error messages
- `aria-describedby` linking inputs to help text and errors
- `aria-labelledby` for fieldsets and complex labels
- `aria-required` for required fields

### Keyboard Navigation

- Tab order follows logical flow
- Enter submits form from any input
- Space toggles checkboxes and radio buttons
- Escape cancels current operation

### Screen Reader Support

- Semantic HTML structure with proper labels
- Clear error announcements
- Progress updates during submission
- Success/failure feedback

### Form Accessibility Checklist

```checklist
☐ All inputs have associated labels
☐ Required fields are clearly marked
☐ Error messages are announced to screen readers
☐ Form can be completed using only keyboard
☐ Focus indicators are visible and clear
☐ Field relationships are properly established
☐ Success and error states are announced
☐ Form instructions are clear and accessible
☐ Color is not the only way to convey information
☐ Text meets minimum contrast requirements
```

## Integration Examples

### React Component Wrapper

```tsx
import { useRef, useEffect, useState } from 'react';

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  title?: string;
  subtitle?: string;
}

export function ContactForm({ onSubmit, title, subtitle }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSubmit = async (e: Event) => {
      if (onSubmit) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
          const formData = new FormData(form);
          await onSubmit(formData);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => form.removeEventListener('submit', handleSubmit);
  }, [onSubmit]);

  return (
    <form ref={formRef} className="theme-form" data-form-component>
      {/* Form content matching Astro component structure */}
    </form>
  );
}
```

### Vue Component Integration

```vue
<template>
  <form @submit="handleSubmit" class="theme-form" data-form-component>
    <!-- Form fields -->
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['title', 'subtitle', 'onSubmit']);
const emit = defineEmits(['submit', 'success', 'error']);

const isSubmitting = ref(false);

const handleSubmit = async (event) => {
  event.preventDefault();

  if (props.onSubmit) {
    isSubmitting.value = true;

    try {
      await props.onSubmit(new FormData(event.target));
      emit('success');
    } catch (error) {
      emit('error', error);
    } finally {
      isSubmitting.value = false;
    }
  }
};

onMounted(() => {
  // Initialize form validation
  new ThemeContactForm(document.querySelector('[data-form-component]'));
});
</script>
```

## Testing Checklist

```checklist
☐ Form renders correctly in both light and dark themes
☐ All field types display proper styling
☐ Validation works for all field types
☐ Error messages display correctly
☐ Success state shows after submission
☐ Loading states work properly
☐ Form can be completed with keyboard only
☐ Screen reader announces all interactions
☐ Required fields are clearly marked
☐ Character counter updates correctly
☐ Reset button clears all fields and states
☐ Form works without JavaScript (basic functionality)
☐ Responsive design works on all screen sizes
☐ Form submission handles errors gracefully
☐ All text meets contrast requirements
☐ Focus indicators are visible and clear
☐ Form validates properly before submission
☐ Agreement checkbox prevents submission when unchecked
☐ Subject selection is required
☐ Phone number validation works for optional field
```

This comprehensive form component example demonstrates advanced state management, validation, accessibility, and theming while providing a robust user experience across all interaction modes and theme variations.
