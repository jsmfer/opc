import { useState, useEffect, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const AUTH_STORAGE_KEY = 'opc_admin_auth';

// 默认管理员账号（实际项目中应该从后端验证）
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123',
};

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // 检查本地存储的登录状态
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
          setAuth({
            isAuthenticated: true,
            username: parsed.username,
          });
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // 登录
  const login = useCallback((username: string, password: string): boolean => {
    // 验证账号密码（实际项目中应该调用后端 API）
    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      const authData = {
        username,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24小时有效期
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      setAuth({
        isAuthenticated: true,
        username,
      });
      return true;
    }
    return false;
  }, []);

  // 登出
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuth({
      isAuthenticated: false,
      username: null,
    });
  }, []);

  return {
    isAuthenticated: auth.isAuthenticated,
    username: auth.username,
    isLoading,
    login,
    logout,
  };
}
