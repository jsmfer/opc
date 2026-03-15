#!/bin/bash

# OPC 数据持久化测试脚本

echo "========================================"
echo "🧪 OPC 数据持久化测试"
echo "========================================"
echo ""

API_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:5173"

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试计数
PASSED=0
FAILED=0

test_step() {
    echo "----------------------------------------"
    echo -e "${YELLOW}▶ $1${NC}"
}

test_pass() {
    echo -e "${GREEN}✅ $1${NC}"
    ((PASSED++))
}

test_fail() {
    echo -e "${RED}❌ $1${NC}"
    ((FAILED++))
}

# 1. 检查后端服务
test_step "1. 检查后端服务"
if curl -s "$API_URL/api/health" > /dev/null; then
    test_pass "后端服务正常运行"
else
    test_fail "后端服务未启动，请先运行: cd server && node api.js"
    exit 1
fi

# 2. 获取原始数据
test_step "2. 获取原始 navigation 数据"
ORIGINAL_LOGO=$(curl -s "$API_URL/api/content/navigation" | grep -o '"logoText":"[^"]*"' | cut -d'"' -f4)
echo "   原始 Logo: $ORIGINAL_LOGO"

# 3. 修改数据
test_step "3. 修改 navigation 数据"
TEST_LOGO="测试Logo_$(date +%s)"
curl -s -X PUT "$API_URL/api/content/navigation" \
    -H "Content-Type: application/json" \
    -d "{\"logoText\":\"$TEST_LOGO\",\"logoIcon\":\"Cpu\",\"navLinks\":[{\"label\":\"测试链接\",\"href\":\"#test\"}],\"ctaText\":\"测试按钮\"}" > /dev/null

# 4. 验证修改
test_step "4. 验证修改已保存"
SAVED_LOGO=$(curl -s "$API_URL/api/content/navigation" | grep -o '"logoText":"[^"]*"' | cut -d'"' -f4)
if [ "$SAVED_LOGO" = "$TEST_LOGO" ]; then
    test_pass "数据已正确保存到后端"
    echo "   保存的 Logo: $SAVED_LOGO"
else
    test_fail "数据保存失败"
    echo "   期望: $TEST_LOGO"
    echo "   实际: $SAVED_LOGO"
fi

# 5. 检查数据文件
test_step "5. 检查数据文件持久化"
if [ -f "server/data/content.json" ]; then
    FILE_SIZE=$(stat -f%z "server/data/content.json" 2>/dev/null || stat -c%s "server/data/content.json" 2>/dev/null)
    test_pass "数据文件存在 (大小: $FILE_SIZE 字节)"
    
    if grep -q "$TEST_LOGO" server/data/content.json; then
        test_pass "数据文件包含修改后的内容"
    else
        test_fail "数据文件未包含修改后的内容"
    fi
else
    test_fail "数据文件不存在"
fi

# 6. 测试重置功能
test_step "6. 测试重置为默认"
curl -s -X POST "$API_URL/api/content/reset" > /dev/null
RESET_LOGO=$(curl -s "$API_URL/api/content/navigation" | grep -o '"logoText":"[^"]*"' | cut -d'"' -f4)
if [ "$RESET_LOGO" = "OPC" ]; then
    test_pass "重置功能正常，数据恢复默认值"
else
    test_fail "重置功能异常"
    echo "   期望: OPC"
    echo "   实际: $RESET_LOGO"
fi

# 测试结果汇总
echo ""
echo "========================================"
echo "📊 测试结果"
echo "========================================"
echo -e "${GREEN}通过: $PASSED${NC}"
echo -e "${RED}失败: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 所有测试通过！数据持久化工作正常。${NC}"
    echo ""
    echo "📝 手动验证步骤:"
    echo "   1. 打开 $FRONTEND_URL"
    echo "   2. 查看导航栏 Logo 是否为 'OPC'"
    echo "   3. 访问 $FRONTEND_URL/admin 修改数据"
    echo "   4. 刷新首页，确认数据保持修改后的状态"
    exit 0
else
    echo -e "${RED}⚠️ 部分测试失败，请检查配置。${NC}"
    exit 1
fi
