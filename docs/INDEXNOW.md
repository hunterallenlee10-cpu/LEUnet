# IndexNow

IndexNow tells Bing (and through it Copilot, plus Yandex, Seznam and Naver) that a page is new or changed, so it gets crawled within hours instead of waiting for the sitemap. Google doesn't use IndexNow; for Google, use Search Console's URL Inspection > Request indexing (Domain property `sc-domain:leeenterprisesunlimited.net`).

The key file is `public/d6a0ddb6f9f1c5748d26fcf9499d7d88.txt`, served at https://www.leeenterprisesunlimited.net/d6a0ddb6f9f1c5748d26fcf9499d7d88.txt. It only proves the site owns the key; it isn't a secret. Don't delete it, or pings stop being accepted. The .com site has its own key (see `docs/INDEXNOW.md` in hunterallenlee10-cpu/leu).

To ping after a page changes (one URL or several):

```sh
curl -sS -X POST https://api.indexnow.org/indexnow \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{"host":"www.leeenterprisesunlimited.net","key":"d6a0ddb6f9f1c5748d26fcf9499d7d88","keyLocation":"https://www.leeenterprisesunlimited.net/d6a0ddb6f9f1c5748d26fcf9499d7d88.txt","urlList":["https://www.leeenterprisesunlimited.net/hardest-worker-in-maryland"]}'
```

A 200 or 202 means it was accepted. Ping only real changes; repeated pings for unchanged pages are ignored.
