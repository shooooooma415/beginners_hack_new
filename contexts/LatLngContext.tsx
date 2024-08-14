"use client"; // 追加

import React, { createContext, useContext, useState } from 'react';

// 緯度と経度の型を定義
interface LatLng {
  lat: number;
  lng: number;
}

// コンテキストの型を定義
interface LatLngContextType {
  latLng: LatLng | null;
  setLatLng: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

// コンテキストを作成
const LatLngContext = createContext<LatLngContextType | undefined>(undefined);

// プロバイダーコンポーネント
export const LatLngProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latLng, setLatLng] = useState<LatLng | null>(null);

  return (
    <LatLngContext.Provider value={{ latLng, setLatLng }}>
      {children}
    </LatLngContext.Provider>
  );
};

// コンテキストを使用するカスタムフック
export const useLatLng = (): LatLngContextType => {
  const context = useContext(LatLngContext);
  if (!context) {
    throw new Error('useLatLng must be used within a LatLngProvider');
  }
  return context;
};
