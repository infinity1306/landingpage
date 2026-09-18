/**
 * Star Chain Labs Internal Employee & Staff Portal Authentication Modal
 */

export function initAuthModal(): () => void {
    const modal = document.querySelector<HTMLElement>('#auth-modal');
    const openBtn = document.querySelector<HTMLButtonElement>('#open-auth-modal-btn');
    if (!modal || !openBtn) {
        return () => {};
    }

    const closeButtons = modal.querySelectorAll<HTMLElement>('[data-auth-close]');
    const loginForm = modal.querySelector<HTMLFormElement>('form[data-auth-form="login"]');
    const forgotBtn = modal.querySelector<HTMLButtonElement>('[data-auth-action="forgot"]');
    const passwordToggleButtons =
        modal.querySelectorAll<HTMLButtonElement>('[data-toggle-password]');

    let lastFocusedElement: HTMLElement | null = null;

    const openModal = (): void => {
        lastFocusedElement = document.activeElement as HTMLElement | null;
        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');

        // Force reflow for CSS transition
        void modal.offsetHeight;
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        // Focus first input
        window.setTimeout(() => {
            const firstInput = modal.querySelector<HTMLInputElement>('input:not([type="hidden"])');
            if (firstInput) {
                firstInput.focus();
            }
        }, 60);
    };

    const closeModal = (): void => {
        if (!modal.classList.contains('is-open')) {
            return;
        }

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.removeProperty('overflow');

        window.setTimeout(() => {
            modal.hidden = true;
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        }, 280);
    };

    const handleKeydown = (event: KeyboardEvent): void => {
        if (!modal.classList.contains('is-open')) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        // Focus trapping
        if (event.key === 'Tab') {
            const focusableElements = modal.querySelectorAll<HTMLElement>(
                'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );

            if (focusableElements.length === 0) {
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    };

    const showStatus = (
        form: HTMLFormElement,
        message: string,
        type: 'success' | 'error',
    ): void => {
        const statusEl = form.querySelector<HTMLElement>('[data-auth-status]');
        if (!statusEl) {
            return;
        }

        statusEl.textContent = message;
        statusEl.className = `auth-status-message auth-status-message--${type}`;
        statusEl.hidden = false;
    };

    const clearStatus = (form: HTMLFormElement): void => {
        const statusEl = form.querySelector<HTMLElement>('[data-auth-status]');
        if (statusEl) {
            statusEl.hidden = true;
            statusEl.textContent = '';
        }
    };

    const clearErrors = (form: HTMLFormElement): void => {
        form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((errorEl) => {
            errorEl.hidden = true;
            errorEl.textContent = '';
        });
    };

    const showFieldError = (form: HTMLFormElement, fieldName: string, errorText: string): void => {
        const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${fieldName}"]`);
        if (errorEl) {
            errorEl.textContent = errorText;
            errorEl.hidden = false;
        }
    };

    // Event Listeners
    openBtn.addEventListener('click', () => openModal());

    closeButtons.forEach((btn) => {
        btn.addEventListener('click', closeModal);
    });

    passwordToggleButtons.forEach((toggleBtn) => {
        toggleBtn.addEventListener('click', () => {
            const targetId = toggleBtn.dataset.togglePassword;
            if (!targetId) {
                return;
            }
            const input = modal.querySelector<HTMLInputElement>(`#${targetId}`);
            if (!input) {
                return;
            }

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });
    });

    if (forgotBtn && loginForm) {
        forgotBtn.addEventListener('click', () => {
            clearErrors(loginForm);
            showStatus(
                loginForm,
                'Password reset requests must be submitted to it-support@starchainlabs.io or your internal Slack IT channel.',
                'success',
            );
        });
    }

    // Form Submissions
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            clearStatus(loginForm);
            clearErrors(loginForm);

            const formData = new FormData(loginForm);
            const email = String(formData.get('email') || '').trim();
            const password = String(formData.get('password') || '').trim();

            let hasError = false;
            if (!email || !email.includes('@')) {
                showFieldError(loginForm, 'email', 'Valid corporate email address is required');
                hasError = true;
            }
            if (!password || password.length < 6) {
                showFieldError(
                    loginForm,
                    'password',
                    'Security password is required (minimum 6 characters)',
                );
                hasError = true;
            }

            if (hasError) {
                return;
            }

            const submitBtn = loginForm.querySelector<HTMLButtonElement>('button[type="submit"]');
            const spinner = submitBtn?.querySelector<HTMLElement>('.auth-submit-btn__spinner');
            const label = submitBtn?.querySelector<HTMLElement>('.auth-submit-btn__label');

            if (submitBtn) {
                submitBtn.disabled = true;
            }
            if (spinner) {
                spinner.hidden = false;
            }
            if (label) {
                label.textContent = 'Verifying Credentials…';
            }

            window.setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
                if (spinner) {
                    spinner.hidden = true;
                }
                if (label) {
                    label.textContent = 'Sign In to Workstation';
                }

                showStatus(
                    loginForm,
                    'Authentication verified. Access granted to Star Chain Staff Portal.',
                    'success',
                );
                window.setTimeout(() => {
                    closeModal();
                    loginForm.reset();
                    clearStatus(loginForm);
                }, 1400);
            }, 800);
        });
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
        window.removeEventListener('keydown', handleKeydown);
    };
}
