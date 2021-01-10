import * as React from "react";

type UserEnvProviderProps = { children: React.ReactElement | React.ReactElement[] };

export const UserEnvStateContext = React.createContext<{ [key: string]: any } | undefined>(
  undefined
);

/**
 * @description 모바일인지 아닌지 확인 모바일의 경우 (Mobile: true, PC: false)
 * @returns boolean
 */
function isMobile(_ua: string): boolean {
  return _ua.indexOf("mobi") > -1;
}

/**
 *
 * @description 브라우저 체크 용도
 * @param {string} _ua
 * @returns {string}
 */
function checkBrowser(_ua: string): string {
  const browserList = ["chrome", "safari", "firefox", "edge", "rv:11", "msie", "opera"];

  const filter = browserList.filter((item) => _ua.indexOf(item) > -1)[0];

  return filter === "rv:11.0" || filter === "msie" ? "ie" : filter;
}

/**
 *
 * @description 웹뷰 인지 확인 하는 용도
 * @param {string} _ua
 * @returns {string}
 */
function checkWebView(_ua: string): string | boolean {
  if (isMobile(_ua)) {
    if (_ua.indexOf("android") > 0 && _ua.indexOf("wv") > 0) {
      return "android";
    } else if (_ua.indexOf("mac os") > 0 && _ua.indexOf("safari") <= 0) {
      return "ios";
    }
  }
  return false;
}

function UserEnvProvider({ children }: UserEnvProviderProps) {
  const _ua = navigator.userAgent.toLowerCase();
  const env = {
    device: isMobile(_ua) ? "mobile" : "desktop",
    browser: checkBrowser(_ua),
    isWebView: !checkWebView(_ua) ? checkWebView(_ua) : "browser",
  };

  return <UserEnvStateContext.Provider value={env}>{children}</UserEnvStateContext.Provider>;
}

function useUserEnvState() {
  const context = React.useContext(UserEnvStateContext);

  if (context === undefined) {
    throw new Error("useContextEnv must be used wiithin a UserEnvProvider");
  }

  return context;
}

export { UserEnvProvider, useUserEnvState };
