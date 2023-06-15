# haltev-interview-test

## Steps
1. Run pada command line
   ```
   npm install
   npm start dev
   ```
2. Run pada command line lain
   ```
   cd client
   npm install
   npm start
   ```
3. Konfigurasi database pada `app/config/db.config.js`
   - Sesuaikan `PORT`, `USER`, dan `PASSWORD`
   - Buat database `testdb` pada local dengan menjalankan
     ```
     mysql> CREATE DATABASE testdb;
     ```

## API
- `/api/load-data`: Load data News API ke database
- `/api/read-data`: Membaca seluruh data *articles* dari database
- `/api/insert-data`: Menambahkan satu record data *articles* ke database

  Contoh *request body*:
  ```
  {
        "sourceid": "google-news",
        "sourcename": "Google News",
        "author": "MataMata.com",
        "title": "Simon Cowell Angkat Putri Ariani, Tabiat Penyanyi Senior Indonesia Dikuliti: Banyak yang Tiba-tiba Mendekat | GLOW - MataMata.com - MataMata.com",
        "description": null,
        "url": "https://news.google.com/rss/articles/CBMimgFodHRwczovL2dsb3cubWF0YW1hdGEuY29tL3JlYWQvMjAyMy8wNi8xNC8xMTUxNTEvc2ltb24tY293ZWxsLWFuZ2thdC1wdXRyaS1hcmlhbmktdGFiaWF0LXBlbnlhbnlpLXNlbmlvci1pbmRvbmVzaWEtZGlrdWxpdGktYmFueWFrLXlhbmctdGliYS10aWJhLW1lbmRla2F00gGeAWh0dHBzOi8vZ2xvdy5tYXRhbWF0YS5jb20vYW1wL3JlYWQvMjAyMy8wNi8xNC8xMTUxNTEvc2ltb24tY293ZWxsLWFuZ2thdC1wdXRyaS1hcmlhbmktdGFiaWF0LXBlbnlhbnlpLXNlbmlvci1pbmRvbmVzaWEtZGlrdWxpdGktYmFueWFrLXlhbmctdGliYS10aWJhLW1lbmRla2F0?oc=5",
        "urlToImage": null,
        "publishedAt": "2023-06-14T04:51:00Z",
        "content": null
    },
  ```
