#!/bin/bash

# 创建下载目录（如果不存在）
mkdir -p images/students

# 下载4个随机头像到images/students目录
# 使用随机种子确保每个URL都是不同的
curl "https://i.pravatar.cc/300?img=1" -o images/students/student1.jpg
curl "https://i.pravatar.cc/300?img=2" -o images/students/student2.jpg
curl "https://i.pravatar.cc/300?img=3" -o images/students/student3.jpg
curl "https://i.pravatar.cc/300?img=4" -o images/students/student4.jpg

echo "已下载4个头像图片到 images/students 目录" 