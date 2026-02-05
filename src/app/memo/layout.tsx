'use client';

import { Authenticator, translations, ThemeProvider, Theme, View, Text } from '@aws-amplify/ui-react';
import { I18n } from 'aws-amplify/utils';
import '@aws-amplify/ui-react/styles.css';
import React, { useState } from 'react';

// 日本語翻訳設定
I18n.putVocabularies({
  ja: {
    ...translations.ja,
    'Sign In': 'ログイン',
    'Sign Up': '新規登録',
    'Create Account': '新規登録',
    'Forgot your password?': 'パスワードをお忘れの方はこちら',
    'Reset Password': 'パスワードをリセット',
    'Email': 'メールアドレス',
    'Password': 'パスワード',
    'Confirm Password': 'パスワード(確認)',
    'Code': '確認コード',
    'New Password': '新しいパスワード',
  },
});
I18n.setLanguage('ja');

// カスタムテーマ定義
const customTheme: Theme = {
  name: 'auth-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: 'transparent' },
      },
      font: {
        primary: { value: '#ffffff' },
        secondary: { value: '#fca5a5' },
      },
      border: {
        primary: { value: 'rgba(185, 28, 28, 0.5)' },
      },
      brand: {
        primary: {
          '80': { value: '#dc2626' },
          '90': { value: '#991b1b' },
          '100': { value: '#7f1d1d' },
        },
      },
    },
    components: {
      authenticator: {
        router: {
          backgroundColor: { value: 'rgba(0, 0, 0, 0.95)' },
          borderWidth: { value: '1px' },
          borderColor: { value: '#dc2626' },
          boxShadow: { value: '0 10px 30px rgba(0, 0, 0, 0.8)' },
        },
      },
      fieldcontrol: {
        borderColor: { value: 'rgba(185, 28, 28, 0.5)' },
        color: { value: '#ffffff' },
        _focus: {
          borderColor: { value: '#dc2626' },
          boxShadow: { value: 'none' },
        },
      },
      tabs: {
        item: {
          color: { value: 'rgba(255, 255, 255, 0.5)' },
          _active: {
            color: { value: '#ffffff' },
            borderColor: { value: '#ffffff' },
            backgroundColor: { value: 'rgba(220, 38, 38, 0.4)' },
          },
        },
      },
    },
  },
};

// ヘルプモーダル
const MemoInfoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center',
        alignItems: 'center', zIndex: 1000, padding: '20px'
      }} 
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '12px',
          border: '2px solid #dc2626', maxWidth: '500px', width: '100%', color: 'white'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ borderBottom: '2px solid #dc2626', paddingBottom: '10px', marginTop: 0 }}>使い方</h2>
        <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
          <p>鉄拳8のキャラ対策メモを管理できます。</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>キャラクター別にメモを分類</li>
            <li>重要度によるフィルタリング</li>
          </ul>
        </div>
        <button 
          onClick={onClose} 
          style={{
            marginTop: '30px', width: '100%', padding: '12px',
            backgroundColor: '#dc2626', color: 'white', border: 'none',
            borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showMemoInfo, setShowMemoInfo] = useState(false);

  return (
    <ThemeProvider theme={customTheme}>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #000000, #2d0000)',
        color: '#ffffff',
      }}>
        {/* ヘッダー */}
        <header style={{
          padding: '20px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', borderBottom: '1px solid rgba(220, 38, 38, 0.3)'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#dc2626', fontWeight: 'bold' }}>
            TEKKEN 8 MEMO
          </h1>
          <button 
            onClick={() => setShowMemoInfo(true)} 
            style={{
              backgroundColor: 'transparent', border: '1px solid #dc2626',
              color: '#dc2626', padding: '6px 16px', borderRadius: '20px', cursor: 'pointer'
            }}
          >
            使い方
          </button>
        </header>

        {/* 認証・メインコンテンツ */}
        <div style={{ padding: '40px 10px' }}>
          <Authenticator
            components={{
              Header() {
                return (
                  <View textAlign="center" padding="20px">
                    <Text color="white" fontSize="1.2rem">アカウント管理</Text>
                  </View>
                );
              },
              Footer() {
                return (
                  <View textAlign="center" padding="20px">
                    <div style={{
                      fontSize: '12px', color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px',
                      border: '1px solid rgba(185,28,28,0.2)', maxWidth: '400px', margin: '0 auto'
                    }}>
                      <p>メールが届かない場合は、迷惑メールフォルダをご確認ください。</p>
                    </div>
                  </View>
                );
              }
            }}
            services={{
              async validateCustomSignUp(formData) {
                if (!formData.password || (formData.password as string).length < 8) {
                  return { password: 'パスワードは8文字以上で入力してください' };
                }
              }
            }}
          >
            {({ signOut }) => (
              <main>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                  <button 
                    onClick={signOut} 
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)', color: 'white',
                      border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer'
                    }}
                  >
                    ログアウト
                  </button>
                </div>
                {children}
              </main>
            )}
          </Authenticator>
        </div>
      </div>

      <MemoInfoModal isOpen={showMemoInfo} onClose={() => setShowMemoInfo(false)} />

      {/* グローバルスタイルの安全な注入 */}
      <style>{`
        .amplify-field-group {
          border: 1px solid rgba(185, 28, 28, 0.5) !important;
          border-radius: 6px !important;
        }
        .amplify-field__show-password {
          border: none !important;
          border-left: 1px solid rgba(185, 28, 28, 0.5) !important;
          color: #dc2626 !important;
          background: transparent !important;
        }
        .amplify-input {
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </ThemeProvider>
  );
}