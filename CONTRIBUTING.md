# Contributing to The RC Reserve

The RC Reserve is a free RC reference and toolbox maintained by Tek-Pak Inc. Contributions should be factual, useful, and supported by reliable sources.

## Easy ways to help

- Submit a missing vehicle through the repository's **Submit a vehicle** issue form.
- Report incorrect information through the **Correct library information** form.
- Suggest a calculator or checklist through the **Request a free RC tool** form.

## Editing vehicle data

Vehicle records live in `data/vehicles.json`. Each record requires a unique lowercase ID, brand, exact model, platform, scale, category, drive type, power type, and an HTTPS official reference URL.

Use manufacturer product pages, manuals, or parts diagrams as primary sources. Do not copy marketing descriptions or copyrighted product photography into the repository.

Before opening a pull request, run:

```sh
npm test
```

GitHub also runs these checks automatically. A human review is required before library changes are published.
