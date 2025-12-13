# TomChou Multi-Page Portfolio Pack

這個壓縮包是給你的 GitHub Pages (Tom-Service.github.io) 用的「多頁切換版」網站骨架：
- index.html / resume.html / projects.html / contact.html
- 每個專案一頁：project-ecommerce.html / project-dashboard.html / project-iot.html
- 共用 UI：assets/css/style.css、assets/js/site.js（導覽列/頁尾自動注入 + active 狀態）

## 使用方式（最簡單）
1. 下載並解壓縮這個包
2. 把檔案「整包」丟進你的 repo 根目錄（取代原本 index.html）
3. Git commit + push
4. 等 GitHub Pages build 完即可看到多頁（通常 1~2 分鐘內）

## 你要改的地方
- contact.html：Email / GitHub 連結
- resume.html：公司/年份/成果
- projects.html：卡片內容與技術標籤
- project-*.html：每個專案詳細描述與連結
- assets/img：把 SVG 換成你的截圖（png/jpg）
