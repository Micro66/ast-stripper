#!/bin/bash

# 确保脚本在错误时退出
set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在git仓库中
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo -e "${RED}错误: 当前目录不是git仓库${NC}"
    exit 1
fi

# 检查远程仓库配置
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}警告: 未配置远程仓库${NC}"
    read -p "请输入远程仓库URL: " remote_url
    git remote add origin "$remote_url"
fi

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}错误: 有未提交的更改${NC}"
    git status
    exit 1
fi

# 检查是否在正确的分支上
current_branch=$(git branch --show-current)
if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
    echo -e "${YELLOW}警告: 当前不在 main/master 分支上${NC}"
    read -p "是否继续? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 运行测试
echo -e "${GREEN}运行测试...${NC}"
npm test

# 选择版本类型
echo -e "${YELLOW}请选择版本更新类型:${NC}"
echo "1) patch - 补丁版本 (1.0.0 -> 1.0.1)"
echo "2) minor - 次要版本 (1.0.0 -> 1.1.0)"
echo "3) major - 主要版本 (1.0.0 -> 2.0.0)"
read -p "请选择 (1-3): " version_type

case $version_type in
    1)
        npm run release:patch
        ;;
    2)
        npm run release:minor
        ;;
    3)
        npm run release:major
        ;;
    *)
        echo -e "${RED}无效的选择${NC}"
        exit 1
        ;;
esac

# 确保git推送成功
echo -e "${GREEN}推送代码到远程仓库...${NC}"
if ! git push origin "$current_branch"; then
    echo -e "${RED}错误: 代码推送失败${NC}"
    exit 1
fi

if ! git push --tags; then
    echo -e "${RED}错误: 标签推送失败${NC}"
    exit 1
fi

echo -e "${GREEN}发布完成!${NC}" 