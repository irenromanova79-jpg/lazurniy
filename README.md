# Финансовый кабинет руководителя — ООО СПК «Лазурный»

Премиальный управленческий дашборд на основе аналитических записок **ОДДС** и **ОПиУ** за март–апрель 2026.
React + TypeScript + Tailwind CSS + Recharts, компонентная архитектура, адаптивная вёрстка.

## Запуск

```bash
npm install      # установка зависимостей
npm run dev      # локальный сервер разработки (http://localhost:5173)
npm run build    # сборка в папку dist/
npm run preview  # предпросмотр собранной версии
```

Требуется Node.js 18+.

## Структура проекта

```
src/
  main.tsx                  — точка входа
  index.css                 — Tailwind + базовые стили
  lib/
    colors.ts               — премиальная палитра (графит/бронза, зелёный=рост, красный=риск)
    format.ts               — форматирование рублей, млн, %, дельт
  data/
    mockData.ts             — ВСЕ ДАННЫЕ дашборда (см. «Подключение реальных данных»)
  components/
    Dashboard.tsx           — оболочка: шапка, вкладки, подвал
    FiltersPanel.tsx        — панель периода
    DataTable.tsx           — таблица движений по моделям
    ui/                     — KpiCard, Card, SectionHead, StatusPill, Delta, Mini, Legend
    charts/                 — Waterfall, MonthBars, кастомный тултип
    sections/               — ExecutiveSummary, CashFlowSection, ProfitLossSection,
                              SalesChannelsSection, CostsSection, RisksPanel, RecommendationsPanel
```

## Подключение реальных данных

Все цифры вынесены в один типизированный файл **`src/data/mockData.ts`** — они взяты
из исходных записок без изменений. Чтобы обновить дашборд на новый период:

1. Откройте `src/data/mockData.ts`.
2. Замените значения в объектах: `cashHeadline`, `cashBridge`, `payments`, `purchases`,
   `pnlHeadline`, `pnlBridge`, `channels`, `breakeven`, `mpCosts`, `mpModels`, `optModels`,
   `risks`, `recs`, `meta`.
3. Типы (`MonthPair`, `Risk`, `Recommendation` и др.) подскажут, какие поля нужны.
4. Пересоберите: `npm run build`.

Для автоматизации можно заменить статический файл на загрузку JSON из 1С:УНФ или
Google Sheets (fetch в `Dashboard.tsx` с теми же структурами данных).

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub и запушьте проект.
2. В `vite.config.ts` параметр `base` уже задан как `"./"` — относительные пути
   работают и из подпапки. (Если используете именованный путь, укажите `base: "/имя-репозитория/"`.)
3. Разверните одной командой:

```bash
npm run deploy   # сборка + публикация ветки gh-pages через пакет gh-pages
```

4. В настройках репозитория **Settings → Pages** выберите ветку `gh-pages`.

## Автопубликация через GitHub Actions (без Node.js на компьютере)

В проекте уже есть готовый workflow `.github/workflows/deploy.yml`. GitHub сам
собирает проект на своих серверах при каждом пуше — ставить Node.js локально не нужно.

1. Загрузите проект в репозиторий на GitHub (ветка `main`).
2. **Settings → Pages → Build and deployment → Source** → выберите **GitHub Actions**.
3. Готово: после каждого пуша в `main` страница пересобирается автоматически.
   Ссылка вида `https://<логин>.github.io/<имя-репозитория>/`.
