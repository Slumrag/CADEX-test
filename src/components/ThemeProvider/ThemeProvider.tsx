import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { ConfigProvider, FloatButton, theme } from 'antd';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

type ColorScheme = 'light' | 'dark';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>();

  const handleClick = () => {
    setColorScheme((scheme) => (scheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('colorScheme');

    if (localTheme) {
      setColorScheme(localTheme as ColorScheme);
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setColorScheme('dark');
      } else {
        setColorScheme('light');
      }
    }
  }, []);

  useEffect(() => {
    if (colorScheme) {
      localStorage.setItem('colorScheme', colorScheme);
    }
  }, [colorScheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: colorScheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <FloatButton
        style={{ top: 32 }}
        icon={colorScheme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        onClick={handleClick}
      ></FloatButton>
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
