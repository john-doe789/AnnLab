#!/bin/bash

# 显示当前状态
echo "======= 当前Git状态 ======="
git status

# 添加所有文件
echo -e "\n======= 添加文件到Git ======="
git add .

# 提交更改
echo -e "\n======= 提交更改 ======="
read -p "请输入提交信息: " commit_message
git commit -m "$commit_message"

# 推送到GitHub
echo -e "\n======= 推送到GitHub ======="
git push origin main

echo -e "\n======= 部署完成 ======="
echo "您的网站已更新，稍后可通过 https://ericismyself.github.io/AnnLab/ 访问" 