'use client';

import { Authenticator, translations } from '@aws-amplify/ui-react';
import { I18n } from 'aws-amplify/utils';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';

I18n.putVocabularies({
  ja: {
    ...translations.ja,
    'Sign In': 'ログイン',
    'Sign Up': '新規登録',
    'Create Account': '新規登録',
    'Sign in': 'ログイン',
    'Forgot your password?': 'パスワードをお忘れの方はこちら',
    'Reset Password': 'パスワードをリセット',
  },
});
I18n.setLanguage('ja');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Authenticator>
          {children}
        </Authenticator>

        {/* 🔽 authenticator-styles.css を完全移植 */}
        <style jsx global>{`
          [data-amplify-authenticator] {
            --amplify-colors-background-primary: transparent;
            --amplify-colors-border-primary: rgba(185, 28, 28, 0.5);
            --amplify-colors-brand-primary-80: #dc2626;
            --amplify-colors-font-primary: #ffffff;
          }

          [data-amplify-authenticator] [data-amplify-router] {
            background: rgba(0, 0, 0, 0.95);
            border: 1px solid #dc2626;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
          }

          [data-amplify-authenticator] h3 {
            color: #dc2626;
            text-align: center;
            margin-bottom: 1rem;
          }

          [data-amplify-authenticator] button {
            background-color: #dc2626;
          }

          [data-amplify-authenticator] button:hover {
            background-color: #b91c1c;
          }

          body {
            margin: 0;
            min-height: 100vh;
            background: radial-gradient(circle at center, #020617, #000);
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </body>
    </html>
  );
}
