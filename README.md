# Abdul Company

Abdul Company adalah arsip kerja dan brand induk untuk project, catatan, eksperimen, dan kolaborasi yang sedang dibangun oleh Abdul.

## Development

Install dependencies:

```bash
pnpm install
```

Run local server:

```bash
pnpm dev
```

Build production:

```bash
pnpm build
```

Check lint:

```bash
pnpm lint
```

## Environment

Project ini memakai Web3Forms untuk form kontak.

Copy `.env.example` menjadi `.env.local`, lalu isi value aslinya di `.env.local`:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

Rules:

- `.env.example` boleh masuk GitHub karena hanya contoh.
- `.env.local` dan file `.env` lain tidak boleh masuk GitHub.
- Untuk deployment Vercel, isi key asli lewat menu Environment Variables.
