<template>
  <footer class="settings-footer">
    <div class="footer-container">
      <div class="footer-info">
        <span>&copy; 2024 Swift PWA Plugin</span>
        <span>Made with ❤️ by Zilero</span>
      </div>

      <div class="footer-links">
        <a href="#" class="footer-link">Документация</a>
        <a href="#" class="footer-link">Поддержка</a>
        <a href="#" class="footer-link">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.settings-footer {
  background: var(--surface-100);
  border-top: 1px solid var(--surface-border);
  margin-top: auto;
}

.footer-container {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--text-color-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1rem;
  }

  .footer-links {
    gap: 1rem;
  }
}
</style>
