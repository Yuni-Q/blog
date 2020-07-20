---
title: history
date: 2020-07-20 16:07:16
category: frontend
draft: true
---

history.pushState(null, document.title, location.href); window.addEventListener('popstate', function(event) { history.pushState(null, document.title, location.href); });
